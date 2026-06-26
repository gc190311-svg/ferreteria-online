"use client";

import { FaFilter } from "react-icons/fa";

export default function SidebarFiltros() {
  return (
    <aside className="w-72 bg-white rounded-2xl shadow-lg p-6 h-fit">

      <div className="flex items-center gap-3 mb-6">
        <FaFilter className="text-yellow-500 text-xl" />
        <h2 className="text-2xl font-bold">
          Filtros
        </h2>
      </div>

      <div className="space-y-4">

        <div>
          <h3 className="font-bold mb-2">
            Categorías
          </h3>

          <div className="space-y-2">

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Herramientas
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Electricidad
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Construcción
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Pintura
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Gasfitería
            </label>

          </div>

        </div>

        <hr />

        <div>

          <h3 className="font-bold mb-2">
            Marcas
          </h3>

          <select className="w-full border rounded-xl p-3">

            <option>Todas</option>
            <option>Truper</option>
            <option>Makita</option>
            <option>Bosch</option>
            <option>DeWalt</option>

          </select>

        </div>

      </div>

    </aside>
  );
}
