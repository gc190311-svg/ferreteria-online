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

          <div
  onClick={() => setMarcaSeleccionada("")}
  className={`
    flex
    items-center
    justify-between
    py-4
    cursor-pointer
    border-b
    border-gray-200
    transition
    ${
      marcaSeleccionada === ""
        ? "bg-yellow-50 font-semibold"
        : "hover:bg-gray-50"
    }
  `}
>

  <span>

    Todas

  </span>

  <span
    className="
      min-w-[30px]
      h-7
      flex
      items-center
      justify-center
      rounded-full
      bg-yellow-500
      text-black
      text-xs
      font-bold
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
      cursor-pointer
      border-b
      border-gray-200
      transition
      ${
        marcaSeleccionada === marca
          ? "bg-yellow-50 font-semibold"
          : "hover:bg-gray-50"
      }
    `}
  >

    <span className="text-gray-800">

      {marca}

    </span>

    <span
      className="
        min-w-[30px]
        h-7
        flex
        items-center
        justify-center
        rounded-full
        bg-yellow-500
        text-black
        text-xs
        font-bold
      "
    >

      {cantidad}

    </span>

  </div>

))}

      </div>

    </div>

  );

}
