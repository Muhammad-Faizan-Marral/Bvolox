import { useState, useCallback, useEffect } from "react";
import { useSocket } from "./useSocket"; 
import { getChatHistory } from "../api/chat.api";
import useAuth from "../hooks/useAuth"; 

export const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { socket, isConnected } = useSocket();
  const { user } = useAuth(); 
console.log("messages in usestate",messages)
  useEffect(() => {
    setLoading(true);

    getChatHistory()
      .then((res) => {
        setMessages(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching history:", err);
        setLoading(false);
      });
  }, [roomId]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newPopulatedMessage) => {
      console.log("newPopulatedMessage", newPopulatedMessage);
      setMessages((prev) => {
        const exists = prev.some((msg) => msg._id === newPopulatedMessage._id);
        if (exists) return prev;
        return [...prev, newPopulatedMessage];
      });
    };

    socket.on("message:new", handleNewMessage);

    return () => {
      socket.off("message:new", handleNewMessage);
    };
  }, [socket]);

  const sendMessage = useCallback(
    (text) => {
      if (!text.trim() || !socket || !isConnected) return;

      socket.emit("message:send", {
        senderId: user?._id, 
        text: text,
      });
    },
    [socket, isConnected, user, roomId]
  );

  return { messages, loading, sendMessage, isConnected };
};