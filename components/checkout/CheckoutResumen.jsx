"use client";

import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useCarrito } from "../context/CarritoContext";
import CheckoutBotonConfirmar from "./CheckoutBotonConfirmar";

export default function CheckoutResumen() {

  const {
    carrito,
    total,
    eliminarProducto,
    actualizarCantidad,
  } = useCarrito();

  console.log(carrito);

  return (

    <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-5">

      <h2 className="text-2xl font-bold mb-8">

        🛒 Resumen del pedido

      </h2>

      {carrito.length === 0 ? (

        <div className="text-center py-12">

          <p className="text-gray-500">

            No hay productos en el carrito.

          </p>

        </div>

      ) : (

        <>

          {carrito.map((producto) => {

            const precio =
              Number(producto.oferta) > 0
                ? Number(producto.oferta)
                : Number(producto.precio);

            return (

              <div
                key={producto.id}
                className="border-b pb-6 mb-6"
              >

                <div className="flex gap-4">

                  <img
                    src={
                      producto.imagenes?.[0] ||
                      "/sin-imagen.png"
                    }
                    alt={producto.nombre}
                    className="w-24 h-24 object-contain border rounded-lg p-2"
                  />

                  <div className="flex-1">

                    <h3 className="font-semibold leading-6">

                      {producto.nombre}

                    </h3>

                    <p className="text-green-700 font-bold text-lg mt-2">

                      S/ {precio.toFixed(2)}

                    </p>

                    <div className="flex justify-between items-center mt-4">

                      <div className="flex items-center gap-3">

                        <button
                          onClick={() =>
                            actualizarCantidad(
                              producto.id,
                              Math.max(
                                1,
                                producto.cantidad - 1
                              )
                            )
                          }
                          className="w-8 h-8 rounded-full border hover:bg-gray-100 flex items-center justify-center"
                        >

                          <FaMinus size={12} />

                        </button>

                        <span className="font-semibold text-lg">

                          {producto.cantidad}

                        </span>

                        <button
                          onClick={() =>
                            actualizarCantidad(
                              producto.id,
                              producto.cantidad + 1
                            )
                          }
                          className="w-8 h-8 rounded-full border hover:bg-gray-100 flex items-center justify-center"
                        >

                          <FaPlus size={12} />

                        </button>

                      </div>

                      <button
                        onClick={() =>
                          eliminarProducto(producto.id)
                        }
                        className="text-red-500 hover:text-red-700 text-lg"
                      >

                        <FaTrash />

                      </button>

                    </div>

                  </div>

                </div>

              </div>

            );

          })}

          <div className="space-y-4">

            <div className="flex justify-between">

              <span className="text-gray-600">

                Subtotal

              </span>

              <span>

                S/ {total.toFixed(2)}

              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-600">

                Delivery

              </span>

              <span>

                Por confirmar

              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-600">

                Descuento

              </span>

              <span>

                S/ 0.00

              </span>

            </div>

            <hr />

            <div className="flex justify-between items-center">

              <span className="text-3xl font-bold">

                TOTAL

              </span>

              <span className="text-4xl font-bold text-green-700">

                S/ {total.toFixed(2)}

              </span>

            </div>

            <CheckoutBotonConfirmar />




          </div>

        </>

      )}

    </div>

  );

}