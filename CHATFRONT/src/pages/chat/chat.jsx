import styles from "./chat.module.css";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import io from "socket.io-client";

import { useAuth } from "../../context/AuthContext";

function Chat() {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const room = localStorage.getItem("room");
  const [messages, setMessages] = useState([""]);

  //REFS
  const messagesEndRef = useRef(null);

  // SOCKETS Y FUNCIONES
  const socket = io.connect("http://localhost:5000", {
    query: `room=${room}`,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // useEffect(() => {
  //   console.log(user);

  //   setMessages([]);
  //   const receiveMessage = (message) =>
  //     setMessages((state) => [...state, message]);

  //   console.log("emitinedo");
  //   socket.on(`chat${room}`, receiveMessage);

  //   return () => {
  //     socket.off(`chat${room}`, receiveMessage);
  //   };
  // }, []);

  useEffect(scrollToBottom, [messages]);

  const enviaralback = (mensaje) => {
    const textoEnviado = {
      nombre: user.nombre,
      comentario: mensaje.comentario,
    };
    console.log(textoEnviado);

    socket.emit(`chat${room}`, textoEnviado);

    reset();
  };

  return (
    <div className={styles.body}>
      <div translate="no" className={styles.container}>
        <div className={styles.chat}>
          <form
            onSubmit={handleSubmit(enviaralback)}
            className={styles.cuadrochat}
          >
            <h1 className={styles.titulochat}>{`SALA: ${room} `}</h1>

            <ul className={styles.mensajes}>
              <li>
                "Recuerda que en esta web, esta prohibida la discriminación o su
                uso para incitar al odio o violencia, cualquier usuario que
                genere conflictos sera baneado permanentemente",
              </li>
              {messages.map((message, i) => (
                <li key={i}>
                  <span>nombre de usuario</span>
                  <br />
                  <span className={styles.textoenviados}>{message}</span>
                </li>
              ))}
              <div ref={messagesEndRef} />
            </ul>

            <input
              name="foo"
              autoComplete="off"
              type="text"
              placeholder="Escribe un mensaje xD"
              id="input"
              {...register("comentario", { required: true })}
              className={styles.escribir}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
