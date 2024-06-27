import axios from "axios";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

function Registrar() {
  const { register, reset, handleSubmit, watch } = useForm();

  const informacionFormulario = watch();

  const Datos = () => {
    toast
      .promise(
        axios.post("http://localhost:3000/registro", informacionFormulario),
        {
          loading: "⏳⏳  ENVIANDO COMENTARIO......",
          success: <b>"REGISTRO EXITOSO!!!!🚀"</b>,
          error: <b>NO SE PUDO GUARDAR</b>,
        }
      )
      .then((response) => {
        reset();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
