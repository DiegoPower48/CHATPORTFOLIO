import { createContext, useContext, useEffect, useState } from "react";
import axios from "./Authaxios";
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

  const signup = async (ruta, data) => {
    try {
      const res = await axios.post(
        `chatportfolios-production.up.railway.app/${ruta}`,
        data
      );
      setUser(res.data);
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
    setUser(null);
    setIsAuthenticated(false);
  };

  const selectRoom = (roomName) => {
    setRoom(roomName);
  };

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      signup("verify", cookies.token);
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
        selectRoom,
        room,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
