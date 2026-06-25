const express = require("express");
const router = express.Router();
const GlobalMessage = require("../models/globalMessage.model");


router.get("/history", async (req, res) => {
  try {
    const messages = await GlobalMessage.find()
      .populate("sender", "name avatar")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching messages" });
  }
});

module.exports = router;