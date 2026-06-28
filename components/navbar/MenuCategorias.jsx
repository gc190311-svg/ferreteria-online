"use client";

export default function MenuCategorias() {

  return (

    <div className="relative group w-[250px]">

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
          left-0
          top-full
          hidden
          group-hover:block
          w-full
          bg-white
          shadow-xl
          z-50
        "
      >

        <button className="block w-full text-left px-5 py-3 hover:bg-gray-100">
          🔧 Herramientas
        </button>

        <button className="block w-full text-left px-5 py-3 hover:bg-gray-100">
          ⚡ Electricidad
        </button>

        <button className="block w-full text-left px-5 py-3 hover:bg-gray-100">
          🏗 Construcción
        </button>

        <button className="block w-full text-left px-5 py-3 hover:bg-gray-100">
          🎨 Pintura
        </button>

        <button className="block w-full text-left px-5 py-3 hover:bg-gray-100">
          🚿 Gasfitería
        </button>

      </div>

    </div>

  );

}
