"use client";

import { FaTrash, FaWhatsapp } from "react-icons/fa";
import { useCarrito } from "./context/CarritoContext";
import Link from "next/link";

export default function CarritoDrawer({

  abierto,
  cerrar,

}) {

  const {

    carrito,
    total,
    totalItems,
    eliminarProducto,
    actualizarCantidad,
    limpiarCarrito,

  } = useCarrito();

  function enviarWhatsApp() {

    if (carrito.length === 0) {

      alert("El carrito está vacío.");

      return;

    }

    let mensaje =
`🟡 *NUEVO PEDIDO - BRICO HOGAR*

Hola, deseo realizar el siguiente pedido:

--------------------------------

`;

    carrito.forEach((item, index) => {

      const precio =
        Number(item.oferta) > 0
          ? Number(item.oferta)
          : Number(item.precio);

      mensaje +=
`${index + 1}. ${item.nombre}

Cantidad: ${item.cantidad}

Precio: S/ ${precio.toFixed(2)}

Subtotal: S/ ${(precio * item.cantidad).toFixed(2)}

--------------------------------

`;

    });

    mensaje +=

`TOTAL DEL PEDIDO

S/ ${total.toFixed(2)}

--------------------------------

Nombre:

Celular:

Dirección:

Distrito:

Referencia:

Forma de pago:
`;

    window.open(

      `https://wa.me/51921883870?text=${encodeURIComponent(mensaje)}`,

      "_blank"

    );

  }

  return (

    <>

      {abierto && (

        <div
          onClick={cerrar}
          className="fixed inset-0 bg-black/40 z-40"
        />

      )}

      <aside
        className={`
fixed
top-0
right-0
h-full
w-[430px]
max-w-full
bg-white
shadow-2xl
z-50
transition-all
duration-300
flex
flex-col
${abierto ? "translate-x-0" : "translate-x-full"}
`}
      >

        {/* CABECERA */}

        <div className="border-b p-6 flex justify-between items-center">

          <div>

            <h2 className="text-2xl font-bold">

              🛒 Mi carrito

            </h2>

            <p className="text-gray-500 mt-1">

              {totalItems} productos

            </p>

          </div>

          <button
            onClick={cerrar}
            className="text-3xl hover:text-red-500"
          >

            ×

          </button>

        </div>

        {/* PRODUCTOS */}

        <div className="flex-1 overflow-y-auto p-5 space-y-4">

          {carrito.length === 0 ? (

  <div className="text-center mt-20">

    <p className="text-6xl">
      🛒
    </p>

    <p className="mt-4 text-gray-500">

      Tu carrito está vacío

    </p>

  </div>

) : (

  carrito.map((item) => {

    const precio =
      Number(item.oferta) > 0
        ? Number(item.oferta)
        : Number(item.precio);

    return (

      <div
        key={item.id}
        className="
border
rounded-2xl
p-4
shadow-sm
bg-white
"
      >

        <div className="flex gap-4">

          {/* IMAGEN */}

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

          {/* INFORMACIÓN */}

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

            <p
              className="
text-gray-500
text-sm
mt-1
"
            >

              Subtotal:

              {" "}

              <span className="font-semibold">

                S/

                {" "}

                {(precio * item.cantidad).toFixed(2)}

              </span>

            </p>

            {/* CONTROLES */}

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

                  className="
px-3
py-1
hover:bg-gray-100
text-xl
"
                >

                  −

                </button>

                <span
                  className="
px-5
font-bold
"
                >

                  {item.cantidad}

                </span>

                <button

                  onClick={() =>
                    actualizarCantidad(
                      item.id,
                      item.cantidad + 1
                    )
                  }

                  className="
px-3
py-1
hover:bg-gray-100
text-xl
"
                >

                  +

                </button>

              </div>

              <button

                onClick={() =>
                  eliminarProducto(item.id)
                }

                className="
text-red-600
hover:text-red-700
"

              >

                <FaTrash size={18} />

              </button>

            </div>

          </div>

        </div>

      </div>

    );

  })

)}

                  </div>

        {/* RESUMEN */}

        <div className="border-t p-5 bg-gray-50">

          <div className="flex justify-between text-gray-600">

            <span>Productos</span>

            <span>{carrito.length}</span>

          </div>

          <div className="flex justify-between text-gray-600 mt-2">

            <span>Unidades</span>

            <span>{totalItems}</span>

          </div>

          <div className="flex justify-between items-center mt-5">

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
  className="
w-full
block
mt-4
bg-green-600
hover:bg-green-700
text-white
text-center
font-bold
py-4
rounded-xl
transition
"
>

  Finalizar pedido

</Link>

        </div>

      </aside>

    </>

  );

}



          
