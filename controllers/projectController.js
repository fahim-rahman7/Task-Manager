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
            _id: projectId,
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


const addTaskToProject = async (req, res) => {
    const {title, description, assignedTo, priority, projectId} = req.body;

    try {
        if(!title) return res.status(400).send({message: "Title is required"})
        if(!description) return res.status(400).send({message: "description is required"})
        if(!priority) return res.status(400).send({message: "Title is required"})
        if(!["High", "Medium", "Low"].includes(priority)) return res.status(400).send({message: "Invalid priority value"})
        if(!projectId) return res.status(400).send({message: "projectId is required"})
        if(assignedTo && !Array.isArray(assignedTo)) return res.status(400).send({message: "invalid assigned value"})
        
        if(assignedTo){
            for (const userId of assignedTo) {
                const existingMember = await projectSchema.findOne(
                    {_id: projectId, 
                    
                      $or:[
                        {author: userId},
                        {members: userId}
                    ],
                })
                if(!existingMember) return res.status(400).send({message: "user does not exist in project"})
            }
            
        }
        const projectData = await projectSchema.findOneAndUpdate({_id: projectId}, {tasks: {title, description, assignedTo, priority}}, {returnDocument: "after"})
        if(!projectData) return res.status(400).send({message: "Invalid user"})

        res.status(200).send({message: "Task added successfully", projectData})
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

module.exports = {
    createProject,
    projectList,
    addMemberToProject,
    addTaskToProject
}