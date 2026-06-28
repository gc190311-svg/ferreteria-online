"use client";

import Link from "next/link";
import {
  FaTools,
  FaBolt,
  FaPaintRoller,
  FaFaucet,
  FaHardHat,
  FaChevronRight,
} from "react-icons/fa";

const categorias = [
  {
    nombre: "Herramientas",
    icono: FaTools,
    url: "/productos?categoria=herramientas",
  },
  {
    nombre: "Electricidad",
    icono: FaBolt,
    url: "/productos?categoria=electricidad",
  },
  {
    nombre: "Construcción",
    icono: FaHardHat,
    url: "/productos?categoria=construccion",
  },
  {
    nombre: "Pintura",
    icono: FaPaintRoller,
    url: "/productos?categoria=pintura",
  },
  {
    nombre: "Gasfitería",
    icono: FaFaucet,
    url: "/productos?categoria=gasfiteria",
  },
];

export default function MenuCategorias() {
  return (

    <div className="relative group w-[260px]">

      <button
        className="
          w-full
          bg-yellow-500
          hover:bg-yellow-400
          text-black
          font-bold
          py-5
          transition
        "
      >
        ☰ CATEGORÍAS
      </button>

      <div
        className="
          absolute
          top-full
          left-0
          hidden
          group-hover:block
          w-80
          bg-white
          rounded-b-xl
          shadow-2xl
          overflow-hidden
          z-50
        "
      >

        {categorias.map((categoria) => {

          const Icono = categoria.icono;

          return (

            <Link
              key={categoria.nombre}
              href={categoria.url}
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                  px-6
                  py-4
                  hover:bg-yellow-50
                  transition
                  cursor-pointer
                "
              >

                <div className="flex items-center gap-4">

                  <Icono
                    className="
                      text-yellow-500
                      text-xl
                    "
                  />

                  <span className="font-medium">

                    {categoria.nombre}

                  </span>

                </div>

                <FaChevronRight
                  className="
                    text-gray-400
                  "
                />

              </div>

            </Link>

          );

        })}

        <Link
          href="/productos"
        >

          <div
            className="
              bg-yellow-500
              hover:bg-yellow-400
              text-center
              py-4
              font-bold
              transition
            "
          >

            Ver todo el catálogo →

          </div>

        </Link>

      </div>

    </div>

  );

}
