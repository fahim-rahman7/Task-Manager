const express = require("express");
const router = express.Router();
const {registration, otpVerify, login} = require("../controllers/authController");

router.post("/registration", registration)
router.post("/otp-verify", otpVerify);
router.post("/login", login);

module.exports = router ;