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
    <div className={styles.container}>
      <Header clickear1={clickear1} clickear2={clickear2} click1={click1} />
      <div className={styles.cuerpo}>
        {click1 ? (
          <form className={styles.form}>
            <h1 className={styles.textcenter}>WELCOME TO MY CHAT 🎉</h1>

            <p>PLEASE ENTER YOUR INFORMATION:</p>
            <br />
            <label>Username:</label>
            <br />
            <input
              type="text"
              autoComplete="username"
              data-bs-theme="dark"
              placeholder="Username"
              className={styles.datos}
              {...register("nombre", { required: true })}
            />
            <br />
            <label>Password:</label>
            <br />
            <input
              type="password"
              autoComplete="current-password"
              data-bs-theme="dark"
              placeholder="Password"
              className={styles.datos}
              {...register("contraseña", { required: true })}
            />
            <br />
            <label>Enter the room you wish to connect to: </label>
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
              className={styles.boton}
              type="submit"
              onClick={handleSubmit(Loginin)}
            >
              Login
            </button>
          </form>
        ) : (
          <form className={styles.form}>
            <div className="text-center">
              <h1 className="mt-1 mb-5 pb-1">SIGN UP ✍✍✍</h1>
            </div>
            <p>PLEASE ENTER YOUR INFORMATION:</p>
            <br />
            <label>New Username:</label>
            <br />
            <input
              type="text"
              autoComplete="username"
              data-bs-theme="dark"
              placeholder="Username"
              className={styles.datos}
              {...register("nombre", { required: true })}
            />
            <br />
            <label>New Password:</label>
            <br />
            <input
              type="password"
              autoComplete="current-password"
              data-bs-theme="dark"
              placeholder="Password"
              className={styles.datos}
              {...register("contraseña", { required: true })}
            />
            <br />
            <label>Enter your email:</label>

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
              className={styles.boton}
              type="submit"
              onClick={handleSubmit(Registrarse)}
            >
              Sign Up
            </button>
          </form>
        )}
        <h1 className={styles.titulo}>Share a photo of your pet</h1>
        <Carrusel />
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
            Sign Up
          </button>
        </div>
      </header>
    </>
  );
}

function Carrusel() {
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
        <Carousel.Item key={i} interval={4000} className={styles.carruselitem}>
          <Carousel.Caption className={styles.carruselcuadro}>
            <span
              style={{
                backgroundImage: `url(${item.fondo})`,
                backgroundSize: "100% 100%",
              }}
              className={styles.carruselimagen}
            ></span>
            <h3 className={styles.carruselTextoTitulo}>{item.titulo}</h3>
            <p className={styles.carruseltexto}>{item.descripcion}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Login;
