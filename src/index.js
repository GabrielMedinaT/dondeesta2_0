import React, { useState, useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Importa los estilos globales
import App from "./App";
import Modal from "react-modal";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar";

function Index() {
  const [letra, setLetra] = useState(24);
  const [espaciado, setEspaciado] = useState(0);
  const [dislexia, setDislexia] = useState(false);
  const [cursor, setCursor] = useState(false);
  const [contraste, setContraste] = useState(false);


  const estiloFuente = {
    fontSize: letra + "px",
    letterSpacing: espaciado,
    fontFamily: dislexia ? "Caveat, cursive" : "Arial, sans-serif",
    filter: contraste ? "invert(100%)" : "invert(0%)",
  };
  return (
    <React.StrictMode>
      <AuthProvider>
        <div
          style={{
            /* Agrega los estilos del objeto estiloFuente directamente aquí */
            fontSize: estiloFuente.fontSize,
            letterSpacing: estiloFuente.letterSpacing,
            fontFamily: estiloFuente.fontFamily,
            filter: estiloFuente.filter,
            /* Puedes agregar otros estilos adicionales si lo deseas */
          }}>
          <NavBar />
          <App
            letra={letra}
            setLetra={setLetra}
            espaciado={espaciado}
            setEspaciado={setEspaciado}
            dislexia={dislexia}
            setDislexia={setDislexia}
            cursor={cursor}
            setCursor={setCursor}
            contraste={contraste}
            setContraste={setContraste}
          />
        </div>
      </AuthProvider>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
Modal.setAppElement("#root");
root.render(<Index />);
