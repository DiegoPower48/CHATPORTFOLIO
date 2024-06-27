import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const socket = io("https://chatportfolio.onrender.com", {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

function App() {
  const { register, handleSubmit, reset } = useForm();

  /* CONFIGURAR TODO ESTO*/
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const enviaralback = (data) => {
    // const newMessage = {
    //   body: message,
    // };
    setMessages((prevMessages) => [...prevMessages, data.comentario]);
    socket.emit("message", data.comentario);

    reset();
  };

  useEffect(() => {
    const recieveMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("message", recieveMessage);

    return () => {
      socket.off("message", recieveMessage);
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
      <Toaster />
    </div>
  );
}
export default App;
