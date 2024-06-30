import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";

function Login() {
  const { register, reset, handleSubmit, watch } = useForm();

  const informacionFormulario = watch();

  const room = watch("room");

  const Datos = () => {
    axios
      .post("http://localhost:3000/loginin", informacionFormulario)
      .then((response) => {
        console.log(response.data);
        reset();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>
        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                style={{ width: "185px" }}
                alt="logo"
              />
              <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
            </div>

            <p>Please login to your account</p>

            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              type="email"
              {...register("nombre", { required: true })}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              type="password"
              {...register("contraseña", { required: true })}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              placeholder="room?"
              type="email"
              {...register("room", { required: true })}
            />

            <div className="text-center pt-1 mb-5 pb-1">
              <button type="submit" onClick={handleSubmit(Datos)}>
                boton
              </button>
              <a className="text-muted" href="#!">
                Forgot password?
              </a>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account?</p>
              <MDBBtn outline className="mx-2" color="danger">
                Danger
              </MDBBtn>
            </div>
          </div>
        </MDBCol>

        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">We are more than just a company</h4>
              <p className="small mb-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
      <Toaster />
    </MDBContainer>
  );
}

export default Login;
