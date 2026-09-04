"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";

import { db } from "../app/firebase";

export default function Productos({ categoriaSeleccionada }) {
  const router = useRouter();
  const { usuario, cargando: cargandoAuth } = useAuth();

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // ============================================================
  // CARGAR PRODUCTOS
  // ============================================================

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

        // ========================================================
        // SOLO PRODUCTOS MARCADOS COMO "MÁS VENDIDOS"
        // ========================================================

        const productosMasVendidos = lista.filter(
          (producto) => producto.masVendido === true
        );

        // NO LIMITAMOS A 4
        // Todos los productos podrán aparecer en el carrusel
        setProductos(productosMasVendidos);

      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

  // ============================================================
  // FILTRO POR CATEGORÍA
  // ============================================================

  const productosFiltrados =
    categoriaSeleccionada === "todos"
      ? productos
      : productos.filter(
          (producto) =>
            producto.categoria === categoriaSeleccionada
        );

  // ============================================================
  // ABRIR PRODUCTO
  // ============================================================

  const abrirProducto = (producto) => {
    const destino = `/producto/${producto.id}`;

    if (!usuario) {
      router.push(
        `/registro?redirect=${encodeURIComponent(destino)}`
      );
      return;
    }

    router.push(destino);
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <section
      id="productos"
      className="bg-[#f7f8fa] py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* ======================================================
            CABECERA
        ====================================================== */}

        <div className="mb-8 md:mb-12">

          {/* Línea amarilla */}
          <div className="w-16 h-1 rounded-full bg-yellow-500 mb-5"></div>

          <h2
            className="
              text-3xl
              md:text-5xl
              font-extrabold
              text-gray-900
              leading-tight
            "
          >
            Productos más vendidos
          </h2>

          <p
            className="
              mt-3
              md:mt-4
              text-base
              md:text-xl
              text-gray-500
            "
          >
            Descubre los productos preferidos por nuestros clientes.
          </p>

        </div>

        {/* ======================================================
            CARGANDO
        ====================================================== */}

        {cargando ? (

          <div className="py-20 text-center">

            <p className="text-lg md:text-2xl font-semibold text-gray-700">
              Cargando productos...
            </p>

          </div>

        ) : productosFiltrados.length === 0 ? (

          /* ====================================================
             SIN PRODUCTOS
          ==================================================== */

          <div className="py-20 text-center">

            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              No hay productos disponibles
            </h3>

            <p className="mt-3 text-gray-500">
              Intenta nuevamente más tarde.
            </p>

          </div>

        ) : (

          /* ====================================================
             CARRUSEL DE PRODUCTOS
          ==================================================== */

          <div
            className="
              flex
              gap-3
              md:gap-5
              overflow-x-auto
              overflow-y-hidden
              pb-4
              snap-x
              snap-mandatory
              touch-pan-x
              overscroll-x-contain
            "
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
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
                    flex-shrink-0
                    snap-start

                    w-[205px]
                    sm:w-[230px]
                    md:w-[260px]
                    lg:w-[280px]

                    bg-white
                    rounded-2xl
                    md:rounded-[24px]

                    border
                    border-gray-200

                    overflow-hidden

                    shadow-sm
                    hover:shadow-xl
                    hover:-translate-y-1

                    transition-all
                    duration-300
                  "
                >

                  {/* ==================================================
                      OFERTA
                  ================================================== */}

                  {tieneOferta && (

                    <div className="absolute top-3 left-3 z-20">

                      <span
                        className="
                          bg-red-600
                          text-white
                          text-[10px]
                          md:text-xs
                          font-bold
                          px-2
                          md:px-3
                          py-1
                          rounded-full
                          shadow
                        "
                      >
                        OFERTA
                      </span>

                    </div>

                  )}

                  {/* ==================================================
                      IMAGEN
                  ================================================== */}

                  <button
                    type="button"
                    onClick={() => {
                      if (cargandoAuth) return;
                      abrirProducto(producto);
                    }}
                    className="
                      w-full
                      bg-gray-50
                      h-[180px]
                      md:h-[220px]

                      flex
                      items-center
                      justify-center

                      overflow-hidden

                      cursor-pointer
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

                        group-hover:scale-105
                      "
                    />

                  </button>

                  {/* ==================================================
                      CONTENIDO
                  ================================================== */}

                  <div
                    className="
                      flex
                      flex-col
                      flex-1
                      p-4
                      md:p-5
                    "
                  >

                    {/* =================================================
                        MARCA
                    ================================================= */}

                    {producto.marca && (

                      <span
                        className="
                          uppercase
                          tracking-[2px]
                          text-[10px]
                          md:text-xs
                          text-gray-400
                          font-semibold
                        "
                      >
                        {producto.marca}
                      </span>

                    )}

                    {/* =================================================
                        NOMBRE
                    ================================================= */}

                    <h3
                      className="
                        mt-2
                        text-[15px]
                        md:text-[17px]
                        font-semibold
                        text-gray-900
                        leading-5
                        md:leading-6

                        min-h-[48px]

                        text-left
                      "
                    >
                      {producto.nombre}
                    </h3>

                    {/* =================================================
                        SKU
                    ================================================= */}

                    {producto.sku && (

                      <div className="mt-1">

                        <p
                          className="
                            text-[11px]
                            md:text-xs
                            text-gray-500
                            font-semibold
                          "
                        >
                          SKU:{" "}
                          <span className="text-gray-700">
                            {producto.sku}
                          </span>
                        </p>

                      </div>

                    )}

                    {/* =================================================
                        PRECIO
                    ================================================= */}

                    <div
                      className="
                        mt-3
                        min-h-[55px]

                        flex
                        flex-col
                        items-center
                        justify-center

                        text-center
                      "
                    >

                      {tieneOferta && (

                        <p
                          className="
                            text-xs
                            md:text-sm
                            text-gray-400
                            line-through
                            mb-1
                          "
                        >
                          S/{" "}
                          {Number(
                            producto.precioAnterior
                          ).toFixed(2)}
                        </p>

                      )}

                      <div
                        className="
                          flex
                          justify-center
                          items-baseline
                          gap-1
                        "
                      >

                        <span
                          className="
                            text-sm
                            md:text-base
                            font-bold
                            text-[#008000]
                          "
                        >
                          S/
                        </span>

                        <span
                          className="
                            text-xl
                            md:text-2xl
                            font-bold
                            text-[#008000]
                            tracking-tight
                          "
                        >
                          {Number(
                            producto.precio
                          ).toFixed(2)}
                        </span>

                      </div>

                    </div>

                    {/* =================================================
                        BOTÓN
                    ================================================= */}

                    <button
                      type="button"
                      onClick={() => {
                        if (cargandoAuth) return;
                        abrirProducto(producto);
                      }}
                      disabled={cargandoAuth}
                      className="
                        mt-2

                        w-full
                        h-11
                        md:h-12

                        flex
                        items-center
                        justify-center

                        bg-yellow-400
                        hover:bg-yellow-500

                        text-black

                        rounded-xl

                        transition-all
                        duration-300

                        disabled:opacity-70
                        disabled:cursor-wait
                      "
                      aria-label={`Ver ${producto.nombre}`}
                    >

                      <FaShoppingCart
                        className="
                          text-black
                          text-base
                          md:text-lg
                        "
                      />

                    </button>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>

      {/* ==========================================================
          OCULTAR BARRA DE DESPLAZAMIENTO DEL CARRUSEL
      ========================================================== */}

      <style jsx>{`
        #productos div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

    </section>
  );
}