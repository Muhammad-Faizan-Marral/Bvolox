import api from "./axiosInstance";

export const getRooms = async () => {
  const { data } = await api.get("/rooms");
  return data;
};

export const createRoom = async (payload) => {
  const { data } = await api.post("/rooms", payload);

  return data;
};

export const joinRoom = async (roomId) => {
  const { data } = await api.post(`/rooms/join/${roomId}`);

  return data;
};

export const getRoomMessages = async (roomId) => {
  const { data } = await api.get(`/rooms/messages/${roomId}`);

  return data;
};
