"use client";

import Link from "next/link";

export default function CarritoResumen({

  totalProductos,
  totalItems,
  total,
  limpiarCarrito,
  onFinalizar,

}) {

  return (

    <div className="border-t p-5 bg-gray-50">

      <div className="flex justify-between text-gray-600">

        <span>Productos</span>

        <span>{totalProductos}</span>

      </div>

      <div className="flex justify-between text-gray-600 mt-2">

        <span>Unidades</span>

        <span>{totalItems}</span>

      </div>

      <div className="flex justify-between items-center mt-6">

        <span className="text-xl font-bold">

          TOTAL

        </span>

        <span className="text-3xl font-extrabold text-green-700">

          S/ {total.toFixed(2)}

        </span>

      </div>

      <button
        onClick={limpiarCarrito}
        className="
w-full
mt-5
border
border-red-500
text-red-600
font-semibold
py-3
rounded-xl
hover:bg-red-50
transition
"
      >

        Vaciar carrito

      </button>

      <Link
        href="/checkout"
        onClick={onFinalizar}
        className="
block
w-full
mt-4
bg-green-600
hover:bg-green-700
text-white
font-bold
text-center
py-4
rounded-xl
transition
"
      >

        Finalizar pedido

      </Link>

    </div>

  );

}
