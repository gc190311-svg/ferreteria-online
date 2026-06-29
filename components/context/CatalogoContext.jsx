"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../../app/firebase";

const CatalogoContext = createContext();

export function CatalogoProvider({ children }) {

  const [productos, setProductos] = useState([]);

  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState("todos");

  const [marcaSeleccionada, setMarcaSeleccionada] =
    useState("");

  const [textoBusqueda, setTextoBusqueda] =
    useState("");

  useEffect(() => {

    cargarProductos();

  }, []);

  async function cargarProductos() {

    const snapshot = await getDocs(
      collection(db, "productos")
    );

    const lista = [];

    snapshot.forEach((doc) => {

      lista.push({
        id: doc.id,
        ...doc.data(),
      });

    });

    setProductos(lista);

  }

  function limpiarFiltros() {

    setCategoriaSeleccionada("todos");
    setMarcaSeleccionada("");
    setTextoBusqueda("");

  }

  return (

    <CatalogoContext.Provider
      value={{

        productos,

        categoriaSeleccionada,
        setCategoriaSeleccionada,

        marcaSeleccionada,
        setMarcaSeleccionada,

        textoBusqueda,
        const [busquedaRealizada, setBusquedaRealizada] =
  useState(false);
        setTextoBusqueda,

        limpiarFiltros,

          function limpiarFiltros() {

  setCategoriaSeleccionada("todos");
  setMarcaSeleccionada("");
  setTextoBusqueda("");
  setBusquedaRealizada(false);

}

      }}
    >

      {children}

    </CatalogoContext.Provider>

  );

}

export function useCatalogo() {

  return useContext(CatalogoContext);

}
