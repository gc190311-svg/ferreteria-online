"use client";

import { FaTrash } from "react-icons/fa";

export default function CarritoItem({

  item,

  actualizarCantidad,

  eliminarProducto,

}) {

  const precio =
    Number(item.oferta) > 0
      ? Number(item.oferta)
      : Number(item.precio);

  return (

    <div
      className="
border
rounded-2xl
p-4
shadow-sm
bg-white
"
    >

      <div className="flex gap-4">

        {/* Imagen */}

        <img
          src={item.imagen}
          alt={item.nombre}
          className="
w-24
h-24
object-contain
border
rounded-xl
p-2
"
        />

        {/* Información */}

        <div className="flex-1">

          <h3
            className="
font-semibold
text-gray-800
leading-5
"
          >

            {item.nombre}

          </h3>

          <p
            className="
text-green-700
font-bold
text-xl
mt-2
"
          >

            S/ {precio.toFixed(2)}

          </p>

          <p className="text-sm text-gray-500 mt-1">

            Subtotal

            {" "}

            <strong>

              S/ {(precio * item.cantidad).toFixed(2)}

            </strong>

          </p>

          <div
            className="
flex
justify-between
items-center
mt-4
"
          >

            <div
              className="
flex
items-center
border
rounded-lg
overflow-hidden
"
            >

              <button
                onClick={() =>
                  actualizarCantidad(
                    item.id,
                    Math.max(
                      1,
                      item.cantidad - 1
                    )
                  )
                }
                className="px-3 py-1 text-xl hover:bg-gray-100"
              >

                −

              </button>

              <span className="px-5 font-bold">

                {item.cantidad}

              </span>

              <button
                onClick={() =>
                  actualizarCantidad(
                    item.id,
                    item.cantidad + 1
                  )
                }
                className="px-3 py-1 text-xl hover:bg-gray-100"
              >

                +

              </button>

            </div>

            <button
              onClick={() =>
                eliminarProducto(item.id)
              }
              className="text-red-600 hover:text-red-700"
            >

              <FaTrash size={18} />

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}
