"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FaShoppingCart } from "react-icons/fa";

import { db } from "../app/firebase";

export default function Productos({ categoriaSeleccionada }) {

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {

    async function cargarProductos() {

      try {

        const snapshot = await getDocs(
          collection(db, "productos")
        );

        const lista = [];

        snapshot.forEach((doc) => {

          lista.push({

            id: doc.id,

            ...doc.data(),

          });

        });

        // Mostrar únicamente los primeros productos
        setProductos(lista.slice(0, 4));

      } catch (error) {

        console.error(error);

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
      className="bg-[#f7f8fa] py-24"
    >

      <div className="max-w-7xl mx-auto px-6">

        {/* CABECERA */}

        <div className="mb-14">

          <div className="w-16 h-1 rounded-full bg-yellow-500 mb-5"></div>

          <h2
            className="
              text-5xl
              font-extrabold
              text-gray-900
            "
          >

            Productos más vendidos

          </h2>

          <p
            className="
              mt-4
              text-xl
              text-gray-500
            "
          >

            Descubre los productos preferidos por nuestros clientes.

          </p>

        </div>

        {/* CARGANDO */}

        {cargando ? (

          <div className="py-24 text-center">

            <p className="text-2xl font-semibold">

              Cargando productos...

            </p>

          </div>

        ) : productosFiltrados.length === 0 ? (

          <div className="py-24 text-center">

            <h3 className="text-3xl font-bold">

              No hay productos disponibles

            </h3>

            <p className="mt-3 text-gray-500">

              Intenta nuevamente más tarde.

            </p>

          </div>

        ) : (

          <>

 {/* GRID DE PRODUCTOS */}

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

  {productosFiltrados.map((producto) => {

    const tieneOferta =
      Number(producto.precioAnterior || 0) >
      Number(producto.precio || 0);

    return (

      <div
        key={producto.id}
        className="
          group
          relative
          flex
          flex-col
          bg-white
          rounded-[26px]
          border
          border-gray-200
          overflow-hidden
          shadow-md
          hover:shadow-2xl
          hover:-translate-y-2
          transition-all
          duration-500
        "
      >

        {/* BADGE OFERTA */}

        {tieneOferta && (

          <div className="absolute top-5 left-5 z-20">

            <span
              className="
                bg-red-600
                text-white
                text-xs
                font-bold
                px-3
                py-1
                rounded-full
                shadow
              "
            >

              OFERTA

            </span>

          </div>

        )}

        {/* IMAGEN */}

        <div
          className="
            bg-gray-50
            h-[320px]
            flex
            items-center
            justify-center
            overflow-hidden
          "
        >

          <img
            src={
              producto.imagenes?.[0] ||
              producto.imagen ||
              "/sin-imagen.png"
            }
            alt={producto.nombre}
            className="
              w-[85%]
              h-[85%]
              object-contain
              transition-transform
              duration-500
              group-hover:scale-110
            "
          />

        </div>

        {/* CONTENIDO */}

        <div
          className="
            flex
            flex-col
            flex-1
            p-6
          "
        >

          {/* MARCA */}

          {producto.marca && (

            <span
              className="
                uppercase
                tracking-[3px]
                text-xs
                text-gray-400
                font-semibold
              "
            >

              {producto.marca}

            </span>

          )}

          {/* NOMBRE */}

          <h3
            className="
              mt-3
              text-[20px]
              font-semibold
              text-gray-900
              leading-7
              min-h-[88px]
            "
          >

            {producto.nombre}

          </h3>

          {/* PRECIOS */}

          <div className="mt-5">

            {tieneOferta && (

              <p
                className="
                  text-gray-400
                  line-through
                  text-lg
                "
              >

                S/ {producto.precioAnterior}

              </p>

            )}

<div className="flex items-end gap-1 mt-2">

  <span
    className="
      text-lg
      font-semibold
      text-emerald-700
      mb-1
    "
  >
    S/
  </span>

  <span
  className="
    text-3xl
    font-bold
    leading-none
    text-emerald-700
  "
>
  {producto.precio}
</span>

</div>

          </div>

          {/* BOTÓN */}

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
              transition-all
              duration-300
            "
          >

            <FaShoppingCart />

            Ver producto

          </a>

        </div>

      </div>

    );

  })}

</div>    
{/* BOTÓN VER MÁS */}

<div className="text-center mt-16">

  <a
    href="/productos"
    className="
      inline-flex
      items-center
      justify-center
      px-10
      py-4
      bg-black
      hover:bg-gray-900
      text-white
      font-bold
      rounded-xl
      transition-all
      duration-300
      shadow-lg
      hover:shadow-xl
    "
  >

    Ver más productos

  </a>

</div>

          </>

        )}

      </div>

    </section>

  );

}
            
