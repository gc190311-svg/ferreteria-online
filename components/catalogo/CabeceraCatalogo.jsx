"use client";

export default function CabeceraCatalogo() {

  return (

    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

      <div>

        <h2 className="text-3xl font-bold">

          Todos los productos

        </h2>

        <p className="text-gray-500 mt-2">

          Explora nuestro catálogo completo.

        </p>

      </div>

      <div
        className="
          mt-4
          md:mt-0
          bg-yellow-100
          text-yellow-900
          px-5
          py-3
          rounded-xl
          font-semibold
        "
      >

        Mostrando todos los productos

      </div>

    </div>

  );

}
