"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuCategorias from "./MenuCategorias";

export default function NavbarDesktop({
  setCategoriaSeleccionada,
}) {

  const pathname = usePathname();

  return (

    <nav className="bg-black border-y border-gray-800">

      <div className="max-w-7xl mx-auto flex items-center">

        {/* MENÚ CATEGORÍAS */}

        <MenuCategorias
          setCategoriaSeleccionada={setCategoriaSeleccionada}
        />

        {/* MENÚ CENTRAL */}

        <div className="flex-1">

          {pathname === "/productos" ? (

            <div className="flex justify-center gap-10">

              <button
                onClick={() =>
                  setCategoriaSeleccionada?.("todos")
                }
                className="text-yellow-500 font-bold py-5"
              >
                TODOS
              </button>

              <button
                onClick={() =>
                  setCategoriaSeleccionada?.("herramientas")
                }
                className="text-white hover:text-yellow-500 py-5"
              >
                HERRAMIENTAS
              </button>

              <button
                onClick={() =>
                  setCategoriaSeleccionada?.("construccion")
                }
                className="text-white hover:text-yellow-500 py-5"
              >
                CONSTRUCCIÓN
              </button>

              <button
                onClick={() =>
                  setCategoriaSeleccionada?.("electricidad")
                }
                className="text-white hover:text-yellow-500 py-5"
              >
                ELECTRICIDAD
              </button>

              <button
                onClick={() =>
                  setCategoriaSeleccionada?.("pintura")
                }
                className="text-white hover:text-yellow-500 py-5"
              >
                PINTURA
              </button>

              <button
                onClick={() =>
                  setCategoriaSeleccionada?.("gasfiteria")
                }
                className="text-white hover:text-yellow-500 py-5"
              >
                GASFITERÍA
              </button>

            </div>

          ) : (

            <div className="flex justify-center gap-20">

              <Link
                href="/"
                className={`font-bold py-5 transition ${
                  pathname === "/"
                    ? "text-yellow-500"
                    : "text-white hover:text-yellow-500"
                }`}
              >
                INICIO
              </Link>

              <Link
                href="/productos"
                className={`font-bold py-5 transition ${
                  pathname === "/productos"
                    ? "text-yellow-500"
                    : "text-white hover:text-yellow-500"
                }`}
              >
                PRODUCTOS
              </Link>

              <Link
                href="/ofertas"
                className="text-white hover:text-yellow-500 font-bold py-5 transition"
              >
                OFERTAS
              </Link>

              <Link
                href="/#contacto"
                className="text-white hover:text-yellow-500 font-bold py-5 transition"
              >
                CONTACTO
              </Link>

            </div>

          )}

        </div>

      </div>

    </nav>

  );

}
