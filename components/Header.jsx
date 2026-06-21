"use client";

export default function Header() {

  return (

    <header className="bg-white shadow">

      <div className="max-w-7xl mx-auto px-6 py-5">

        {/* FILA SUPERIOR */}

        <div className="flex flex-col lg:flex-row items-center gap-6">

          {/* LOGO */}

          <div className="w-48">

            <img
              src="https://i.postimg.cc/7YYcLDSq/BRICO-HOGAR-PERU-(2).png"
              alt="BRICO HOGAR"
              className="w-full object-contain"
            />

          </div>

          {/* BUSCADOR */}

          <div className="flex-1 w-full">

            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full border-2 border-gray-300 rounded-2xl px-6 py-4 outline-none focus:border-yellow-500"
            />

          </div>

          {/* ICONOS */}

          <div className="flex gap-6 text-3xl">

            <button className="hover:scale-110 transition">

              👤

            </button>

            <button className="hover:scale-110 transition">

              🛒

            </button>

          </div>

        </div>

        {/* MENÚ */}

        <div className="flex flex-wrap justify-center gap-8 mt-8 font-semibold">

          <a
            href="/"
            className="hover:text-yellow-500 transition"
          >
            Inicio
          </a>

          <a
            href="#productos"
            className="hover:text-yellow-500 transition"
          >
            Productos
          </a>

          <a
            href="#ofertas"
            className="hover:text-yellow-500 transition"
          >
            Ofertas
          </a>

          <a
            href="#contacto"
            className="hover:text-yellow-500 transition"
          >
            Contacto
          </a>

        </div>

      </div>

    </header>

  );

}
