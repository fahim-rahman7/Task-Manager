const express = require("express");
const {
    default: mongoose
} = require("mongoose");


const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
    },
    assignedTo: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },  
],
    priority: {
        type: String,
        default: "High",
        enum: ["High", "Medium", "Low"]
    },
    status: {
        type: Boolean,
        default: false
    }
})


const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        trim: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    members: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
],
    tasks: [taskSchema]
    
})

module.exports = mongoose.model("project", projectSchema)