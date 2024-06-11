import React, { useState, useEffect } from "react";
import "./CookieConsentPopup.css"; // Agrega tus estilos aquí

const CookieConsentPopup = ({ onAccept }) => {
  const [isOpen, setIsOpen] = useState(true);

  const acceptCookies = () => {
    setIsOpen(false);
    localStorage.setItem("cookiesAccepted", "true"); // Guarda en localStorage
    onAccept();
  };

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (cookiesAccepted === "true") {
      setIsOpen(false);
    }
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="cookie-popup">
      <p>
        Este sitio web utiliza cookies para mejorar la experiencia del usuario.
        Al continuar utilizando el sitio, aceptas nuestro uso de cookies.
      </p>
      <button onClick={acceptCookies}>Aceptar</button>
    </div>
  );
};

export default CookieConsentPopup;
