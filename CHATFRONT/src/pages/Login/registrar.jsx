import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Registrar() {
  const { register, reset, handleSubmit, watch } = useForm();

  const { signup, isAutenticated, errors: RegisterErrors } = useAuth();
  const informacionFormulario = watch();
  const navigate = useNavigate();

  const Datos = () => {
    toast
      .promise(signup("registro", informacionFormulario), {
        loading: "⏳⏳  REGISTRANDO DATOS......",
        success: <b>"REGISTRO EXITOSO!!!!🚀"</b>,
        error: <b>NO SE PUDO GUARDAR</b>,
      })
      .then((response) => {
        reset();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (isAutenticated) {
      navigate("/");
    }
  }, [isAutenticated]);

  return (
    <>
      <form>
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
      </form>
      <Toaster />
    </>
  );
}

export default Registrar;
