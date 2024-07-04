import Chat from "./pages/chat/chat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Registrar from "./pages/Login/registrar";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoutes from "./context/protected";
import Userheader from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Userheader />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Registrar />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
