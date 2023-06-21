const mongoose = require('mongoose');
//this file has been renamed from user.js
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    // Define the role field with type String and enum values of "Admin", "Student", or "Visitor"
    accountType: {
      type: String,
      enum: ["Admin", "Student", "Instructor"],
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    approved: {
      type: Boolean,
      default: true,
    },
    additonalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Profile"
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      }
    ],
    token: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    image: {
      type: String, //url of image
      required: true,
    },
    courseProgress: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courseProgress",
      }
    ],
    // Add timestamps for when the document is created and last modified
  },
  { timestamps: true }

);


module.exports = mongoose.model("User", userSchema);