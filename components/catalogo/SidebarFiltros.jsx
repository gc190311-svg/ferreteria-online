"use client";

import { useCatalogo } from "../context/CatalogoContext";

export default function SidebarFiltros() {

  const {
    productos,
    categoriaSeleccionada,
    marcaSeleccionada,
    setMarcaSeleccionada,
  } = useCatalogo();

  // Productos según categoría

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

    <aside
      className="
        sticky
        top-32
        w-64
        shrink-0
      "
    >

      {/* TITULO */}

      <h2
        className="
          text-4xl
          font-bold
          text-gray-900
          mb-8
        "
      >
        Marcas
      </h2>

      {/* TODAS */}

      <div

        onClick={() => setMarcaSeleccionada("")}

        className="
          flex
          items-center
          justify-between
          px-4
          py-4
          border-b
          border-gray-200
          cursor-pointer
          hover:bg-gray-50
          transition-all
          duration-300
        "

      >

        <span
          className="
            text-gray-800
            font-medium
          "
        >

          Todas

        </span>

        <span
          className="
            text-sm
            font-bold
            text-gray-700
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
            px-4
            py-4
            border-b
            border-gray-200
            cursor-pointer
            transition-all
            duration-300

            ${
              marcaSeleccionada === marca
                ? "bg-yellow-500 rounded-lg"
                : "hover:bg-gray-50"
            }
          `}

        >

          <span
            className={`
              ${
                marcaSeleccionada === marca
                  ? "font-bold text-black"
                  : "text-gray-800"
              }
            `}
          >

            {marca}

          </span>

          {marcaSeleccionada === marca ? (

            <span
              className="
                w-8
                h-8
                rounded-full
                bg-yellow-600
                text-black
                text-xs
                font-bold
                flex
                items-center
                justify-center
              "
            >

              {cantidad}

            </span>

          ) : (

            <span
              className="
                text-sm
                font-bold
                text-gray-700
              "
            >

              {cantidad}

            </span>

          )}

        </div>

      ))}

    </aside>

  );

}
