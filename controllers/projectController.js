const {
    generateSlug
} = require("../helpers/utils");
const authSchema = require("../models/authSchema");
const projectSchema = require("../models/projectSchema");

const createProject = async (req, res) => {
    const {
        title,
        description
    } = req.body;
    const authorId = req.user.id;
    console.log(authorId);
    try {
        const slug = generateSlug(title)
        const project = await projectSchema({
            title,
            description,
            slug,
            author: authorId
        });
        project.save();
        res.status(200).send({
            message: "Project Created"
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

const projectList = async (req, res) => {
    try {
        const {
            search
        } = req.query;
        console.log(search);
        const project = await projectSchema.find({
            // author: req.user.id,
            $or:[
                {author: req.user.id},
                {members: req.user.id}
            ],
            title: {
                $regex: search || "",
                $options: "i"
            }
        }).populate("author", "avatar fullName")
        if (!project) {
            res.status(400).send({
                message: "No project found"
            })
        }
        res.status(200).send(project)
    } catch (error) {  
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

const addMemberToProject = async (req, res) => {
    const {
        email,
        projectId
    } = req.body;

    try {
        const existingEmail = await authSchema.findOne({
            email
        })
        if (!existingEmail) return res.status(400).send({
            message: "User doesn't exist"
        })

        const existingMember = await projectSchema.findOne({
            $or:[
                {author: existingEmail._id},
                {members:  existingEmail._id}
            ],
        })
        if (existingMember) return res.status(400).send({
            message: "Member already exist"
        })
        const project = await projectSchema.findOneAndUpdate({
            _id: projectId
        }, {
            members: existingEmail._id
        }, {
            new: true
        })
        if (!project) return res.status(400).send({
            message: "Invalid request"
        })

        res.status(200).send({message: "Member added"})
    } catch (error) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
}


module.exports = {
    createProject,
    projectList,
    addMemberToProject
}