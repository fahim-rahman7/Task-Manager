const express = require("express");
const router = express.Router();
const authRoute = require("./authRoute");

router.get("/", (req,res)=>{
    res.send("Hello from server")
})

router.use("/auth", authRoute)

module.exports = router;   