import axiosInstance from "./axiosInstance";

export const getDirectMessages = (conversationId) => axiosInstance.get(`/dm/conversation/${conversationId}`);
export const getDirectMessagesHistory = (convId) => axiosInstance.post(`/dm/conversationHistory`,{conversationId:convId});

