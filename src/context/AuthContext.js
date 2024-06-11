import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("datosUsuario") ? true : false
  );

  const gestionarLogIn = (token, userId, nombreUsuario) => {
    sessionStorage.setItem(
      "datosUsuario",
      JSON.stringify({ token, userId, nombre: nombreUsuario })
    );
    setIsLoggedIn(true);
  };

  const gestionarLogOut = () => {
    sessionStorage.removeItem("datosUsuario");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, gestionarLogIn, gestionarLogOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};
