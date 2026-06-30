"use client";

import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { db } from "../app/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Productos({ categoriaSeleccionada }) {

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {

    async function cargarProductos() {

      try {

        const querySnapshot = await getDocs(
          collection(db, "productos")
        );

        const listaProductos = [];

        querySnapshot.forEach((doc) => {

          listaProductos.push({
            id: doc.id,
            ...doc.data(),
          });

        });

        // Mostrar solo los primeros 4 productos
        setProductos(listaProductos.slice(0, 4));

      } catch (error) {

        console.error("Error cargando productos:", error);

      } finally {

        setCargando(false);

      }

    }

    cargarProductos();

  }, []);

  const productosFiltrados =
    categoriaSeleccionada === "todos"
      ? productos
      : productos.filter(
          (producto) =>
            producto.categoria === categoriaSeleccionada
        );

  return (

    <section
      id="productos"
      className="bg-gray-100 py-20"
    >

      <div className="max-w-7xl mx-auto px-6">

        {/* TÍTULO */}

        <div className="mb-12">

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">

            Productos más vendidos

          </h2>

          <p className="text-gray-500 text-lg mt-3">

            Descubre los productos preferidos por nuestros clientes.

          </p>

        </div>

        {/* CARGANDO */}

        {cargando ? (

          <div className="text-center py-20">

            <p className="text-2xl font-semibold">

              Cargando productos...

            </p>

          </div>

        ) : productosFiltrados.length === 0 ? (

          <div className="text-center py-20">

            <h3 className="text-3xl font-bold mb-4">

              No hay productos

            </h3>

            <p className="text-gray-500">

              No se encontraron productos para esta categoría.

            </p>

          </div>

        ) : (

          <>

            {/* PRODUCTOS */}

<div
  className="
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-4
    gap-10
    items-stretch
"
>
              {productosFiltrados.map((producto) => (

<div
  key={producto.id}
  className="
    group
    relative
    flex
    flex-col
    bg-white
    rounded-[26px]
    overflow-hidden
    border
    border-gray-200
    shadow-md
    hover:shadow-2xl
    hover:-translate-y-2
    transition-all
    duration-500
    min-h-[720px]
"
>

  {/* OFERTA */}

  {producto.precioAnterior > producto.precio && (

    <div className="absolute top-4 left-4 z-20">

      <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-lg">

        OFERTA

      </span>

    </div>

  )}

  {/* IMAGEN */}

  <div className="bg-gray-50 p-8">

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
        transition
        duration-500
        group-hover:scale-110
      "
    />

  </div>

  {/* INFORMACIÓN */}

  <div className="flex flex-col flex-1 p-6">

    <h3
      className="
        text-xl
        font-bold
        text-gray-900
        leading-7
        line-clamp-3
        min-h-[90px]
      "
    >

      {producto.nombre}

    </h3>

    {producto.marca && (

      <span
        className="
          mt-3
          text-xs
          uppercase
          tracking-[2px]
          text-gray-500
          font-semibold
        "
      >

        {producto.marca}

      </span>

    )}

    <div className="mt-6">

      {producto.precioAnterior > producto.precio && (

        <p className="text-gray-400 line-through text-lg">

          S/ {producto.precioAnterior}

        </p>

      )}

      <div className="flex items-end gap-1 mt-1">

        <span className="text-2xl font-bold text-emerald-700">

          S/

        </span>

        <span className="text-5xl font-extrabold text-emerald-700 leading-none">

          {producto.precio}

        </span>

      </div>

    </div>

    <a
      href={`/producto/${producto.id}`}
      className="
        mt-auto
        flex
        items-center
        justify-center
        gap-3
        bg-yellow-400
        hover:bg-yellow-500
        text-black
        font-bold
        py-4
        rounded-xl
        transition
      "
    >

      <FaShoppingCart />

      Ver producto

    </a>

  </div>

</div>


            

              </a>

            </div>

          </>

        )}

      </div>

    </section>

  );

}
