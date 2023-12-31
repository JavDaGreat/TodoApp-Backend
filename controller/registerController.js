const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd, email } = req.body;
  console.log(user, pwd, email);
  if (!user || !pwd || !email) return res.status(400).json({ message: "bad" });
  // if username or pwd is missing
  const duplicateUser = await User.findOne({ username: user }).exec(); // see if user already exist
  if (duplicateUser)
    return res.status(409).json({ message: "User already exist" });
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10); //hashing password with 10 round of salt
    const result = await User.create({
      username: user,
      password: hashedPwd,
      email: email,
    });
    console.log(result);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { handleNewUser };
