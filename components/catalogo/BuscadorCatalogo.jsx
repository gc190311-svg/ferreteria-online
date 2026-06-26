"use client";

import { FaSearch } from "react-icons/fa";

export default function BuscadorCatalogo() {
  return (

    <div className="bg-white rounded-2xl shadow p-5 mb-6">

      <div className="flex gap-3">

        <div className="relative flex-1">

          <FaSearch
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            type="text"
            placeholder="Buscar productos..."
            className="
              w-full
              border
              rounded-xl
              py-3
              pl-12
              pr-4
              focus:outline-none
              focus:ring-2
              focus:ring-yellow-400
            "
          />

        </div>

      </div>

    </div>

  );
}
