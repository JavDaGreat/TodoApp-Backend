const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controller/resetPasswordController");

router.post("/", resetPasswordController.handleResetPwd);
module.exports = router;
