import React from "react";
import Carousel from "react-bootstrap/Carousel";

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

  return (
    <div>
      <Header clickear1={clickear1} clickear2={clickear2} click1={click1} />
      <div className={styles.container}>
        {click1 ? (
          <form className={styles.form}>
            <div className="text-center">
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
        ) : (
          <div>
            <form className={styles.form}>
              <div className="text-center">
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
            </form>{" "}
          </div>
        )}{" "}
        <UncontrolledExample />
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

function UncontrolledExample() {
  const items = [
    {
      titulo: "MAURO2",
      descripcion: "Pez betta muy amigable y muy hermoso, consume poca comida",
      fondo: "https://i.ibb.co/gZ9LYB6/mauro2.jpg",
    },
    {
      titulo: "ONCE",
      descripcion:
        "Gata muy gorda, juguetona y muy protectora, le gusta dormir en camas y sofas",
      fondo: "https://i.ibb.co/G0dnYFt/once.jpg",
    },
    {
      titulo: "MICHU",
      descripcion: "Un gato 'hermoso' amarillo, bastante travieso",
      fondo: "https://i.ibb.co/7WWZhyx/Michu.jpg",
    },
  ];

  return (
    <Carousel className={styles.carrusel}>
      {items.map((item, i) => (
        <Carousel.Item
          key={i}
          interval={4000}
          style={{
            backgroundImage: `url(${item.fondo})`,
            backgroundSize: "100% 100%",
          }}
          className={styles.carruselimagen}
        >
          <Carousel.Caption className={styles.carruselcuadro}>
            <h3 className={styles.carruselTextoTitulo}>{item.titulo}</h3>
            <p className={styles.carruseltexto}>{item.descripcion}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Login;
