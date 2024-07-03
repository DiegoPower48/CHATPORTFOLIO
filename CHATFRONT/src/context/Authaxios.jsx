import axios from "axios";

const instance = axios.create({
  baseURL: "https://backendportfolio-one.vercel.app/loginin",
  withCredentials: true,
});

export default instance;
