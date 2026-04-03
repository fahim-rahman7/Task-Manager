const registration = (req, res) => {
    const {fullName, email, password} = req.body;
    try {
        if (!fullName.trim()) return res.status(400).send({message: "Full Name is Required"})
        if (!email) return res.status(400).send({message: "email is Required"})
        if (!password) return res.status(400).send({message: "password is Required"})
        
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
}

module.exports = {registration}