"use client";

import { useState } from "react";
import { useCatalogo } from "../context/CatalogoContext";

export default function SidebarFiltros() {
  const {
    productos,
    categoriaSeleccionada,
    marcaSeleccionada,
    setMarcaSeleccionada,
  } = useCatalogo();

  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // ==========================================
  // NORMALIZAR TEXTO
  // ==========================================

  const normalizar = (texto = "") => {
    return String(texto)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/&/g, " y ")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  };

  // ==========================================
  // PRODUCTOS SEGÚN CATEGORÍA
  // ==========================================

  const productosCategoria =
    !categoriaSeleccionada ||
    normalizar(categoriaSeleccionada) === "todos"
      ? productos
      : productos.filter((producto) => {
          const categoriaProducto = normalizar(producto.categoria);
          const categoriaSeleccionadaNormalizada =
            normalizar(categoriaSeleccionada);

          return categoriaProducto === categoriaSeleccionadaNormalizada;
        });

  // ==========================================
  // CONTADOR DE MARCAS
  // ==========================================

  const marcas = {};

  productosCategoria.forEach((producto) => {
    if (!producto.marca) return;

    marcas[producto.marca] =
      (marcas[producto.marca] || 0) + 1;
  });

  const listaMarcas = Object.entries(marcas).sort();

  // ==========================================
  // SELECCIONAR MARCA
  // ==========================================

  const seleccionarMarca = (marca) => {
    setMarcaSeleccionada(marca);
    setMostrarFiltros(false);
  };

  return (
    <>
      {/* =====================================================
          VERSIÓN MÓVIL
          ===================================================== */}

      <div className="lg:hidden w-full mb-6">

        {/* BOTÓN PARA ABRIR FILTRO */}

        <button
          type="button"
          onClick={() => setMostrarFiltros(true)}
          className="
            w-full
            flex
            items-center
            justify-between
            bg-white
            border
            border-gray-200
            rounded-xl
            px-5
            py-4
            shadow-sm
            hover:bg-gray-50
            transition
          "
        >
          <span className="font-semibold text-gray-900">
            Filtrar por marca
          </span>

          <span className="text-xl">
            ☰
          </span>
        </button>

        {/* MARCA SELECCIONADA */}

        {marcaSeleccionada && (
          <div
            className="
              mt-2
              text-sm
              text-gray-500
              text-center
            "
          >
            Marca seleccionada:{" "}
            <span className="font-bold text-gray-900">
              {marcaSeleccionada}
            </span>
          </div>
        )}
      </div>

      {/* =====================================================
          PANEL LATERAL MÓVIL
          ===================================================== */}

      {mostrarFiltros && (
        <div
          className="
            fixed
            inset-0
            z-[99999]
            bg-black/70
            lg:hidden
          "
          onClick={() => setMostrarFiltros(false)}
        >

          {/* =================================================
              PANEL DERECHO
              ================================================= */}

          <div
            className="
              absolute
              top-0
              right-0
              bottom-0

              w-[88%]
              max-w-[420px]

              bg-white

              shadow-2xl

              flex
              flex-col

              animate-[slideInRight_0.25s_ease-out]
            "
            onClick={(e) => e.stopPropagation()}
          >

            {/* =================================================
                CABECERA
                ================================================= */}

            <div
              className="
                flex
                items-center
                justify-between

                bg-black
                text-white

                px-5
                py-5

                shrink-0
              "
            >
              <div>
                <h2
                  className="
                    text-xl
                    font-bold
                  "
                >
                  Filtrar por marca
                </h2>

                <p
                  className="
                    text-sm
                    text-gray-300
                    mt-1
                  "
                >
                  Selecciona una marca
                </p>
              </div>

              {/* BOTÓN X */}

              <button
                type="button"
                onClick={() => setMostrarFiltros(false)}
                className="
                  w-10
                  h-10

                  flex
                  items-center
                  justify-center

                  rounded-full

                  bg-white/10
                  hover:bg-white/20

                  text-white
                  text-2xl
                  font-bold

                  transition
                "
                aria-label="Cerrar filtros"
              >
                ×
              </button>
            </div>

            {/* =================================================
                CONTENIDO DEL FILTRO
                ================================================= */}

            <div
              className="
                flex-1
                overflow-y-auto

                px-4
                py-5
              "
            >

              {/* TODAS */}

              <button
                type="button"
                onClick={() => seleccionarMarca("")}
                className={`
                  w-full

                  flex
                  items-center
                  justify-between

                  px-4
                  py-4

                  rounded-xl

                  mb-3

                  border

                  transition

                  ${
                    marcaSeleccionada === ""
                      ? "bg-yellow-500 border-yellow-500 font-bold text-black"
                      : "bg-white border-gray-200 text-gray-800 hover:bg-gray-50"
                  }
                `}
              >
                <span>
                  Todas
                </span>

                <span className="font-bold">
                  {productosCategoria.length}
                </span>
              </button>

              {/* =================================================
                  LISTA DE MARCAS
                  ================================================= */}

              <div className="space-y-3">

                {listaMarcas.map(([marca, cantidad]) => (
                  <button
                    type="button"
                    key={marca}
                    onClick={() => seleccionarMarca(marca)}
                    className={`
                      w-full

                      flex
                      items-center
                      justify-between

                      px-4
                      py-4

                      rounded-xl

                      border

                      transition

                      ${
                        marcaSeleccionada === marca
                          ? "bg-yellow-500 border-yellow-500 font-bold text-black"
                          : "bg-white border-gray-200 text-gray-800 hover:bg-gray-50"
                      }
                    `}
                  >

                    <span>
                      {marca}
                    </span>

                    <span
                      className={`
                        text-sm
                        font-bold

                        ${
                          marcaSeleccionada === marca
                            ? "text-black"
                            : "text-gray-600"
                        }
                      `}
                    >
                      {cantidad}
                    </span>

                  </button>
                ))}

              </div>
            </div>

            {/* =================================================
                PIE DEL PANEL
                ================================================= */}

            <div
              className="
                shrink-0

                border-t
                border-gray-200

                bg-white

                px-4
                py-4
              "
            >

              <button
                type="button"
                onClick={() => setMostrarFiltros(false)}
                className="
                  w-full

                  bg-yellow-500
                  hover:bg-yellow-400

                  text-black

                  font-bold

                  py-4

                  rounded-xl

                  transition
                "
              >
                Ver productos
              </button>

            </div>

          </div>
        </div>
      )}

      {/* =====================================================
          VERSIÓN PC
          ===================================================== */}

      <aside
        className="
          hidden
          lg:block

          w-full
          lg:w-64

          lg:sticky
          lg:top-32

          lg:shrink-0
        "
      >

        {/* TITULO */}

        <h2
          className="
            text-4xl
            font-bold
            text-gray-900

            mb-8
          "
        >
          Marcas
        </h2>

        {/* TODAS */}

        <div
          onClick={() => setMarcaSeleccionada("")}
          className="
            flex
            items-center
            justify-between

            px-4
            py-4

            border-b
            border-gray-200

            cursor-pointer

            hover:bg-gray-50

            transition-all
            duration-300
          "
        >
          <span
            className="
              text-gray-800
              font-medium
            "
          >
            Todas
          </span>

          <span
            className="
              text-sm
              font-bold
              text-gray-700
            "
          >
            {productosCategoria.length}
          </span>
        </div>

        {/* MARCAS */}

        {listaMarcas.map(([marca, cantidad]) => (
          <div
            key={marca}
            onClick={() => setMarcaSeleccionada(marca)}
            className={`
              flex
              items-center
              justify-between

              px-4
              py-4

              border-b
              border-gray-200

              cursor-pointer

              transition-all
              duration-300

              ${
                marcaSeleccionada === marca
                  ? "bg-yellow-500 rounded-lg"
                  : "hover:bg-gray-50"
              }
            `}
          >

            <span
              className={`
                ${
                  marcaSeleccionada === marca
                    ? "font-bold text-black"
                    : "text-gray-800"
                }
              `}
            >
              {marca}
            </span>

            {marcaSeleccionada === marca ? (
              <span
                className="
                  w-8
                  h-8

                  rounded-full

                  bg-yellow-600
                  text-black

                  text-xs
                  font-bold

                  flex
                  items-center
                  justify-center
                "
              >
                {cantidad}
              </span>
            ) : (
              <span
                className="
                  text-sm
                  font-bold
                  text-gray-700
                "
              >
                {cantidad}
              </span>
            )}

          </div>
        ))}

      </aside>
    </>
  );
}