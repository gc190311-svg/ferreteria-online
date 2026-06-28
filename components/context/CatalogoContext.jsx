"use client";

import { createContext, useContext, useState } from "react";

const CatalogoContext = createContext();

export function CatalogoProvider({ children }) {

  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState("todos");

  const [busqueda, setBusqueda] =
    useState("");

  const [orden, setOrden] =
    useState("nombre");

  return (

    <CatalogoContext.Provider
      value={{
        categoriaSeleccionada,
        setCategoriaSeleccionada,

        busqueda,
        setBusqueda,

        orden,
        setOrden,
      }}
    >

      {children}

    </CatalogoContext.Provider>

  );

}

export function useCatalogo() {
  return useContext(CatalogoContext);
}
