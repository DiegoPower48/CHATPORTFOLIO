import { createContext, useContext, useEffect, useState } from "react";
import axios from "../context/Authaxios";

import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
// import dotenv from "dotenv";
// dotenv.config();

// const URL = process.env.URL_WORD;

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado con un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAutenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const Registrar = async (data) => {
    try {
      const res = await axios.post("registro", data);
      if (res.status === 200) {
        console.log(res.status);
        setUser(data.nombre);
        setLoading(false);
        setIsAuthenticated(true);
        console.log("contexto exitoso ");
        localStorage.setItem("room", "Bienvenida");
        localStorage.setItem("nombre", data.nombre);
      }
    } catch (error) {
      setErrors([error.response.data]);
      setUser(null);
      setLoading(false);
      console.log(error.response.data);
      toast.error(error.response.data);
    }
  };

  const Login = async (data, room) => {
    try {
      const res = await axios.post("loginin", data);
      if (res.status === 200) {
        console.log(res.status);
        console.log("response");
        setUser(data.nombre);
        setLoading(false);
        setIsAuthenticated(true);
        localStorage.setItem("room", room);
        localStorage.setItem("nombre", data.nombre);
      }
    } catch (error) {
      setErrors([error.response.data]);
      setUser(null);
      setLoading(false);
      console.log(error.response.data);
      toast.error(error.response.data);
    }
  };

  const verificar = async (token) => {
    try {
      const res = await axios.post("verify", token);
      if (res.status === 200) {
        setUser(res.data.nombre);
        setLoading(false);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setErrors([error.response.data]);
      setUser(null);
      setLoading(false);
      setIsAuthenticated(false);
      console.log(error.response.data);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("nombre");
    localStorage.removeItem("room");
    console.log("front: se elimino el token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    const cookie = Cookies.get();
    async function checkLogin() {
      if (cookie.token === undefined) {
        console.log("front: No hay token");
        setUser(null);
        setLoading(false);
        setIsAuthenticated(false);
        return;
      }
      verificar(cookie.token);
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        Registrar,
        Login,
        isAutenticated,
        errors,
        loading,
        logout,
        setErrors,
      }}
    >
      {children}{" "}
      <Toaster
        containerStyle={{
          top: 53,
        }}
      />
    </AuthContext.Provider>
  );
};
