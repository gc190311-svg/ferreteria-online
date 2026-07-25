"use client";

import Link from "next/link";

import {
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";

import SearchInput from "./SearchInput";
import CarritoDrawer from "./CarritoDrawer";

import { useCatalogo } from "./context/CatalogoContext";
import { useCarrito } from "./context/CarritoContext";

export default function HeaderCatalogo() {

  const {
    textoInput,
    setTextoInput,
    setTextoBusqueda,
  } = useCatalogo();

  const {
    carritoAbierto,
    abrirCarrito,
    cerrarCarrito,
    totalItems,
  } = useCarrito();

  function buscarProducto() {

    const texto = textoInput.trim();

    // Actualiza el filtro del catálogo
    setTextoBusqueda(texto);

    // Limpia el cuadro de búsqueda
    setTextoInput("");

  }

  return (
    <>
      <header className="bg-black py-4">

        <div className="max-w-7xl mx-auto px-4">

          <div className="flex flex-col lg:flex-row lg:items-center gap-4">

            {/* LOGO */}

            <div className="flex items-center justify-between lg:w-auto">

              <Link href="/">
                <img
                  src="/logo.png"
                  alt="Brico Hogar"
                  className="h-16 md:h-20 lg:h-28 w-auto cursor-pointer"
                />
              </Link>

              {/* ICONOS MÓVIL */}

              <div className="flex lg:hidden gap-6 text-white">

                <Link href="/login">
                  <FaUser className="text-2xl hover:text-yellow-400" />
                </Link>

                <button
                  onClick={abrirCarrito}
                  className="relative hover:text-yellow-400"
                >
                  <FaShoppingCart className="text-2xl" />

                  {totalItems > 0 && (
                    <span
                      className="
                        absolute
                        -top-2
                        -right-2
                        bg-red-600
                        text-white
                        rounded-full
                        w-5
                        h-5
                        flex
                        items-center
                        justify-center
                        text-[10px]
                        font-bold
                      "
                    >
                      {totalItems}
                    </span>
                  )}

                </button>

              </div>

            </div>

            {/* BUSCADOR */}

            <div className="flex-1">

              <SearchInput
                value={textoInput}
                onChange={setTextoInput}
                onSearch={buscarProducto}
              />

            </div>

            {/* ICONOS ESCRITORIO */}

            <div className="hidden lg:flex items-center gap-10 text-white">

              <Link href="/login">

                <div className="flex flex-col items-center hover:text-yellow-400">

                  <FaUser className="text-2xl" />

                  <span className="text-sm">
                    Mi Cuenta
                  </span>

                </div>

              </Link>

              <button
                onClick={abrirCarrito}
                className="flex flex-col items-center hover:text-yellow-400 transition relative"
              >

                <div className="relative">

                  <FaShoppingCart className="text-2xl" />

                  {totalItems > 0 && (
                    <span
                      className="
                        absolute
                        -top-2
                        -right-2
                        bg-red-600
                        text-white
                        rounded-full
                        w-5
                        h-5
                        flex
                        items-center
                        justify-center
                        text-[10px]
                        font-bold
                      "
                    >
                      {totalItems}
                    </span>
                  )}

                </div>

                <span className="text-sm mt-1">
                  Carrito
                </span>

              </button>

            </div>

          </div>

        </div>

      </header>

      <CarritoDrawer
        abierto={carritoAbierto}
        cerrar={cerrarCarrito}
      />

    </>
  );

}