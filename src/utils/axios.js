import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://lws-json-server.vercel.app/",
});

export default axiosInstance;
