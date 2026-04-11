const express = require("express");
const router = express.Router();
const {registration, otpVerify, login, userProfile} = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/registration", registration)
router.post("/otp-verify", otpVerify);
router.post("/login", login);
router.get("/profile", authMiddleware , userProfile);

module.exports = router ;