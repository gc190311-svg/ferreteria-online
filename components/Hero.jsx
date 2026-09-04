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
  // BOTONES DEL BANNER
  // =========================================================

  const siguienteSlide = () => {
    setSlide((actual) => (actual + 1) % 4);
  };

  const anteriorSlide = () => {
    setSlide((actual) => (actual - 1 + 4) % 4);
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

  // ORDEN SOLICITADO
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
      {/* ===================================================== */}
      {/* ======================== PC ========================== */}
      {/* ===================================================== */}

      <section className="hidden lg:block relative overflow-hidden bg-gradient-to-br from-[#07152F] via-[#0B1E45] to-[#081126]">
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
              <div className="w-24 h-1 bg-yellow-500 rounded-full mt-6" />

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
                materiales de construcción, electricidad,
                pinturas, gasfitería y miles de productos
                con la mejor calidad.
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

      {/* ===================================================== */}
      {/* ======================= MÓVIL ======================== */}
      {/* ===================================================== */}

      <section className="lg:hidden bg-[#02080f] text-white pb-10 overflow-hidden">

        {/* ================================================= */}
        {/* BANNER PRINCIPAL                                  */}
        {/* ================================================= */}

        <div className="relative w-full overflow-hidden">

          <div
            className="flex w-full transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${slide * 100}%)`,
            }}
          >

            {/* BANNER 1 */}

            <div className="min-w-full flex-shrink-0">
              <img
                src="/hero/banner-catalogo-mobile.jpg"
                alt="Catálogo Brico Hogar"
                className="block w-full aspect-[16/8] object-cover"
              />
            </div>

            {/* BANNER 2 */}

            <div className="min-w-full flex-shrink-0">
              <img
                src="/hero/hero-herramientas-mobile.jpg"
                alt="Herramientas"
                className="block w-full aspect-[16/8] object-cover"
              />
            </div>

            {/* BANNER 3 */}

            <div className="min-w-full flex-shrink-0">
              <img
                src="/hero/hero-pinturas-mobile.jpg"
                alt="Pinturas"
                className="block w-full aspect-[16/8] object-cover"
              />
            </div>

            {/* BANNER 4 */}

            <div className="min-w-full flex-shrink-0">
              <img
                src="/hero/hero-herramientas-mobile.jpg"
                alt="Productos"
                className="block w-full aspect-[16/8] object-cover"
              />
            </div>

          </div>

          {/* ================================================= */}
          {/* FLECHA IZQUIERDA                                  */}
          {/* ================================================= */}

          <button
            type="button"
            aria-label="Banner anterior"
            onClick={anteriorSlide}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              z-10
              w-10
              h-10
              rounded-full
              bg-black/60
              flex
              items-center
              justify-center
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              className="w-6 h-6"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* ================================================= */}
          {/* FLECHA DERECHA                                   */}
          {/* ================================================= */}

          <button
            type="button"
            aria-label="Banner siguiente"
            onClick={siguienteSlide}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              z-10
              w-10
              h-10
              rounded-full
              bg-black/60
              flex
              items-center
              justify-center
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              className="w-6 h-6"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

        </div>

        {/* ================================================= */}
        {/* PINTURAS                                           */}
        {/* ================================================= */}

        <CarruselProductos
          titulo="Pinturas"
          subtitulo="Productos destacados"
          productos={pinturas}
          obtenerImagen={obtenerImagen}
          ruta="/categorias/pintura"
        />

        {/* ================================================= */}
        {/* ELECTRICIDAD                                       */}
        {/* ================================================= */}

        <CarruselProductos
          titulo="Electricidad"
          subtitulo="Todo en materiales eléctricos"
          productos={electricidad}
          obtenerImagen={obtenerImagen}
          ruta="/categorias/electricidad"
        />

        {/* ================================================= */}
        {/* HERRAMIENTAS                                       */}
        {/* ================================================= */}

        <CarruselProductos
          titulo="Herramientas"
          subtitulo="Los más buscados"
          productos={herramientas}
          obtenerImagen={obtenerImagen}
          ruta="/categorias/herramientas"
        />

        {/* ================================================= */}
        {/* GASFITERÍA                                         */}
        {/* ================================================= */}

        <CarruselProductos
          titulo="Gasfitería"
          subtitulo="Soluciones para tu hogar"
          productos={gasfiteria}
          obtenerImagen={obtenerImagen}
          ruta="/categorias/gasfiteria"
        />

        {/* ================================================= */}
        {/* WHATSAPP                                           */}
        {/* ================================================= */}

        <a
          href="https://wa.me/51921883870"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
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
            <path d="M20.52 3.48A11.79 11.79 0 0012.05 0C5.54 0 .24 5.3.24 11.82c0 2.08.54 4.1 1.57 5.88L0 24l6.47-1.7a11.75 11.75 0 005.58 1.42h.01c6.51 0 11.81-5.3 11.81-11.82 0-3.16-1.23-6.13-3.35-8.42Z" />
          </svg>
        </a>

      </section>
    </>
  );
}

