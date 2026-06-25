const chatSocket = require("./chat.socket");
const presenceSocket = require("./presence.socket");
const dmSocket = require("./dm.socket");
const typingSocket = require("./typing.socket");
const roomSocket = require("./room.socket");
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    chatSocket(io, socket);
    presenceSocket(io, socket);
    dmSocket(io, socket);
    typingSocket(io, socket);
    roomSocket(io, socket);

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
    });
  });
};
