/* RECUPERANDO DATOS DE ROOM Y USUARIO */

const Room = 3;

/* CREANDO EL MODELO */

const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    comentario: { type: String },
  },
  { collection: `CHAT${Room}` }
);

const Item = mongoose.model(`Item${Room}`, itemSchema);

/* CREANDO EL SOCKET */

const socket = (io) => {
  io.on("connection", (socket) => {
    console.log("un usuario se ha conectado");
    socket.on("disconnect", () => {
      console.log("un usuario se ha desconectado");
    });
    socket.on(`chat${Room}`, async (msg) => {
      try {
        await Item.create({
          comentario: msg,
        });
      } catch (e) {
        console.log(e);
      }
      socket.broadcast.emit(`chat${Room}`, msg);
    });
    if (!socket.recovered) {
      try {
        Item.find({}).then((recuperado) => {
          recuperado.map((message) =>
            socket.emit(`chat${Room}`, message.comentario)
          );
        });
      } catch (e) {
        console.log(e);
      }
    }
  });
};

module.exports = socket;
