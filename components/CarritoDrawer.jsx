"use client";

import Link from "next/link";
import {
  FaTrash,
  FaWhatsapp,
  FaShoppingCart,
} from "react-icons/fa";
import { useCarrito } from "./context/CarritoContext";
import { useEffect } from "react";

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

  /* ==========================================
     BLOQUEAR SCROLL DE LA PÁGINA
  ========================================== */

  useEffect(() => {
    if (abierto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);


  /* ==========================================
     PEDIDO POR WHATSAPP
  ========================================== */

  function enviarWhatsApp() {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    let mensaje = `🟡 *NUEVO PEDIDO - BRICO HOGAR*

Hola, deseo realizar el siguiente pedido:

--------------------------------
`;

    carrito.forEach((item, index) => {
      const precio =
        Number(item.oferta) > 0
          ? Number(item.oferta)
          : Number(item.precio);

      mensaje += `${index + 1}. ${item.nombre}

Cantidad: ${item.cantidad}
Precio: S/ ${precio.toFixed(2)}
Subtotal: S/ ${(precio * item.cantidad).toFixed(2)}

--------------------------------
`;
    });

    mensaje += `TOTAL DEL PEDIDO

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
      `https://wa.me/51921883870?text=${encodeURIComponent(
        mensaje
      )}`,
      "_blank"
    );
  }


  return (
    <>
      {/* ==========================================
          FONDO OSCURO
      ========================================== */}

      {abierto && (
        <div
          onClick={cerrar}
          className="
            fixed
            inset-0
            bg-black/70
            z-[19999]
          "
        />
      )}


      {/* ==========================================
          CARRITO COMPLETO
          
          IMPORTANTE:
          TODO EL CONTENIDO ESTÁ DENTRO
          DEL MISMO PANEL.
      ========================================== */}

      <div
        className={`
          fixed
          inset-y-0
          right-0

          w-[430px]
          max-w-[100vw]

          bg-white

          z-[20000]

          flex
          flex-col

          shadow-2xl

          transform
          transition-transform
          duration-300
          ease-in-out

          ${
            abierto
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >

        {/* ==========================================
            CABECERA
        ========================================== */}

        <div
          className="
            flex-shrink-0
            w-full

            bg-white

            border-b
            border-gray-200

            px-5
            py-4

            flex
            items-center
            justify-between
          "
        >

          {/* IZQUIERDA */}

          <div className="flex items-center gap-3">

            <div
              className="
                w-11
                h-11

                rounded-full

                bg-yellow-400

                flex
                items-center
                justify-center

                text-black
              "
            >
              <FaShoppingCart size={20} />
            </div>


            <div>

              <h2
                className="
                  text-xl
                  font-bold
                  text-gray-900
                  leading-tight
                "
              >
                Mi carrito
              </h2>

              <p
                className="
                  text-sm
                  text-gray-500
                  mt-1
                "
              >
                {totalItems}{" "}
                {totalItems === 1
                  ? "producto"
                  : "productos"}
              </p>

            </div>

          </div>


          {/* CERRAR */}

          <button
            type="button"
            onClick={cerrar}
            className="
              w-10
              h-10

              flex
              items-center
              justify-center

              rounded-full

              text-gray-600

              text-2xl

              hover:bg-gray-100
              hover:text-red-500

              transition
            "
            aria-label="Cerrar carrito"
          >
            ×
          </button>

        </div>


        {/* ==========================================
            ZONA DE PRODUCTOS

            ESTA ZONA ES LA ÚNICA QUE TIENE SCROLL
        ========================================== */}

        <div
          className="
            flex-1
            min-h-0

            overflow-y-auto

            bg-gray-50

            p-4
          "
        >

          {carrito.length === 0 ? (

            /* ========================================
               CARRITO VACÍO
            ======================================== */

            <div
              className="
                h-full

                flex
                flex-col
                items-center
                justify-center

                text-center

                px-6
              "
            >

              <div
                className="
                  w-24
                  h-24

                  rounded-full

                  bg-gray-100

                  flex
                  items-center
                  justify-center

                  mb-5
                "
              >
                <FaShoppingCart
                  size={38}
                  className="text-gray-400"
                />
              </div>


              <h3
                className="
                  text-lg
                  font-bold
                  text-gray-800
                "
              >
                Tu carrito está vacío
              </h3>


              <p
                className="
                  text-sm
                  text-gray-500

                  mt-2
                "
              >
                Agrega productos para comenzar
                tu compra.
              </p>

            </div>

          ) : (

            /* ========================================
               PRODUCTOS
            ======================================== */

            <div className="space-y-4">

              {carrito.map((item) => {

                const precio =
                  Number(item.oferta) > 0
                    ? Number(item.oferta)
                    : Number(item.precio);

                const subtotal =
                  precio * Number(item.cantidad);

                const imagen =
                  item.imagen ||
                  item.imagenes?.[0] ||
                  "/sin-imagen.png";


                return (
                  <div
                    key={item.id}
                    className="
                      bg-white

                      rounded-2xl

                      border
                      border-gray-200

                      shadow-sm

                      p-4
                    "
                  >

                    {/* =================================
                        PRODUCTO
                    ================================= */}

                    <div className="flex gap-4">

                      {/* IMAGEN */}

                      <div
                        className="
                          w-24
                          h-24

                          flex-shrink-0

                          rounded-xl

                          bg-gray-50

                          border
                          border-gray-100

                          overflow-hidden

                          flex
                          items-center
                          justify-center
                        "
                      >

                        <img
                          src={imagen}
                          alt={item.nombre}
                          className="
                            w-full
                            h-full

                            object-contain

                            p-2
                          "
                        />

                      </div>


                      {/* INFORMACIÓN */}

                      <div
                        className="
                          flex-1
                          min-w-0
                        "
                      >

                        <h3
                          className="
                            text-sm
                            font-semibold
                            text-gray-900

                            leading-5

                            line-clamp-2
                          "
                        >
                          {item.nombre}
                        </h3>


                        {/* PRECIO */}

                        <div className="mt-2">

                          {Number(item.oferta) > 0 &&
                            Number(item.precio) >
                              Number(item.oferta) && (

                              <span
                                className="
                                  block

                                  text-xs
                                  text-gray-400

                                  line-through
                                "
                              >
                                S/{" "}
                                {Number(
                                  item.precio
                                ).toFixed(2)}
                              </span>

                            )}


                          <span
                            className="
                              text-lg
                              font-bold
                              text-gray-900
                            "
                          >
                            S/ {precio.toFixed(2)}
                          </span>

                        </div>

                      </div>


                      {/* ELIMINAR */}

                      <button
                        type="button"
                        onClick={() =>
                          eliminarProducto(item.id)
                        }
                        className="
                          flex-shrink-0

                          h-fit

                          text-red-500

                          hover:text-red-700

                          transition
                        "
                        aria-label="Eliminar producto"
                      >
                        <FaTrash size={16} />
                      </button>

                    </div>


                    {/* =================================
                        CANTIDAD Y SUBTOTAL
                    ================================= */}

                    <div
                      className="
                        mt-4
                        pt-4

                        border-t
                        border-gray-100

                        flex
                        items-center
                        justify-between
                      "
                    >

                      {/* CANTIDAD */}

                      <div
                        className="
                          flex
                          items-center

                          border
                          border-gray-300

                          rounded-xl

                          overflow-hidden
                        "
                      >

                        <button
                          type="button"
                          onClick={() =>
                            actualizarCantidad(
                              item.id,
                              Math.max(
                                1,
                                Number(
                                  item.cantidad
                                ) - 1
                              )
                            )
                          }
                          className="
                            w-9
                            h-9

                            flex
                            items-center
                            justify-center

                            font-bold

                            hover:bg-gray-100
                          "
                        >
                          −
                        </button>


                        <span
                          className="
                            w-10

                            text-center

                            font-semibold
                          "
                        >
                          {item.cantidad}
                        </span>


                        <button
                          type="button"
                          onClick={() =>
                            actualizarCantidad(
                              item.id,
                              Number(
                                item.cantidad
                              ) + 1
                            )
                          }
                          className="
                            w-9
                            h-9

                            flex
                            items-center
                            justify-center

                            font-bold

                            hover:bg-gray-100
                          "
                        >
                          +
                        </button>

                      </div>


                      {/* SUBTOTAL */}

                      <div className="text-right">

                        <p
                          className="
                            text-xs
                            text-gray-500
                          "
                        >
                          Subtotal
                        </p>

                        <p
                          className="
                            text-lg
                            font-bold
                            text-gray-900
                          "
                        >
                          S/ {subtotal.toFixed(2)}
                        </p>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          )}

        </div>


        {/* ==========================================
            RESUMEN INFERIOR
        ========================================== */}

        <div
          className="
            flex-shrink-0

            w-full

            bg-white

            border-t
            border-gray-200

            p-5

            shadow-[0_-5px_20px_rgba(0,0,0,0.08)]
          "
        >

          {/* PRODUCTOS */}

          <div
            className="
              flex
              justify-between

              text-sm
              text-gray-600
            "
          >

            <span>
              Productos
            </span>

            <span>
              {carrito.length}
            </span>

          </div>


          {/* UNIDADES */}

          <div
            className="
              flex
              justify-between

              text-sm
              text-gray-600

              mt-2
            "
          >

            <span>
              Unidades
            </span>

            <span>
              {totalItems}
            </span>

          </div>


          {/* TOTAL */}

          <div
            className="
              flex
              justify-between
              items-center

              mt-3
              pt-3

              border-t
              border-gray-100
            "
          >

            <span
              className="
                text-xl
                font-bold
                text-gray-900
              "
            >
              TOTAL
            </span>


            <span
              className="
                text-2xl
                font-extrabold
                text-green-600
              "
            >
              S/ {total.toFixed(2)}
            </span>

          </div>


          {/* ========================================
              BOTONES
          ======================================== */}

          <div className="mt-4 space-y-3">

            {/* VACIAR */}

            <button
              type="button"
              onClick={limpiarCarrito}
              disabled={carrito.length === 0}
              className="
                w-full
                h-12

                border
                border-red-500

                text-red-600

                font-semibold

                rounded-xl

                hover:bg-red-50

                transition

                disabled:opacity-40
                disabled:cursor-not-allowed
              "
            >
              🗑 Vaciar carrito
            </button>


            {/* WHATSAPP */}

            <button
              type="button"
              onClick={enviarWhatsApp}
              disabled={carrito.length === 0}
              className="
                w-full
                h-12

                flex
                items-center
                justify-center

                gap-2

                bg-green-500
                hover:bg-green-600

                text-white

                font-bold

                rounded-xl

                transition

                disabled:opacity-40
                disabled:cursor-not-allowed
              "
            >

              <FaWhatsapp size={20} />

              Pedir por WhatsApp

            </button>


            {/* FINALIZAR PEDIDO */}

            <Link
              href="/checkout"
              onClick={cerrar}
              className={`
                w-full
                h-12

                flex
                items-center
                justify-center

                bg-blue-600
                hover:bg-blue-700

                text-white

                font-bold

                rounded-xl

                transition

                ${
                  carrito.length === 0
                    ? "pointer-events-none opacity-40"
                    : ""
                }
              `}
            >
              Finalizar pedido
            </Link>

          </div>

        </div>

      </div>
    </>
  );
}