"use client";

import {
  FaSearch,
  FaUser,
  FaShoppingCart
} from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-black">

      <div className="max-w-7xl mx-auto px-6 py-5">

<div className="flex items-center justify-between">

  {/* LOGO */}
  <div className="w-[130px] flex-shrink-0">

    <img
      src="/logo.png"
      alt="Brico Hogar"
      className="w-full object-contain"
    />

  </div>

  {/* BUSCADOR */}
  <div className="flex w-full max-w-[700px] mx-auto">

    <input
      type="text"
      placeholder="Buscar productos..."
      className="
      flex-1
      h-12
      px-6
      text-lg
      text-black
      bg-white
      rounded-l-xl
      outline-none
      "
    />

    <button
      className="
      bg-yellow-500
      hover:bg-yellow-400
      text-black
      font-bold
      px-8
      rounded-r-xl
      flex
      items-center
      gap-2
      "
    >

      <FaSearch />

      Buscar

    </button>

  </div>

  {/* ICONOS */}
  <div className="flex items-center gap-14 text-white">

    <div className="flex flex-col items-center">

      <FaUser className="text-2xl" />

      <span className="text-sm">

        Mi cuenta

      </span>

    </div>

    <div className="flex flex-col items-center">

      <FaShoppingCart className="text-2xl" />

      <span className="text-sm">

        Carrito

      </span>

    </div>

  </div>

</div>

      </div>

    </header>
  );
}
