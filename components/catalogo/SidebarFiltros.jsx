"use client";

import { useCatalogo } from "../context/CatalogoContext";

export default function SidebarFiltros() {

  const {
    productos,
    categoriaSeleccionada,
    marcaSeleccionada,
    setMarcaSeleccionada,
  } = useCatalogo();

  // Filtrar productos según la categoría seleccionada
  const productosCategoria =
    categoriaSeleccionada === "todos"
      ? productos
      : productos.filter(
          (producto) =>
            producto.categoria === categoriaSeleccionada
        );

  // Obtener marcas con contador
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
    text-4xl
    font-bold
    text-gray-900
    mb-8
  "
>
  Marcas
</h2>

      <div className="space-y-3">

        <label
          className="
            flex
            items-center
            justify-between
            cursor-pointer
            font-medium
          "
        >

          <div className="flex items-center gap-2">

            <input
              type="radio"
              name="marca"
              checked={marcaSeleccionada === ""}
              onChange={() => setMarcaSeleccionada("")}
            />

            Todas

          </div>

          <span className="text-gray-500">

            ({productosCategoria.length})

          </span>

        </label>

        {listaMarcas.map(([marca, cantidad]) => (

       <label
  className="
    flex
    items-center
    justify-between
    py-3
    cursor-pointer
    border-b
    border-gray-100
    hover:bg-gray-50
    transition
    px-2
    rounded-lg
  "
>

  <div className="flex items-center gap-3">

    <input
      type="radio"
      ...
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

    </aside>

  );

}
