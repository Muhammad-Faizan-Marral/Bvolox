  import React, { createContext, useEffect, useState } from "react";
  import { socket } from "../lib/socket";
  import useAuth from "../hooks/useAuth";

  export const SocketContext = createContext(null);

  export const SocketProvider = ({ children }) => {
    const { user } = useAuth(); // User ka login status check karne ke liye
    const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    if (user) {
      // Login hone par connect karo
      const token = localStorage.getItem("token"); // ya jo bhi aapka token utility hai
      if (token) {
        socket.auth = { token };
      }
      socket.connect();
    } else {
      // Logout hone par ya user na hone par disconnect karo
      socket.disconnect();
    }

    function onConnect() {
      setIsConnected(true);
      console.log("Socket connected:", socket.id);
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log("Socket disconnected");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, [user]);
    return (
      <SocketContext.Provider value={{ socket, isConnected }}>
        {children}
      </SocketContext.Provider>
    );
  };