const express = require("express");
const { createProject, projectList, addMemberToProject, addTaskToProject, projectDetails, updateTaskStatus } = require("../controllers/projectController");
const router = express.Router();

router.post("/create", createProject)
router.get("/list", projectList)
router.get("/details/:slug", projectDetails)
router.post("/addmember", addMemberToProject)
router.post("/addtask", addTaskToProject)
router.patch("/taskStatus",  updateTaskStatus);


module.exports = router ;