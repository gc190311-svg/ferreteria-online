

import { useMemo, useState } from "react";
import { useCatalogo } from "../context/CatalogoContext";

export default function SidebarFiltros({
  ocultarBotonMovil = false,
  cerrarFiltroExterno,
}) {
  const {
    productos,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    marcaSeleccionada,
    setMarcaSeleccionada,
  } = useCatalogo();

  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [seccionCategoria, setSeccionCategoria] = useState(true);
  const [seccionMarca, setSeccionMarca] = useState(true);

  // =====================================================
  // NORMALIZAR TEXTO
  // =====================================================

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

  // =====================================================
  // CATEGORÍAS
  // =====================================================

  const listaCategorias = useMemo(() => {
    const categorias = {};

    productos.forEach((producto) => {
      if (!producto.categoria) return;

      const nombre = String(producto.categoria).trim();

      if (!nombre) return;

      const clave = normalizar(nombre);

      if (!categorias[clave]) {
        categorias[clave] = {
          nombre,
          cantidad: 0,
        };
      }

      categorias[clave].cantidad += 1;
    });

    return Object.values(categorias).sort((a, b) =>
      a.nombre.localeCompare(b.nombre, "es")
    );
  }, [productos]);

  // =====================================================
  // PRODUCTOS SEGÚN CATEGORÍA
  // =====================================================

  const productosCategoria = useMemo(() => {
    if (
      !categoriaSeleccionada ||
      normalizar(categoriaSeleccionada) === "todos"
    ) {
      return productos;
    }

    return productos.filter(
      (producto) =>
        normalizar(producto.categoria) ===
        normalizar(categoriaSeleccionada)
    );
  }, [productos, categoriaSeleccionada]);

  // =====================================================
  // MARCAS
  // =====================================================

  const listaMarcas = useMemo(() => {
    const marcas = {};

    productosCategoria.forEach((producto) => {
      if (!producto.marca) return;

      const nombre = String(producto.marca).trim();

      if (!nombre) return;

      const clave = normalizar(nombre);

      if (!marcas[clave]) {
        marcas[clave] = {
          nombre,
          cantidad: 0,
        };
      }

      marcas[clave].cantidad += 1;
    });

    return Object.values(marcas).sort((a, b) =>
      a.nombre.localeCompare(b.nombre, "es")
    );
  }, [productosCategoria]);

  // =====================================================
  // FILTRO ACTIVO
  // =====================================================

  const hayFiltros =
    (categoriaSeleccionada &&
      normalizar(categoriaSeleccionada) !== "todos") ||
    marcaSeleccionada;

  // =====================================================
  // SELECCIONAR CATEGORÍA
  // =====================================================

  const seleccionarCategoria = (categoria) => {
  setCategoriaSeleccionada(categoria);
  setMarcaSeleccionada("");
  setMostrarFiltros(false);

  if (cerrarFiltroExterno) {
    cerrarFiltroExterno();
  }
};

  // =====================================================
  // SELECCIONAR MARCA
  // =====================================================

  const seleccionarMarca = (marca) => {
  setMarcaSeleccionada(marca);
  setMostrarFiltros(false);

  if (cerrarFiltroExterno) {
    cerrarFiltroExterno();
  }
};

  // =====================================================
  // LIMPIAR FILTROS
  // =====================================================

  const limpiarFiltros = () => {
  setCategoriaSeleccionada("todos");
  setMarcaSeleccionada("");
  setMostrarFiltros(false);

  if (cerrarFiltroExterno) {
    cerrarFiltroExterno();
  }
};

  // =====================================================
  // CATEGORÍA ACTUAL
  // =====================================================

  const categoriaActual =
    categoriaSeleccionada &&
    normalizar(categoriaSeleccionada) !== "todos"
      ? categoriaSeleccionada
      : "Todas";

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      {/* =====================================================
          ==================== MÓVIL ==========================
          ===================================================== */}
{!ocultarBotonMovil && (
      <div className="lg:hidden w-full mb-6">

        {/* BOTÓN PRINCIPAL */}

        <button
          type="button"
          onClick={() => setMostrarFiltros(true)}
          className="
            w-full
            bg-white
            border
            border-gray-200
            rounded-2xl
            px-5
            py-4
            flex
            items-center
            justify-between
            shadow-sm
            active:scale-[0.99]
            transition
          "
        >
          <div className="flex items-center gap-3">

            {/* ICONO */}

            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-yellow-400
                flex
                items-center
                justify-center
                text-black
              "
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="7" y1="12" x2="20" y2="12" />
                <line x1="10" y1="18" x2="20" y2="18" />
              </svg>
            </div>

            <div className="text-left">

              <p className="font-bold text-gray-900">
                Filtros
              </p>

              <p className="text-xs text-gray-500">
                {hayFiltros
                  ? `${categoriaActual}${
                      marcaSeleccionada
                        ? ` · ${marcaSeleccionada}`
                        : ""
                    }`
                  : "Todas las categorías y marcas"}
              </p>

            </div>
          </div>

          {/* FLECHA */}

          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>

        </button>

        {/* =====================================================
            FILTROS ACTIVOS
            ===================================================== */}

        {hayFiltros && (
          <div className="flex flex-wrap gap-2 mt-3">

            {categoriaActual !== "Todas" && (
              <div
                className="
                  flex
                  items-center
                  gap-2
                  bg-yellow-100
                  text-gray-900
                  px-3
                  py-1.5
                  rounded-full
                  text-xs
                  font-semibold
                "
              >
                {categoriaActual}
              </div>
            )}

            {marcaSeleccionada && (
              <div
                className="
                  flex
                  items-center
                  gap-2
                  bg-gray-100
                  text-gray-800
                  px-3
                  py-1.5
                  rounded-full
                  text-xs
                  font-semibold
                "
              >
                {marcaSeleccionada}
              </div>
            )}

            <button
              type="button"
              onClick={limpiarFiltros}
              className="
                text-xs
                font-semibold
                text-gray-500
                hover:text-black
                px-2
              "
            >
              Limpiar
            </button>

          </div>
        )}
      

     {/* =====================================================
          PANEL MÓVIL
          ===================================================== */}

      {(mostrarFiltros || ocultarBotonMovil) && (
        <div
          className="
            fixed
            inset-0
            z-[99999]
            bg-black/50
            lg:hidden
          "
          onClick={() => {
  setMostrarFiltros(false);

  if (cerrarFiltroExterno) {
    cerrarFiltroExterno();
  }
}}
        >

          <div
            className="
              absolute
              left-0
              right-0
              bottom-0
              bg-white
              rounded-t-[28px]
              max-h-[88vh]
              overflow-y-auto
              shadow-2xl
              p-5
            "
            onClick={(e) => e.stopPropagation()}
          >

            {/* =================================================
                INDICADOR
                ================================================= */}

            <div className="flex justify-center mb-5">
              <div
                className="
                  w-12
                  h-1.5
                  rounded-full
                  bg-gray-300
                "
              />
            </div>

            {/* =================================================
                CABECERA
                ================================================= */}

            <div
              className="
                flex
                items-center
                justify-between
                mb-5
              "
            >

              <div>
                <h2
                  className="
                    text-2xl
                    font-extrabold
                    text-gray-900
                  "
                >
                  Filtrar productos
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Encuentra exactamente lo que buscas
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMostrarFiltros(false)}
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-gray-100
                  flex
                  items-center
                  justify-center
                  text-xl
                  text-gray-700
                  font-bold
                  active:scale-95
                "
                aria-label="Cerrar filtros"
              >
                ×
              </button>

            </div>

            {/* =================================================
                CATEGORÍAS
                ================================================= */}

            <div
              className="
                border
                border-gray-200
                rounded-2xl
                overflow-hidden
                mb-4
              "
            >

              <button
                type="button"
                onClick={() =>
                  setSeccionCategoria(
                    (actual) => !actual
                  )
                }
                className="
                  w-full
                  flex
                  items-center
                  justify-between
                  px-4
                  py-4
                  bg-gray-50
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-9
                      h-9
                      rounded-xl
                      bg-yellow-400
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="7"
                        height="7"
                        rx="1"
                      />
                      <rect
                        x="14"
                        y="3"
                        width="7"
                        height="7"
                        rx="1"
                      />
                      <rect
                        x="3"
                        y="14"
                        width="7"
                        height="7"
                        rx="1"
                      />
                      <rect
                        x="14"
                        y="14"
                        width="7"
                        height="7"
                        rx="1"
                      />
                    </svg>
                  </div>

                  <span className="font-bold text-gray-900">
                    Categorías
                  </span>

                </div>

                <span className="text-gray-500 text-xl">
                  {seccionCategoria ? "−" : "+"}
                </span>

              </button>

              {seccionCategoria && (
                <div className="p-3 space-y-2">

                  {/* TODAS */}

                  <button
                    type="button"
                    onClick={() =>
                      seleccionarCategoria("todos")
                    }
                    className={`
                      w-full
                      flex
                      items-center
                      justify-between
                      px-4
                      py-3
                      rounded-xl
                      transition
                      ${
                        !categoriaSeleccionada ||
                        normalizar(
                          categoriaSeleccionada
                        ) === "todos"
                          ? "bg-yellow-400 text-black font-bold"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }
                    `}
                  >

                    <span>Todas</span>

                    <span
                      className="
                        text-xs
                        font-bold
                        px-2
                        py-1
                        rounded-full
                        bg-black/10
                      "
                    >
                      {productos.length}
                    </span>

                  </button>

                  {listaCategorias.map(
                    ({ nombre, cantidad }) => (
                      <button
                        key={normalizar(nombre)}
                        type="button"
                        onClick={() =>
                          seleccionarCategoria(
                            nombre
                          )
                        }
                        className={`
                          w-full
                          flex
                          items-center
                          justify-between
                          px-4
                          py-3
                          rounded-xl
                          transition
                          ${
                            normalizar(
                              categoriaSeleccionada
                            ) ===
                            normalizar(nombre)
                              ? "bg-yellow-400 text-black font-bold"
                              : "bg-white text-gray-700 hover:bg-gray-50"
                          }
                        `}
                      >

                        <span className="text-left">
                          {nombre}
                        </span>

                        <span
                          className={`
                            text-xs
                            font-bold
                            px-2
                            py-1
                            rounded-full
                            ${
                              normalizar(
                                categoriaSeleccionada
                              ) ===
                              normalizar(nombre)
                                ? "bg-black/10 text-black"
                                : "bg-gray-100 text-gray-600"
                            }
                          `}
                        >
                          {cantidad}
                        </span>

                      </button>
                    )
                  )}

                </div>
              )}

            </div>

            {/* =================================================
                MARCAS
                ================================================= */}

            <div
              className="
                border
                border-gray-200
                rounded-2xl
                overflow-hidden
              "
            >

              <button
                type="button"
                onClick={() =>
                  setSeccionMarca(
                    (actual) => !actual
                  )
                }
                className="
                  w-full
                  flex
                  items-center
                  justify-between
                  px-4
                  py-4
                  bg-gray-50
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-9
                      h-9
                      rounded-xl
                      bg-gray-900
                      text-white
                      flex
                      items-center
                      justify-center
                      font-bold
                      text-sm
                    "
                  >
                    M
                  </div>

                  <span className="font-bold text-gray-900">
                    Marcas
                  </span>

                </div>

                <span className="text-gray-500 text-xl">
                  {seccionMarca ? "−" : "+"}
                </span>

              </button>

              {seccionMarca && (
                <div className="p-3 space-y-2">

                  {/* TODAS LAS MARCAS */}

                  <button
                    type="button"
                    onClick={() =>
                      seleccionarMarca("")
                    }
                    className={`
                      w-full
                      flex
                      items-center
                      justify-between
                      px-4
                      py-3
                      rounded-xl
                      transition
                      ${
                        !marcaSeleccionada
                          ? "bg-yellow-400 text-black font-bold"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }
                    `}
                  >

                    <span>Todas las marcas</span>

                    <span
                      className="
                        text-xs
                        font-bold
                        px-2
                        py-1
                        rounded-full
                        bg-black/10
                      "
                    >
                      {productosCategoria.length}
                    </span>

                  </button>

                  {listaMarcas.map(
                    ({ nombre, cantidad }) => (
                      <button
                        key={normalizar(nombre)}
                        type="button"
                        onClick={() =>
                          seleccionarMarca(
                            nombre
                          )
                        }
                        className={`
                          w-full
                          flex
                          items-center
                          justify-between
                          px-4
                          py-3
                          rounded-xl
                          transition
                          ${
                            marcaSeleccionada ===
                            nombre
                              ? "bg-yellow-400 text-black font-bold"
                              : "bg-white text-gray-700 hover:bg-gray-50"
                          }
                        `}
                      >

                        <span className="text-left">
                          {nombre}
                        </span>

                        <span
                          className={`
                            text-xs
                            font-bold
                            px-2
                            py-1
                            rounded-full
                            ${
                              marcaSeleccionada ===
                              nombre
                                ? "bg-black/10 text-black"
                                : "bg-gray-100 text-gray-600"
                            }
                          `}
                        >
                          {cantidad}
                        </span>

                      </button>
                    )
                  )}

                </div>
              )}

            </div>

            {/* =================================================
                BOTONES INFERIORES
                ================================================= */}

            <div className="grid grid-cols-2 gap-3 mt-5">

              <button
                type="button"
                onClick={limpiarFiltros}
                className="
                  py-3.5
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  text-gray-700
                  font-bold
                  active:scale-[0.98]
                "
              >
                Limpiar
              </button>

              <button
                type="button"
                onClick={() =>
                  setMostrarFiltros(false)
                }
                className="
                  py-3.5
                  rounded-xl
                  bg-yellow-400
                  text-black
                  font-bold
                  shadow-sm
                  active:scale-[0.98]
                "
              >
                Ver productos
              </button>

            </div>

          </div>
        </div>
      )}

      {/* CIERRE DEL CONTENEDOR MÓVIL */}
      </div>
      )}

      {/* =====================================================
          ====================== PC ===========================
          ===================================================== */}

      <aside
        className="
          hidden
          lg:block
          w-full
          lg:w-72
          lg:shrink-0
        "
      >

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            p-5
            shadow-sm
          "
        >

          {/* CABECERA */}

          <div className="flex items-center justify-between mb-5">

            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">
                Filtros
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Filtra tus productos
              </p>
            </div>

            {hayFiltros && (
              <button
                type="button"
                onClick={limpiarFiltros}
                className="
                  text-xs
                  font-semibold
                  text-yellow-600
                  hover:text-yellow-700
                "
              >
                Limpiar
              </button>
            )}

          </div>

          {/* =================================================
              CATEGORÍAS PC
              ================================================= */}

          <div className="mb-6">

            <h3
              className="
                text-sm
                uppercase
                tracking-wider
                font-extrabold
                text-gray-500
                mb-3
              "
            >
              Categorías
            </h3>

            <div className="space-y-1">

              <button
                type="button"
                onClick={() =>
                  seleccionarCategoria("todos")
                }
                className={`
                  w-full
                  flex
                  items-center
                  justify-between
                  px-3
                  py-2.5
                  rounded-xl
                  text-sm
                  transition
                  ${
                    !categoriaSeleccionada ||
                    normalizar(
                      categoriaSeleccionada
                    ) === "todos"
                      ? "bg-yellow-400 text-black font-bold"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                `}
              >

                <span>Todas</span>

                <span className="text-xs font-bold">
                  {productos.length}
                </span>

              </button>

              {listaCategorias.map(
                ({ nombre, cantidad }) => (
                  <button
                    key={normalizar(nombre)}
                    type="button"
                    onClick={() =>
                      seleccionarCategoria(
                        nombre
                      )
                    }
                    className={`
                      w-full
                      flex
                      items-center
                      justify-between
                      px-3
                      py-2.5
                      rounded-xl
                      text-sm
                      transition
                      ${
                        normalizar(
                          categoriaSeleccionada
                        ) === normalizar(nombre)
                          ? "bg-yellow-400 text-black font-bold"
                          : "text-gray-700 hover:bg-gray-50"
                      }
                    `}
                  >

                    <span className="text-left">
                      {nombre}
                    </span>

                    <span className="text-xs font-bold">
                      {cantidad}
                    </span>

                  </button>
                )
              )}

            </div>

          </div>

          {/* SEPARADOR */}

          <div className="border-t border-gray-200 my-5" />

          {/* =================================================
              MARCAS PC
              ================================================= */}

          <div>

            <h3
              className="
                text-sm
                uppercase
                tracking-wider
                font-extrabold
                text-gray-500
                mb-3
              "
            >
              Marcas
            </h3>

            <div className="space-y-1">

              <button
                type="button"
                onClick={() =>
                  seleccionarMarca("")
                }
                className={`
                  w-full
                  flex
                  items-center
                  justify-between
                  px-3
                  py-2.5
                  rounded-xl
                  text-sm
                  transition
                  ${
                    !marcaSeleccionada
                      ? "bg-yellow-400 text-black font-bold"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                `}
              >

                <span>Todas las marcas</span>

                <span className="text-xs font-bold">
                  {productosCategoria.length}
                </span>

              </button>

              {listaMarcas.map(
                ({ nombre, cantidad }) => (
                  <button
                    key={normalizar(nombre)}
                    type="button"
                    onClick={() =>
                      seleccionarMarca(
                        nombre
                      )
                    }
                    className={`
                      w-full
                      flex
                      items-center
                      justify-between
                      px-3
                      py-2.5
                      rounded-xl
                      text-sm
                      transition
                      ${
                        marcaSeleccionada ===
                        nombre
                          ? "bg-yellow-400 text-black font-bold"
                          : "text-gray-700 hover:bg-gray-50"
                      }
                    `}
                  >

                    <span className="text-left">
                      {nombre}
                    </span>

                    <span className="text-xs font-bold">
                      {cantidad}
                    </span>

                  </button>
                )
              )}

            </div>

          </div>

        </div>

      </aside>
    </>
  );
}