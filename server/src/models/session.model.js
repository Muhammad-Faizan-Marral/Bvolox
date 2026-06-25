const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User is required"],
    },
    refreshTokenHash: {
      type: String,
      required: [true, "Refresh Token is Required"],
    },
    ip: {
      type: String,
      required: [true, "IP adress is required"],
    },
    userAgent: {
      type: String,
      required: [true, "User agent is required"],
    },
    revoked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const sessionModel = mongoose.model("session", sessionSchema);
module.exports = sessionModel;