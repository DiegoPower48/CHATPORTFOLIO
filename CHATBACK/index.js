const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const Item = require("./model/model.js");

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

// Configurar CORS
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://chat-web-backend-lemon.vercel.app",
  ], // Agrega todos los dominios que necesites
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};
app.use(cors(corsOptions));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://chat-web-backend-lemon.vercel.app",
    ], // Asegúrate de que esta URL sea la correcta
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"], // Asegúrate de que los transportes están configurados correctamente
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
  },
});

io.on("connection", (socket) => {
  console.log("un usuario se ha conectado");
  socket.on("disconnect", () => {
    console.log("un usuario se ha desconectado");
  });
  socket.on("message", async (msg) => {
    try {
      await Item.create({
        comentario: msg,
      });
    } catch (e) {
      console.log(e);
    }
    socket.broadcast.emit("message", msg);
  });
  if (!socket.recovered) {
    try {
      Item.find({}).then((recuperado) => {
        recuperado.map((message) => socket.emit("message", message.comentario));
      });
    } catch (e) {
      console.log(e);
    }
  }
});

app.use(logger("dev"));

server.listen(port, () => {
  console.log(`escuchando el puerto: ${port}`);
});
