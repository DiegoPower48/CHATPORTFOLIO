import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

function Chat() {
  const { register, handleSubmit, reset } = useForm();

  /* CONFIGURAR TODO ESTO*/
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  const room = 3;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const enviaralback = (data) => {
    // const newMessage = {
    //   body: message,
    // };
    setMessages((prevMessages) => [...prevMessages, data.comentario]);
    socket.emit(`chat${room}`, data.comentario);

    reset();
  };

  useEffect(() => {
    const recieveMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on(`chat${room}`, recieveMessage);

    return () => {
      socket.off(`chat${room}`, recieveMessage);
    };
  }, []);

  useEffect(scrollToBottom, [messages]);

  /* HASTA AQUI*/

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
            autoComplete="foo"
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