/* ============================================================= */
/* ================= CARRUSEL DE PRODUCTOS ==================== */
/* ============================================================= */

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
    <section className="mt-7">

      {/* ===================================================== */}
      {/* CABECERA                                             */}
      {/* ===================================================== */}

      <div className="flex items-end justify-between px-4 mb-3">

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
          className="
            text-yellow-400
            text-sm
            font-bold
            whitespace-nowrap
          "
        >
          Ver todos →
        </Link>

      </div>

      {/* ===================================================== */}
      {/* PRODUCTOS                                            */}
      {/* ===================================================== */}

      <div
        className="
          flex
          gap-3
          overflow-x-auto
          px-4
          pb-3
          snap-x
          snap-mandatory
          scrollbar-hide
          overscroll-x-contain
        "
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >

        {productos.map((producto) => {

          const precio = Number(producto.precio);
          const oferta = Number(producto.oferta);

          return (
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

              {/* ================================================= */}
              {/* IMAGEN                                            */}
              {/* ================================================= */}

              <div
                className="
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

              {/* ================================================= */}
              {/* INFORMACIÓN                                       */}
              {/* ================================================= */}

              <div className="px-3 pt-3 pb-3">

                <h3
                  className="
                    text-gray-900
                    text-sm
                    font-bold
                    leading-5
                    line-clamp-2
                    min-h-[40px]
                  "
                >
                  {producto.nombre}
                </h3>

                {/* ================================================= */}
                {/* PRECIO                                            */}
                {/* VERDE #008000                                     */}
                {/* CENTRADO + NEGRITA                                */}
                {/* ================================================= */}

                {producto.oferta ? (

                  <div className="mt-2 text-center">

                    <p className="text-gray-500 line-through text-xs">
                      S/{" "}
                      {Number.isFinite(precio)
                        ? precio.toFixed(2)
                        : "0.00"}
                    </p>

                    <p
                      className="
                        text-[#008000]
                        font-bold
                        text-lg
                        leading-6
                      "
                    >
                      S/{" "}
                      {Number.isFinite(oferta)
                        ? oferta.toFixed(2)
                        : "0.00"}
                    </p>

                  </div>

                ) : (

                  <p
                    className="
                      text-[#008000]
                      font-bold
                      text-lg
                      leading-6
                      mt-2
                      text-center
                    "
                  >
                    S/{" "}
                    {Number.isFinite(precio)
                      ? precio.toFixed(2)
                      : "0.00"}
                  </p>

                )}

                {/* ================================================= */}
                {/* BOTÓN CARRITO                                     */}
                {/* ================================================= */}

                <div
                  className="
                    mt-2
                    w-full
                    h-9
                    rounded-lg
                    bg-yellow-500
                    flex
                    items-center
                    justify-center
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    className="w-5 h-5"
                  >
                    <circle
                      cx="9"
                      cy="20"
                      r="1"
                    />

                    <circle
                      cx="19"
                      cy="20"
                      r="1"
                    />

                    <path d="M3 4h2l2.4 11.4a2 2 0 002 1.6h7.8a2 2 0 002-1.6L21 8H6" />
                  </svg>
                </div>

              </div>

            </Link>
          );
        })}

      </div>

      {/* ===================================================== */}
      {/* PUNTOS DEL CARRUSEL DE PRODUCTOS                     */}
      {/* ===================================================== */}

      <div className="flex justify-center gap-1.5 mt-1">

        <span className="w-2 h-2 rounded-full bg-yellow-400" />

        <span className="w-2 h-2 rounded-full bg-gray-500" />

        <span className="w-2 h-2 rounded-full bg-gray-500" />

        <span className="w-2 h-2 rounded-full bg-gray-500" />

      </div>

    </section>
  );
}