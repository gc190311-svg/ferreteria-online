"use client";

import { FaSearch } from "react-icons/fa";

export default function BuscadorCatalogo() {

  return (

    <div className="bg-white rounded-2xl shadow p-4 mb-6">

      <div className="flex gap-4">

        <div className="relative flex-1">

          <FaSearch
            className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-gray-400
            "
          />

          <input
            type="text"
            placeholder="Buscar productos..."
            className="
            w-full
            h-14
            border
            rounded-xl
            pl-14
            pr-4
            outline-none
            focus:border-yellow-500
            "
          />

        </div>

        <button
          className="
          bg-yellow-500
          hover:bg-yellow-400
          px-8
          rounded-xl
          font-bold
          "
        >
          Buscar
        </button>

      </div>

    </div>

  );

}
