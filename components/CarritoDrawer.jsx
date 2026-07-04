"use client";

import { useCarrito } from "./context/CarritoContext";

export default function CarritoDrawer({

  abierto,
  cerrar,

}) {

  const {

    productos,
    totalItems,
    totalPrecio,

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

            {" "}

            S/

            {" "}

            {Number(totalPrecio).toFixed(2)}

          </p>

        </div>

      </div>

    </>

  );

}
