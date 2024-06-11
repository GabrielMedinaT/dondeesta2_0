import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <p>
          © {new Date().getFullYear()} Mi Empresa. Todos los derechos
          reservados.
        </p>
        {/* Aquí puedes agregar enlaces a tus redes sociales, política de privacidad, términos de uso, etc. */}
      </div>
    </div>
  );
};

export default Footer;
