import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import io from "socket.io-client";

const socket = io("http://localhost:5000/", {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

const room = localStorage.getItem("room");

function Chat() {
  const { register, handleSubmit, reset, watch } = useForm();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const enviaralback = (mensaje) => {
    socket.emit(`chat${room}`, mensaje.comentario);
    setMessages([...messages, mensaje.comentario]);
    reset();
  };

  useEffect(() => {
    const receiveMessage = (message) =>
      setMessages((state) => [...state, message]);

    socket.on(`chat${room}`, receiveMessage);

    return () => {
      socket.off(`chat${room}`, receiveMessage);
    };
  }, []);

  useEffect(scrollToBottom, [messages]);

  return (
    <div translate="no" className="container">
      <div className="chat">
        <form onSubmit={handleSubmit(enviaralback)} className="cuadro-chat ">
          <h1 className="titulo-chat ">PROYECTO CHAT</h1>

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
