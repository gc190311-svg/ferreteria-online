"use client";


import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { db } from "../app/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useCarrito } from "./context/CarritoContext";
import { useAuth } from "./context/AuthContext";

export default function Hero() {
  const [productos, setProductos] = useState([]);
  const [slide, setSlide] = useState(0);

  const { agregarProducto } = useCarrito();
  const { usuario } = useAuth();

  // ================================
  // CARGAR PRODUCTOS FIREBASE
  // ================================
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

  // ================================
  // SLIDER AUTOMÁTICO
  // ================================
  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlide((actual) => (actual + 1) % 4);
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  // ================================
  // NAVEGACIÓN MANUAL DEL SLIDER
  // ================================
  const anteriorSlide = () => {
    setSlide((actual) => (actual - 1 + 4) % 4);
  };

  const siguienteSlide = () => {
    setSlide((actual) => (actual + 1) % 4);
  };

  // ================================
  // AGREGAR PRODUCTO AL CARRITO
  // ================================
  const agregarAlCarrito = (e, producto) => {
    e.preventDefault();
    e.stopPropagation();

    // Si el cliente no ha iniciado sesión,
    // lo enviamos al registro y luego puede volver al producto.
    if (!usuario) {
      const destino = `/producto/${producto.id}`;
      window.location.href = `/registro?redirect=${encodeURIComponent(destino)}`;
      return;
    }

    agregarProducto({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      oferta: producto.oferta,
      imagen: producto.imagen,
      imagenes: producto.imagenes,
      cantidad: 1,
    });
  };

  // ================================
  // PRODUCTOS POR CATEGORÍA
  // ================================
  const obtenerProductos = (categoria) => {
    return productos
      .filter(
        (producto) =>
          producto.categoria?.toLowerCase() ===
          categoria.toLowerCase()
      )
      .slice(0, 10);
  };

  const herramientas = obtenerProductos("Herramientas");
  const pinturas = obtenerProductos("Pintura");
  const gasfiteria = obtenerProductos("Gasfitería");
  const electricidad = obtenerProductos("Electricidad");

  // ================================
  // IMAGEN DEL PRODUCTO
  // ================================
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
      {/* ========================================================= */}
      {/* ======================= PC ============================== */}
      {/* ==================== SLIDER PC ========================== */}
      {/* ========================================================= */}

      <section className="hidden lg:block relative w-full overflow-hidden">
  <div className="relative w-full h-[460px] xl:h-[500px] 2xl:h-[500px] overflow-hidden">

          {/* ========================================================= */}
{/* BANNERS PC - OCUPAN TODO EL ANCHO */}
{/* ========================================================= */}

<div
  className="flex w-full h-full transition-transform duration-700 ease-in-out"
  style={{
    transform: `translateX(-${slide * 100}%)`,
  }}
>
  {/* BANNER PC 1 */}
  <div className="min-w-full w-full h-full flex-shrink-0 relative overflow-hidden">
    <img
      src="/hero/banner-catalogo.jpg"
      alt="Promoción Brico Hogar"
      className="absolute inset-0 w-full h-full object-cover"
    />
  </div>

  {/* BANNER PC 2 */}
  <div className="min-w-full w-full h-full flex-shrink-0 relative overflow-hidden">
    <img
      src="/hero/pcbanner-2.jpg"
      alt="Herramientas Brico Hogar"
      className="absolute inset-0 w-full h-full object-cover"
    />
  </div>

  {/* BANNER PC 3 */}
  <div className="min-w-full w-full h-full flex-shrink-0 relative overflow-hidden">
    <img
      src="/hero/pcbanner-3.jpg"
      alt="Pinturas Brico Hogar"
      className="absolute inset-0 w-full h-full object-cover"
    />
  </div>

  {/* BANNER PC 4 */}
  <div className="min-w-full w-full h-full flex-shrink-0 relative overflow-hidden">
    <img
      src="/hero/pcbanner-4.jpg"
      alt="Productos Brico Hogar"
      className="absolute inset-0 w-full h-full object-cover"
    />
  </div>
</div>

          {/* FLECHA IZQUIERDA */}
          <button
            type="button"
            onClick={anteriorSlide}
            aria-label="Banner anterior"
            className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-black shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* FLECHA DERECHA */}
          <button
            type="button"
            onClick={siguienteSlide}
            aria-label="Siguiente banner"
            className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-black shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* INDICADORES PC */}
          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
            {[0, 1, 2, 3].map((numero) => (
              <button
                type="button"
                key={numero}
                onClick={() => setSlide(numero)}
                aria-label={`Ir al banner ${numero + 1}`}
                className={`h-2 rounded-full transition-all ${
                  slide === numero ? "bg-yellow-400 w-7" : "bg-white/70 w-2"
                }`}
              />
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* ================= PRODUCTOS PC ========================== */}
      {/* ========================================================= */}

      <section className="hidden lg:block w-full bg-[#f4f5f7] py-12 overflow-hidden">
        <div className="w-full max-w-[1500px] mx-auto px-8">

          {/* TÍTULO */}
          <div className="mb-8">
            <div className="w-20 h-1 bg-yellow-500 rounded-full mb-5"></div>
            <h2 className="text-5xl font-black text-[#111827]">
              Nuestros <span className="text-yellow-500">Productos</span>
            </h2>
            <p className="mt-2 text-lg text-gray-500">
              Encuentra todo lo que necesitas para tus proyectos.
            </p>
          </div>

          {/* 4 LÍNEAS DE PRODUCTOS */}
          <CarruselProductos
            titulo="Pinturas"
            subtitulo="Productos destacados"
            productos={pinturas}
            obtenerImagen={obtenerImagen}
            ruta="/categorias/pintura"
            agregarAlCarrito={agregarAlCarrito}
          />

          <CarruselProductos
            titulo="Electricidad"
            subtitulo="Todo en materiales eléctricos"
            productos={electricidad}
            obtenerImagen={obtenerImagen}
            ruta="/categorias/electricidad"
            agregarAlCarrito={agregarAlCarrito}
          />

          <CarruselProductos
            titulo="Herramientas"
            subtitulo="Los más buscados"
            productos={herramientas}
            obtenerImagen={obtenerImagen}
            ruta="/categorias/herramientas"
            agregarAlCarrito={agregarAlCarrito}
          />

          <CarruselProductos
            titulo="Gasfitería"
            subtitulo="Soluciones para tu hogar"
            productos={gasfiteria}
            obtenerImagen={obtenerImagen}
            ruta="/categorias/gasfiteria"
            agregarAlCarrito={agregarAlCarrito}
          />

        </div>
      </section>

      {/* ========================================================= */}
      {/* ====================== MÓVIL ============================ */}
      {/* ========================================================= */}

      <section className="lg:hidden bg-[#f4f5f7] text-gray-900 pb-10 w-full max-w-full overflow-x-hidden">

        {/* ===================================================== */}
        {/* SLIDER PRINCIPAL */}
        {/* ===================================================== */}

        <div className="relative pt-0 w-full max-w-full min-w-0 overflow-hidden">

          {/* CONTENEDOR DEL SLIDER */}
          <div
            className="relative w-full max-w-full min-w-0 overflow-hidden"
          >

            <div
              className="flex w-full min-w-0 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${slide * 100}%)`,
              }}
            >

              {/* SLIDE 1 */}

              <div className="min-w-full">

                <img
                  src="/hero/banner-catalogo-mobile.jpg"
                  alt="Catálogo Brico Hogar"
                  className="w-full aspect-[16/8] object-cover rounded-none"
                />

              </div>


              {/* SLIDE 2 */}

              <div className="min-w-full">

                <img
                  src="/hero/hero-herramientas-mobile.jpg"
                  alt="Herramientas"
                 className="w-full aspect-[16/8] object-cover rounded-none"
                />

              </div>


              {/* SLIDE 3 */}

              <div className="min-w-full">

                <img
                  src="/hero/hero-pinturas-mobile.jpg"
                  alt="Pinturas"
                  className="w-full aspect-[16/8] object-cover rounded-none"
                />

              </div>


              {/* SLIDE 4 */}

              <div className="min-w-full">

                <img
                  src="/hero/hero-herramientas-mobile.jpg"
                  alt="Productos Brico Hogar"
                 className="w-full aspect-[16/8] object-cover rounded-none"
                />

              </div>

            </div>

            {/* FLECHA IZQUIERDA */}
            <button
              type="button"
              onClick={anteriorSlide}
              aria-label="Banner anterior"
              className="
                absolute left-2 top-1/2 -translate-y-1/2
                z-20
                w-9 h-9
                rounded-full
                bg-black/55
                hover:bg-black/75
                active:scale-95
                text-white
                flex items-center justify-center
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

            {/* FLECHA DERECHA */}
            <button
              type="button"
              onClick={siguienteSlide}
              aria-label="Siguiente banner"
              className="
                absolute right-2 top-1/2 -translate-y-1/2
                z-20
                w-9 h-9
                rounded-full
                bg-black/55
                hover:bg-black/75
                active:scale-95
                text-white
                flex items-center justify-center
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

            {/* INDICADORES */}
            <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-2">

              {[0, 1, 2, 3].map((numero) => (

                <button
                  type="button"
                  key={numero}
                  onClick={() => setSlide(numero)}
                  aria-label={`Ir al banner ${numero + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    slide === numero
                      ? "bg-yellow-400 w-5"
                      : "bg-white/60 w-2.5"
                  }`}
                />

              ))}

            </div>

          </div>

        </div>

        {/* ===================================================== */}
        {/* PINTURAS */}
        {/* ===================================================== */}

        <CarruselProductos
          titulo="Pinturas"
          subtitulo="Productos destacados"
          productos={pinturas}
          obtenerImagen={obtenerImagen}
          ruta="/categorias/pintura"
            agregarAlCarrito={agregarAlCarrito}
        />


        {/* ===================================================== */}
        {/* ELECTRICIDAD */}
        {/* ===================================================== */}

        <CarruselProductos
          titulo="Electricidad"
          subtitulo="Todo en materiales eléctricos"
          productos={electricidad}
          obtenerImagen={obtenerImagen}
          ruta="/categorias/electricidad"
            agregarAlCarrito={agregarAlCarrito}
        />


        {/* ===================================================== */}
        {/* HERRAMIENTAS */}
        {/* ===================================================== */}

        <CarruselProductos
          titulo="Herramientas"
          subtitulo="Los más buscados"
          productos={herramientas}
          obtenerImagen={obtenerImagen}
          ruta="/categorias/herramientas"
            agregarAlCarrito={agregarAlCarrito}
        />


        {/* ===================================================== */}
        {/* GASFITERÍA */}
        {/* ===================================================== */}

        <CarruselProductos
          titulo="Gasfitería"
          subtitulo="Soluciones para tu hogar"
          productos={gasfiteria}
          obtenerImagen={obtenerImagen}
          ruta="/categorias/gasfiteria"
            agregarAlCarrito={agregarAlCarrito}
        />


        {/* ===================================================== */}
        {/* WHATSAPP */}
        {/* ===================================================== */}

        <a
          href="https://wa.me/51921883870"
          target="_blank"
          rel="noopener noreferrer"
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


