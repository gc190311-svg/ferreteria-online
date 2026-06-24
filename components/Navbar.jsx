"use client";

export default function Navbar({
  setCategoriaSeleccionada,
}) {
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

            <button
              onClick={() => setCategoriaSeleccionada("herramientas")}
              className="block w-full text-left px-5 py-3 hover:bg-gray-100"
            >
              🔧 Herramientas
            </button>

            <button
              onClick={() => setCategoriaSeleccionada("electricidad")}
              className="block w-full text-left px-5 py-3 hover:bg-gray-100"
            >
              ⚡ Electricidad
            </button>

            <button
              onClick={() => setCategoriaSeleccionada("pintura")}
              className="block w-full text-left px-5 py-3 hover:bg-gray-100"
            >
              🎨 Pintura
            </button>

            <button
              onClick={() => setCategoriaSeleccionada("gasfiteria")}
              className="block w-full text-left px-5 py-3 hover:bg-gray-100"
            >
              🚿 Gasfitería
            </button>

            <button
              onClick={() => setCategoriaSeleccionada("construccion")}
              className="block w-full text-left px-5 py-3 hover:bg-gray-100"
            >
              🏗️ Construcción
            </button>

            <button
              onClick={() => setCategoriaSeleccionada("todos")}
              className="block w-full text-left px-5 py-3 bg-yellow-100 hover:bg-yellow-200 font-bold"
            >
              📦 Ver todos
            </button>

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
