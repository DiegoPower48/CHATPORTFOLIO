import React from "react";

import Carousel from "react-bootstrap/Carousel";
import styles from "./Login.module.css";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";

import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { isAutenticated, errors: RegisterErrors, Login } = useAuth();
  const navigate = useNavigate();

  const roomselected = watch("room");
  const nombre = watch("nombre");
  const datos = watch();

  const Datos = async () => {
    await Login(datos, roomselected, nombre);
  };

  useEffect(() => {
    if (isAutenticated) {
      navigate("/chat");
    }
  }, [isAutenticated, navigate]);

  return (
    <form className={styles.form}>
      <MDBContainer className={`${styles.gradientform}`}>
        <MDBRow className="styles.cuadro">
          <MDBCol className="">
            <div className="d-flex flex-column ms-5">
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
                <h1 className="mt-1 mb-5 pb-1">DAYSI TE AMO ❤❤❤</h1>
              </div>

              <p>PORFAVOR INGRESA TUS DATOS:</p>

              {RegisterErrors.map((error, i) => (
                <div key={i}>{error}</div>
              ))}
              <label>Nombre de usuario</label>
              <MDBInput
                wrapperClass="mb-4"
                autoComplete="usernane"
                data-bs-theme="dark"
                {...register("nombre", { required: true })}
              />
              <label>Contraseña</label>
              <MDBInput
                wrapperClass="mb-4"
                type="password"
                autoComplete="current-password"
                data-bs-theme="dark"
                {...register("contraseña", { required: true })}
              />
              <label>Ingresa la sala a la que deseas conectarte:</label>

              <select
                data-bs-theme="dark"
                {...register("room", { required: true })}
                className={styles.menuroom}
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

              <button
                className={`btn btn-primary btn-block fa-lg ${styles.gradientcustom2} mb-3`}
                type="submit"
                onClick={handleSubmit(Datos)}
              >
                Log in
              </button>

              <div className="text-center pt-1 mb-5 pb-1">
                <a className="text-muted" href="#!" data-bs-theme="dark">
                  Olvidaste tu clave 😊
                </a>
              </div>
            </div>
          </MDBCol>

          <MDBCol className="">
            <div
              className={`d-flex flex-column  justify-content-center ${styles.gradientcustom2} h-100 mb-4`}
            >
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <p className="small mb-0">
                  AQUI PONDRE UN TEXTO RANDOM O ALGO QUE LLAME LA ATENCION, ALGO
                  ASI COMO QUE EL MICHO ESTA MUY FEO Y QUE NO MERECIA AL PLOMO,
                  BUENO POR ALGO EL PLOMO LE SACO LA VUELTA, EL ERA UN BUEN GATO
                  Y SE LLEVABA BIEN CON ONCE, MERECIA UNA LARGA VIDA Y NO ESE
                  MICHO COBARDE QUE ENCIMA GOLPEA A GATITOS BEBE INDEFENSOS
                </p>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
        <Toaster />
      </MDBContainer>
    </form>
  );
}

function Carrusel() {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Login;
