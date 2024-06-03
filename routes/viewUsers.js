const express = require("express");
const router = express.Router();

const UserInformation = require("../models/UserInformation");

// Route to fetch all users excluding soft-deleted ones
router.get("/", async (req, res) => {
  try {
    
    const users = await UserInformation.find({ isDeleted: { $ne: true } });
    
    
    // Sending success response with the filtered users
    return res.json(users);
  } catch (err) {
    // Error handling
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
