require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

const http = require("http");
const { Server } = require("socket.io");

const registerSockets = require("./src/sockets");

connectDB();
console.log(process.env.MONGO_URI);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

registerSockets(io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});