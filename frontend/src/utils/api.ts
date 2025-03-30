import axios from "axios";

const API_BASE_URL = "https://keystrokelab.onrender.com/api";

// const token = localStorage.getItem("token");
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
  // Authorization: `Bearer ${token}`,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
