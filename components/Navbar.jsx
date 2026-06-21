"use client";

export default function Navbar() {
  return (
    <nav className="bg-black border-t border-gray-800 border-b border-gray-800">

      <div className="max-w-7xl mx-auto flex items-center">

        {/* BOTÓN CATEGORÍAS */}

        <button
          className="
          bg-yellow-500
          hover:bg-yellow-400
          text-black
          font-bold
          text-lg
          px-8
          py-5
          transition
          "
        >
          ☰ CATEGORÍAS
        </button>

        {/* MENÚ */}

        <div className="flex-1 flex justify-center">

          <div className="flex gap-16 text-white font-bold text-lg">

            <a
              href="#"
              className="
              py-5
              border-b-4
              border-yellow-500
              text-yellow-500
              "
            >
              INICIO
            </a>

            <a
              href="#productos"
              className="
              py-5
              hover:text-yellow-500
              transition
              "
            >
              PRODUCTOS
            </a>

            <a
              href="#"
              className="
              py-5
              hover:text-yellow-500
              transition
              "
            >
              OFERTAS
            </a>

            <a
              href="#contacto"
              className="
              py-5
              hover:text-yellow-500
              transition
              "
            >
              CONTACTO
            </a>

          </div>

        </div>

      </div>

    </nav>
  );
}
