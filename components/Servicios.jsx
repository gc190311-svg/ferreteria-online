"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../app/firebase";
import { useCarrito } from "./context/CarritoContext";

export default function Servicios() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const { agregarProducto } = useCarrito();

  // =========================================================
  // CARGAR PRODUCTOS DESDE FIREBASE
  // =========================================================

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "productos")
        );

        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProductos(lista);
      } catch (error) {
        console.error(
          "Error cargando productos:",
          error
        );
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, []);

  // =========================================================
  // OBTENER PRODUCTOS POR CATEGORÍA
  // =========================================================

  const obtenerProductos = (categoria) => {
    return productos
      .filter((producto) => {
        const categoriaProducto =
          producto.categoria?.toLowerCase() || "";

        return (
          categoriaProducto ===
          categoria.toLowerCase()
        );
      })
      .slice(0, 10);
  };

  const pinturas =
    obtenerProductos("Pintura");

  const electricidad =
    obtenerProductos("Electricidad");

  const herramientas =
    obtenerProductos("Herramientas");

  const gasfiteria =
    obtenerProductos("Gasfitería");

  // =========================================================
  // OBTENER IMAGEN DEL PRODUCTO
  // =========================================================

  const obtenerImagen = (producto) => {
    if (
      Array.isArray(producto.imagenes) &&
      producto.imagenes.length > 0
    ) {
      return producto.imagenes[0];
    }

    if (producto.imagen) {
      if (Array.isArray(producto.imagen)) {
        return producto.imagen[0];
      }

      return producto.imagen;
    }

    return "/sin-imagen.png";
  };

  // =========================================================
  // AGREGAR PRODUCTO AL CARRITO
  // =========================================================

  const agregarAlCarrito = (e, producto) => {
    e.preventDefault();
    e.stopPropagation();

    agregarProducto({
      ...producto,
      cantidad: 1,
    });
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <section className="servicios-productos-section">

      <div className="servicios-productos-container">

        {/* =====================================================
            ENCABEZADO
            ===================================================== */}

        <div className="servicios-productos-header">

          <div className="servicios-productos-line"></div>

          <h2>
            Nuestros{" "}
            <span>Productos</span>
          </h2>

          <p>
            Encuentra todo lo que necesitas
            para tus proyectos.
          </p>

        </div>

        {/* =====================================================
            CARGANDO
            ===================================================== */}

        {cargando ? (
          <div className="productos-cargando">
            Cargando productos...
          </div>
        ) : (
          <>

            {/* =================================================
                PINTURAS
                ================================================= */}

            <CarruselCategoria
              titulo="Pinturas"
              subtitulo="Productos destacados"
              productos={pinturas}
              obtenerImagen={obtenerImagen}
              agregarAlCarrito={agregarAlCarrito}
              ruta="/categorias/pintura"
            />

            {/* =================================================
                ELECTRICIDAD
                ================================================= */}

            <CarruselCategoria
              titulo="Electricidad"
              subtitulo="Todo en materiales eléctricos"
              productos={electricidad}
              obtenerImagen={obtenerImagen}
              agregarAlCarrito={agregarAlCarrito}
              ruta="/categorias/electricidad"
            />

            {/* =================================================
                HERRAMIENTAS
                ================================================= */}

            <CarruselCategoria
              titulo="Herramientas"
              subtitulo="Los más buscados"
              productos={herramientas}
              obtenerImagen={obtenerImagen}
              agregarAlCarrito={agregarAlCarrito}
              ruta="/categorias/herramientas"
            />

            {/* =================================================
                GASFITERÍA
                ================================================= */}

            <CarruselCategoria
              titulo="Gasfitería"
              subtitulo="Soluciones para tu hogar"
              productos={gasfiteria}
              obtenerImagen={obtenerImagen}
              agregarAlCarrito={agregarAlCarrito}
              ruta="/categorias/gasfiteria"
            />

          </>
        )}

      </div>

      {/* =====================================================
          ESTILOS
          ===================================================== */}

      <style jsx>{`

        /* =====================================================
           SECCIÓN PRINCIPAL
           ===================================================== */

        .servicios-productos-section {
          width: 100%;
          background: #f5f6f8;
          padding: 70px 20px;
          box-sizing: border-box;
        }

        .servicios-productos-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
        }


        /* =====================================================
           ENCABEZADO
           ===================================================== */

        .servicios-productos-header {
          margin-bottom: 38px;
        }

        .servicios-productos-line {
          width: 90px;
          height: 5px;
          background: #f2b900;
          border-radius: 10px;
          margin-bottom: 22px;
        }

        .servicios-productos-header h2 {
          margin: 0;
          font-size: 48px;
          line-height: 1.1;
          font-weight: 900;
          color: #111827;
        }

        .servicios-productos-header h2 span {
          color: #f2b900;
        }

        .servicios-productos-header p {
          margin: 12px 0 0;
          color: #6b7280;
          font-size: 19px;
        }


        /* =====================================================
           CATEGORÍA
           ===================================================== */

        .categoria-carrusel {
          margin-bottom: 42px;
          width: 100%;
        }

        .categoria-cabecera {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .categoria-titulo h3 {
          margin: 0;
          color: #111827;
          font-size: 27px;
          font-weight: 900;
        }

        .categoria-titulo p {
          margin: 4px 0 0;
          color: #6b7280;
          font-size: 15px;
        }

        .categoria-ver-todos {
          color: #d69e00;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          white-space: nowrap;
        }

        .categoria-ver-todos:hover {
          color: #a87900;
        }


        /* =====================================================
           CARRUSEL HORIZONTAL
           ===================================================== */

        .productos-carrusel {
          display: flex;
          gap: 18px;

          width: 100%;

          overflow-x: auto;
          overflow-y: hidden;

          padding: 5px 3px 18px;

          scroll-behavior: smooth;

          scrollbar-width: none;

          cursor: grab;

          box-sizing: border-box;
        }

        .productos-carrusel:active {
          cursor: grabbing;
        }

        .productos-carrusel::-webkit-scrollbar {
          display: none;
        }


        /* =====================================================
           TARJETA
           ===================================================== */

        .producto-card {
          flex: 0 0 220px;
          width: 220px;

          background: #ffffff;

          border: 1px solid #e5e7eb;

          border-radius: 18px;

          overflow: hidden;

          box-shadow:
            0 5px 15px
            rgba(0, 0, 0, 0.07);

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;

          box-sizing: border-box;
        }

        .producto-card:hover {
          transform: translateY(-4px);

          box-shadow:
            0 12px 25px
            rgba(0, 0, 0, 0.12);
        }


        /* =====================================================
           ENLACE DE IMAGEN
           ===================================================== */

        .producto-imagen-link {
          display: block;
          width: 100%;
          text-decoration: none;
          cursor: pointer;
        }


        /* =====================================================
           IMAGEN
           ===================================================== */

        .producto-imagen {
          width: 100%;
          height: 205px;

          background: #ffffff;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 15px;

          box-sizing: border-box;
        }

        .producto-imagen img {
          width: 100%;
          height: 100%;

          object-fit: contain;

          display: block;

          transition:
            transform 0.25s ease;
        }

        .producto-imagen-link:hover
        .producto-imagen img {
          transform: scale(1.04);
        }


        /* =====================================================
           INFORMACIÓN
           ===================================================== */

        .producto-info {
          padding: 14px 15px 15px;

          background: #ffffff;
        }


        /* =====================================================
           NOMBRE
           ===================================================== */

        .producto-nombre-link {
          display: block;

          color: #111827;

          font-size: 16px;

          line-height: 1.35;

          font-weight: 700;

          min-height: 43px;

          text-decoration: none;

          cursor: pointer;

          display: -webkit-box;

          -webkit-line-clamp: 2;

          -webkit-box-orient: vertical;

          overflow: hidden;
        }

        .producto-nombre-link:hover {
          color: #d69e00;
        }


        /* =====================================================
           PRECIO NORMAL
           ===================================================== */

        .producto-precio-normal {
          margin: 9px 0 0;

          color: #9ca3af;

          font-size: 13px;

          text-align: center;

          text-decoration: line-through;
        }


        /* =====================================================
           PRECIO
           ===================================================== */

        .producto-precio {
          margin: 5px 0 0;

          color: #008000;

          font-size: 21px;

          font-weight: 800;

          text-align: center;
        }


        /* =====================================================
           BOTÓN CARRITO
           ===================================================== */

        .producto-boton {
          width: 100%;

          height: 42px;

          margin-top: 12px;

          border: none;

          border-radius: 9px;

          background: #f2b900;

          color: #000000;

          display: flex;

          align-items: center;

          justify-content: center;

          cursor: pointer;

          transition:
            background 0.2s ease,
            transform 0.1s ease;
        }

        .producto-boton:hover {
          background: #e5ad00;
        }

        .producto-boton:active {
          transform: scale(0.97);
        }

        .producto-boton svg {
          width: 22px;
          height: 22px;
        }


        /* =====================================================
           MENSAJE CARGANDO
           ===================================================== */

        .productos-cargando {
          padding: 60px 0;

          text-align: center;

          color: #6b7280;

          font-size: 18px;
        }


        /* =====================================================
           MÓVIL
           ===================================================== */

        @media (max-width: 767px) {

          .servicios-productos-section {
            display: none !important;
          }

        }


        /* =====================================================
           TABLET
           ===================================================== */

        @media (min-width: 768px)
        and (max-width: 1024px) {

          .servicios-productos-section {
            padding: 55px 18px;
          }

          .servicios-productos-header h2 {
            font-size: 42px;
          }

          .producto-card {
            flex-basis: 210px;
            width: 210px;
          }

        }


        /* =====================================================
           PC GRANDE
           ===================================================== */

        @media (min-width: 1400px) {

          .servicios-productos-container {
            max-width: 1400px;
          }

          .producto-card {
            flex-basis: 220px;
            width: 220px;
          }

        }

      `}</style>

    </section>
  );
}


