const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

const conn = await mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 15000,
});
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Mongo Error:", error);
    process.exit(1);
  }
};
module.exports = connectDB;