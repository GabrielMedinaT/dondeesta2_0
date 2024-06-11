import "./App.css";
import { useState, useContext } from "react";
import NavBar from "./components/NavBar";
import LogIn from "./components/Loggin";
import { AuthContext } from "./context/AuthContext";
import Inicio from "./components/Inicio";
import Footer from "./components/Footer";
import Accesibilidad from "./components/Accesibilidad";
import Prueba from "./pages/Home";

function App({
  letra,
  setLetra,
  espaciado,
  setEspaciado,
  dislexia,
  setDislexia,
  cursor,
  setCursor,
  contraste,
  setContraste,
}) {
  const { gestionarLogOut, isLoggedIn } = useContext(AuthContext);
  const [render, setRender] = useState("null");
  const [nombreChoza, setNombreChoza] = useState("");
  const [nombreNiveldos, setNombreNiveldos] = useState("");

  console.log(render + " en app principal");
  return (
    <div className={cursor ? "App-cursor" : "App"}>
      <NavBar
        className="navbar"
        setRender={setRender}
        gestionarLogOut={gestionarLogOut}
        isLoggedIn={isLoggedIn}
        nombreChoza={nombreChoza}
        setNombreChoza={setNombreChoza}
        nombreNiveldos={nombreNiveldos}
        setNombreNiveldos={setNombreNiveldos}
      />
      {render === "null" && (
        <Inicio render={render} setRender={setRender} isLoggedIn={isLoggedIn} />
      )}
      {render === "login" && <LogIn setRender={setRender} />}
      {(isLoggedIn === "true" || render === "casa") && (
        <Prueba
          className="prueba"
          nombreChoza={nombreChoza}
          setNombreChoza={setNombreChoza}
          render={render}
          setRender={setRender}
          nombreNiveldos={nombreNiveldos}
          setNombreNiveldos={setNombreNiveldos}
        />
      )}

      <Accesibilidad
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

      <Footer className="footer" />
    </div>
  );
}

export default App;
