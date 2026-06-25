import axiosInstance from "./axiosInstance";

export const registerUser = (data) => axiosInstance.post("/auth/user", data);

export const loginUser = (data) => axiosInstance.post("/auth/loginUser", data);

export const getUser = () => axiosInstance.get("/auth/getuser");

export const logoutCurrentDevice = () =>
  axiosInstance.get("/auth/logoutCurrentDevice");

export const logoutAllDevices = () => axiosInstance.get("/auth/logoutAll");

export const refreshTokens = () => axiosInstance.get("/auth/generateNewTokens");

export const updateUser = (data) => axiosInstance.patch("/auth/updateUser",data);
