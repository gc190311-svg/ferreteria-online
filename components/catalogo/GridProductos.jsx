"use client";

import CardProducto from "./CardProducto";

import { useCatalogo } from "../context/CatalogoContext";

export default function GridProductos() {

  const {
    productos,
    categoriaSeleccionada,
    marcaSeleccionada,
    textoBusqueda,
  } = useCatalogo();

  const productosFiltrados = productos.filter((producto) => {

    // Filtro por categoría
    const coincideCategoria =
      categoriaSeleccionada === "todos" ||
      producto.categoria === categoriaSeleccionada;

    // Filtro por marca
    const coincideMarca =
      !marcaSeleccionada ||
      producto.marca === marcaSeleccionada;

    // Filtro por buscador
    const termino = textoBusqueda.trim().toLowerCase();

const nombre = String(producto.nombre || "").toLowerCase();
const descripcion = String(producto.descripcion || "").toLowerCase();
const marca = String(producto.marca || "").toLowerCase();
const categoria = String(producto.categoria || "").toLowerCase();

const coincideBusqueda =
  termino === "" ||
  nombre.includes(termino) ||
  descripcion.includes(termino) ||
  marca.includes(termino) ||
  categoria.includes(termino);

   return (

    coincideCategoria &&
    coincideMarca &&
    coincideBusqueda

);

  });

  return (

    <div
      className="
        grid
        grid-cols-2
        md:grid-cols-3
        xl:grid-cols-4
        gap-8
      "
    >

      {productosFiltrados.map((producto) => (

        <CardProducto
          key={producto.id}
          producto={producto}
        />

      ))}

    </div>

  );

}
