const User = require("../model/User");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const Mailjet = require("node-mailjet");
const mailjet = Mailjet.apiConnect(
  process.env.MAIL_API_KEY,
  process.env.MAIL_SECRET_KEY
);

const handleSendEmailForgetPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  if (!email) return res.status(400).json({ message: " E-mail is required." });
  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) return res.status(401).json({ message: "user not Exist" });

  const resetToken = uuidv4();
  foundUser.resetToken = resetToken;
  const result = await foundUser.save();
  console.log(result);

  const requsetMailjet = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: process.env.SENDER_EMAIL,
          Name: "Admin",
        },
        To: [
          {
            Email: email,
            Name: foundUser.username,
          },
        ],
        Subject: "Forget Password todo App",

        HTMLPart: `
        <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <div style="background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); padding: 20px;">
            <h2 style="color: #333;">Password Reset Token</h2>
            <p style="font-size: 16px;">Hello ${foundUser.username},</p>
            <p style="font-size: 16px;">You have requested a password reset for your Todo App account.</p>
            <p style="font-size: 16px;">To reset your password, please copy the following token:</p>
            <span style="background-color: #007bff; color: #fff; padding: 4px 8px; border-radius: 5px; font-size: 24px;">${resetToken}</span>
            <p style="font-size: 16px;">and then click the button below:</p>
            <a href="https://www.todoapp.com/reset-password" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; font-size: 18px; border-radius: 5px;">Reset Password</a>

            <p style="font-size: 16px;">If you did not request this password reset, please ignore this email.</p>
            <p style="font-size: 16px;">Thank you for using Todo App!</p>
          </div>
        </div>
      `,
      },
    ],
  });

  requsetMailjet
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
  res.sendStatus(200);
};
module.exports = { handleSendEmailForgetPassword };
