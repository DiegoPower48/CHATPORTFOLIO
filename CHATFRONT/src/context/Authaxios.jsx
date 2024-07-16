import axios from "axios";

const instance = axios.create({
  baseURL: "https://portfolio-rc17.onrender.com",
  withCredentials: true,
});

export default instance;
