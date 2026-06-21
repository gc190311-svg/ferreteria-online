"use client";

import { useState } from "react";

export default function SidebarCategorias() {

  const [abierto, setAbierto] = useState(false);

  const categorias = [
    "Herramientas",
    "Construcción",
    "Electricidad",
    "Pintura",
    "Gasfitería",
    "Jardinería",
    "Seguridad",
    "Ofertas"
  ];

  return (

    <>

      {/* BOTÓN CATEGORÍAS */}

      <div className="max-w-7xl mx-auto px-6 mt-5">

        <button
          onClick={() => setAbierto(!abierto)}
          className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-yellow-500 hover:text-black transition"
        >

          ☰ Categorías

        </button>

      </div>

      {/* PANEL LATERAL */}

      {abierto && (

        <div className="fixed top-0 left-0 w-72 h-full bg-white shadow-2xl z-50 p-6 overflow-y-auto">

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-2xl font-bold">

              Categorías

            </h2>

            <button
              onClick={() => setAbierto(false)}
              className="text-3xl font-bold"
            >

              ×

            </button>

          </div>

          {categorias.map((categoria, index) => (

            <button
              key={index}
              className="w-full text-left bg-gray-100 hover:bg-yellow-400 p-4 rounded-xl mb-3 font-semibold transition"
            >

              {categoria}

            </button>

          ))}

        </div>

      )}

    </>

  );

}
