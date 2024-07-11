import styles from "./chat.module.css";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import io from "socket.io-client";
import { useAuth } from "../../context/AuthContext";

const URL = import.meta.env.URL_CHAT;

function Chat() {
  const { register, handleSubmit, reset } = useForm();
  const room = localStorage.getItem("room");
  const nombreLocal = localStorage.getItem("nombre");
  const [messages, setMessages] = useState([""]);

  //MANEJO DE HORA Y FECHA►
  const fecha = new Date();

  const fechaEnviar =
    fecha.getDate().toString().padStart(2, "0") +
    "/" +
    (fecha.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    fecha.getFullYear();

  const horaEnviar =
    fecha.getHours().toString().padStart(2, "0") +
    ":" +
    fecha.getMinutes().toString().padStart(2, "0");
  //MANEJO DE HORA Y FECHA◄

  //REFS
  const messagesEndRef = useRef(null);

  // SOCKETS Y FUNCIONES
  const socket = io.connect("http://localhost:5000", {
    query: `room=${room}`,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setMessages([]);
    const receiveMessage = (message) =>
      setMessages((state) => [...state, message]);

    console.log("emitinedo");
    socket.on(`chat${room}`, receiveMessage);

    return () => {
      socket.off(`chat${room}`, receiveMessage);
    };
  }, []);

  useEffect(scrollToBottom, [messages]);

  const enviaralback = (mensaje) => {
    const textoEnviado = {
      nombre: nombreLocal,
      comentario: mensaje.comentario,
      hora: horaEnviar,
      fecha: fechaEnviar,
    };
    console.log(textoEnviado);
    console.log(fechaEnviar);
    console.log(horaEnviar);

    socket.emit(`chat${room}`, textoEnviado);

    reset();
  };

  return (
    <div>
      <Header />
      <div className={styles.body}>
        <div translate="no" className={styles.container}>
          <div className={styles.chat}>
            <form
              onSubmit={handleSubmit(enviaralback)}
              className={styles.cuadrochat}
            >
              <h1 className={styles.titulochat}>{`SALA: ${room} `}</h1>

              <ul className={styles.mensajes}>
                <li className={styles.reglas}>
                  "Recuerda que en esta web, esta prohibida la discriminación o
                  su uso para incitar al odio o violencia, cualquier usuario que
                  genere conflictos sera baneado permanentemente",
                </li>
                {messages.map((message, i) => (
                  <li
                    key={i}
                    className={
                      nombreLocal === message.nombre
                        ? styles.textoenviadospropios
                        : styles.textoenviadoajeno
                    }
                  >
                    <span>
                      {nombreLocal === message.nombre ? "😀" : "🐷"}
                      <strong>{message.nombre}: </strong>
                    </span>{" "}
                    <span
                      className={
                        nombreLocal === message.nombre
                          ? styles.fechaPropia
                          : styles.fechaAjena
                      }
                    >
                      {message.fecha}
                    </span>
                    <br />
                    <span>{message.comentario}</span>{" "}
                    <span
                      className={
                        nombreLocal === message.nombre
                          ? styles.fechaPropia
                          : styles.fechaAjena
                      }
                    >
                      {message.hora}
                    </span>
                  </li>
                ))}
                <div ref={messagesEndRef} />
              </ul>

              <input
                name="foo"
                autoComplete="off"
                type="text"
                placeholder="Escribe un mensaje porfavor :)"
                id="input"
                {...register("comentario", { required: true })}
                className={styles.escribir}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const { logout } = useAuth();

  const usernombre = localStorage.getItem("nombre");
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className={styles.barra}>
        <div className={styles.cuadros}>
          <div onClick={handleLogout} className={styles.logout}>
            Logout
          </div>
          <div className={styles.usuario}>{"Usuario: " + usernombre}</div>
        </div>
      </header>
    </>
  );
}

export default Chat;
