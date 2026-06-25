require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

const http = require("http");
const { Server } = require("socket.io");

const registerSockets = require("./src/sockets");

connectDB();
console.log(process.env.MONGO_URI);

const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  /^https:\/\/bvolox.*\.vercel\.app$/,
];

const io = new Server(server, {
  cors: {
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
  },
});

registerSockets(io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});