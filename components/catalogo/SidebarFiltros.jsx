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

    if (!marcas[producto.marca]) {

      marcas[producto.marca] = 1;

    } else {

      marcas[producto.marca]++;

    }

  });

  const listaMarcas = Object.entries(marcas).sort();

  return (

    <div
      className="
        bg-white
        rounded-3xl
        shadow-lg
        border
        border-gray-100
        p-8
        sticky
        top-32
      "
    >

      <h2
        className="
          text-3xl
          font-bold
          text-gray-900
          mb-8
        "
      >
        Marcas
      </h2>

      <div className="space-y-2">

        {/* TODAS */}

        <label
          className="
            flex
            items-center
            justify-between
            py-3
            px-2
            rounded-lg
            cursor-pointer
            hover:bg-gray-50
            transition
            border-b
            border-gray-100
          "
        >

          <div className="flex items-center gap-3">

            <input
              type="radio"
              name="marca"
              checked={marcaSeleccionada === ""}
              onChange={() => setMarcaSeleccionada("")}
            />

            <span className="font-medium">

              Todas

            </span>

          </div>

          <span
            className="
              bg-yellow-500
              text-black
              text-xs
              font-bold
              px-3
              py-1
              rounded-full
              min-w-[34px]
              text-center
            "
          >

            {productosCategoria.length}

          </span>

        </label>

        {/* MARCAS */}

        {listaMarcas.map(([marca, cantidad]) => (

          <label
            key={marca}
            className="
              flex
              items-center
              justify-between
              py-3
              px-2
              rounded-lg
              cursor-pointer
              hover:bg-gray-50
              transition
              border-b
              border-gray-100
            "
          >

            <div className="flex items-center gap-3">

              <input
                type="radio"
                name="marca"
                checked={marcaSeleccionada === marca}
                onChange={() => setMarcaSeleccionada(marca)}
              />

              <span
                className="
                  text-gray-800
                  font-medium
                "
              >

                {marca}

              </span>

            </div>

            <span
              className="
                bg-yellow-500
                text-black
                text-xs
                font-bold
                px-3
                py-1
                rounded-full
                min-w-[34px]
                text-center
              "
            >

              {cantidad}

            </span>

          </label>

        ))}

      </div>

    </div>

  );

}
