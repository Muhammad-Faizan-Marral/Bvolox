const mongoose = require("mongoose");

const globalMessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const GlobalMessage = mongoose.model("GlobalMessage", globalMessageSchema);
module.exports = GlobalMessage;