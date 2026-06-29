"use client";

export default function CabeceraCatalogo() {
  return (
    <div className="flex items-center justify-between mb-8">

      <div>

        <h1 className="text-4xl font-bold text-gray-900">
          Resultados encontrados
        </h1>

        <p className="text-gray-500 mt-2">
          Mostrando todos los productos
        </p>

      </div>

      <div
        className="
          bg-yellow-100
          text-yellow-900
          px-6
          py-3
          rounded-xl
          font-semibold
        "
      >
        Catálogo Brico Hogar
      </div>

    </div>
  );
}

