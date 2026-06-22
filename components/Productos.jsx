"use client";

import Link from "next/link";

export default function Productos() {
  const productos = [
    {
      id: 1,
      nombre: "Rotomartillo SDS Plus Truper",
      precio: 399,
      precioAnterior: 450,
      imagen: "/productos/rotomartillo.jpg",
    },
    {
      id: 2,
      nombre: "Compresor lubricado 25 L",
      precio: 615,
      precioAnterior: 700,
      imagen: "/productos/compresor.jpg",
    },
    {
      id: 3,
      nombre: "Escalera tipo tijera Truper",
      precio: 295,
      precioAnterior: 340,
      imagen: "/productos/escalera.jpg",
    },
    {
      id: 4,
      nombre: "Carretilla neumática 6 ft3",
      precio: 205,
      precioAnterior: 250,
      imagen: "/productos/carretilla.jpg",
    },
  ];

  return (
    <section
      id="productos"
      className="bg-gray-100 py-20"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center mb-10">

          <h2 className="text-4xl font-bold">
            Productos destacados
          </h2>

          <span className="text-gray-500 text-xl">
            {productos.length} productos
          </span>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {productos.map((producto) => (

            <div
              key={producto.id}
              className="
                bg-white
                rounded-3xl
                shadow-lg
                overflow-hidden
                hover:shadow-2xl
                duration-300
              "
            >

              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="
                  w-full
                  h-72
                  object-contain
                  bg-gray-50
                  p-6
                "
              />

              <div className="p-6">

                <h3 className="font-bold text-xl min-h-[90px]">

                  {producto.nombre}

                </h3>

                <div className="mt-4">

                  <p className="text-gray-400 line-through text-lg">

                    S/ {producto.precioAnterior}

                  </p>

                  <p className="text-3xl font-bold text-green-600">

                    S/ {producto.precio}

                  </p>

                </div>

                <Link href={`/producto/${producto.id}`}>

                  <button
                    className="
                      mt-6
                      w-full
                      bg-yellow-500
                      hover:bg-yellow-400
                      text-black
                      font-bold
                      py-4
                      rounded-xl
                      duration-300
                    "
                  >
                    Ver producto
                  </button>

                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}
