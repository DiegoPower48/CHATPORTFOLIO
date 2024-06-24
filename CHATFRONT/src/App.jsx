import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io("https://chatweb-i8se.onrender.com/", {
  transports: ["websocket", "polling"], // Asegúrate de que los transportes están configurados correctamente
  withCredentials: true,
});

function App() {
  /* CONFIGURAR TODO ESTO*/
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const newMessage = {
    //   body: message,
    // };
    setMessages([...messages, message]);
    socket.emit("message", message);
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
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
        <h1 className="text-2xl font-bold my-2 ">CHAT REACT</h1>
        <input
          type="text"
          placeholder="escribe un mensaje"
          onChange={(e) => setMessage(e.target.value)}
          className="border-2 border-zinc-500 p-2 w-full text-black"
        />{" "}
        <ul>
          {messages.map((message, i) => (
            <li
              key={i}
              className={`my-2 p-2 table rounded-md 
                bg-black ml-auto
              }`}
            >
              <span className="text-md">{message}</span>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}
export default App;
