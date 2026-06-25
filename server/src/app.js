const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const chatRouter = require("./routes/chat.routes"); 
const { createServer } = require("http");
const dmRouter = require("./routes/dm.routes");
const roomRouter = require("./routes/room.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH","OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter); 
app.use("/api/dm", dmRouter); 
app.use("/api/rooms", roomRouter);

module.exports = app;
