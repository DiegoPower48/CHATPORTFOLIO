import { createContext, useContext, useEffect, useState } from "react";
import axios from "../context/Authaxios";

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

  const sendData = async (method, data) => {
    try {
      const res = await axios.post(method, data);
      if (res.status === 200) {
        console.log(res.status);
        setUser(data.nombre);
        setLoading(false);
        setIsAuthenticated(true);
        console.log("contexto exitoso ");
      }
    } catch (error) {
      setErrors([error.response.data]);
      setUser(null);
      setLoading(false);
    }
  };
  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("name");
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
      sendData(`verify`, cookie.token);
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAutenticated,
        sendData,
        errors,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
