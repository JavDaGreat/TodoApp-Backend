const express = require("express");
const router = express.Router();
const sendEmailForgetPassword = require("../controller/sendEmailForgetPassword");

router.post("/", sendEmailForgetPassword.handleSendEmailForgetPassword);
module.exports = router;
