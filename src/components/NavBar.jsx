import React, { useState } from "react";
import "./Navbar.css"; // Asegúrate de importar el archivo CSS creado anteriormente.

const NavBar = ({
  setRender,
  gestionarLogOut,
  isLoggedIn,
  nombreChoza,
  setNombreChoza,
}) => {
  const selectRender = (newrender) => {
    setRender(newrender);
  };

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const loggout = () => {
    gestionarLogOut();
    setRender("login");
  };

  return (
    <div className="navbar-container">
      <div
        className={`menu-icon ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <div className={`menu-desplegable ${isMenuOpen ? "active" : ""}`}>
        <div className="letreroInicio">
          <div className="logo"></div>
          <h1>Donde lo puse</h1>
        </div>

        {isLoggedIn ? (
          <>
            <ul>
              <li
                className="navbar-button"
                onClick={() => {
                  selectRender("casa");
                  setMenuOpen(false);
                }}
              >
                {nombreChoza === "" ? "Comenzar" : "Mi " + nombreChoza}
              </li>
              <li
                className="navbar-button"
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                <a href="../rss.xml" target="_blank" rel="noopener noreferrer">
                  Ver RSS Feed
                </a>
              </li>

              <li className="navbar-button logout-button" onClick={loggout}>
                Cerrar sesión
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul>
              <li
                className="navbar-button"
                id="home-button"
                onClick={() => {
                  selectRender("null");
                  setMenuOpen(false);
                }}
              >
                Inicio
              </li>
              <li
                className="navbar-button"
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                <a href="../rss.xml" target="_blank" rel="noopener noreferrer">
                  Ver RSS Feed
                </a>
              </li>

              <li
                className="navbar-button"
                onClick={() => {
                  selectRender("login");
                  setMenuOpen(false);
                }}
              >
                Login
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
