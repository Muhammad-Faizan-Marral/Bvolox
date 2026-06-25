const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      default: "", // FIX: required hata kar default empty string lagayi taake image-only msgs chal skein
    },
    fileUrl: {
      type: String,
      default: null,
    },
    fileType: {
      type: String,
      enum: ["image", "video", null],
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;