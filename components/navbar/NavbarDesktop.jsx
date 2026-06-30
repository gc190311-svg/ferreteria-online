"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuCategorias from "./MenuCategorias";
import { useCatalogo } from "../context/CatalogoContext";

export default function NavbarDesktop({
  setCategoriaSeleccionada,
}) {

  const pathname = usePathname();

  const { setTextoBusqueda } = useCatalogo();

  function cambiarCategoria(categoria) {

    // Limpia el buscador
    setTextoBusqueda("");

    // Cambia la categoría
    setCategoriaSeleccionada?.(categoria);

  }

  return (

    <nav className="bg-black border-y border-gray-800">

      <div className="max-w-7xl mx-auto flex items-center">

        <MenuCategorias
          setCategoriaSeleccionada={setCategoriaSeleccionada}
        />

        <div className="flex-1">

          {pathname === "/productos" ? (

            <div className="flex justify-center gap-10">

              <button
                onClick={() => cambiarCategoria("todos")}
                className="text-yellow-500 font-bold py-5"
              >
                TODOS
              </button>

              <button
                onClick={() => cambiarCategoria("herramientas")}
                className="text-white hover:text-yellow-500 py-5"
              >
                HERRAMIENTAS
              </button>

              <button
                onClick={() => cambiarCategoria("construccion")}
                className="text-white hover:text-yellow-500 py-5"
              >
                CONSTRUCCIÓN
              </button>

              <button
                onClick={() => cambiarCategoria("electricidad")}
                className="text-white hover:text-yellow-500 py-5"
              >
                ELECTRICIDAD
              </button>

              <button
                onClick={() => cambiarCategoria("pintura")}
                className="text-white hover:text-yellow-500 py-5"
              >
                PINTURA
              </button>

              <button
                onClick={() => cambiarCategoria("gasfiteria")}
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
