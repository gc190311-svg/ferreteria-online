"use client";

import { useCarrito } from "./context/CarritoContext";

export default function CarritoDrawer({

  abierto,
  cerrar,

}) {

 const {
  carrito,
  totalItems,
  total,
  eliminarProducto,
  actualizarCantidad,
} = useCarrito();

  return (

    <>

      {/* Fondo oscuro */}

      {abierto && (

        <div

          onClick={cerrar}

          className="fixed inset-0 bg-black/40 z-40"

        />

      )}

      {/* Panel */}

      <div

        className={`
fixed
top-0
right-0
h-full
w-[420px]
bg-white
shadow-2xl
z-50
transition-all
duration-300
${abierto ? "translate-x-0" : "translate-x-full"}
`}

      >

        <div className="p-6 border-b flex justify-between items-center">

          <h2 className="text-2xl font-bold">

            🛒 Mi carrito

          </h2>

          <button

            onClick={cerrar}

            className="text-2xl"

          >

            ✕

          </button>

        </div>

        <div className="p-6">

          <p className="font-semibold">

            Productos:

            {" "}

            {totalItems}

          </p>

          <p className="mt-3 text-green-700 font-bold text-xl">

            Total:

            <div className="mt-6 space-y-4">

  {carrito.length === 0 ? (

    <p className="text-gray-500">
      El carrito está vacío.
    </p>

  ) : (

    carrito.map((item) => {

  const precio =
    Number(item.oferta) > 0
      ? Number(item.oferta)
      : Number(item.precio);

  return (

    <div
      key={item.id}
      className="flex gap-4 border rounded-xl p-4 shadow-sm bg-white"
    >

      {/* Imagen */}

      <img
        src={item.imagen}
        alt={item.nombre}
        className="w-20 h-20 object-contain rounded-lg border"
      />

      {/* Información */}

      <div className="flex-1">

        <h3 className="font-semibold text-gray-800 leading-5">
          {item.nombre}
        </h3>

        <p className="text-green-700 font-bold text-lg mt-2">
          S/ {precio.toFixed(2)}
        </p>

        {/* Controles */}

        <div className="flex items-center justify-between mt-4">

          <div className="flex items-center border rounded-lg overflow-hidden">

            <button
              onClick={() =>
                actualizarCantidad(
                  item.id,
                  Math.max(1, item.cantidad - 1)
                )
              }
              className="px-3 py-1 hover:bg-gray-100 text-lg"
            >
              −
            </button>

            <span className="px-4 font-semibold">
              {item.cantidad}
            </span>

            <button
              onClick={() =>
                actualizarCantidad(
                  item.id,
                  item.cantidad + 1
                )
              }
              className="px-3 py-1 hover:bg-gray-100 text-lg"
            >
              +
            </button>

          </div>

          <button
            onClick={() => eliminarProducto(item.id)}
            className="text-red-600 text-sm font-semibold hover:text-red-700"
          >
            🗑 Eliminar
          </button>

        </div>

      </div>

    </div>

  );

})
