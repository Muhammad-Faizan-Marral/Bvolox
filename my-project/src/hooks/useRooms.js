import { useEffect, useState } from "react";
import { getRooms, getRoomMessages, joinRoom, createRoom } from "../api/room.api"; // Added missing createRoom import
import { useSocket } from "./useSocket";
import useAuth from "./useAuth";

export const useRooms = (roomId = null) => {
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { socket } = useSocket();
  const { user } = useAuth();

  const createNewRoom = async (payload) => {
    try {
      const room = await createRoom(payload);
      if (room) {
        setRooms((prev) => [room, ...prev]);
      }
    } catch (error) {
      console.error("Failed to create room:", error);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    if (!roomId) return;
    initRoom();
  }, [roomId]);

  useEffect(() => {
    if (!socket) return;

    socket.on("room:new-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("room:new-message");
    };
  }, [socket]);

  const loadRooms = async () => {
    try {
      setLoading(true);
      const data = await getRooms();
      setRooms(data || []);
    } catch (error) {
      console.error("Failed to load rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const initRoom = async () => {
    try {
      setLoading(true);
      await joinRoom(roomId);

      if (socket) {
        socket.emit("room:join", roomId);
      }

      const oldMessages = await getRoomMessages(roomId);
      setMessages(oldMessages || []);
    } catch (error) {
      console.error("Error initializing room:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = (text) => {
    if (socket && user) {
      socket.emit("room:message", {
        roomId,
        senderId: user._id,
        text,
      });
    }
  };

  return {
    rooms,
    messages,
    loading,
    sendMessage,
    createNewRoom,
  };
};