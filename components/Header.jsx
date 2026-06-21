"use client";

import { FaUser, FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-black py-6">

      <div className="max-w-7xl mx-auto px-8">

        <div className="flex items-center">

          {/* LOGO */}
          <div className="w-[180px] flex justify-start">

            <img
              src="/logo.png"
              alt="Brico Hogar"
              className="w-[130px]"
            />

          </div>

          {/* BUSCADOR */}
          <div className="flex-1 flex justify-center">

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
                  text-lg
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
                "
              >
                Buscar
              </button>

            </div>

          </div>

          {/* ICONOS */}
          <div className="w-[180px] flex justify-end gap-10 text-white">

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
