"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "../app/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Hero() {
  const [productos, setProductos] = useState([]);
  const [slide, setSlide] = useState(0);

  // =========================================================
  // CARGAR PRODUCTOS DESDE FIREBASE
  // =========================================================

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const snapshot = await getDocs(collection(db, "productos"));

        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProductos(lista);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    cargarProductos();
  }, []);

  // =========================================================
  // SLIDER AUTOMÁTICO
  // =========================================================

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlide((actual) => (actual + 1) % 4);
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  // =========================================================
  // CAMBIAR SLIDE
  // =========================================================

  const anteriorSlide = () => {
    setSlide((actual) => (actual - 1 + 4) % 4);
  };

  const siguienteSlide = () => {
    setSlide((actual) => (actual + 1) % 4);
  };

  // =========================================================
  // PRODUCTOS POR CATEGORÍA
  // =========================================================

  const obtenerProductos = (categoria) => {
    return productos
      .filter(
        (producto) =>
          producto.categoria?.toLowerCase() === categoria.toLowerCase()
      )
      .slice(0, 10);
  };

  const pinturas = obtenerProductos("Pintura");
  const electricidad = obtenerProductos("Electricidad");
  const herramientas = obtenerProductos("Herramientas");
  const gasfiteria = obtenerProductos("Gasfitería");

  // =========================================================
  // IMAGEN DEL PRODUCTO
  // =========================================================

  const obtenerImagen = (producto) => {
    if (
      Array.isArray(producto.imagenes) &&
      producto.imagenes.length > 0
    ) {
      return producto.imagenes[0];
    }

    if (producto.imagen) {
      return Array.isArray(producto.imagen)
        ? producto.imagen[0]
        : producto.imagen;
    }

    return "/sin-imagen.png";
  };

  return (
    <>
      {/* =========================================================
          ======================= PC ==============================
          ========================================================= */}

      <section className="hidden lg:block relative overflow-hidden bg-gradient-to-br from-[#07152F] via-[#0B1E45] to-[#081126]">

        {/* FONDO DE CUADRÍCULA */}

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(white 1px, transparent 1px),
              linear-gradient(90deg, white 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-10 py-20">

          <div className="grid grid-cols-2 gap-12 items-center">

            {/* TEXTO */}

            <div>

              <div className="w-24 h-1 bg-yellow-500 rounded-full mt-6"></div>

              <h1 className="mt-8 text-6xl xl:text-7xl font-black text-white leading-tight">
                Todo lo que
                <br />

                <span className="text-yellow-400">
                  necesitas
                </span>

                <br />

                para tu obra
              </h1>

              <p className="mt-8 text-gray-300 text-xl leading-9 max-w-xl">
                Encuentra herramientas profesionales,
                materiales de construcción,
                electricidad, pinturas, gasfitería
                y miles de productos con la mejor calidad.
              </p>

              <div className="flex gap-5 mt-10">

                <Link
                  href="/productos"
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-xl"
                >
                  Ver Productos
                </Link>

                <Link
                  href="/nosotros"
                  className="border border-white text-white px-8 py-4 rounded-xl"
                >
                  Conoce Más
                </Link>

              </div>

              <div className="grid grid-cols-3 gap-8 mt-14">

                <div>
                  <h2 className="text-yellow-400 text-4xl font-black">
                    +5000
                  </h2>

                  <p className="text-gray-300 mt-2">
                    Productos
                  </p>
                </div>

                <div>
                  <h2 className="text-yellow-400 text-4xl font-black">
                    +120
                  </h2>

                  <p className="text-gray-300 mt-2">
                    Marcas
                  </p>
                </div>

                <div>
                  <h2 className="text-yellow-400 text-4xl font-black">
                    100%
                  </h2>

                  <p className="text-gray-300 mt-2">
                    Garantía
                  </p>
                </div>

              </div>

            </div>

            {/* IMAGEN PC */}

            <div className="relative h-[620px] rounded-3xl overflow-hidden">

              <img
                src="/hero/hero-herramientas.jpg"
                alt="Herramientas"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          ====================== MÓVIL =============================
          ========================================================= */}

      <section
        className="
          lg:hidden
          bg-[#02080f]
          text-white
          pb-10
          w-full
          max-w-full
          overflow-x-hidden
        "
      >

        {/* =====================================================
            SLIDER PRINCIPAL
            ===================================================== */}

        <div
          className="
            relative
            w-full
            max-w-full
            min-w-0
            overflow-hidden
            pt-3
          "
        >

          {/* ÁREA DEL SLIDER */}

          <div
            className="
              relative
              w-full
              max-w-full
              min-w-0
              overflow-hidden
            "
          >

            {/* CONTENEDOR DE SLIDES */}

            <div
              className="
                flex
                w-full
                max-w-full
                min-w-0
                transition-transform
                duration-700
                ease-in-out
              "
              style={{
                transform: `translate3d(-${slide * 100}%, 0, 0)`,
              }}
            >

              {/* =================================================
                  SLIDE 1
                  ================================================= */}

              <div className="flex-none w-full min-w-0">

                <img
                  src="/hero/banner-catalogo-mobile.jpg"
                  alt="Catálogo Brico Hogar"
                  className="
                    block
                    w-full
                    max-w-full
                    aspect-[16/8]
                    object-cover
                    rounded-none
                  "
                />

              </div>


              {/* =================================================
                  SLIDE 2
                  ================================================= */}

              <div className="flex-none w-full min-w-0">

                <img
                  src="/hero/hero-herramientas-mobile.jpg"
                  alt="Herramientas"
                  className="
                    block
                    w-full
                    max-w-full
                    aspect-[16/8]
                    object-cover
                    rounded-none
                  "
                />

              </div>


              {/* =================================================
                  SLIDE 3
                  ================================================= */}

              <div className="flex-none w-full min-w-0">

                <img
                  src="/hero/hero-pinturas-mobile.jpg"
                  alt="Pinturas"
                  className="
                    block
                    w-full
                    max-w-full
                    aspect-[16/8]
                    object-cover
                    rounded-none
                  "
                />

              </div>


              {/* =================================================
                  SLIDE 4
                  ================================================= */}

              <div className="flex-none w-full min-w-0">

                <img
                  src="/hero/hero-herramientas-mobile.jpg"
                  alt="Productos Brico Hogar"
                  className="
                    block
                    w-full
                    max-w-full
                    aspect-[16/8]
                    object-cover
                    rounded-none
                  "
                />

              </div>

            </div>


            {/* =================================================
                FLECHA IZQUIERDA
                ================================================= */}

            <button
              type="button"
              onClick={anteriorSlide}
              aria-label="Banner anterior"
              className="
                absolute
                left-2
                top-1/2
                -translate-y-1/2
                z-20
                w-9
                h-9
                rounded-full
                bg-black/55
                hover:bg-black/75
                active:scale-95
                text-white
                flex
                items-center
                justify-center
                shadow-lg
                transition
              "
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="w-5 h-5"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />

              </svg>

            </button>


            {/* =================================================
                FLECHA DERECHA
                ================================================= */}

            <button
              type="button"
              onClick={siguienteSlide}
              aria-label="Siguiente banner"
              className="
                absolute
                right-2
                top-1/2
                -translate-y-1/2
                z-20
                w-9
                h-9
                rounded-full
                bg-black/55
                hover:bg-black/75
                active:scale-95
                text-white
                flex
                items-center
                justify-center
                shadow-lg
                transition
              "
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="w-5 h-5"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />

              </svg>

            </button>


            {/* =================================================
                INDICADORES
                ================================================= */}

            <div
              className="
                absolute
                bottom-3
                left-0
                right-0
                z-20
                flex
                justify-center
                gap-2
              "
            >

              {[0, 1, 2, 3].map((numero) => (

                <button
                  type="button"
                  key={numero}
                  onClick={() => setSlide(numero)}
                  aria-label={`Ir al banner ${numero + 1}`}
                  className={`
                    h-2.5
                    rounded-full
                    transition-all
                    ${
                      slide === numero
                        ? "bg-yellow-400 w-5"
                        : "bg-white/60 w-2.5"
                    }
                  `}
                />

              ))}

            </div>

          </div>

        </div>


        {/* =====================================================
            PINTURAS
            ===================================================== */}

        <CarruselProductos
          titulo="Pinturas"
          subtitulo="Productos destacados"
          productos={pinturas}
          obtenerImagen={obtenerImagen}
          ruta="/categorias/pintura"
        />


        {/* =====================================================
            ELECTRICIDAD
            ===================================================== */}

        <CarruselProductos
          titulo="Electricidad"
          subtitulo="Todo en materiales eléctricos"
          productos={electricidad}
          obtenerImagen={obtenerImagen}
          ruta="/categorias/electricidad"
        />


        {/* =====================================================
            HERRAMIENTAS
            ===================================================== */}

        <CarruselProductos
          titulo="Herramientas"
          subtitulo="Los más buscados"
          productos={herramientas}
          obtenerImagen={obtenerImagen}
          ruta="/categorias/herramientas"
        />


        {/* =====================================================
            GASFITERÍA
            ===================================================== */}

        <CarruselProductos
          titulo="Gasfitería"
          subtitulo="Soluciones para tu hogar"
          productos={gasfiteria}
          obtenerImagen={obtenerImagen}
          ruta="/categorias/gasfiteria"
        />


        {/* =====================================================
            WHATSAPP
            ===================================================== */}

        <a
          href="https://wa.me/51921883870"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="
            fixed
            bottom-5
            right-5
            w-14
            h-14
            rounded-full
            bg-green-500
            flex
            items-center
            justify-center
            shadow-2xl
            z-50
          "
        >

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-8 h-8"
          >

            <path d="M20.52 3.48A11.79 11.79 0 0012.05 0C5.54 0 .24 5.3.24 11.82c0 2.08.54 4.1 1.57 5.88L0 24l6.47-1.7a11.75 11.75 0 005.58 1.42h.01c6.51 0 11.81-5.3 11.81-11.82 0-3.16-1.23-6.13-3.35-8.42ZM12.06 21.7h-.01a9.8 9.8 0 01-4.99-1.36l-.36-.21-3.84 1.01 1.03-3.75-.24-.39a9.82 9.82 0 1111.17 4.71Zm5.39-7.36c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.73.94-.9 1.13-.16.19-.33.22-.62.07-.29-.15-1.21-.45-2.31-1.44-.85-.76-1.42-1.7-1.59-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.33.44-.49.15-.16.19-.29.29-.49.1-.19.05-.36-.02-.51-.08-.15-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.49.07-.75.36-.26.29-.98.96-.98 2.33s1.01 2.69 1.15 2.88c.15.19 1.98 3.02 4.8 4.24.67.29 1.2.46 1.61.59.68.22 1.3.19 1.79.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34Z" />

          </svg>

        </a>

      </section>
    </>
  );
}


