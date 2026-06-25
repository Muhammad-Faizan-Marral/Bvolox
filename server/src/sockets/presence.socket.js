const onlineUsers = require("../utils/onlineUser");
module.exports = (io, socket) => {
  socket.on("user_connected", (userData) => {
    if (!userData) return;

    const userId = userData._id || userData.id;
    if (!userId) return;

    onlineUsers.set(userId, {
      socketId: socket.id,
      userId: userId,
      name: userData.name,
      avatar: userData.avatar,
      bio: userData.bio,
    });

    io.emit("update_user_list", Array.from(onlineUsers.values()));
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);

    for (let [userId, user] of onlineUsers.entries()) {
      if (user.socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    io.emit("update_user_list", Array.from(onlineUsers.values()));
  });
};
