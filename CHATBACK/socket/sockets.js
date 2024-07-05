/* RECUPERANDO DATOS DE ROOM Y USUARIO */

/* CREANDO EL MODELO */

const mongoose = require("mongoose");

/* CREANDO EL SOCKET */

const socket = (io) => {
  io.on("connection", (socket) => {
    const room = socket.handshake.query.room;
    console.log("un usuario se ha conectado");

    const schemaName = `Item${room}`;
    const collectionName = `CHAT${room}`;

    // Verificar si el modelo ya existe
    const Item =
      mongoose.models[schemaName] ||
      mongoose.model(
        schemaName,
        new mongoose.Schema(
          {
            nombre: { type: String },
            comentario: { type: String },
          },
          { collection: collectionName }
        )
      );

    socket.on("disconnect", () => {
      console.log("un usuario se ha desconectado");
    });
    socket.on(`chat${room}`, async (msg) => {
      console.log(msg);
      try {
        await Item.create({
          nombre: msg.nombre,
          comentario: msg.comentario,
        });
        console.log(
          `guardando el mensaje de: "${msg.nombre}" el cual es:"${msg.comentario}"`
        );
      } catch (e) {
        console.log("error en create");
      }
      socket.broadcast.emit(`chat${room}`, msg);
    });
    if (!socket.recovered) {
      try {
        Item.find({}).then((recuperado) => {
          recuperado.map((message) => {
            console.log(message);
            socket.emit(`chat${room}`, message);
          });
        });
      } catch (e) {
        console.log(e);
      }
    }
  });
};

module.exports = socket;
