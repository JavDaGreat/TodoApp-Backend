const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleResetPwd = async (req, res) => {
  const { token, pwd } = req.body;
  console.log(token, pwd);
  if (!token || !pwd)
    return res
      .status(400)
      .json({ error: "Password and Reset Token are required." });

  const foundUser = await User.findOne({ resetToken: token }).exec();
  if (!foundUser) return res.status(400).json({ error: "Token is invalid" });
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    foundUser.password = hashedPwd;
    foundUser.resetToken = "";
    const result = await foundUser.save();

    console.log(result);
    res.status(201).json({
      message: `Password for  ${foundUser.username} has successfully changed !`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { handleResetPwd };
