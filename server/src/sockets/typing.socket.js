const onlineUsers = require("../utils/onlineUser");

module.exports = (io, socket) => {
  socket.on("start-typing", ({ senderId, receiverId }) => {
    const receiverData = onlineUsers.get(receiverId); // 1. receiverId use karein

    if (receiverData && receiverData.socketId) {
      // 2. target user ki socketId par event bhejein
      io.to(receiverData.socketId).emit("user-typing", { senderId }); 
    }
  });

  socket.on("stop-typing", ({ senderId, receiverId }) => {
    const receiverData = onlineUsers.get(receiverId);
    if (receiverData && receiverData.socketId) {
      io.to(receiverData.socketId).emit("user-stop-typing", { senderId });
    }
  });
};