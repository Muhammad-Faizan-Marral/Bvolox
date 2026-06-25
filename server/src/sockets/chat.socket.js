const GlobalMessage = require("../models/globalMessage.model");

module.exports = (io, socket) => {
  socket.on("message:send", async (data) => {
    try {
      const savedMessage = await GlobalMessage.create({
        sender: data.senderId,
        text: data.text,
      });

      const populatedMessage = await savedMessage.populate(
        "sender",
        "name avatar",
      );

      console.log("populatedMessage", populatedMessage);
      io.emit("message:new", populatedMessage);
    } catch (error) {
      console.log(error);
    }
  });
};
