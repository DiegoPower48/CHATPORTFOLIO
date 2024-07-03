import axios from "axios";

const instance = axios.create({
  baseURL: "chatportfolios-production.up.railway.app/loginin",
  withCredentials: true,
});

export default instance;
