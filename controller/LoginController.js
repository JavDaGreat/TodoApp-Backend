const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser)
    return res.status(401).json({ message: "Username or Password is Wrong" });
  const { _id } = foundUser;
  const matchPwd = await bcrypt.compare(pwd, foundUser.password);
  if (!matchPwd) {
    return res.status(401).json({ message: "Username or Password is Wrong" });
  } else {
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2h" }
    );
    res.json({ accessToken, id: _id });
    console.log(foundUser);
  }
};
module.exports = { handleLogin };
