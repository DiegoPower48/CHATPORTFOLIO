import io from "socket.io-client";

const socket = io("https://chatportfolio.onrender.com", {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

export default socket;
