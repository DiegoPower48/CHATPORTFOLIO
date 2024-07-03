import axios from "axios";

const instance = axios.create({
  baseURL: "portfolio-production-ecd3.up.railway.app/loginin",
  withCredentials: true,
});

export default instance;
