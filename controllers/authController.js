const validateEmailBasic = require("../helpers/utils");
const authSchema = require("../models/authSchema");

const registration = async (req, res) => {
    const {fullName, email, password} = req.body;
    try {
        if (!fullName?.trim()) return res.status(400).send({message: "Full Name is Required"})
        if (!email) return res.status(400).send({message: "Email is Required"})
        if (!validateEmailBasic(email)) return res.status(400).send({message: "Invalid Email"})
        if (!password) return res.status(400).send({message: "Password is Required"})

        const existingEmail = await authSchema.findOne({email});
        if (existingEmail) return res.status(400).send({message: "Email Already Exist"})

        const user = new authSchema({fullName, email, password});
        
        user.save()

        res.status(200).send({message: "Registration Successfully Done"})
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal Server Error"})
    }
}

module.exports = {registration}