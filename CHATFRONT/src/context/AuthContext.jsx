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
  const [room, setRoom] = useState(localStorage.getItem("room"));

  const signup = async (data) => {
    try {
      await axios.post(`loginin`, data);
      console.log("front: token correcto");
      setUser(data.nombre);
      console.log(data.nombre);
      setLoading(false);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      setErrors([error.message]);
      setUser(null);
      setLoading(false);
      console.log(error);
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
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const res = await axios.post(`verify`, cookie.token);
        console.log("front: verificando el token");
        setUser(res.data);
        setLoading(false);
        setIsAuthenticated(true);
      } catch (error) {
        console.log("front: se verificó token incorrecto");
        setIsAuthenticated(false);
        setErrors([error.message]);
        setUser(null);
        setLoading(false);
        console.log(error);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAutenticated,
        signup,
        user,
        errors,
        loading,
        logout,
        room,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
