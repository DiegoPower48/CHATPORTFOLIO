/* RECUPERANDO DATOS DE ROOM Y USUARIO */

const room = "meroo";

/* CREANDO EL MODELO */

const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    comentario: { type: String },
  },
  { collection: `CHAT${room}` }
);

const Item = mongoose.model(`Item${room}`, itemSchema);

/* CREANDO EL SOCKET */

const socket = (io) => {
  io.on("connection", (socket) => {
    console.log("un usuario se ha conectado");
    socket.on("disconnect", () => {
      console.log("un usuario se ha desconectado");
    });
    socket.on(`chat${room}`, async (msg) => {
      console.log(msg);
      try {
        await Item.create({
          comentario: msg,
        });
        console.log("guardando el mensaje");
      } catch (e) {
        console.log("error en create");
      }
      socket.broadcast.emit(`chat${room}`, msg);
    });
    if (!socket.recovered) {
      try {
        Item.find({}).then((recuperado) => {
          recuperado.map((message) => {
            console.log(message.comentario);
            socket.emit(`chat${room}`, message.comentario);
          });
        });
      } catch (e) {
        console.log(e);
      }
    }
  });
};

module.exports = socket;
