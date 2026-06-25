import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // cookies (refreshToken) bhejna ke liye zaroori
});

// ─── Request Interceptor ───────────────────────────────
// Har request ke saath Authorization header add karo
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
// ─── Response Interceptor ─────────────────────────────
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve(token);
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🌟 FULL PROOF FIX: URL ko normalized lowercase bana kar check karein
    const requestUrl = originalRequest.url ? originalRequest.url.toLowerCase() : "";
    
    // Agar URL mein 'register' ya 'login' ka lafzi hissa aata hai, toh yeh true hoga
    const isAuthRequest = requestUrl.includes("user") || requestUrl.includes("login");

    // Agar auth request hai aur 401 aaya hai (jaise User Already Exists), 
    // toh direct error ko throw karo, refresh token chalane ki koshish bilkul mat karo
    if (isAuthRequest) {
      return Promise.reject(error);
    }

    // Baqi normal components (dashboard, chat, profile) ke liye yeh refresh logic chalega
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/auth/generateNewTokens`,
          { withCredentials: true },
        );
        const newToken = data.accessToken;
        localStorage.setItem("accessToken", newToken);
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("accessToken");
        window.location.href = "/login"; // Force logout sirf normal pages ke liye hoga
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);



export default axiosInstance;
