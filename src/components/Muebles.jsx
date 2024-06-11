import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import "./Muebles.css";

import Modal from "react-modal";

const Muebles = ({ darkmode }) => {
  const [armarios, setArmarios] = useState([]);
  const [isLoadingHabitacion, setIsLoadingHabitacion] = useState(false);
  const [habitacion, setHabitacion] = useState([]);
  const [isLoadingCasas, setIsLoadingCasas] = useState(false);
  const [casas, setCasas] = useState([]);
  const { token, userId } = useContext(AuthContext);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [nombreArmario, setNombreArmario] = useState("");
  const [nivelDosSeleccionado, setNivelDosSeleccionado] = useState("");

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  const verElFormulario = (nombre) => {
    setNombreArmario(nombre);
    setModalEliminar(true);
  };

  const groupTipo = {
    Escritorio: ["Archivador"],
    Estanteria: ["Estante"],
  };

  useEffect(() => {
    getArmarios();
    obtenerHabitaciones();
    obtenerCasas();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const extraerDatosDeUsuario = () => {
    const datosRecuperar = JSON.parse(localStorage.getItem("datosUsuario"));
    if (datosRecuperar && datosRecuperar.token) {
      return [datosRecuperar.token, datosRecuperar.userId];
    }
  };

  const getArmarios = async () => {
    const [token, userId] = extraerDatosDeUsuario();
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/armarios/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userId: userId,
            armarioId: armarios._id,
          },
        }
      );
      setArmarios(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerCasas = async () => {
    const [token, userId] = extraerDatosDeUsuario();
    setIsLoadingCasas(true);
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + `/api/casas`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userId: userId,
          },
        }
      );
      setCasas(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingCasas(false);
    }
  };

  const eliminarArmario = (nombre) => {
    const [token, userId] = extraerDatosDeUsuario();
    axios
      .delete(
        process.env.REACT_APP_API_URL + `/api/armarios/borrar/${nombre}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            userId: userId,
          },
        }
      )
      .then((res) => {
        setArmarios(armarios.filter((h) => h.nombre !== nombre));
        setModalEliminar(false);
      })
      .catch((error) => console.error(error));
  };

  const editarArmario = (nombre) => {
    axios
      .patch(
        process.env.REACT_APP_API_URL + `/api/armarios/editar/${nombre}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            userId: userId,
          },
        }
      )
      .then((res) => {
        window.location.reload();
        console.log(nombre);
        console.log(res.data);
      })
      .catch((error) => console.error(error));
  };

  const addArmarios = async (data) => {
    const [token, userId] = extraerDatosDeUsuario();
    console.log("Datos que se pasarán en la solicitud POST:", data);
    try {
      await axios.post(
        process.env.REACT_APP_API_URL + "/api/armarios/nuevo",
        {
          tipo: data.tipo,
          nombre: data.nombre,
          casa: data.casa,
          habitacion: data.habitacion,
          usuario: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Todo Correcto");
      console.log("Datos que se pasarán en la solicitud POST:", data);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerHabitaciones = async () => {
    const [token] = extraerDatosDeUsuario();
    setIsLoadingHabitacion(true);
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/habitaciones",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHabitacion(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingHabitacion(false);
    }
  };

  const armariosGroupedByHabitacion = armarios.reduce((groups, armario) => {
    const nombreHabitacion = armario.nombreHabitacion;
    if (groups[nombreHabitacion]) {
      groups[nombreHabitacion].push(armario);
    } else {
      groups[nombreHabitacion] = [armario];
    }
    return groups;
  }, {});

  const opciones = groupTipo[nivelDosSeleccionado] || [];

  const armariosLength = armarios.length;

  console.log(nivelDosSeleccionado);

  return (
    <div className="contenedorPrincipal">
      <div className="tituloArmarios">
        <h1 className="h1muebles">MIS</h1>
        <button
          className="agregarMueble"
          onClick={() => setModalAbierto(true)}></button>
      </div>

      <div className="listaArmarios">
        {Object.entries(armariosGroupedByHabitacion).map(
          ([nombreHabitacion, armarios]) => (
            <div className="armariosHabitacion" key={nombreHabitacion}>
              <h1 className="nombrehabitacion">{nombreHabitacion}</h1>
              {armarios.map((armario) => (
                <div
                  className={
                    darkmode ? "armarioConcreto-Dark" : "armarioConcreto"
                  }
                  key={armario._id}>
                  <h4>{armario.nombre}</h4>
                  <button
                    className="eliminarArmario"
                    onClick={() => verElFormulario(armario.nombre)}></button>
                </div>
              ))}
              <Modal
                className="modal"
                isOpen={modalEliminar}
                isClose={cerrarModal}>
                <h1>¿Estás seguro de que quieres eliminarlo?</h1>
                <button onClick={() => eliminarArmario(nombreArmario)}>
                  Sí
                </button>
                <button onClick={() => setModalEliminar(false)}>No</button>
              </Modal>
            </div>
          )
        )}
      </div>
      {armariosLength === 0 && <h1>No tiene armarios </h1>}

      <br />
      <br />
      <Modal className="modal" isOpen={modalAbierto}>
        <form action="" onSubmit={handleSubmit(addArmarios)}>
          {errors.nombre && <span>Este campo es obligatorio</span>}
          <select {...register("casa", { required: true })}>
            {isLoadingCasas ? (
              <option>Cargando...</option>
            ) : (
              casas.map((casa) => (
                <option key={casa.id} value={casa.id}>
                  {casa.nombre}
                </option>
              ))
            )}
          </select>
          <select
            {...register("habitacion", { required: true })}
            onChange={({ target }) => {
              setNivelDosSeleccionado(target.value);
            }}>
            <option value="">Seleccione</option>
            {habitacion.map((habitacion) => (
              <option key={habitacion.id} value={habitacion.tipo}>
                {habitacion.nombre}
              </option>
            ))}
          </select>

          <select
            type="text"
            placeholder="Tipo"
            {...register("tipo", { minLength: 3, required: true })}>
            {opciones.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Nombre"
            {...register("nombre", { minLength: 3, required: true })}
          />

          <button type="submit">Añadir armario</button>
        </form>
        <button onClick={() => setModalAbierto(false)}>Cerrar</button>
      </Modal>
    </div>
  );
};

export default Muebles;