/* =============================================================== */
/* ==================== CARRUSEL PRODUCTOS ====================== */
/* =============================================================== */

function CarruselProductos({
  titulo,
  subtitulo,
  productos,
  obtenerImagen,
  agregarAlCarrito,
  ruta,
}) {
  const carruselRef = useRef(null);

  const moverCarrusel = (direccion) => {
    const carrusel = carruselRef.current;
    if (!carrusel) return;

    const distancia = window.innerWidth >= 1536 ? 1000 : 850;

    carrusel.scrollBy({
      left: direccion * distancia,
      behavior: "smooth",
    });
  };

  if (!productos || productos.length === 0) {
    return null;
  }

  return (
    <section className="mt-7 lg:mt-10 lg:w-full">

      {/* CABECERA */}
      <div className="flex items-center justify-between px-4 mb-3 lg:px-0 lg:mb-5">
        <div>
          <h2 className="text-xl font-black text-gray-900 lg:text-2xl lg:text-gray-900">
            {titulo}
          </h2>

          <p className="text-xs text-gray-400 lg:text-sm lg:text-gray-500">
            {subtitulo}
          </p>
        </div>

        <Link
          href={ruta}
          className="text-yellow-400 text-sm font-semibold lg:text-yellow-600 lg:text-base"
        >
          Ver todos →
        </Link>
      </div>

      {/* CARRUSEL */}
      <div className="relative group">

        {/* FLECHA IZQUIERDA — SOLO PC */}
        <button
          type="button"
          onClick={() => moverCarrusel(-1)}
          aria-label={`Ver productos anteriores de ${titulo}`}
          className="
            hidden lg:flex
            absolute left-2 top-1/2 -translate-y-1/2
            z-20
            w-11 h-11
            rounded-full
            bg-white
            border border-gray-200
            shadow-lg
            items-center justify-center
            text-gray-800
            hover:bg-yellow-500
            hover:text-black
            hover:scale-105
            transition-all duration-200
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

        <div
          ref={carruselRef}
          className="
            flex
            gap-3
            overflow-x-auto
            px-4
            pb-3
            snap-x
            snap-mandatory
            scrollbar-hide
            lg:gap-5
            lg:px-0
            lg:pb-4
            lg:overflow-x-auto
            lg:overflow-y-hidden
            cursor-default
          "
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >

          {productos.map((producto) => (
            <div
              key={producto.id}
              className="
                min-w-[155px]
                w-[155px]
                bg-white
                lg:min-w-[235px]
                lg:w-[235px]
                rounded-2xl
                overflow-hidden
                border
                border-gray-200
                shadow-sm
                snap-start
                flex-shrink-0
              "
            >

              {/* IMAGEN → DETALLE */}
              <Link
                href={`/producto/${producto.id}`}
                className="block"
                aria-label={`Ver detalle de ${producto.nombre}`}
              >
                <div
                  className="
                    relative
                    bg-white
                    h-[145px]
                    flex
                    lg:h-[205px]
                    items-center
                    justify-center
                    p-3
                    cursor-pointer
                  "
                >
                  <img
                    src={obtenerImagen(producto)}
                    alt={producto.nombre}
                    draggable="false"
                    className="
                      w-full
                      h-full
                      object-contain
                      transition-transform
                      duration-300
                      hover:scale-105
                    "
                  />
                </div>
              </Link>

              {/* INFORMACIÓN */}
              <div className="p-3 bg-white lg:p-4">

                {/* NOMBRE → DETALLE */}
                <Link
                  href={`/producto/${producto.id}`}
                  className="block"
                >
                  <h3
                    className="
                      text-gray-900
                      text-sm
                      font-medium
                      lg:text-base
                      lg:font-semibold
                      leading-5
                      line-clamp-2
                      min-h-[40px]
                      hover:text-yellow-600
                    "
                  >
                    {producto.nombre}
                  </h3>
                </Link>

                {/* PRECIO */}
                {producto.oferta ? (
                  <div className="mt-2">
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

                    <p
                      className="
                        text-[#008000]
                        font-bold
                        text-lg
                        text-center
                        lg:text-xl
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
                      lg:text-xl
                      mt-2
                    "
                  >
                    S/ {Number(producto.precio).toFixed(2)}
                  </p>
                )}

                {/* BOTÓN CARRITO */}
                <button
                  type="button"
                  onClick={(e) => agregarAlCarrito(e, producto)}
                  className="
                    mt-2
                    w-full
                    h-9
                    rounded-lg
                    bg-yellow-500
                    hover:bg-yellow-400
                    active:scale-[0.98]
                    text-black
                    flex
                    items-center
                    justify-center
                    transition
                    cursor-pointer
                  "
                  aria-label={`Agregar ${producto.nombre} al carrito`}
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
                      d="M3 3h2l2.4 11.2a2 2 0 002 1.6h7.8a1.9 1.9 0 001.9-1.4L21 7H6"
                    />

                    <circle cx="9" cy="20" r="1.5" fill="currentColor" />
                    <circle cx="18" cy="20" r="1.5" fill="currentColor" />
                  </svg>
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* FLECHA DERECHA — SOLO PC */}
        <button
          type="button"
          onClick={() => moverCarrusel(1)}
          aria-label={`Ver más productos de ${titulo}`}
          className="
            hidden lg:flex
            absolute right-2 top-1/2 -translate-y-1/2
            z-20
            w-11 h-11
            rounded-full
            bg-white
            border border-gray-200
            shadow-lg
            items-center justify-center
            text-gray-800
            hover:bg-yellow-500
            hover:text-black
            hover:scale-105
            transition-all duration-200
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

      </div>

      {/* OCULTAR BARRA DE DESPLAZAMIENTO */}
      <style jsx>{`
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>

    </section>
  );
}
