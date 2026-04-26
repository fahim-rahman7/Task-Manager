const express = require("express");
const { createProject, projectList, addMemberToProject } = require("../controllers/projectController");
const router = express.Router();

router.post("/create", createProject)
router.get("/list", projectList)
router.post("/addmember", addMemberToProject)


module.exports = router ;