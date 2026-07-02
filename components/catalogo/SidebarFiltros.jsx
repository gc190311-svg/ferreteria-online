"use client";

import { useCatalogo } from "../context/CatalogoContext";

export default function SidebarFiltros() {
  const {
    productos,
    categoriaSeleccionada,
    marcaSeleccionada,
    setMarcaSeleccionada,
  } = useCatalogo();

  // Productos según la categoría
  const productosCategoria =
    categoriaSeleccionada === "todos"
      ? productos
      : productos.filter(
          (producto) =>
            producto.categoria === categoriaSeleccionada
        );

  // Contador de marcas
  const marcas = {};

  productosCategoria.forEach((producto) => {
    if (!producto.marca) return;

    marcas[producto.marca] =
      (marcas[producto.marca] || 0) + 1;
  });

  const listaMarcas = Object.entries(marcas).sort();

  return (
    <aside className="sticky top-32 w-64">

      <h2 className="text-4xl font-bold mb-8">
        Marcas
      </h2>

      {/* TODAS */}

      <div
        onClick={() => setMarcaSeleccionada("")}
        className={`
          flex
          items-center
          justify-between
          py-4
          border-b
          border-gray-200
          cursor-pointer
          transition
          ${
            marcaSeleccionada === ""
              ? "font-bold border-l-4 border-yellow-500 pl-3"
              : "hover:text-yellow-600"
          }
        `}
      >
        <span>Todas</span>

        <span
          className="
            bg-yellow-500
            text-black
            text-xs
            font-bold
            rounded-full
            min-w-[32px]
            h-8
            flex
            items-center
            justify-center
          "
        >
          {productosCategoria.length}
        </span>
      </div>

      {/* MARCAS */}

      {listaMarcas.map(([marca, cantidad]) => (

        <div
          key={marca}
          onClick={() => setMarcaSeleccionada(marca)}
          className={`
            flex
            items-center
            justify-between
            py-4
            border-b
            border-gray-200
            cursor-pointer
            transition
            ${
              marcaSeleccionada === marca
                ? "font-bold border-l-4 border-yellow-500 pl-3"
                : "hover:text-yellow-600"
            }
          `}
        >

          <span>
            {marca}
          </span>

          <span
            className="
              bg-yellow-500
              text-black
              text-xs
              font-bold
              rounded-full
              min-w-[32px]
              h-8
              flex
              items-center
              justify-center
            "
          >
            {cantidad}
          </span>

        </div>

      ))}

    </aside>
  );
}
