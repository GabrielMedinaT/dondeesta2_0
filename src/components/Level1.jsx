import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import "./Level1.css";

const Level1 = ({ render, setRender, nombreChoza, setNombreChoza }) => {
  const [casas, setCasas] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [casaId, setCasaId] = useState(null);
  const [isLoadingCasas, setIsLoadingCasas] = useState(true);
  const [modalAgregar, setModalAgregar] = useState(false);
  const selectRender = (newrender) => {
    setRender(newrender);
  };
  const { register, handleSubmit } = useForm();
  const abrirModalCasas = () => {
    setModalAgregar(!modalAgregar);
  };
  const mostrarModal = (id) => {
    setCasaId(id);
    setModalAbierto(true);
  };
  const cerrarModal = () => {
    setModalAbierto(false);
    setCasaId(null);
  };
  useEffect(() => {
    getCasas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //*Crear Casas
  const gestorFormulario = async (data) => {
    const [token, userId] = extraerDatosDeUsuario();
    await axios
      .post(
        process.env.REACT_APP_API_URL + "/api/casas/nueva",
        {
          nombre: data.nombre,
          direccion: data.direccion,
          ciudad: data.ciudad,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Todo correcto", response.data);
        if (response.status === 200) {
          window.location.reload(false);
          setTimeout(() => {
            selectRender("casa");
          }, 1000);
        } else alert("Error al crear la casa");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log("Error desconocido:", error);
        }
      });
  };

  const extraerDatosDeUsuario = () => {
    const datosRecuperar = JSON.parse(localStorage.getItem("datosUsuario"));
    if (datosRecuperar && datosRecuperar.token) {
      return [datosRecuperar.token, datosRecuperar.userId];
    } else {
      setRender("login");
    }
  };
  //*OBTENER CASAS
  const getCasas = async () => {
    const [token, userId] = extraerDatosDeUsuario();
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/casas/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userId: userId,
            casaId: casas._id,
          },
        }
      );
      setCasas(response.data);
      const primeraCasa = response.data[0];
      if (primeraCasa) {
        setNombreChoza(primeraCasa.nombre);
      }
      setIsLoadingCasas(false);
    } catch (error) {
      setIsLoadingCasas(false);
      console.log(error);
    }
  };

  //*ELIMINAR CASA
  const eliminarCasa = (id) => {
    const [token, userId] = extraerDatosDeUsuario();
    axios
      .delete(process.env.REACT_APP_API_URL + `/api/casas/borrar/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          userId: userId,
        },
      })
      .then((res) => {
        console.log(id);
        console.log(res.data);
        cerrarModal();
        window.location.reload(false);
        setTimeout(() => {
          selectRender("casa");
        }, 1000);
      })
      .catch((error) => console.log(error));
    // console.log(id);
  };
  const casasLength = casas.length;

  return (
    <div className="miscasas">
      <div className="imagenCasa"></div>
      <div className="casas">
        {isLoadingCasas ? (
          <div className="arc"></div>
        ) : casasLength === 0 ? (
          <>
            <div className="agregarCasa">
              <h1>Agregue el primer nivel</h1>
              <button onClick={() => abrirModalCasas()}></button>
            </div>
          </>
        ) : (
          <ul className="casasLista">
            {casas &&
              casas.length > 0 &&
              casas.map((casa) => (
                <li key={casa._id}>
                  <div className="misCasas">
                    <div className="casasExistentes">
                      <div className="CasaConcreta">
                        <h1>Nombre : {casa.direccion}</h1> <br />
                        <h1>Ciudad : {casa.ciudad} </h1>
                      </div>
                      <div className="botones">
                        <div>
                          <button
                            className="eliminarCasa"
                            onClick={() => mostrarModal(casa._id)}></button>
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
      {/* Modal para agregar */}
      <Modal isOpen={modalAgregar}>
        <div>
          <form
            className="addCasa"
            action=""
            onSubmit={handleSubmit(gestorFormulario)}>
            <select
              name="Tipo"
              id="tipo"
              {...register("nombre", { required: true })}>
              <option value="Casa">Casa</option>
              <option value="Almacen">Almacen</option>
              <option value="Tienda">Tienda</option>
              <option value="Trastero">Trastero</option>
              <option value="Oficina">Oficina</option>
              <option value="Despacho">Despacho</option>
              <option value="Consultorio">Consultorio</option>
            </select>
            <br />
            <input
              type="text"
              placeholder="Nombre"
              {...register("direccion", { minLength: 5, required: true })}
            />
            <br />
            <input
              type="text"
              placeholder="Ciudad"
              {...register("ciudad", { minLength: 5, required: true })}
            />
            <br />
            <button type="submit">Agregar</button>
            <button onClick={() => abrirModalCasas()}>Cancelar</button>
          </form>
        </div>
        {/* Contenido del modal para agregar */}
      </Modal>

      {/* Modal para eliminar */}
      <Modal
        casaId={casaId}
        isOpen={modalAbierto}
        onClose={cerrarModal}
        onConfirm={eliminarCasa}>
        <h1>
          ¿Seguro que quieres eliminar la casa? Esta acción no se podrá revertir
        </h1>
        <button className="botonSi" onClick={() => eliminarCasa(casaId)}>
          Sí
        </button>
        <button className="botonNo" onClick={cerrarModal}>
          No
        </button>
      </Modal>
    </div>
  );
};

export default Level1;
