import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import "./Prueba.css";
import Level1 from "../components/Level1";
import Habitaciones from "../components/Habitaciones";
import Muebles from "../components/Muebles";
import "bootstrap/dist/css/bootstrap.css";
import Cosas from "../components/Cosas";

const Prueba = ({
  nombreChoza,
  setNombreChoza,
  nombreNiveldos,
  setNombreNiveldos,
}) => {
  const [nombreEstilo, setNombreEstilo] = useState("");
  const [mostrarNiveldos, setMostrarNiveldos] = useState(false);
  const [mostrarNivelTres, setMostrarNivelTres] = useState(false);
  const [mostrarCosas, setMostrarCosas] = useState(false);
  const [nombreEstiloDos, setNombreEstiloDos] = useState("");
  const [mostrarMuebles, setMostrarMuebles] = useState(false);

  useEffect(() => {
    const MostrarNivelDos = () => {
      if (nombreChoza === "") {
        setMostrarNiveldos(false);
      } else {
        setMostrarNiveldos(true);
        setMostrarCosas(true);
      }
    };
    const MostrarNivelTres = () => {
      if (nombreNiveldos === "") {
        setMostrarNivelTres(false);
      } else {
        setMostrarNivelTres(true);
      }
    };
    const mostrarlosMuebles = () => {
      if (nombreNiveldos === "") {
        setMostrarMuebles(false);
      } else {
        setMostrarMuebles(true);
      }
    };
    mostrarlosMuebles();
    MostrarNivelTres();
    MostrarNivelDos();
  }, [nombreChoza, nombreNiveldos, mostrarMuebles]);

  useEffect(() => {
    if (nombreChoza === "Casa" || nombreChoza === "casita") {
      setNombreEstilo("choza");
    } else if (nombreChoza === "Almacen" || nombreChoza === "almacen") {
      setNombreEstilo("almacen");
    } else if (nombreChoza === "Tienda" || nombreChoza === "tienda") {
      setNombreEstilo("tienda");
    } else if (nombreChoza === "Trastero" || nombreChoza === "trastero") {
      setNombreEstilo("trastero");
    } else if (
      nombreChoza === "Oficina" ||
      nombreChoza === "Consultorio" ||
      nombreChoza === "Despacho"
    ) {
      setNombreEstilo("oficina");
    }
  }, [nombreChoza]);
  useEffect(() => {
    if (nombreNiveldos === "Habitacion" || nombreNiveldos === "habitacion") {
      setNombreEstiloDos("habitacion");
    } else if (nombreNiveldos === "Cocina" || nombreNiveldos === "cocina") {
      setNombreEstiloDos("cocina");
    } else if (nombreNiveldos === "Baño" || nombreNiveldos === "baño") {
      setNombreEstiloDos("baño");
    } else if (nombreNiveldos === "Sala" || nombreNiveldos === "sala") {
      setNombreEstiloDos("sala");
    }
  }, [nombreNiveldos]);

  return (
    <div className="acordeones">
      <Accordion defaultActiveKey="">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            {" "}
            <h1 className={nombreEstilo}>
              {" "}
              {nombreChoza === "" ? "Primer Nivel" : nombreChoza}{" "}
            </h1>{" "}
          </Accordion.Header>
          <Accordion.Body>
            <Level1 nombreChoza={nombreChoza} setNombreChoza={setNombreChoza} i />
          </Accordion.Body>
        </Accordion.Item>
        {mostrarNiveldos ? (
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              {" "}
              <h1 className={nombreEstiloDos}>
                {nombreNiveldos === "" ? "Segundo nivel" : nombreNiveldos}{" "}
              </h1>
            </Accordion.Header>
            <Accordion.Body>
              <Habitaciones
                nombreNiveldos={nombreNiveldos}
                setNombreNiveldos={setNombreNiveldos}
                nombreChoza={nombreChoza}
                setNombreChoza={setNombreChoza}
              />
            </Accordion.Body>
          </Accordion.Item>
        ) : (
          <></>
        )}
        {mostrarMuebles ? (
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              {" "}
              <h1> Muebles </h1>{" "}
            </Accordion.Header>
            <Accordion.Body>
              <Muebles />
            </Accordion.Body>
          </Accordion.Item>
        ) : (
          <></>
        )}
        {mostrarNivelTres ? (
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              {" "}
              <h1> Tercer nivel </h1>{" "}
            </Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
        ) : (
          <></>
        )}

        {mostrarCosas ? (
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              {" "}
              <h1> Cosas crear </h1>{" "}
            </Accordion.Header>
            <Accordion.Body>
              <Cosas />
            </Accordion.Body>
          </Accordion.Item>
        ) : (
          <></>
        )}
      </Accordion>
    </div>
  );
};

export default Prueba;
