import Chat from "./pages/chat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registrar from "./pages/registrar";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoutes from "./context/protected";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
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
