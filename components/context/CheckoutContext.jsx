"use client";

import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {

  const [nombre, setNombre] = useState("");
  const [celular, setCelular] = useState("");
  const [correo, setCorreo] = useState("");

  const [direccion, setDireccion] = useState("");
  const [distrito, setDistrito] = useState("");
  const [referencia, setReferencia] = useState("");

  const [tipoEntrega, setTipoEntrega] = useState("delivery");

  const [metodoPago, setMetodoPago] = useState("transferencia");

  return (

    <CheckoutContext.Provider
      value={{

        nombre,
        setNombre,

        celular,
        setCelular,

        correo,
        setCorreo,

        direccion,
        setDireccion,

        distrito,
        setDistrito,

        referencia,
        setReferencia,

        tipoEntrega,
        setTipoEntrega,

        metodoPago,
        setMetodoPago,

      }}
    >

      {children}

    </CheckoutContext.Provider>

  );

}

export function useCheckout() {

  return useContext(CheckoutContext);

}