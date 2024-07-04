import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import io from "socket.io-client";

import { useAuth } from "../context/AuthContext";

function Chat() {
  const { register, handleSubmit, reset } = useForm();

  const [message, setMessage] = useState("");
  const room = localStorage.getItem("room");
  const [messages, setMessages] = useState([`hola desde ${room}`]);
  const { user } = useAuth();

  const messagesEndRef = useRef(null);

  const socket = io.connect("http://localhost:5000", {
    query: `room=${room}`,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const enviaralback = (mensaje) => {
    socket.emit(`chat${room}`, mensaje.comentario);

    reset();
  };

  useEffect(() => {
    console.log(user.nombre);
    setMessages([
      "Recuerda que en esta web, esta prohibida la discriminación o su uso para incitar al odio o violencia, cualquier usuario que genere conflictos sera baneado permanentemente",
    ]);
    const receiveMessage = (message) =>
      setMessages((state) => [...state, message]);

    console.log("emitinedo");
    socket.on(`chat${room}`, receiveMessage);

    return () => {
      socket.off(`chat${room}`, receiveMessage);
    };
  }, [setMessages]);

  useEffect(scrollToBottom, [messages]);

  return (
    <div translate="no" className="container">
      <div className="chat">
        <form onSubmit={handleSubmit(enviaralback)} className="cuadro-chat ">
          <h1 className="titulo-chat ">{`SALA: ${room} `}</h1>

          <ul className="mensajes">
            {messages.map((message, i) => (
              <li key={i}>
                <span className="texto-enviados">{message}</span>
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
            className="escribir "
          />
        </form>
      </div>
    </div>
  );
}

export default Chat;
