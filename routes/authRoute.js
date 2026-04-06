const express = require("express");
const router = express.Router();
const {registration, otpVerify} = require("../controllers/authController");

router.post("/registration", registration)
router.post("/otp-verify", otpVerify)

module.exports = router ;