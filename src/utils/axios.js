import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://tame-ruby-eel-suit.cyclic.app/",
});

export default axiosInstance;
