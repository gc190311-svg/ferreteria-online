"use client";

export default function Header() {

  return (

    <header className="bg-black">

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex flex-col lg:flex-row items-center gap-8">

          {/* LOGO */}

          <div className="w-72 flex justify-center">

            <img
              src="https://i.postimg.cc/7YYcLDSq/BRICO-HOGAR-PERU-(2).png"
              alt="Brico Hogar Perú"
              className="w-full object-contain"
            />

          </div>

          {/* BUSCADOR */}

          <div className="flex-1 w-full">

            <div className="flex">

              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full px-6 py-4 rounded-l-2xl border-2 border-yellow-500 bg-black text-white outline-none"
              />

              <button
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 rounded-r-2xl font-bold transition"
              >

                Buscar

              </button>

            </div>

          </div>

          {/* ICONOS */}

          <div className="flex gap-8 text-3xl text-white">

            <button className="hover:text-yellow-500 transition">

              👤

            </button>

            <button className="hover:text-yellow-500 transition">

              🛒

            </button>

          </div>

        </div>

      </div>

    </header>

  );

}
