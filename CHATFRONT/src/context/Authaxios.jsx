import axios from "axios";

const instance = axios.create({
  baseURL: "https://portfolio-c4l9.onrender.com",
  withCredentials: true,
});

export default instance;
