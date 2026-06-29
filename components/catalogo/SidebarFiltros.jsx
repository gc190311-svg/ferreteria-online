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

    <aside
      className="
        w-72
        bg-white
        rounded-3xl
        shadow-lg
        p-6
        h-fit
      "
    >

      <h2 className="text-2xl font-bold mb-6">

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
            key={marca}
            className="
              flex
              items-center
              justify-between
              cursor-pointer
            "
          >

            <div className="flex items-center gap-2">

              <input
                type="radio"
                name="marca"
                checked={marcaSeleccionada === marca}
                onChange={() =>
                  setMarcaSeleccionada(marca)
                }
              />

              {marca}

            </div>

            <span className="text-gray-500">

              ({cantidad})

            </span>

          </label>

        ))}

      </div>

    </aside>

  );

}
