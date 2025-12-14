export const API = "https://sweet-management-backend.onrender.com/api";
export const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});
