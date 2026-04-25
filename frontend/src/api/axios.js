import axios from "axios";

const API = axios.create({
  baseURL: "https://inventory-tracker-production-f795.up.railway.app",
});

// token auto attach
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;