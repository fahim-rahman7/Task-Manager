const jwt = require('jsonwebtoken');

function validateEmailBasic(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000);
  }

const generateToken = (users)=> {
  const token = jwt.sign(users, process.env.JWT_SEC);
  return token;
}


module.exports = {validateEmailBasic, generateOTP, generateToken};