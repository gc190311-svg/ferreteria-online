"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCatalogo } from "../context/CatalogoContext";
import { useCarrito } from "../context/CarritoContext";

export default function GridProductos() {
  const { productosFiltrados } = useCatalogo();

  const { agregarProducto } = useCarrito();

  // ==========================================
  // CONFIGURACIÓN DE PAGINACIÓN
  // ==========================================

  const PRODUCTOS_POR_PAGINA = 12;

  const [paginaActual, setPaginaActual] = useState(1);

  // ==========================================
  // CANTIDADES SELECCIONADAS
  // ==========================================

  const [cantidades, setCantidades] = useState({});

  // ==========================================
  // REINICIAR PÁGINA
  // CUANDO CAMBIAN LOS PRODUCTOS
  // ==========================================

  useEffect(() => {
    setPaginaActual(1);
  }, [productosFiltrados]);

  // ==========================================
  // SI NO HAY PRODUCTOS
  // ==========================================

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

  // ==========================================
  // CALCULAR PAGINACIÓN
  // ==========================================

  const totalPaginas = Math.ceil(
    productosFiltrados.length / PRODUCTOS_POR_PAGINA
  );

  const indiceInicio =
    (paginaActual - 1) * PRODUCTOS_POR_PAGINA;

  const indiceFin =
    indiceInicio + PRODUCTOS_POR_PAGINA;

  const productosPagina =
    productosFiltrados.slice(
      indiceInicio,
      indiceFin
    );

  // ==========================================
  // CAMBIAR DE PÁGINA
  // ==========================================

  const cambiarPagina = (pagina) => {
    if (
      pagina < 1 ||
      pagina > totalPaginas
    ) {
      return;
    }

    setPaginaActual(pagina);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // GENERAR NÚMEROS DE PÁGINA
  // ==========================================

  const paginas = [];

  for (
    let i = 1;
    i <= totalPaginas;
    i++
  ) {
    paginas.push(i);
  }

  // ==========================================
  // OBTENER CANTIDAD DE UN PRODUCTO
  // ==========================================

  const obtenerCantidad = (id) => {
    return cantidades[id] || 1;
  };

  // ==========================================
  // AUMENTAR CANTIDAD
  // ==========================================

  const aumentarCantidad = (id) => {
    setCantidades((actual) => ({
      ...actual,
      [id]: obtenerCantidad(id) + 1,
    }));
  };

  // ==========================================
  // DISMINUIR CANTIDAD
  // ==========================================

  const disminuirCantidad = (id) => {
    const cantidadActual =
      obtenerCantidad(id);

    if (cantidadActual <= 1) {
      return;
    }

    setCantidades((actual) => ({
      ...actual,
      [id]: cantidadActual - 1,
    }));
  };

  // ==========================================
  // AÑADIR AL CARRITO
  // ==========================================

  const manejarAgregarAlCarrito = (
    producto
  ) => {
    const cantidad =
      obtenerCantidad(producto.id);

    agregarProducto({
      ...producto,
      cantidad,
    });

    // Reiniciar cantidad visual a 1
    // después de agregar
    setCantidades((actual) => ({
      ...actual,
      [producto.id]: 1,
    }));
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <>
      {/* ==========================================
          GRID DE PRODUCTOS
      ========================================== */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-5
          items-start
        "
      >
        {productosPagina.map((producto) => {
          const cantidad =
            obtenerCantidad(producto.id);

          return (
            <div
              key={producto.id}
              className="
                group
                relative

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
              {/* ==================================
                  IMAGEN
              ================================== */}

              <Link
                href={`/producto/${producto.id}`}
                className="
                  block
                  relative
                  bg-[#f7f8f8]
                  cursor-pointer
                  focus:outline-none
                  focus:ring-2
                  focus:ring-yellow-500
                  focus:ring-inset
                "
                aria-label={`Ver detalle de ${producto.nombre || "producto"}`}
              >
                <img
                  src={
                    producto.imagenes?.[0] ||
                    producto.imagen ||
                    "/sin-imagen.png"
                  }
                  alt={
                    producto.nombre ||
                    "Producto Brico Hogar"
                  }
                  className="
                    w-full
                    h-56
                    sm:h-64
                    lg:h-72

                    object-contain

                    p-4
                    sm:p-6

                    transition-transform
                    duration-300
                    group-hover:scale-[1.02]
                  "
                />
              </Link>

              {/* ==================================
                  INFORMACIÓN
              ================================== */}

              <div
                className="
                  flex
                  flex-col
                  justify-between

                  px-6
                  pb-6
                "
              >
                {/* NOMBRE */}

                <h3
                  className="
                    mt-4

                    text-center

                    font-semibold

                    text-base
                    sm:text-lg
                    lg:text-xl

                    leading-6

                    text-gray-900

                    line-clamp-2

                    min-h-[52px]
                  "
                >
                  <Link
                    href={`/producto/${producto.id}`}
                    className="
                      hover:text-yellow-600
                      transition-colors
                      focus:outline-none
                      focus:ring-2
                      focus:ring-yellow-500
                      rounded
                    "
                  >
                    {producto.nombre}
                  </Link>
                </h3>

                {/* SKU */}

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

                {/* MARCA */}

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

                {/* PRECIO */}

                <p
                  className="
                    mt-6

                    text-center

                    text-xl
                    sm:text-2xl

                    font-bold

                    text-emerald-700
                  "
                >
                  S/{" "}
                  {Number(
                    producto.oferta ||
                      producto.precio ||
                      0
                  ).toFixed(2)}
                </p>
              </div>

              {/* ==================================
                  PANEL DE COMPRA
                  
                  PC:
                  aparece al pasar el mouse

                  CELULAR:
                  permanece visible
              ================================== */}

              <div
                className="
                  w-full

                  bg-white

                  border-t
                  border-gray-200

                  p-3
                  sm:p-4

                  md:absolute
                  md:left-0
                  md:right-0
                  md:bottom-0

                  md:opacity-0
                  md:translate-y-full

                  md:group-hover:opacity-100
                  md:group-hover:translate-y-0

                  transition-all
                  duration-300
                  ease-out

                  z-20
                "
              >
                {/* ==================================
                    CONTROLES DE CANTIDAD
                ================================== */}

                <div
                  className="
                    flex
                    justify-center

                    mb-3
                  "
                >
                  <div
                    className="
                      flex
                      items-center

                      overflow-hidden

                      rounded-lg

                      border
                      border-gray-300

                      bg-white

                      shadow-sm
                    "
                  >
                    {/* MENOS */}

                    <button
                      type="button"
                      onClick={() =>
                        disminuirCantidad(
                          producto.id
                        )
                      }
                      className="
                        w-11
                        h-10

                        flex
                        items-center
                        justify-center

                        text-xl
                        font-bold

                        text-gray-700

                        hover:bg-gray-100

                        active:bg-gray-200

                        transition
                      "
                      aria-label="Disminuir cantidad"
                    >
                      −
                    </button>

                    {/* CANTIDAD */}

                    <span
                      className="
                        w-12
                        h-10

                        flex
                        items-center
                        justify-center

                        font-semibold

                        text-gray-900

                        border-l
                        border-r
                        border-gray-300
                      "
                    >
                      {cantidad}
                    </span>

                    {/* MÁS */}

                    <button
                      type="button"
                      onClick={() =>
                        aumentarCantidad(
                          producto.id
                        )
                      }
                      className="
                        w-11
                        h-10

                        flex
                        items-center
                        justify-center

                        text-xl
                        font-bold

                        text-gray-700

                        hover:bg-gray-100

                        active:bg-gray-200

                        transition
                      "
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* ==================================
                    AÑADIR AL CARRITO
                ================================== */}

                <button
                  type="button"
                  onClick={() =>
                    manejarAgregarAlCarrito(
                      producto
                    )
                  }
                  className="
                    w-full

                    bg-yellow-500

                    hover:bg-yellow-400

                    active:bg-yellow-600

                    text-black

                    font-bold

                    py-3
                    px-4

                    rounded-lg

                    transition-all
                    duration-200

                    flex
                    items-center
                    justify-center

                    gap-2

                    shadow-sm

                    hover:shadow-md
                  "
                >
                  <span
                    className="
                      text-lg
                    "
                  >
                    🛒
                  </span>

                  <span>
                    Añadir al carrito
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ==========================================
          PAGINACIÓN
      ========================================== */}

      {totalPaginas > 1 && (
        <div
          className="
            flex
            flex-wrap

            justify-center
            items-center

            gap-2

            mt-10
            mb-8
          "
        >
          {/* ANTERIOR */}

          <button
            type="button"
            onClick={() =>
              cambiarPagina(
                paginaActual - 1
              )
            }
            disabled={
              paginaActual === 1
            }
            className={`
              px-4
              py-2

              rounded-lg

              font-semibold

              border

              transition

              ${
                paginaActual === 1
                  ? `
                    bg-gray-100
                    text-gray-400
                    cursor-not-allowed
                  `
                  : `
                    bg-white
                    text-gray-800

                    hover:bg-yellow-400
                    hover:border-yellow-400
                  `
              }
            `}
          >
            ‹ Anterior
          </button>

          {/* NÚMEROS */}

          {paginas.map((pagina) => (
            <button
              type="button"
              key={pagina}
              onClick={() =>
                cambiarPagina(pagina)
              }
              className={`
                min-w-[42px]

                px-3
                py-2

                rounded-lg

                font-semibold

                border

                transition

                ${
                  paginaActual === pagina
                    ? `
                      bg-yellow-500
                      border-yellow-500
                      text-black
                    `
                    : `
                      bg-white
                      border-gray-200
                      text-gray-700

                      hover:bg-yellow-100
                    `
                }
              `}
            >
              {pagina}
            </button>
          ))}

          {/* SIGUIENTE */}

          <button
            type="button"
            onClick={() =>
              cambiarPagina(
                paginaActual + 1
              )
            }
            disabled={
              paginaActual === totalPaginas
            }
            className={`
              px-4
              py-2

              rounded-lg

              font-semibold

              border

              transition

              ${
                paginaActual === totalPaginas
                  ? `
                    bg-gray-100
                    text-gray-400
                    cursor-not-allowed
                  `
                  : `
                    bg-white
                    text-gray-800

                    hover:bg-yellow-400
                    hover:border-yellow-400
                  `
              }
            `}
          >
            Siguiente ›
          </button>
        </div>
      )}

      {/* ==========================================
          INFORMACIÓN DE PRODUCTOS
      ========================================== */}

      <p
        className="
          text-center
          text-sm
          text-gray-500
          mb-8
        "
      >
        Mostrando{" "}
        {indiceInicio + 1}-
        {Math.min(
          indiceFin,
          productosFiltrados.length
        )}{" "}
        de{" "}
        {productosFiltrados.length}{" "}
        productos
      </p>
    </>
  );
}