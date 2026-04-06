const express = require("express");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const authSchema = new mongoose.Schema({
    avatar: {
        type: String,
        default: ""
      },
    fullName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      isVerified: {
        type: Boolean,
        default: false
      },
      otp: {
        type: String,
        default: null,
      },
      otpExpiry: {
        type: Date,
      }
});

authSchema.pre("save", async function () {
    // only hash if password is modified or new
    if (!this.isModified("password")) return 
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      res.status(500).send({message: "Server error"})
    }
  });

  authSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };


module.exports = mongoose.model("user", authSchema)