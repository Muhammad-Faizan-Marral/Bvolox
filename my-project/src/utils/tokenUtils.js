export const getAccessToken = () => localStorage.getItem("accessToken");

export const setAccessToken = (token) => localStorage.setItem("accessToken", token);

export const removeAccessToken = () => localStorage.removeItem("accessToken");

// JWT decode (bina library ke — sirf payload)
export const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;
  return decoded.exp * 1000 < Date.now();
};