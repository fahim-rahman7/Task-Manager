const express = require("express");
const { default: mongoose } = require("mongoose");

const authSchema = new mongoose.Schema({
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
      isValid: {
        type: Boolean,
        default: false
      },
      otp: {
        type: String,
      }
})

module.exports = mongoose.model("user", authSchema)