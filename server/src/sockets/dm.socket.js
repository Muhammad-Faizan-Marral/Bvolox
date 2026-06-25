const Message = require("../models/message.model");
const Conversation = require("../models/conversation.model");

module.exports = (io, socket) => {
  
  // User conversation room join karta hai
  socket.on("dm:join", (conversationId) => {
    socket.join(conversationId);
    console.log(`User connected to conversation: ${conversationId}`);
  });

  // ⚡ CRITICAL FIX: Message send aur save karne ka handler
  socket.on("dm:send", async (data) => {
    try {
      const { conversationId, senderId, text, fileUrl, fileType } = data;

      // 1. Database mein message create karein
      const newMessage = await Message.create({
        conversationId,
        sender: senderId, // Mismatch Fix: payload ki senderId ko 'sender' field me save kiya
        text: text || "",
        fileUrl: fileUrl || null,
        fileType: fileType || null,
      });

      // 2. Sender ki information populate karein taake avatar/name screen par dikhe
      const populatedMessage = await newMessage.populate("sender", "name avatar bio");

      // 3. Conversation table mein last message update karein
      await Conversation.findByIdAndUpdate(conversationId, {
        lastMessage: text || (fileType === "image" ? "📷 Photo" : "🎥 Video"),
        lastMessageAt: Date.now(),
      });

      // 4. Room mein maujood dono users ko live data emit karein
      io.to(conversationId).emit("dm:receive", populatedMessage);

    } catch (error) {
      console.error("Error directly processing socket dm:send:", error);
    }
  });

  socket.on("dm:leave", (conversationId) => {
    socket.leave(conversationId);
    console.log(`User left conversation: ${conversationId}`);
  });
};