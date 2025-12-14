export const API = import.meta.env.VITE_API_URL;
export const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});
