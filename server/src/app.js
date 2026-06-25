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

const allowedOrigins = [
  "http://localhost:5173",
  /^https:\/\/bvolox.*\.vercel\.app$/, // matches all your project's preview + production URLs
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.some((allowed) =>
        typeof allowed === "string" ? allowed === origin : allowed.test(origin)
      );
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/", (req,res)=>{
res.json({message:"Welecome to Volox Chat App API ."})
});
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter); 
app.use("/api/dm", dmRouter); 
app.use("/api/rooms", roomRouter);

module.exports = app;