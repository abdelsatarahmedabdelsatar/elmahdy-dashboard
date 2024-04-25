import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://elmahdy.onrender.com/",
});

export default axiosInstance;
