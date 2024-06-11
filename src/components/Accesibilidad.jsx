import React, { useState } from "react";
import "./Accesibilidad.css";
import { set } from "react-hook-form";

const Accesibilidad = ({
  letra,
  setLetra,
  setEspaciado,
  espaciado,
  dislexia,
  setDislexia,
  cursor,
  setCursor,
  contraste,
  setContraste,
}) => {
  const [botonesVisibles, setBotonesVisibles] = useState(false);
  //*FUNCION PARA AUMENTAR EL ESPACIADO ENTRE LETRAS
  const aumentarEspaciado = () => {
    if (espaciado === 8) {
      setEspaciado(2);
    } else {
      setEspaciado((prevEspaciado) => (prevEspaciado + 2) % 10);
    }
  };

  //*FUNCION PARA AUMENTAR EL TAMAÑO DE LA LETRA
  const tamañoLetra = () => {
    if (letra === 64) {
      setLetra(24);
    } else {
      setLetra((prevLetra) => prevLetra + 8);
    }
  };
  //*FUNCION PARA ACTIVAR EL MODO DISLEXIA
  const toggleDislexia = () => {
    setDislexia((prev) => !prev);
    setLetra(40);
    if (dislexia === true) {
      setEspaciado(2);
      setLetra(24);
    }
  };
  //*FUNCION PARA MOSTRAR LOS BOTONES DE ACCESIBILIDAD
  const toggleBotonesVisibles = () => {
    setBotonesVisibles((prev) => !prev);
  };
  //*FUNCION PARA CAMBIAR EL CURSOR
  const toggleCursor = () => {
    setCursor((prev) => !prev);
  };
  const toogleContraste = () => {
    setContraste((prev) => !prev);
  };

  const handleClick = (e) => {
    e.stopPropagation(); // Evitar que el evento se propague hacia el elemento padre
  };

  return (
    <div className="container-accesibilidad">
      <div
        className={botonesVisibles ? "visible" : "botones-accesibilidad"}
        onClick={toggleBotonesVisibles}
        title="Menú de accesibilidad"
      />

      <button
        className={botonesVisibles ? "boton-letra" : "boton-letra-oculto"}
        onClick={(e) => {
          tamañoLetra();
          handleClick(e);
        }}
      />
      <button
        className={
          botonesVisibles ? "boton-espaciado" : "boton-espaciado-oculto"
        }
        onClick={(e) => {
          aumentarEspaciado();
          handleClick(e);
        }}
        title="Aumentar espaciado entre letras"
      />
      <button
        className={botonesVisibles ? "boton-dislexia" : "boton-dislexia-oculto"}
        onClick={(e) => {
          toggleDislexia();
          handleClick(e);
        }}></button>
      <button
        className={botonesVisibles ? "boton-cursor" : "boton-cursor-oculto"}
        onClick={(e) => {
          toggleCursor();
        }}></button>
      <button
        className={botonesVisibles ? "boton-invertir" : "boton-invertir-oculto"}
        onClick={(e) => {
          toogleContraste();
        }}></button>
    </div>
  );
};

export default Accesibilidad;
