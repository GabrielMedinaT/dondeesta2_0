import React from "react";
import "./Inicio.css";
import { use } from "i18next";
import { useEffect } from "react";
import CookieConsentPopup from "./CookieConsentPopup";
import { useState } from "react";

const Inicio = ({
  letra,
  espaciado,
  dislexia,
  setRender,
  render,
  isLoggedIn,
}) => {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  console.log(render);
  const CambiarPantalla = () => {
    if (isLoggedIn) {
      setRender("casa");
    } else {
      setRender("null");
    }
  };
  console.log(isLoggedIn);
  console.log(render);

  useEffect(() => {
    CambiarPantalla();
  }, []);
  return (
    <div className="container-principal">
      {!cookiesAccepted && (
        <CookieConsentPopup onAccept={() => setCookiesAccepted(true)} />
      )}
      <div className="container">
        {" "}
        <div className="row">
          <h1 className="heading">Mi Organizador</h1>
          <div className="col-sm">
            <p className="description">
              Mi Organizador es una aplicación que te permite mantener tu vida
              organizada al permitirte crear una base de datos jerárquica para
              tus pertenencias en diferentes niveles.
            </p>
            <div className="imagen1"></div>
          </div>
          <h1 className="heading">¿Cómo funciona?</h1>
          <div className="col-sm">
            <div className="imagen2"></div>
            <p className="description">
              Mi Organizador te permite crear una jerarquía personalizada para
              tus pertenencias. Puedes comenzar desde el nivel "Casa" y agregar
              niveles como "Habitaciones", "Muebles", "Cajones" y finalmente,
              "Cosas". Así, tendrás una visión clara de dónde están tus objetos
              en todo momento.
            </p>
          </div>
          <h1 className="heading">¿Cómo se usa?</h1>
          <div className="col-sm">
            <p className="description">
              Para usar Mi Organizador, simplemente regístrate en la aplicación
              y comienza a crear tu jerarquía de pertenencias. Puedes agregar
              una "Casa" como punto de partida y luego agregar niveles
              adicionales para organizar tus objetos de manera lógica. Si alguna
              vez olvidas dónde dejaste algo, simplemente abre la aplicación y
              navega por la jerarquía para encontrar la ubicación de tus cosas
              rápidamente, o usa nuestro buscador para encontrar.
            </p>
            <div className="imagen3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
