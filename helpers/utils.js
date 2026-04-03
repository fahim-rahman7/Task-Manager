function validateEmailBasic(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

module.exports = validateEmailBasic;