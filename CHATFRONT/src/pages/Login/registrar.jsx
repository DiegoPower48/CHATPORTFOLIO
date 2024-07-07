import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Carousel from "react-bootstrap/Carousel";
import styles from "./Login.module.css";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";

function Registrar() {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { isAutenticated, errors: RegisterErrors, Registrar } = useAuth();

  const informacionFormulario = watch();
  const nombreNuevo = watch("nombre");

  const navigate = useNavigate();

  const Datos = async () => {
    try {
      await Registrar(informacionFormulario, nombreNuevo);
    } catch (error) {
      console.log("hola registro");
    }
  };

  useEffect(() => {
    if (isAutenticated) {
      navigate("/chat");
    }
  }, [isAutenticated]);

  return (
    <>
      <form className={styles.form}>
        <MDBContainer className={`${styles.gradientform}`}>
          <MDBRow className="styles.cuadro">
            <MDBCol col="6" className="mb-5">
              <div className="d-flex flex-column ms-5">
                <div className="text-center">
                  <br />
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
                  <h1 className="mt-1 mb-5 pb-1">
                    BIENVENIDO A MI CHAT 🎉🎉🎉
                  </h1>
                  <br />
                  <br />
                </div>

                <p>PORFAVOR INGRESA TUS DATOS:</p>
                <br />

                {RegisterErrors.map((error, i) => (
                  <div key={i}>{error}</div>
                ))}
                <label>Nombre de usuario</label>
                {errors.nombre && <p>Nombre es requerido</p>}
                <MDBInput
                  wrapperClass="mb-4"
                  data-bs-theme="dark"
                  type="text "
                  placeholder="ingresa un nombre"
                  {...register("nombre", { required: true })}
                />
                <label>Contraseña</label>
                <MDBInput
                  type="password"
                  hidden=""
                  placeholder="ingresa una contraseña"
                  wrapperClass="mb-4"
                  data-bs-theme="dark"
                  {...register("contraseña", { required: true })}
                />

                <label>Ingresa un correo electronico</label>

                <MDBInput
                  type="email"
                  placeholder="ingresa un correo"
                  {...register("correo", { required: true })}
                  wrapperClass="mb-4"
                  data-bs-theme="dark"
                />
                <br />
                <button
                  className={`btn btn-primary btn-block fa-lg ${styles.gradientcustom2} mb-3`}
                  type="submit"
                  onClick={handleSubmit(Datos)}
                >
                  REGISTRAR
                </button>

                <br />
              </div>
            </MDBCol>

            <MDBCol col="6" className="mb-5">
              <div
                className={`d-flex flex-column  justify-content-center ${styles.gradientcustom2} h-100 mb-4`}
              >
                <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                  <p className="small mb-0">
                    AQUI PONDRE UN TEXTO RANDOM O ALGO QUE LLAME LA ATENCION,
                    ALGO ASI COMO QUE EL MICHO ESTA MUY FEO Y QUE NO MERECIA AL
                    PLOMO, BUENO POR ALGO EL PLOMO LE SACO LA VUELTA, EL ERA UN
                    BUEN GATO Y SE LLEVABA BIEN CON ONCE, MERECIA UNA LARGA VIDA
                    Y NO ESE MICHO COBARDE QUE ENCIMA GOLPEA A GATITOS BEBE
                    INDEFENSOS
                  </p>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </form>

      {/* <form>
        <fieldset>
          <label>Ingresa Nombre</label>
          <input
            type="text "
            placeholder="ingresa un nombre"
            {...register("nombre", { required: true })}
          ></input>
        </fieldset>
        <fieldset>
          <label>Ingresa una contraseña</label>
          <input
            type="password"
            hidden=""
            autoComplete="current-password"
            placeholder="ingresa una contraseña"
            {...register("contraseña", { required: true })}
          />
        </fieldset>
        <fieldset>
          <label>Ingresa un correo electronico</label>
          <input
            type="email"
            placeholder="ingresa un correo"
            {...register("correo", { required: true })}
          ></input>
        </fieldset>
        <button type="submit" onClick={handleSubmit(Datos)}>
          boton
        </button>
      </form> */}
    </>
  );
}

export default Registrar;
