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

        <div className="flex items-center justify-between gap-8">

          {/* LOGO */}

          <div className="w-[180px] flex-shrink-0">

            <img
              src="/logo.png"
              alt="Brico Hogar"
              className="w-full object-contain"
            />

          </div>

          {/* BUSCADOR */}

          <div className="flex flex-1 max-w-[760px]">

            <input
              type="text"
              placeholder="Buscar productos..."
              className="
              flex-1
              h-16
              px-8
              bg-white
              text-black
              text-lg
              outline-none
              rounded-l-xl"
            />

            <button
              className="
              bg-yellow-500
              hover:bg-yellow-400
              px-10
              rounded-r-xl
              font-bold
              text-black
              text-xl
              flex
              items-center
              gap-3
              transition"
            >

              <FaSearch />

              Buscar

            </button>

          </div>

          {/* MI CUENTA */}

          <div className="flex flex-col items-center text-white">

            <FaUser className="text-4xl mb-2" />

            <span className="text-sm">

              Mi cuenta

            </span>

          </div>

          {/* CARRITO */}

          <div className="flex flex-col items-center text-white">

            <FaShoppingCart className="text-4xl mb-2" />

            <span className="text-sm">

              Carrito

            </span>

          </div>

        </div>

      </div>

    </header>

  );

}
     
