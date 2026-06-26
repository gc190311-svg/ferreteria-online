"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import {
  FaBars,
  FaTimes,
  FaTools,
  FaBolt,
  FaPaintRoller,
  FaFaucet,
  FaHardHat,
} from "react-icons/fa";

export default function Navbar({ setCategoriaSeleccionada }) {

  const pathname = usePathname();

  const [menuAbierto, setMenuAbierto] = useState(false);

  return (

    <>

      <nav className="bg-black border-y border-gray-800">

        <div className="max-w-7xl mx-auto">

          <div className="flex items-center justify-between">

            {/* BOTÓN HAMBURGUESA */}

            <button
              onClick={() => setMenuAbierto(true)}
              className="
                lg:hidden
                text-white
                text-3xl
                px-5
                py-4
              "
            >
              <FaBars />
            </button>

            {/* CATEGORÍAS ESCRITORIO */}

            <div className="hidden lg:block relative group w-[250px]">

              <button
                className="
                  w-full
                  bg-yellow-500
                  hover:bg-yellow-400
                  text-black
                  font-bold
                  py-5
                "
              >
                ☰ CATEGORÍAS
              </button>

              <div
                className="
                  absolute
                  hidden
                  group-hover:block
                  bg-white
                  shadow-xl
                  w-full
                  z-50
                "
              >

                <button
                  onClick={() =>
                    setCategoriaSeleccionada?.("herramientas")
                  }
                  className="block w-full text-left px-5 py-3 hover:bg-gray-100"
                >
                  🔧 Herramientas
                </button>

                <button
                  onClick={() =>
                    setCategoriaSeleccionada?.("electricidad")
                  }
                  className="block w-full text-left px-5 py-3 hover:bg-gray-100"
                >
                  ⚡ Electricidad
                </button>

                <button
                  onClick={() =>
                    setCategoriaSeleccionada?.("pintura")
                  }
                  className="block w-full text-left px-5 py-3 hover:bg-gray-100"
                >
                  🎨 Pintura
                </button>

                <button
                  onClick={() =>
                    setCategoriaSeleccionada?.("gasfiteria")
                  }
                  className="block w-full text-left px-5 py-3 hover:bg-gray-100"
                >
                  🚿 Gasfitería
                </button>

                <button
                  onClick={() =>
                    setCategoriaSeleccionada?.("construccion")
                  }
                  className="block w-full text-left px-5 py-3 hover:bg-gray-100"
                >
                  🏗 Construcción
                </button>

              </div>

            </div>

            {/* MENÚ */}

            <div className="flex-1">

              <div className="flex justify-center gap-6 md:gap-12 lg:gap-20">

                <Link
                  href="/"
                  className={`font-bold py-5 ${
                    pathname === "/"
                      ? "text-yellow-500"
                      : "text-white"
                  }`}
                >
                  INICIO
                </Link>

                <Link
                  href="/productos"
                  className={`font-bold py-5 ${
                    pathname === "/productos"
                      ? "text-yellow-500"
                      : "text-white"
                  }`}
                >
                  PRODUCTOS
                </Link>

                <Link
                  href="/ofertas"
                  className="hidden md:block text-white font-bold py-5"
                >
                  OFERTAS
                </Link>

                <Link
                  href="/#contacto"
                  className="hidden lg:block text-white font-bold py-5"
                >
                  CONTACTO
                </Link>

              </div>

            </div>

          </div>

        </div>

      </nav>

      {/* MENÚ LATERAL */}

      <div
        className={`
          fixed
          inset-0
          z-50
          transition
          ${menuAbierto ? "visible" : "invisible"}
        `}
      >

        <div
          onClick={() => setMenuAbierto(false)}
          className={`
            absolute
            inset-0
            bg-black/50
            transition
            ${menuAbierto ? "opacity-100" : "opacity-0"}
          `}
        />

        <div
          className={`
            absolute
            left-0
            top-0
            h-full
            w-72
            bg-white
            shadow-xl
            transition-transform
            ${
              menuAbierto
                ? "translate-x-0"
                : "-translate-x-full"
            }
          `}
        >

          <div className="flex justify-between items-center p-5 border-b">

            <h2 className="font-bold text-xl">
              Categorías
            </h2>

            <button
              onClick={() => setMenuAbierto(false)}
              className="text-2xl"
            >
              <FaTimes />
            </button>

          </div>

          <div className="p-4 space-y-2">

            <button className="flex items-center gap-3 w-full text-left p-3 rounded hover:bg-gray-100">
              <FaTools />
              Herramientas
            </button>

            <button className="flex items-center gap-3 w-full text-left p-3 rounded hover:bg-gray-100">
              <FaBolt />
              Electricidad
            </button>

            <button className="flex items-center gap-3 w-full text-left p-3 rounded hover:bg-gray-100">
              <FaPaintRoller />
              Pintura
            </button>

            <button className="flex items-center gap-3 w-full text-left p-3 rounded hover:bg-gray-100">
              <FaFaucet />
              Gasfitería
            </button>

            <button className="flex items-center gap-3 w-full text-left p-3 rounded hover:bg-gray-100">
              <FaHardHat />
              Construcción
            </button>

          </div>

        </div>

      </div>

    </>

  );

}
