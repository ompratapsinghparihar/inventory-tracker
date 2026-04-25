import axios from "axios";

const instance = axios.create({
  baseURL: "https://inventory-tracker-production-f795.up.railway.app/",
});

// Request interceptor (auto token attach karega)
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // ❌ NO await

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;