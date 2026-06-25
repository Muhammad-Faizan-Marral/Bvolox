const mongoose = require("mongoose");

const roomMessageSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // FIX: Iske bagair shorting 'createdAt' par kaam nahi karegi
);

const RoomMessage = mongoose.model("RoomMessage", roomMessageSchema);
module.exports = RoomMessage;