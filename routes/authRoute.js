const express = require("express");
const router = express.Router();
const {registration} = require("../controllers/authController");

router.get("/registration", registration)

module.exports = router ;