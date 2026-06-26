"use client";

export default function SidebarFiltros() {
  return (
    <aside className="w-72 bg-white rounded-2xl shadow p-6 h-fit">

      <h2 className="text-xl font-bold mb-6">
        Filtros
      </h2>

      <div className="space-y-3">

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

    </aside>
  );
}
