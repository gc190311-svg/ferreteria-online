"use client";

export default function SidebarFiltros() {

  return (

    <aside
      className="
      w-72
      bg-white
      rounded-3xl
      shadow-lg
      p-6
      h-fit
      "
    >

      <h2 className="text-2xl font-bold mb-6">

        Categorías

      </h2>

      <div className="space-y-4">

        <label className="flex items-center gap-3 cursor-pointer">

          <input type="checkbox" />

          Herramientas

        </label>

        <label className="flex items-center gap-3 cursor-pointer">

          <input type="checkbox" />

          Construcción

        </label>

        <label className="flex items-center gap-3 cursor-pointer">

          <input type="checkbox" />

          Electricidad

        </label>

        <label className="flex items-center gap-3 cursor-pointer">

          <input type="checkbox" />

          Gasfitería

        </label>

        <label className="flex items-center gap-3 cursor-pointer">

          <input type="checkbox" />

          Pintura

        </label>

      </div>

      <hr className="my-8" />

      <h3 className="font-bold text-xl mb-4">

        Marcas

      </h3>

      <div className="space-y-3">

        <label className="flex gap-2">

          <input type="checkbox" />

          Truper

        </label>

        <label className="flex gap-2">

          <input type="checkbox" />

          Makita

        </label>

        <label className="flex gap-2">

          <input type="checkbox" />

          Bosch

        </label>

        <label className="flex gap-2">

          <input type="checkbox" />

          Stanley

        </label>

      </div>

      <hr className="my-8" />

      <h3 className="font-bold text-xl mb-4">

        Precio

      </h3>

      <input
        type="range"
        min="0"
        max="5000"
        className="w-full"
      />

      <div className="flex justify-between mt-2 text-sm">

        <span>S/0</span>

        <span>S/5000</span>

      </div>

    </aside>

  );

}
