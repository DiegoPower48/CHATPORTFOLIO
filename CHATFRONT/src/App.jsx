import Chat from "./pages/chat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registrar from "./pages/registrar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Registrar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
