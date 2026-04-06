function validateEmailBasic(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000);
  }


module.exports = {validateEmailBasic, generateOTP};