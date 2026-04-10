const express = require("express");
const router = require("./routes");
const dbConfig = require("./configs/dbConfig");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(router)






dbConfig()

app.listen(8000,()=> console.log("server is running"))

// Db_URL=mongodb+srv://task-manager:Ws2H6q5V0WacrOv2@cluster0.capeypv.mongodb.net/task-manager?appName=Cluster0