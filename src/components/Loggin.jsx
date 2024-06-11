import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Registro from "./Registro";
// import ModificarPass from "./ModificarPass";
import "./Login.css";

const LogIn = ({ setRender, letra }) => {
  const [passwordError, setPasswordError] = useState("");
  const { gestionarLogIn } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(true);
  const [verCambiar, setVerCambiar] = useState(true);

  const cambiarpass = () => {
    setVerCambiar(false);
  };
  console.log(verCambiar);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const gestorFormulario = async (data) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/api/usuarios/login",
        {
          email: data.email,
          password: data.password,
        }
      );
      // console.log("Todo correcto", response.data);
      localStorage.setItem("datosUsuario", JSON.stringify(response.data));
      gestionarLogIn(
        response.data.token,
        response.data.userId,
        response.data.nombre
      );
      setRender("casa");
    } catch (error) {
      // console.log("algo falló");
      if (error.response.status === 500) {
        setPasswordError(
          //* CAMBIAR A MODIFICAR PASS MEDIANTE MODAL *//
          <>
            Usuario o contraseña incorrecta. Ha olvidado su contraseña? Pulse{" "}
            <span className="reset-link">
              <a href="" onClick={cambiarpass}>
                aqui
              </a>
            </span>{" "}
            para reestablecerla.
          </>
        );
      } else {
        console.log("error en la solictud");
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="principal">
      <div className="formulariosLoginSingUp">
        {showLogin ? (
          <div className="login">
            <h2 style={{ fontSize: letra + "px" }}>Log in </h2>
            <br />
            <form
              style={{ fontSize: letra + "px" }}
              className="formulario"
              action=""
              onSubmit={handleSubmit(gestorFormulario)}>
              <input
                style={{ fontSize: letra + "px" }}
                type="text"
                name="email"
                placeholder="Email"
                className="password"
                {...register("email", {
                  pattern:
                    /^(?![_.-])((?![_.-][_.-])[a-zA-Z\d_.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}$/,
                  required: true,
                })}
              />
              {errors.email && errors.email.type === "required" && (
                <p>Campo email requerido</p>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <p>Formato de email incorrecto</p>
              )}
              <input
                style={{ fontSize: letra + "px" }}
                type="password"
                name="password"
                placeholder="Password"
                className="password"
                {...register("password", {
                  minLength: 5,
                  required: true,
                })}
              />
              {errors.password && errors.password.type === "required" && (
                <p>Campo requerido</p>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <p>Debe tener al menos 5 caracteres </p>
              )}
              {passwordError && <p className="error">{passwordError}</p>}
              <br />
              <div className="botonesLogIn">
                <button
                  className="EnviarLogin"
                  type="submit"
                  style={{ fontSize: letra + "px" }}>
                  Enviar
                </button>
                <br />
                <br />
                <button style={{ fontSize: letra + "px" }} onClick={toggleForm}>
                  Sign up
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="formulario">
            <Registro setRender={setRender} />

            <button onClick={toggleForm}>Log in</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogIn;
