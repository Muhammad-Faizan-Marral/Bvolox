const mongoose = require("mongoose");
const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

async function getOrCreateConversation(req, res) {
  try {
    const currentUserId = req.user?._id;
    const targetUserId = req.params.UserId;

    if (!targetUserId || !mongoose.Types.ObjectId.isValid(targetUserId)) {
      return res.status(400).json({ success: false, message: "Invalid or missing User ID." });
    }

    if (currentUserId.toString() === targetUserId.toString()) {
      return res.status(400).json({ success: false, message: "You cannot chat with yourself." });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [currentUserId, targetUserId] },
    }).populate("participants", "name email avatar bio");

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [currentUserId, targetUserId],
      });
      // Dubara populate taake participants data front-end ko crash na kare
      conversation = await conversation.populate("participants", "name email avatar bio");
    }

    return res.status(200).json({ success: true, conversation });
  } catch (error) {
    console.error("Error in getOrCreateConversation:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}

async function conversationHistory(req, res) {
  try {
    const { conversationId } = req.body;

    if (!conversationId) {
      return res.status(400).json({ success: false, message: "conversationId is required." });
    }

    const dmHistory = await Message.find({ conversationId })
      .populate("sender", "name avatar bio")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      messages: dmHistory || [],
    });
  } catch (error) {
    console.error("Error in conversationHistory:", error);
    return res.status(500).json({ success: false, message: "Server Error fetching history." });
  }
}

module.exports = { getOrCreateConversation, conversationHistory };