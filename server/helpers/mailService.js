const nodemailer = require("nodemailer");
const { emailTemp } = require("./emailTemp");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: "omg3639@gmail.com",
    pass: "oimg qiyz zzcn axxa",
  },
});

const emailSender = async ({otp, subject, email}) => {
    try {
        const info = await transporter.sendMail({
          from: '"Task Manager Team" <taskmanager@gmail.com>', // sender address
          to: email, // list of recipients
          subject: subject, // subject line
          html: emailTemp({otp}), // HTML body
        });
      
      } catch (err) {
        console.error("Error while sending mail:", err);
      }
}

module.exports = {emailSender}