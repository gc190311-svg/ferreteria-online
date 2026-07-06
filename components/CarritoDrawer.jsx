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

    carrito.map((item) => (

      <div
        key={item.id}
        className="flex gap-3 border rounded-lg p-3"
      >

        <img
          src={item.imagen}
          alt={item.nombre}
          className="w-16 h-16 object-contain"
        />

        <div className="flex-1">

          <p className="font-semibold">
            {item.nombre}
          </p>

          <p className="text-green-700 font-bold">
            S/ {(Number(item.oferta) > 0
              ? Number(item.oferta)
              : Number(item.precio)
            ).toFixed(2)}
          </p>

          <p>
            Cantidad: {item.cantidad}
          </p>

        </div>

      </div>

    ))

  )}

</div>


            

            {" "}

            S/

            {" "}

{total.toFixed(2)}
            
          </p>

        </div>

      </div>

    </>

  );

}
