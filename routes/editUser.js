const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const UserInformation = require("../models/UserInformation");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Use a unique filename
  },
});

const upload = multer({ storage: storage });

router.put("/:id", upload.single("pdf"), async (req, res) => {
  try {
    const userId = req.params.id;
    const newValues = req.body;

    let user = await UserInformation.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (newValues.removeFile === "true" && user.pdf) {
      fs.unlink(user.pdf, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error deleting file" });
        }
      });

      newValues.pdf = null;
    }

    if (req.file) {
      newValues.pdf = req.file.path;
      if (user.pdf) {
        fs.unlink(user.pdf, (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error while uploading file" });
          }
        });
  
        
      }
      

    }

    user = await UserInformation.findByIdAndUpdate(
      userId,
      { $set: newValues },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
