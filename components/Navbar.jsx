"use client";

export default function Navbar() {
  return (
    <nav className="bg-black border-t border-gray-800 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center">

        {/* CATEGORÍAS */}

        <div className="relative group w-[250px]">

          <button
            className="
              w-full
              bg-yellow-500
              hover:bg-yellow-400
              text-black
              font-bold
              text-lg
              py-5
              transition
            "
          >
            ☰ CATEGORÍAS
          </button>

          <div
            className="
              absolute
              left-0
              top-full
              hidden
              group-hover:block
              bg-white
              shadow-xl
              w-full
              z-50
            "
          >
            <a
              href="#productos"
              className="block px-5 py-3 hover:bg-gray-100"
            >
              🔧 Herramientas
            </a>

            <a
              href="#productos"
              className="block px-5 py-3 hover:bg-gray-100"
            >
              ⚡ Electricidad
            </a>

            <a
              href="#productos"
              className="block px-5 py-3 hover:bg-gray-100"
            >
              🎨 Pintura
            </a>

            <a
              href="#productos"
              className="block px-5 py-3 hover:bg-gray-100"
            >
              🚿 Gasfitería
            </a>

            <a
              href="#productos"
              className="block px-5 py-3 hover:bg-gray-100"
            >
              🏗️ Construcción
            </a>
          </div>

        </div>

        {/* MENÚ PRINCIPAL */}

        <div className="flex-1 flex justify-center">
          <div className="flex gap-20">

            <a
              href="/"
              className="
                text-yellow-500
                font-bold
                text-lg
                py-5
                border-b-4
                border-yellow-500
              "
            >
              INICIO
            </a>

            <a
              href="#productos"
              className="
                text-white
                font-bold
                text-lg
                py-5
                hover:text-yellow-500
                transition
              "
            >
              PRODUCTOS
            </a>

            <a
              href="#ofertas"
              className="
                text-white
                font-bold
                text-lg
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
                text-white
                font-bold
                text-lg
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
