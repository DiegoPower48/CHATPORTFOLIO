const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const sockets = require("./socket/sockets");

const BD_URI = process.env.BD_URI;

mongoose.connect(BD_URI);
mongoose.connection.on("connected", () => {
  console.log("Conectado a MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.error("Error al conectar a MongoDB: ", err);
});

const port = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: [
      "https://chatportfolio-production-c9b8.up.railway.app",
      "https://chatportfolio.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

// Manejo de preflight requests
app.options(
  "*",
  cors({
    origin: [
      "https://chatportfolio-production-c9b8.up.railway.app",
      "https://chatportfolio.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(logger("dev"));
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "https://chatportfolio-production-c9b8.up.railway.app",
      "https://chatportfolio.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
  },
});

sockets(io);

server.listen(port, () => {
  console.log(`escuchando el puerto: ${port}`);
});

module.exports = io;
