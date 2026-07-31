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

function normalizar(texto = "") {
  return String(texto)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

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

  const productosFiltrados = useMemo(() => {
  const termino = normalizar(textoBusqueda);

  return productos.filter((producto) => {
    const coincideCategoria =
      categoriaSeleccionada === "todos" ||
      normalizar(producto.categoria) ===
        normalizar(categoriaSeleccionada);

    const coincideMarca =
      marcaSeleccionada === "" ||
      normalizar(producto.marca) ===
        normalizar(marcaSeleccionada);

    const coincideBusqueda =
      termino === "" ||
      normalizar(producto.nombre).includes(termino) ||
      normalizar(producto.descripcion).includes(termino) ||
      normalizar(producto.marca).includes(termino) ||
      normalizar(producto.categoria).includes(termino);

    return (
      coincideCategoria &&
      coincideMarca &&
      coincideBusqueda
    );
  });
}, [
  productos,
  categoriaSeleccionada,
  marcaSeleccionada,
  textoBusqueda,
]);

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
    productosFiltrados,
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
