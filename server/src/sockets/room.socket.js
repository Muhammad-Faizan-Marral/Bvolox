const RoomMessage = require("../models/roomMessage.model");

module.exports = (io, socket) => {
  
  // User socket room join karta hai
  socket.on("room:join", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} successfully joined room: ${roomId}`);
  });

  // Message bhejne ka event
  socket.on("room:message", async (data) => {
    try {
      const message = await RoomMessage.create({
        roomId: data.roomId,
        sender: data.senderId,
        text: data.text,
      });

      // FIX: User Schema mein 'avatar' field hai, 'profileImage' nahi!
      const populated = await message.populate("sender", "name avatar");

      // Us room ke sabhi active members ko message bhejo
      io.to(data.roomId).emit("room:new-message", populated);
    } catch (error) {
      console.error("Socket message error:", error);
    }
  });
};