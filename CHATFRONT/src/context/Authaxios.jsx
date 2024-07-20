import axios from "axios";

const instance = axios.create({
  baseURL: "https://chatportfolio.onrender.com",
  withCredentials: true,
});

export default instance;
