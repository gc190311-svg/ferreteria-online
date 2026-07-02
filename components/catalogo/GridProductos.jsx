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

        <div
  key={producto.id}
  className="
    bg-white
    rounded-2xl
    border
    border-gray-200
    overflow-hidden
    shadow-sm
    hover:shadow-xl
    transition-all
    duration-300
  "
>

  {/* Imagen */}

  <div className="relative group bg-[#f7f8f8]">

    <img
      src={
        producto.imagenes?.[0] ||
        producto.imagen ||
        "/sin-imagen.png"
      }
      alt={producto.nombre}
      className="
        w-full
        h-72
        object-contain
        p-6
      "
    />

    {/* Botón que aparece al pasar el mouse */}

    <div
      className="
        absolute
        bottom-0
        left-0
        right-0
        opacity-0
        group-hover:opacity-100
        transition
        duration-300
      "
    >

      <a
        href={`/producto/${producto.id}`}
        className="
          block
          text-center
          bg-yellow-700
          hover:bg-yellow-800
          text-white
          font-semibold
          py-4
        "
      >

        Ver producto

      </a>

    </div>

  </div>

  {/* Información */}

  <div className="p-5">

    <h3
  className="
    mt-5
    text-center
    font-semibold
    text-[20px]
    leading-7
    text-gray-900
    line-clamp-2
    min-h-[58px]
  "
>
  {producto.nombre}
</h3>

      {producto.sku && (

        <p
          className="
            text-gray-500
            text-sm
            text-center
            mt-2
          "
        >

          SKU: {producto.sku}

        </p>

      )}

      {producto.marca && (

         <p
    className="
      mt-3
      text-center
      text-sm
      uppercase
      tracking-[2px]
      text-gray-500
      font-medium
    "
  >

          {producto.marca}

        </p>

      )}

      <p
        className="  
        mt-6
        text-center
        text-[20px]
        font-bold
        text-emerald-700
        "
        >

        S/ {Number(producto.precio).toFixed(2)}

      </p>

  </div>

</div>

      ))}

    </div>

  );

}
