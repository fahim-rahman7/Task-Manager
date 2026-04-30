const express = require("express");
const { createProject, projectList, addMemberToProject, addTaskToProject } = require("../controllers/projectController");
const router = express.Router();

router.post("/create", createProject)
router.get("/list", projectList)
router.post("/addmember", addMemberToProject)
router.post("/addtask", addTaskToProject)


module.exports = router ;