// ===============================================================
// ==================== CARRUSEL PRODUCTOS ========================
// ===============================================================

function CarruselProductos({
  titulo,
  subtitulo,
  productos,
  obtenerImagen,
  ruta,
}) {
  if (!productos || productos.length === 0) {
    return null;
  }

  return (
    <section className="mt-7 w-full max-w-full overflow-hidden">

      {/* =====================================================
          CABECERA
          ===================================================== */}

      <div className="flex items-center justify-between px-4 mb-3">

        <div>

          <h2 className="text-xl font-black text-white">
            {titulo}
          </h2>

          <p className="text-xs text-gray-400">
            {subtitulo}
          </p>

        </div>

        <Link
          href={ruta}
          className="text-yellow-400 text-sm font-semibold whitespace-nowrap"
        >
          Ver todos →
        </Link>

      </div>


      {/* =====================================================
          CARRUSEL DE PRODUCTOS
          ===================================================== */}

      <div
        className="
          flex
          gap-3
          overflow-x-auto
          overflow-y-hidden
          px-4
          pb-3
          snap-x
          snap-mandatory
          scrollbar-hide
          w-full
          max-w-full
        "
      >

        {productos.map((producto) => (

          <Link
            href={`/producto/${producto.id}`}
            key={producto.id}
            className="
              min-w-[155px]
              w-[155px]
              bg-white
              rounded-2xl
              overflow-hidden
              border
              border-gray-200
              shadow-sm
              snap-start
              flex-shrink-0
            "
          >

            {/* =================================================
                IMAGEN
                ================================================= */}

            <div
              className="
                relative
                bg-white
                h-[145px]
                flex
                items-center
                justify-center
                p-3
              "
            >

              <img
                src={obtenerImagen(producto)}
                alt={producto.nombre || "Producto"}
                className="
                  w-full
                  h-full
                  object-contain
                "
              />

            </div>


            {/* =================================================
                INFORMACIÓN
                ================================================= */}

            <div className="p-3 bg-white">

              {/* NOMBRE */}

              <h3
                className="
                  text-gray-900
                  text-sm
                  font-medium
                  leading-5
                  line-clamp-2
                  min-h-[40px]
                "
              >
                {producto.nombre}
              </h3>


              {/* =================================================
                  PRECIO
                  ================================================= */}

              {producto.oferta ? (

                <div className="mt-2">

                  {/* PRECIO NORMAL */}

                  <p
                    className="
                      text-gray-400
                      line-through
                      text-xs
                      font-normal
                      text-center
                    "
                  >
                    S/ {Number(producto.precio).toFixed(2)}
                  </p>


                  {/* PRECIO OFERTA */}

                  <p
                    className="
                      text-[#008000]
                      font-bold
                      text-lg
                      text-center
                      mt-1
                    "
                  >
                    S/ {Number(producto.oferta).toFixed(2)}
                  </p>

                </div>

              ) : (

                <p
                  className="
                    text-[#008000]
                    font-bold
                    text-lg
                    text-center
                    mt-2
                  "
                >
                  S/ {Number(producto.precio).toFixed(2)}
                </p>

              )}


              {/* =================================================
                  BOTÓN CARRITO
                  ================================================= */}

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                aria-label={`Agregar ${producto.nombre} al carrito`}
                className="
                  mt-2
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
                "
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-5 h-5 text-black"
                >

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l2.4 11.2a2 2 0 002 1.6h7.8a2 2 0 001.9-1.4L21 7H6"
                  />

                  <circle
                    cx="9"
                    cy="20"
                    r="1.5"
                    fill="currentColor"
                  />

                  <circle
                    cx="18"
                    cy="20"
                    r="1.5"
                    fill="currentColor"
                  />

                </svg>

              </button>

            </div>

          </Link>

        ))}

      </div>


      {/* =====================================================
          INDICADORES
          ===================================================== */}

      <div className="flex justify-center gap-1.5 mt-1">

        <span className="w-2 h-2 rounded-full bg-yellow-400"></span>

        <span className="w-2 h-2 rounded-full bg-gray-500"></span>

        <span className="w-2 h-2 rounded-full bg-gray-500"></span>

        <span className="w-2 h-2 rounded-full bg-gray-500"></span>

      </div>

    </section>
  );
}