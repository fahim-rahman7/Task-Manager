const express = require("express");
const router = express.Router();
const {registration, otpVerify, login, userProfile, updateProfile} = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = multer();



router.post("/registration", registration)
router.post("/otp-verify", otpVerify);
router.post("/login", login);
router.get("/profile", authMiddleware , userProfile);
router.put("/update-profile", authMiddleware , upload.single("avatar") , updateProfile);

module.exports = router ;