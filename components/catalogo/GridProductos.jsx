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

  const termino = textoBusqueda.trim().toLowerCase();

  const productosFiltrados = productos.filter((producto) => {

    const nombre = String(producto.nombre || "").toLowerCase();
    const descripcion = String(producto.descripcion || "").toLowerCase();
    const marca = String(producto.marca || "").toLowerCase();
    const categoria = String(producto.categoria || "").toLowerCase();

    const coincideCategoria =
      categoriaSeleccionada === "todos" ||
      categoria === categoriaSeleccionada.toLowerCase();

    const coincideMarca =
      marcaSeleccionada === "" ||
      marca === marcaSeleccionada.toLowerCase();

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

  if (productosFiltrados.length === 0) {

    return (

      <div className="text-center py-20">

        <h2 className="text-2xl font-bold">
          No se encontraron productos
        </h2>

        <p className="text-gray-500 mt-3">
          Intenta con otra palabra o cambia los filtros.
        </p>

      </div>

    );

  }

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
