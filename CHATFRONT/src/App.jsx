import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const socket = io("https://chatportfolio.onrender.com", {
  transports: ["websocket", "polling"], // Asegúrate de que los transportes están configurados correctamente
  withCredentials: true,
});

function App() {
  const { register, watch, handleSubmit, reset } = useForm();

  /* CONFIGURAR TODO ESTO*/
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const enviaralback = (data) => {
    // const newMessage = {
    //   body: message,
    // };
    setMessages([...messages, data.comentario]);
    socket.emit("message", data.comentario);
    reset();
  };

  socket.on("message", (msg) => {
    setMessage(msg);
  });

  useEffect(() => {
    socket.on("message", recieveMessage);

    return () => {
      socket.off("message", recieveMessage);
    };
  }, []);

  const recieveMessage = (message) =>
    setMessages((state) => [...state, message]);

  /* HASTA AQUI*/

  return (
    <div className="chat items-center justify-center">
      <form onSubmit={handleSubmit(enviaralback)} className="cuadro-chat ">
        <h1 translate="no" className="titulo-chat ">
          PROYECTO CHAT
        </h1>

        <ul className="mensajes">
          {messages.map((message, i) => (
            <li key={i}>
              <span className="texto-enviados">{message}</span>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="escribe un mensaje"
          id="input"
          autoComplete="off"
          {...register("comentario", { required: true })}
          className="escribir "
        />
      </form>
    </div>
  );
}
export default App;
