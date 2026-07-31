"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
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

  // Lo que escribe el usuario
  const [textoInput, setTextoInput] =
    useState("");

  // Lo que usa el catálogo para filtrar
  const [textoBusqueda, setTextoBusqueda] =
    useState("");

    const categorias = useMemo(() => {

  return [
    ...new Set(
      productos
        .map((p) => (p.categoria || "").trim())
        .filter((c) => c !== "")
    ),
  ].sort((a, b) => a.localeCompare(b, "es"));

}, [productos]);

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

    setTextoInput("");
    setTextoBusqueda("");

  }

  return (

    <CatalogoContext.Provider
      value={{

        productos,
        categorias,

        categoriaSeleccionada,
        setCategoriaSeleccionada,

        marcaSeleccionada,
        setMarcaSeleccionada,

        textoInput,
        setTextoInput,

        textoBusqueda,
        setTextoBusqueda,

        limpiarFiltros,

      }}
    >

      {children}

    </CatalogoContext.Provider>

  );

}

export function useCatalogo() {

  return useContext(CatalogoContext);

}
