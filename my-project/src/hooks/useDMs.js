import { useState, useCallback, useEffect, useRef } from "react";
import { getDirectMessages, getDirectMessagesHistory } from "../api/dm.api";
import { useSocket } from "./useSocket";

export const useDMs = (targetUserId, currentUserId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [conversationId, setConversationId] = useState(null);
  const [chatUser, setChatUser] = useState(null);

  const { socket } = useSocket();
  
  // Ref to hold the active conversation ID for the cleanup closure safely
  const activeConvIdRef = useRef(null);

  // Effect 1: Fetch Conversation details and history
  useEffect(() => {
    if (!targetUserId || !socket) return;
    
    setLoading(true);
    setMessages([]); // Purani messages instant clear karein naye user ke liye

    const startChatAndFetchHistory = async () => {
      try {
        const response = await getDirectMessages(targetUserId);

        if (response && response.data?.success) {
          const conversation = response.data.conversation;
          const convId = conversation._id;

          setConversationId(convId);
          activeConvIdRef.current = convId; // Save in ref immediately

          // Join the socket room right away
          socket.emit("dm:join", convId);

          const historyResponse = await getDirectMessagesHistory(convId);
          if (historyResponse && historyResponse.data?.success) {
            setMessages(historyResponse.data.messages || []);
          }
          
          const targetUserData = conversation.participants.find(
            (user) => user._id === targetUserId
          );
          setChatUser(targetUserData);
        }
      } catch (error) {
        console.error("Chat loading issue occurred:", error);
      } finally {
        setLoading(false);
      }
    };

    startChatAndFetchHistory();

    // Safe Cleanup using the stable Ref value
    return () => {
      if (activeConvIdRef.current) {
        socket.emit("dm:leave", activeConvIdRef.current);
        activeConvIdRef.current = null;
      }
    };
  }, [targetUserId, socket]);

  // Effect 2: Independent Socket Event Listener (No state lagging)
  useEffect(() => {
    if (!socket || !conversationId) return;

    const handleIncomingMessage = (newMessage) => {
      if (newMessage.conversationId === conversationId) {
        setMessages((prev) => {
          // Check to prevent double/duplicate messages rendering
          if (prev.some((msg) => msg._id === newMessage._id)) return prev;
          return [...prev, newMessage];
        });
      }
    };

    socket.on("dm:receive", handleIncomingMessage);

    return () => {
      socket.off("dm:receive", handleIncomingMessage);
    };
  }, [conversationId, socket]);

  // Send Message Method
  const sendDM = useCallback(
    (text, fileData = null) => {
      if (!conversationId || !currentUserId || !socket) return;
      if (!text.trim() && !fileData) return; 

      const messageData = {
        conversationId,
        senderId: currentUserId,
        text: text,
        fileUrl: fileData ? fileData.url : null,
        fileType: fileData ? fileData.type : null 
      };

      socket.emit("dm:send", messageData);
    },
    [conversationId, currentUserId, socket]
  );

  return { messages, loading, sendDM, conversationId, chatUser };
};