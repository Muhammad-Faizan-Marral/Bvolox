export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) ? "" : "Enter a valid email";
};

export const validatePassword = (password) => {
  if (!password) return "Enter password";
  if (password.length < 6) return "Password must contain 6 letters";
  return "";
};

export const validateName = (name) => {
  if (!name || name.trim().length < 2) return "Naam must have 2 letters";
  return "";
};