function Registrar() {
  return (
    <>
      <form>
        <fieldset>
          <label>Ingresa Nombre</label>
          <input type="text " placeholder="ingresa un nombre"></input>
        </fieldset>
        <fieldset>
          <label>Ingresa una contraseña</label>
          <input
            type="password"
            name=""
            id=""
            placeholder="ingresa una contraseña"
          />
        </fieldset>
        <fieldset>
          <label>Ingresa un correo electronico</label>
          <input type="email" placeholder="ingresa un correo"></input>
        </fieldset>
      </form>
    </>
  );
}

export default Registrar;
