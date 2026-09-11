"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { useCatalogo } from "../context/CatalogoContext";
import { useCarrito } from "../context/CarritoContext";

function normalizarSlug(texto = "") {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
}

export default function NavbarMobile({
  setCategoriaSeleccionada,
  onAbrirFiltros,
}) {
  const [abierto, setAbierto] = useState(false);
  const [otrosAbierto, setOtrosAbierto] = useState(false);

  const pathname = usePathname();

  const {
    setTextoBusqueda,
    categorias,
  } = useCatalogo();

  const { carritoAbierto } = useCarrito();

  const esCatalogo =
    pathname === "/productos" ||
    pathname.startsWith("/categorias") ||
    pathname.startsWith("/producto");

  /*
   * En /productos ocultamos únicamente la hamburguesa
   * superior porque esa página ya tiene su propio botón
   * de filtros.
   */
  const ocultarHamburguesa =
  pathname === "/productos" ||
  pathname.startsWith("/categorias");

  function cambiarCategoria(categoria) {
    const slug =
      typeof categoria === "string"
        ? normalizarSlug(categoria)
        : categoria.slug || normalizarSlug(categoria.nombre);

    // Limpiar búsqueda
    setTextoBusqueda("");

    // Actualizar estado de categoría
    setCategoriaSeleccionada?.(slug);

    // Cerrar menús inmediatamente
    setAbierto(false);
    setOtrosAbierto(false);

    // Navegación directa
    if (slug === "todos") {
      window.location.href = "/productos";
      return;
    }

    window.location.href = `/categorias/${slug}`;
  }

  /*
   * Si el carrito está abierto, no mostramos este navbar.
   */
  if (carritoAbierto) return null;

  /*
   * Solo se muestra dentro del catálogo.
   */
  if (!esCatalogo) return null;

  // Categorías principales que aparecerán directamente
  // en el menú negro.
  const categoriasPrincipales = [
    "construccion",
    "gasfiteria",
    "herramientas",
    "pintura",
  ];

  const categoriasProcesadas = (categorias || [])
    .map((categoria, index) => {
      const nombre =
        typeof categoria === "string"
          ? categoria
          : categoria?.nombre || "";

      const slug =
        typeof categoria === "string"
          ? normalizarSlug(categoria)
          : categoria?.slug || normalizarSlug(nombre);

      return {
        original: categoria,
        nombre,
        slug,
        key: categoria?.id || slug || index,
      };
    })
    .filter(
      (categoria) =>
        categoria.nombre && categoria.slug
    );

  const categoriasPrincipalesDisponibles =
    categoriasPrincipales
      .map((slug) =>
        categoriasProcesadas.find(
          (categoria) => categoria.slug === slug
        )
      )
      .filter(Boolean);

  // Todo lo que no sea una categoría principal
  // queda dentro de OTROS.
  const categoriasOtros =
    categoriasProcesadas.filter(
      (categoria) =>
        !categoriasPrincipales.includes(
          categoria.slug
        )
    );

  return (
    <nav className="bg-black border-y border-gray-800 relative z-50">

      {/* =====================================================
          BOTÓN HAMBURGUESA
          Se oculta solamente en /productos
         ===================================================== */}

      {!ocultarHamburguesa && (
        <div className="h-16 flex items-center px-5">
        <button
  type="button"
  onClick={() => {
    /*
      Si la página nos proporciona onAbrirFiltros,
      significa que estamos en la página de producto.

      En ese caso la hamburguesa abre el filtro
      de categorías y marcas.
    */

    if (onAbrirFiltros) {
      setAbierto(false);
      setOtrosAbierto(false);
      onAbrirFiltros();
      return;
    }

    /*
      Comportamiento normal del menú
      en el resto de páginas.
    */

    setAbierto((prev) => !prev);
    setOtrosAbierto(false);
  }}
  className="text-white text-3xl"
  aria-label="Abrir menú"
  aria-expanded={onAbrirFiltros ? false : abierto}
>
  ☰
</button>
        </div>
      )}

      {/* =====================================================
          MENÚ
         ===================================================== */}

      {abierto && !ocultarHamburguesa && (
        <div
          className="
            absolute
            left-0
            right-0
            top-full
            bg-black
            text-white
            shadow-xl
            z-50
            max-h-[70vh]
            overflow-y-auto
          "
        >

          {/* TODOS */}
          <button
            type="button"
            onClick={() =>
              cambiarCategoria("todos")
            }
            className="
              block
              w-full
              text-left
              px-5
              py-4
              bg-black
              text-white
              border-0
              hover:bg-[#1a1a1a]
              transition-colors
              duration-200
            "
          >
            Todos
          </button>

          {/* CATEGORÍAS PRINCIPALES */}
          {categoriasPrincipalesDisponibles.map(
            (categoria) => (
              <button
                type="button"
                key={categoria.key}
                onClick={() =>
                  cambiarCategoria(categoria)
                }
                className="
                  block
                  w-full
                  text-left
                  px-5
                  py-4
                  bg-black
                  text-white
                  border-0
                  hover:bg-[#1a1a1a]
                  transition-colors
                  duration-200
                "
              >
                {categoria.nombre}
              </button>
            )
          )}

          {/* OTROS */}
          {categoriasOtros.length > 0 && (
            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setOtrosAbierto(
                    (prev) => !prev
                  )
                }
                className="
                  block
                  w-full
                  text-left
                  px-5
                  py-4
                  bg-black
                  text-yellow-400
                  border-0
                  hover:bg-[#1a1a1a]
                  transition-colors
                  duration-200
                  flex
                  items-center
                  gap-2
                "
                aria-expanded={otrosAbierto}
              >
                <span>Otros</span>

                <span
                  className={`text-xs transition-transform duration-200 ${
                    otrosAbierto
                      ? "rotate-180"
                      : ""
                  }`}
                >
                  ▾
                </span>
              </button>

              {/* SUBMENÚ DE OTROS */}
              {otrosAbierto && (
                <div
                  className="
                    bg-white
                    text-gray-900
                    shadow-lg
                    border-t
                    border-gray-200
                  "
                >
                  {categoriasOtros.map(
                    (categoria) => (
                      <button
                        type="button"
                        key={categoria.key}
                        onClick={() =>
                          cambiarCategoria(
                            categoria
                          )
                        }
                        className="
                          block
                          w-full
                          text-left
                          px-5
                          py-4
                          bg-white
                          text-gray-900
                          border-0
                          hover:bg-gray-100
                          transition-colors
                          duration-200
                        "
                      >
                        {categoria.nombre}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}