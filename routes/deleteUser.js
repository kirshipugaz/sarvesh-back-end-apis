const express = require("express");
const router = express.Router();

const UserInformation = require("../models/UserInformation");

// Route to soft delete a user
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await UserInformation.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Mark the user as deleted
    user.isDeleted = true; 
    

    // Save the updated user to the database
    await user.save();

    
    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    // Error handling
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
