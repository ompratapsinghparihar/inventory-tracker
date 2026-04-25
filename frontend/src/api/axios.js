import axios from "axios";

const API = axios.create({
  baseURL: "https://inventory-tracker-production-f795.up.railway.app/",
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

const res = await axios.get("/items", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
});

export default API;