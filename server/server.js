require("dotenv").config();
const express = require("express");
const router = require("./routes");
const dbConfig = require("./configs/dbConfig");
const app = express();
const cors = require("cors")
const cookieParser = require('cookie-parser')

app.use(cookieParser())
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5174",
    credentials: true,
}));
app.use(router);







dbConfig()

app.listen(8000,()=> console.log("server is running"))

// Db_URL=mongodb+srv://task-manager:Ws2H6q5V0WacrOv2@cluster0.capeypv.mongodb.net/task-manager?appName=Cluster0
// JWT_SEC="oniljkol"