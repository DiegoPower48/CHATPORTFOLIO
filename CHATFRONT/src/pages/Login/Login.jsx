import React from "react";

import styles from "./Login.module.css";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login() {
  const { register, handleSubmit, watch } = useForm();
  const { isAutenticated, Login, Registrar } = useAuth();

  const [click1, setClick1] = useState(true);

  const navigate = useNavigate();

  const clickear2 = () => {
    setClick1(false);
  };
  const clickear1 = () => {
    setClick1(true);
  };
  const informacionFormulario = watch();

  const roomselected = watch("room");
  const datos = watch();

  const Loginin = async () => {
    await Login(datos, roomselected);
  };

  const Registrarse = async () => {
    try {
      await Registrar(informacionFormulario);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAutenticated) {
      navigate("/chat");
    }
  }, [isAutenticated, navigate]);

  return click1 ? (
    <div>
      <Header clickear1={clickear1} clickear2={clickear2} click1={click1} />
      <div className={styles.container}>
        <form className={styles.form}>
          <div className="text-center">
            <br />
            <img
              src="https://th.bing.com/th/id/R.f81a6f373c244b1f70f4b7402b5ab372?rik=rbXh4ieLuKt%2bmA&riu=http%3a%2f%2flogos-download.com%2fwp-content%2fuploads%2f2016%2f09%2fReact_logo_logotype_emblem.png&ehk=QhGOkKcUKCU7FBQgHOajOiJqJBACUTD2Ni6LsfqzCEA%3d&risl=&pid=ImgRaw&r=0"
              style={{
                height: "80px",
                margin: "20px",
                paddingLeft: "140px",
              }}
              alt="logo"
            />
            <h1 className="mt-1 mb-5 pb-1">BIENVENIDO A MI CHAT 🎉🎉🎉</h1>
          </div>
          <p>PORFAVOR INGRESA TUS DATOS:</p>
          <br />
          <label>Nombre de usuario:</label>
          <br />
          <input
            type="text"
            autoComplete="username"
            data-bs-theme="dark"
            placeholder="Usuario"
            className={styles.datos}
            {...register("nombre", { required: true })}
          />
          <br />
          <label>Contraseña:</label>
          <br />
          <input
            type="password"
            autoComplete="current-password"
            data-bs-theme="dark"
            placeholder="Contraseña"
            className={styles.datos}
            {...register("contraseña", { required: true })}
          />
          <br />
          <label>Ingresa la sala a la que deseas conectarte: </label>
          <br />
          <select
            data-bs-theme="dark"
            {...register("room", { required: true })}
            className={styles.datos}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>

          <br />
          <br />
          <button
            className={`${styles.gradientcustom2} ${styles.boton}`}
            type="submit"
            onClick={handleSubmit(Loginin)}
          >
            INGRESAR
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div>
      <Header clickear1={clickear1} clickear2={clickear2} click1={click1} />
      <div className={styles.container}>
        <form className={styles.form}>
          <div className="text-center">
            <br />
            <img
              src="https://th.bing.com/th/id/R.f81a6f373c244b1f70f4b7402b5ab372?rik=rbXh4ieLuKt%2bmA&riu=http%3a%2f%2flogos-download.com%2fwp-content%2fuploads%2f2016%2f09%2fReact_logo_logotype_emblem.png&ehk=QhGOkKcUKCU7FBQgHOajOiJqJBACUTD2Ni6LsfqzCEA%3d&risl=&pid=ImgRaw&r=0"
              style={{
                height: "80px",
                margin: "20px",
                paddingLeft: "140px",
              }}
              alt="logo"
            />
            <h1 className="mt-1 mb-5 pb-1">REGISTRO 🎉🎉🎉</h1>
          </div>
          <p>PORFAVOR INGRESA TUS DATOS:</p>
          <br />
          <label>Nuevo nombre de usuario:</label>
          <br />
          <input
            type="text"
            autoComplete="username"
            data-bs-theme="dark"
            placeholder="Usuario"
            className={styles.datos}
            {...register("nombre", { required: true })}
          />
          <br />
          <label>Nueva contraseña:</label>
          <br />
          <input
            type="password"
            autoComplete="current-password"
            data-bs-theme="dark"
            placeholder="Contraseña"
            className={styles.datos}
            {...register("contraseña", { required: true })}
          />
          <br />
          <label>Ingresa un correo electronico:</label>

          <input
            type="email"
            autoComplete="email"
            data-bs-theme="dark"
            placeholder="Email"
            className={styles.datos}
            {...register("correo", { required: true })}
          />

          <br />
          <br />
          <button
            className={`${styles.gradientcustom2} ${styles.boton}`}
            type="submit"
            onClick={handleSubmit(Registrarse)}
          >
            REGISTRARSE
          </button>
        </form>
      </div>
    </div>
  );
}

function Header({ clickear1, clickear2, click1 }) {
  return (
    <>
      <header className={styles.barra}>
        <div className={styles.cuadros}>
          <button
            onClick={clickear1}
            className={` ${styles.links} ${click1 ? styles.linked : ""}`}
          >
            Login
          </button>
          <button
            onClick={clickear2}
            className={` ${styles.registro} ${!click1 ? styles.linked : ""}`}
          >
            Registro
          </button>
        </div>
      </header>
    </>
  );
}

export default Login;