/* =============================================================
   COMPONENTE CARRUSEL DE CATEGORÍA
   ============================================================= */

function CarruselCategoria({
  titulo,
  subtitulo,
  productos,
  obtenerImagen,
  agregarAlCarrito,
  ruta,
}) {

  if (!productos || productos.length === 0) {
    return null;
  }

  return (
    <div className="categoria-carrusel">

      {/* =====================================================
          CABECERA
          ===================================================== */}

      <div className="categoria-cabecera">

        <div className="categoria-titulo">

          <h3>
            {titulo}
          </h3>

          <p>
            {subtitulo}
          </p>

        </div>

        <Link
          href={ruta}
          className="categoria-ver-todos"
        >
          Ver todos →
        </Link>

      </div>


      {/* =====================================================
          PRODUCTOS
          ===================================================== */}

      <div className="productos-carrusel">

        {productos.map((producto) => (

          <article
            key={producto.id}
            className="producto-card"
          >

            {/* =================================================
                IMAGEN → DETALLE DEL PRODUCTO
                ================================================= */}

            <Link
              href={`/producto/${producto.id}`}
              className="producto-imagen-link"
              aria-label={`Ver ${producto.nombre}`}
            >

              <div className="producto-imagen">

                <img
                  src={obtenerImagen(producto)}
                  alt={
                    producto.nombre ||
                    "Producto"
                  }
                />

              </div>

            </Link>


            {/* =================================================
                INFORMACIÓN
                ================================================= */}

            <div className="producto-info">

              {/* =================================================
                  NOMBRE → DETALLE
                  ================================================= */}

              <Link
                href={`/producto/${producto.id}`}
                className="producto-nombre-link"
              >
                {producto.nombre}
              </Link>


              {/* =================================================
                  PRECIO
                  ================================================= */}

              {Number(producto.oferta) > 0 ? (

                <>

                  <p className="producto-precio-normal">
                    S/{" "}
                    {Number(
                      producto.precio
                    ).toFixed(2)}
                  </p>

                  <p className="producto-precio">
                    S/{" "}
                    {Number(
                      producto.oferta
                    ).toFixed(2)}
                  </p>

                </>

              ) : (

                <p className="producto-precio">
                  S/{" "}
                  {Number(
                    producto.precio
                  ).toFixed(2)}
                </p>

              )}


              {/* =================================================
                  BOTÓN CARRITO
                  ================================================= */}

              <button
                type="button"
                className="producto-boton"
                onClick={(e) =>
                  agregarAlCarrito(
                    e,
                    producto
                  )
                }
                aria-label={`Agregar ${producto.nombre} al carrito`}
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
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

          </article>

        ))}

      </div>

    </div>
  );
}