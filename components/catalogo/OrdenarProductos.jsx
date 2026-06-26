"use client";

export default function OrdenarProductos() {

  return (

    <div className="flex justify-between items-center mb-8">

      <h2 className="text-2xl font-bold">

        Todos los productos

      </h2>

      <select
        className="
          border
          rounded-xl
          px-5
          py-3
          bg-white
        "
      >

        <option>
          Ordenar por
        </option>

        <option>
          Precio: Menor a mayor
        </option>

        <option>
          Precio: Mayor a menor
        </option>

        <option>
          Más recientes
        </option>

        <option>
          Destacados
        </option>

      </select>

    </div>

  );

}
