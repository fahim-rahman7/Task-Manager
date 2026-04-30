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

function generateSlug(title) {
  if (!title) return '';

  return title
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')           // Decompose accented characters (e.g., é -> e + ́)
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .replace(/\s+/g, '-')       // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '')    // Remove all non-word characters (except hyphens)
    .replace(/-+/g, '-')        // Replace multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, '');   // Remove leading and trailing hyphens
}

module.exports = {validateEmailBasic, generateOTP, generateToken, generateSlug};