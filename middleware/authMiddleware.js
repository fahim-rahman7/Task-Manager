const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next)=> {
    try {
        const {accessToken} = req.cookies
        console.log(accessToken);
        const decoded = jwt.verify(accessToken, process.env.JWT_SEC)
        if (decoded) {
            req.user = decoded;
            console.log(decoded);
        } else {
            res.status(404).send({message: "User not found"})
        }
        next()
    } catch (error) {
        res.status(404).send({message: "User not found"})
    }

}

module.exports = {authMiddleware}