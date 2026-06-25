import { createContext, useState, useEffect, useCallback } from "react";
import { getUser, logoutCurrentDevice, logoutAllDevices } from "../api/auth.api";
import { getAccessToken, setAccessToken, removeAccessToken } from "../utils/tokenUtils";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // initial load

  // App start hone par user fetch karo
  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);   

  const fetchUser = async () => {
    try {
      const { data } = await getUser();
      setUser(data.user);
      if (data.token) setAccessToken(data.token);
    } catch {
      removeAccessToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback((token, userData) => {
    setAccessToken(token);
    setUser(userData);
  }, []);

  const logout = useCallback(async (allDevices = false) => {
    try {
      if (allDevices) {
        await logoutAllDevices();
      } else {
        await logoutCurrentDevice();
      }
    } finally {
      removeAccessToken();
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};