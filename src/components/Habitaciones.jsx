import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import "./Habitaciones.css";

const Habitaciones = ({
  darkmode,
  nombreNiveldos,
  setNombreNiveldos,
  nombreChoza,
}) => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [armarios, setArmarios] = useState([]);
  const [casas, setCasas] = useState([]);
  const [isloadingarmarios, setIsLoadingArmarios] = useState(true);
  const [isloadingHabitaciones, setIsLoadingHabitaciones] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [habitacionAEliminar, setHabitacionAEliminar] = useState("");
  const [modalAbiertoHabitacion, setModalAbiertoHabitacion] = useState(false);
  const [modalAbiertoArmarios, setModalAbiertoArmarios] = useState(false);
  const [selectedHabitacionId, setSelectedHabitacionId] = useState("");
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
  const [isLoadingCasas, setIsLoadingCasas] = useState(false);
  const [notificacionVisible, setNotificacionVisible] = useState(false); // Estado de visibilidad de la notificación
  const [value, setValue] = useState(""); // Estado del valor del select
  const [isOpen, setIsOpen] = useState(false); // Estado de visibilidad del modal
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(nombreChoza);
  const habitacionesLength = habitaciones.length;

  const cerrarModalHabitacion = () => {
    setIsOpen(false);
  };
  //*----------------------Obtener casas----------------------*//
  const obtenerCasas = async () => {
    const [token, userId] = extraerDatosDeUsuario();
    setIsLoadingCasas(true);
    await axios
      .get(process.env.REACT_APP_API_URL + `/api/casas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCasas(response.data);
        setIsLoadingCasas(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        setIsLoadingCasas(false);
      });
  };
  //*----------------------UseEffect----------------------*//
  useEffect(() => {
    obtenerHabitaciones();
    if (habitacionesLength > 0) {
      setValue("tipo", habitaciones[0].tipo, { shouldDirty: true });
    }
  }, [habitacionesLength, setValue]);

  useEffect(() => {
    obtenerCasas();
  }, []);

  //*----------------------Extraer datos de usuario----------------------*//
  const extraerDatosDeUsuario = () => {
    const datosRecuperar = JSON.parse(localStorage.getItem("datosUsuario"));
    if (datosRecuperar && datosRecuperar.token) {
      return [datosRecuperar.token, datosRecuperar.userId];
    }
  };
  //*----------------------Gestor Formulario----------------------*//
  const gestorFormulario = async (data) => {
    const [token, userId] = extraerDatosDeUsuario();
    setIsLoadingHabitaciones(true);
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/api/habitaciones/nueva",
        {
          tipo: habitacionesLength === 0 ? data.tipo : habitaciones[0].tipo,
          casa: data.nombre,
          nombre: data.habitacion,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            nombre: data.nombre,
          },
        }
      );

      setIsLoadingHabitaciones(false);

      if (response.status === 200) {
        setHabitaciones([...habitaciones, { nombre: data.habitacion }]);
        setNotificacionVisible(true); // Mostrar la notificación
        setTimeout(() => {
          setNotificacionVisible(false); // Ocultar la notificación
          setModalAbiertoHabitacion(false); // Cerrar el modal
        }, 3000);
      } else {
        alert("Error al crear la casa");
      }
    } catch (error) {
      setIsLoadingHabitaciones(false);
      console.log(error.response.data);
    }
  };

  //*------------------OBTENER HABITACIONES------------------*//
  const obtenerHabitaciones = async () => {
    const [token] = extraerDatosDeUsuario();
    setIsLoadingHabitaciones(true);
    await axios
      .get(process.env.REACT_APP_API_URL + `/api/habitaciones`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response && response.status === 200 && response.data) {
          if (response.data.length > 0) {
            setNombreNiveldos(response.data[0].tipo);
          }
          setHabitaciones(response.data); // Guardar las habitaciones en el estado
          setIsLoadingHabitaciones(false);
        } else {
          console.log("Error: No se recibieron datos válidos del servidor.");
          setIsLoadingHabitaciones(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingHabitaciones(false);
      });
  };

  const verArmarios = (habitacionId) => {
    setSelectedHabitacionId(habitacionId);
    setModalAbiertoArmarios(true);
    getArmarios(habitacionId);
  };
  const crearHabitacion = () => {
    //* Cambiar el valor de modalCrearAbierto al valor opuesto
    setModalCrearAbierto(!modalCrearAbierto);
  };

  // const obtenerConfirmacion = (nombre) => {
  //   setHabitacionAEliminar(nombre);
  //   setModalAbierto(true);
  // };

  const eliminarHabitacionModal = (nombre) => {
    setModalEliminarAbierto(true);
    setHabitacionAEliminar(nombre);
  };
  const cerrarModalEliminar = () => {
    setModalEliminarAbierto(false);
  };

  const editar = (habitacionId) => {
    setSelectedHabitacionId(habitacionId);
    setModalEditarAbierto(true);
  };
  const cerrarModalEditar = () => {
    setModalEditarAbierto(false);
  };
  const eliminarHabitacion = async (nombre) => {
    const [token, userId] = extraerDatosDeUsuario();
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/habitaciones/borrar/${nombre}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            userId: userId,
          },
        }
      );
      setHabitaciones(habitaciones.filter((h) => h.nombre !== nombre));
    } catch (error) {
      console.error("Error al eliminar habitacion", error);
    }
  };

  const getArmarios = async (habitacionId) => {
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
            habitacion: habitacionId,
          },
        }
      );
      setArmarios(response.data);
      setIsLoadingArmarios(false);
    } catch (error) {
      console.error("Error al obtener armarios", error);
    }
  };
  //*EDITAR HABITACION*//
  const editarHabitacion = async (nombre, nuevoNombre) => {
    const [token, userId] = extraerDatosDeUsuario();
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/habitaciones/editar/${nombre}`,
        {
          nuevoNombre: nuevoNombre,
          userId: userId,
        },
        {
          headers: {
            nombre: nombre,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHabitaciones(
        habitaciones.map((h) => {
          if (h.nombre === nombre) {
            h.nombre = nuevoNombre;
          }
          return h;
        })
      );
    } catch (error) {
      console.error("Error al editar habitacion", error);
    }
  };

  const onEditarHabitacion = (data) => {
    editarHabitacion(
      habitaciones.find((h) => h._id === selectedHabitacionId).nombre,
      data.nombre
    );
    setModalAbiertoHabitacion(false);
  };

  const armariosGroupedByHabitacion = armarios.reduce((groups, armario) => {
    const habitacionId = armario.habitacion;
    const habitacion = habitaciones.find((h) => h._id === habitacionId);
    if (habitacion) {
      const nombreHabitacion = habitacion._id;
      if (groups[nombreHabitacion]) {
        groups[nombreHabitacion].push(armario);
      } else {
        groups[nombreHabitacion] = [armario];
      }
    }

    return groups;
  }, {});

  const modalTitleStyle = {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "10px",
  };

  const notificacionStyle = {
    backgroundColor: "#4caf50",
    color: "white",
    textAlign: "center",
    padding: "10px",
    borderRadius: "5px",
    marginTop: "10px",
  };

  const optionsByTipo = {
    Casa: [
      <option key="habitacion" value="Habitacion">
        Habitación
      </option>,
    ],
    Trastero: [
      <option key="estanteria" value="Estanteria">
        Estanteria
      </option>,
    ],
    Tienda: [
      <option key="mostrador" value="Mostrador">
        Mostrador
      </option>,
      <option key="estante" value="Estante">
        Estante
      </option>,
      <option key="trastienda" value="Trastienda">
        Trastienda
      </option>,
    ],
    Almacen: [
      <option key="almacen" value="Almacen">
        Almacén
      </option>,
      <option key="palet" value="Palet">
        Palet
      </option>,
    ],
    Oficina: [
      <option key="escritorio" value="Escritorio">
        Escritorio
      </option>,
      <option key="estanteria" value="Estanteria">
        Estanteria
      </option>,
    ],
  };

  const opciones = optionsByTipo[nombreChoza] || optionsByTipo.Casa; // Opciones predeterminadas si no se proporciona nombreChoza

  return (
    <div className="habitaciones">
      <button id="crear" className="Crear" onClick={crearHabitacion}></button>
      {habitaciones.length === 0 && (
        <div className="cabeceraHabitaciones">
          <h1>Agregar nivel 2</h1>
        </div>
      )}

      {habitaciones.map((habitacion) => (
        <div className="habitacionConcreta" key={habitacion._id}>
          <div onClick={() => verArmarios(habitacion._id)}>
            {habitacion.nombre}
          </div>
          <button onClick={() => editar(habitacion._id)}>editar</button>
          <br />
          <button
            className="eliminarHabitacion"
            onClick={() => {
              eliminarHabitacionModal(habitacion.nombre);
              setModalAbierto(true);
            }}></button>
        </div>
      ))}
      {/* MODAL EDITAR */}
      <Modal isOpen={modalEditarAbierto}>
        <div className="close-modal">
          <button className="botonesModal" onClick={cerrarModalEditar}>
            &times;
          </button>
        </div>
        <h1 className="tituloModal">Editar habitación</h1>
        <form className="form" onSubmit={handleSubmit(onEditarHabitacion)}>
          <input {...register("nombre", { required: true })} />
          <button type="submit" className="botonesModal">
            Actualizar
          </button>
        </form>
      </Modal>
      {/* MODAL ELIMINAR */}
      <Modal isOpen={modalEliminarAbierto}>
        <div className="close-modal">
          <button onClick={cerrarModalEliminar}>&times;</button>
        </div>
        <h1 className="tituloModal">Eliminar habitación</h1>
        <p>¿Estás seguro de que quieres eliminar esta habitación?</p>
        <div className="modal-btns">
          <button onClick={cerrarModalEliminar}>Cancelar</button>
          <button onClick={() => eliminarHabitacion(habitacionAEliminar)}>
            Eliminar
          </button>
        </div>
      </Modal>

      {/* MODAL CREAR */}
      <Modal isOpen={modalCrearAbierto}>
        {habitaciones.length > 0 && (
          <h1 style={modalTitleStyle}>Nueva {habitaciones[0].tipo}</h1>
        )}

        <form className="form" onSubmit={handleSubmit(gestorFormulario)}>
          <select
            type="text"
            placeholder="Tipo"
            {...register("tipo", { minLength: 3, required: true })}>
            {opciones.map((option) => option)}
          </select>

          {errors.tipo && errors.tipo.type === "required" && (
            <p className="error">El tipo es obligatorio</p>
          )}
          {errors.tipo && errors.tipo.type === "minLength" && (
            <p className="error">El tipo debe tener al menos 3 caracteres</p>
          )}
          <select {...register("nombre", { required: true })}>
            {isLoadingCasas ? (
              <option value="">{"loading"}</option>
            ) : (
              casas &&
              casas.length > 0 &&
              casas.map((casa) => (
                <option key={casa._id} value={casa.nombre}>
                  {casa.direccion}
                </option>
              ))
            )}
          </select>
          <input
            type="text"
            placeholder="Nombre"
            {...register("habitacion", { minLength: 3, required: true })}
          />
          <button className="botonesModal" type="submit">
            Crear
          </button>
          <button className="botonesModal" onClick={crearHabitacion}>
            cerrar
          </button>
        </form>
        {notificacionVisible && (
          <div className="notificacion" style={notificacionStyle}>
            <p>Habitación creada con éxito.</p>
            <button onClick={() => setNotificacionVisible(false)}>
              Cerrar
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Habitaciones;
