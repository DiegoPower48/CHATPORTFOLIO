import React from "react";
import styles from "./Login.module.css";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";

import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const { register, reset, handleSubmit, watch } = useForm();
  const { signup, isAutenticated, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();

  const roomselected = watch("room");
  const nombre = watch("nombre");

  const Datos = async (data) => {
    localStorage.setItem("room", roomselected);
    localStorage.setItem("name", nombre);
    signup(data)
      .then(() => {
        console.log("sala: ", roomselected);

        reset();
        console.log("response");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (isAutenticated) {
      navigate("/chat");
    }
  }, [isAutenticated, navigate]);

  return (
    <form className={styles.form}>
      <MDBContainer className={`${styles.gradientform}`}>
        <MDBRow>
          <MDBCol col="6" className="mb-5">
            <div className="d-flex flex-column ms-5">
              <div className="text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                  style={{ width: "185px" }}
                  alt="logo"
                />
                <h1 className="mt-1 mb-5 pb-1">BIENVENIDO A MI CHAT 🎉🎉🎉</h1>
              </div>

              <p>PORFAVOR INGRESA TUS DATOS</p>
              <br />

              <br />

              <MDBInput
                wrapperClass="mb-4"
                label="Nombre de usuario"
                autoComplete="usernane"
                data-bs-theme="dark"
                {...register("nombre", { required: true })}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Contraseña"
                type="password"
                autoComplete="current-password"
                data-bs-theme="dark"
                {...register("contraseña", { required: true })}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Ingresa la sala a la que deseas conectarte"
                placeholder="room?"
                data-bs-theme="dark"
                {...register("room", { required: true })}
              />
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

          <MDBCol col="6" className="mb-5">
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

export default Login;
