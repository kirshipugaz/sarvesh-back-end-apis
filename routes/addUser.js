const express = require("express");
const router = express.Router();
const multer = require("multer");

const UserInformation = require("../models/UserInformation");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // save files to the uploads directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // saves the file with a unique name
  },
});
const upload = multer({ storage: storage });
router.post("/", async (req, res) => {
  try {
    const {
      name,
      DOB,
      pronoun,
      phNo,
      gender,
      email,
      location,
      languages,
      bio,
      qualifications,
      license,
      practicingFrom,
      title,
      serviceType,
      AoE,
    } = req.body;

    const filePath = req.file ? req.file.path : null;

    // Create a new user instance
    const newUser = new UserInformation({
      name,
      DOB,
      pronoun,
      phNo,
      gender,
      email,
      location,
      languages,
      bio,
      qualifications,
      license,
      practicingFrom,
      title,
      serviceType,
      AoE,
      pdf: filePath, //to save the filepath of the upload in the database
    });

    // Save the new user to the database
    await newUser.save();

    // Sending success response
    return res.status(201).json({ message: "User added successfully" });
  } catch (err) {
    // Error handling
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
