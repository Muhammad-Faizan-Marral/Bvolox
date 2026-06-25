import axiosInstance from "./axiosInstance";

// Purani chat history load karne ke liye
export const getChatHistory = () => axiosInstance.get("/chat/history");
