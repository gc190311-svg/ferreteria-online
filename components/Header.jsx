"use client";

import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
   <header className="bg-black py-4">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center gap-8">

          {/* LOGO */}

          <div className="w-[50px] shrink-0">

            <img
              src="https://i.postimg.cc/7YYcLDSq/BRICO-HOGAR-PERU-(2).png"
              alt="Brico Hogar"
              className="w-full object-contain"
            />

          </div>

          {/* BUSCADOR */}

        <div className="flex flex-1 max-w-[750px] mx-10">

            <input
              type="text"
              placeholder="Buscar productos..."
              className="flex-1 h-14 px-6 text-lg bg-white text-black rounded-l-xl outline-none"
            />

            <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-10 rounded-r-xl font-bold text-xl flex items-center gap-3 transition">

              <FaSearch />

              Buscar

            </button>

          </div>

          {/* MI CUENTA */}

          <div className="flex flex-col items-center text-white min-w-[90px]">

            <FaUser className="text-4xl mb-2" />

            <span className="text-sm">

              Mi cuenta

            </span>

          </div>

          {/* CARRITO */}

          <div className="flex flex-col items-center text-white min-w-[90px]">

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

    
