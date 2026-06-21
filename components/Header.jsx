"use client";

import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-black py-6">

      <div className="max-w-7xl mx-auto px-8">

        <div className="grid grid-cols-[180px_1fr_180px] items-center gap-8">

          {/* LOGO */}
          <div>

            <img
              src="/logo.png"
              alt="Brico Hogar"
              className="w-[130px]"
            />

          </div>

          {/* BUSCADOR */}
          <div className="flex justify-center">

            <div className="flex w-full max-w-[700px]">

              <input
                type="text"
                placeholder="Buscar productos..."
                className="
                  flex-1
                  h-14
                  px-6
                  bg-white
                  text-black
                  rounded-l-xl
                  outline-none
                  text-lg
                "
              />

              <button
                className="
                  bg-yellow-500
                  hover:bg-yellow-400
                  px-8
                  rounded-r-xl
                  text-black
                  font-bold
                  flex
                  items-center
                  gap-2
                "
              >
                <FaSearch />
                Buscar
              </button>

            </div>

          </div>

          {/* ICONOS */}
          <div className="flex justify-end gap-10 text-white">

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
