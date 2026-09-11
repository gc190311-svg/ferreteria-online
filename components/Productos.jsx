"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FiShoppingCart } from "react-icons/fi";
import { useCarrito } from "./context/CarritoContext";

import { db } from "../app/firebase";

export default function Productos({ categoriaSeleccionada }) {

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const { agregarProducto } = useCarrito();

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

       // Mostrar únicamente los productos marcados como "Más vendidos"
const productosMasVendidos = lista.filter(
  (producto) => producto.masVendido === true
);

setProductos(productosMasVendidos);

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
    flex
    gap-3
    overflow-x-auto
    overflow-y-hidden
    pb-4
    snap-x
    snap-mandatory
    scrollbar-hide
    touch-pan-x
    lg:grid
    lg:grid-cols-4
    lg:overflow-visible
    lg:pb-0
    lg:gap-10
    lg:snap-none
  "
  style={{
    WebkitOverflowScrolling: "touch",
    overscrollBehaviorX: "contain",
    scrollbarWidth: "none",
  }}
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
          flex-none
          w-[190px]
          sm:w-[215px]
          lg:w-auto
          lg:flex-1
          snap-start
          bg-white
          rounded-2xl
          border
          border-gray-200
          overflow-hidden
          shadow-sm
          hover:shadow-lg
          hover:-translate-y-1
          transition-all
          duration-300
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
    mt-2
    text-[15px]
    lg:text-[20px]
    font-semibold
    text-gray-900
    leading-7
    min-h-[65px]
    text-center
    w-full
  "
>
  {producto.nombre}
</h3>

          {/* SKU */}

{producto.sku && (
  <div className="mt-1 flex justify-center">
    <p className="text-xs lg:text-sm text-gray-500 font-semibold tracking-wide text-center">
      SKU: <span className="text-gray-700">{producto.sku}</span>
    </p>
  </div>
)}

{/* PRECIO */}

<div className="mt-auto min-h-[65px] flex flex-col items-center justify-center text-center">

  {producto.precioAnterior > producto.precio && (
    <p className="text-sm text-gray-400 line-through mb-1">
      S/ {Number(producto.precioAnterior).toFixed(2)}
    </p>
  )}

  <div className="flex justify-center items-baseline gap-1">

    <span
      className="
        text-base
        font-semibold
        text-emerald-700
      "
    >
      S/
    </span>

    <span
      className="
        text-xl
        lg:text-2xl
        font-bold
        text-emerald-700
        tracking-tight
      "
    >
      {Number(producto.precio).toFixed(2)}
    </span>

  </div>

</div>



          {/* BOTÓN */}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              agregarProducto({
                ...producto,
                cantidad: 1,
              });
            }}
            className="
              mt-3
              w-full
              h-9
              rounded-lg
              bg-yellow-500
              hover:bg-yellow-400
              text-black
              flex
              items-center
              justify-center
              transition
              duration-200
            "
            aria-label={`Agregar ${producto.nombre} al carrito`}
            title="Agregar al carrito"
          >
            <FiShoppingCart className="text-[19px] stroke-[2.5]" />
          </button>

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
      bg-yellow-500
      hover:bg-yellow-400
      text-black
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
            
