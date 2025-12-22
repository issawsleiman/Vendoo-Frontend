import axios from "axios";
const MAIN_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
const axiosInstance = axios.create({
  baseURL: MAIN_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default axiosInstance;
