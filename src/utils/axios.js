import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://lws-server-joy.herokuapp.com/",
});

export default axiosInstance;
