const {
    emailSender
} = require("../helpers/mailService");
const {
    validateEmailBasic,
    generateOTP,
    generateToken
} = require("../helpers/utils");
const authSchema = require("../models/authSchema");
const { UploadToCloudinary, deleteFromCloudinary } = require("../helpers/cloudinaryService");

const registration = async (req, res) => {
    const {
        fullName,
        email,
        password
    } = req.body;
    try {
        if (!fullName ?.trim()) return res.status(400).send({
            message: "Full Name is Required"
        })
        if (!email) return res.status(400).send({
            message: "Email is Required"
        })
        if (!validateEmailBasic(email)) return res.status(400).send({
            message: "Invalid Email"
        })
        if (!password) return res.status(400).send({
            message: "Password is Required"
        })

        const existingEmail = await authSchema.findOne({
            email
        });
        if (existingEmail) return res.status(400).send({
            message: "Email Already Exist"
        })
        // OTP create 
        const OTP_NUM = generateOTP()

        const user = new authSchema({
            fullName,
            email,
            password,
            otp: OTP_NUM,
            otpExpiry: new Date(Date.now() + 5 * 60 * 1000)
        });

        user.save()

        await emailSender({
            otp: OTP_NUM,
            subject: "Otp Verification Mail",
            email
        })

        res.status(200).send({
            message: "Registration Successfully Done, Please verify your Mail"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}


const otpVerify = async (req, res) => {
    const {
        email,
        otp
    } = req.body;


    try {

        const user = await authSchema.findOneAndUpdate({
            email,
            otp,
            otpExpiry: {
                $gt: Date.now()
            }
        }, {
            isVerified: true,
            otp: null
        }, {
            returnDocument: "after"
        });

        console.log(user);
        if (!user) return res.status(400).send({
            message: "Otp is not correct"
        })

        res.status(200).send({
            message: "Otp is Verified"
        })
    } catch (error) {

    }
}


const login = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        const user = await authSchema.findOne({
            email
        });
        if (!user) return res.status(400).send({
            message: "Invalid Credential"
        })
        if (!user.isVerified) return res.status(400).send({
            message: "Email is not Verified"
        });
        const matchPass = await user.comparePassword(password)

        if (!matchPass) return res.status(400).send({
            message: "Invalid Credential"
        })

        const accessToken = generateToken({
            id: user._id,
            email: user.email
        })
        console.log("accessToken", accessToken);
        res.cookie("accessToken", accessToken);

        res.status(200).send({
            message: "Login Successfully Done."
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error"
        })

    }
}

const userProfile = async (req, res) => {
    try {
        const userData = await authSchema.findOne({_id:req.user.id}).select("fullName email avatar")
       
        if(!userData) return res.status(401).send({message: "unauthorized user"})

        res.status(200).send({message: "User Profile"})
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}
const updateProfile = async (req, res) => {
    const {fullName} = req.body;
    const userId = req.user.id
    try {
    
    const userData = await authSchema.findOne({_id: userId })
    if (fullName && fullName.trim()) {
        userData.fullName = fullName;
    }

    if (req.file) {
        const avatarUrl = await UploadToCloudinary({mimetype:req.file.mimetype,bufferString:req.file.buffer})
        deleteFromCloudinary(userData.avatar)
        userData.avatar =  avatarUrl
    }
   userData.save()
    res.send("Profile Updated") 
 
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    registration,
    otpVerify, 
    login,
    userProfile,
    updateProfile
}