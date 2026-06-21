import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-6">

        <div className="flex items-center justify-between gap-8">

          {/* LOGO */}
          <div className="w-[220px] shrink-0">
            <img
              src="https://i.postimg.cc/7YYcLDSq/BRICO-HOGAR-PERU-(2).png"
              alt="Brico Hogar"
              className="w-full object-contain"
            />
          </div>

          {/* BUSCADOR */}
          <div className="flex-1 flex max-w-[760px]">

            <input
              type="text"
              placeholder="Buscar productos..."
              className="flex-1 h-16 px-8 rounded-l-xl text-lg outline-none bg-white text-black"
            />

            <button className="bg-yellow-500 hover:bg-yellow-400 px-10 rounded-r-xl flex items-center gap-3 font-bold text-black text-xl transition">

              <FaSearch />

              Buscar

            </button>

          </div>

          {/* ICONOS */}
          <div className="flex gap-10 text-white">

            <div className="flex flex-col items-center text-sm">
              <FaUser className="text-3xl mb-2" />
              <span>Mi cuenta</span>
            </div>

            <div className="flex flex-col items-center text-sm">
              <FaShoppingCart className="text-3xl mb-2" />
              <span>Carrito</span>
            </div>

          </div>

        </div>

      </div>
    </header>
  );
}
  
