const express = require("express");
const router = express.Router();
const authRoute = require("./authRoute");
const projectRoute = require("./projectRoute");
const { authMiddleware } = require("../middleware/authMiddleware");



router.get("/", (req,res)=>{
    res.send("Hello from server")
})

router.use("/auth", authRoute);
router.use("/project",authMiddleware, projectRoute);

module.exports = router;   