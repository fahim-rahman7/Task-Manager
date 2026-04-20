const projectSchema = require("../models/projectSchema");

const createProject = async (req, res) => {
    const {title, description} = req.body;
    const authorId = req.user.id;
    console.log(authorId);
    try {
        const project = await projectSchema({title, description, author: authorId});
        project.save();
        res.status(200).send({message: "Project Created"})
    } catch (error) {
        
    }
}

module.exports = {createProject}