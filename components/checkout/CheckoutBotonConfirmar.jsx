"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useCheckout } from "../context/CheckoutContext";
import { useCarrito } from "../context/CarritoContext";
import { guardarPedido } from "../services/PedidoService";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function CheckoutBotonConfirmar() {

  const router = useRouter();

  /* ==========================================
     ESTADO
  ========================================== */

  const [cargando, setCargando] = useState(false);


  /* ==========================================
     DATOS DEL CLIENTE
  ========================================== */

  const {
    nombre,
    celular,
    correo,
    direccion,
    distrito,
    referencia,
    tipoEntrega,
    metodoPago,
  } = useCheckout();

  /* ==========================================
     CARRITO
  ========================================== */

  const {
    carrito,
    total,
    limpiarCarrito,
  } = useCarrito();

  /* ==========================================
     VALIDAR FORMULARIO
  ========================================== */

  function validarFormulario() {

    if (!nombre.trim()) {
      throw new Error("Ingrese el nombre del cliente.");
    }

    if (!celular.trim()) {
      throw new Error("Ingrese el número de celular.");
    }

    if (!/^\d{9}$/.test(celular)) {
      throw new Error("El celular debe tener exactamente 9 dígitos.");
    }

    if (!direccion.trim()) {
      throw new Error("Ingrese la dirección.");
    }

    if (!distrito.trim()) {
      throw new Error("Seleccione un distrito.");
    }

    if (carrito.length === 0) {
      throw new Error("El carrito está vacío.");
    }

  }

  /* ==========================================
     PREPARAR PRODUCTOS
  ========================================== */

  function prepararProductos() {

    return carrito.map((producto) => {

      const precio =
        Number(producto.oferta) > 0
          ? Number(producto.oferta)
          : Number(producto.precio);

      return {

        id: producto.id,

        nombre: producto.nombre,

        imagen:
          producto.imagenes?.[0] ||
          producto.imagen ||
          "",

        precio,

        cantidad: Number(producto.cantidad),

        subtotal:
          precio * Number(producto.cantidad),

      };

    });

  }

    /* ==========================================
     GUARDAR PEDIDO EN FIREBASE
  ========================================== */

  async function guardarPedidoFirebase() {

    const productos = prepararProductos();

    const datosPedido = {

      cliente: {

        nombre,
        celular,
        correo,
        direccion,
        distrito,
        referencia,

      },

      entrega: {

        tipo: tipoEntrega,

      },

      pago: {

        metodo: metodoPago,

      },

      productos,

      subtotal: total,

      delivery: 0,

      descuento: 0,

      total,

    };

    const resultado = await guardarPedido(datosPedido);

  return {
  idPedido: resultado.id,
  numeroPedido: resultado.numeroPedido,
  productos,
};

  }

  /* ==========================================
     CONSTRUIR MENSAJE WHATSAPP
  ========================================== */

  function construirMensaje(numeroPedido, productos) {

   let mensaje =
` *BRICO HOGAR PERÚ*
 *Ferretería & Materiales de Construcción*

━━━━━━━━━━━━━━━━━━━━━━

 *PEDIDO*
 N°: *${numeroPedido}*

 Fecha: ${new Date().toLocaleDateString("es-PE")}

━━━━━━━━━━━━━━━━━━━━━━

 *DATOS DEL CLIENTE*

 Nombre:
${nombre}

 Celular:
${celular}

 Correo:
${correo || "No registrado"}

 Dirección:
${direccion}

 Distrito:
${distrito}

 Referencia:
${referencia || "Sin referencia"}

━━━━━━━━━━━━━━━━━━━━━━

 *ENTREGA*

${tipoEntrega === "delivery"
  ? " Delivery"
  : " Recojo en tienda"}

 *PAGO*

${metodoPago}

━━━━━━━━━━━━━━━━━━━━━━

 *PRODUCTOS SOLICITADOS*

`;
    productos.forEach((producto, index) => {

  mensaje +=
` Producto ${index + 1}

 ${producto.nombre}

 Cantidad: ${producto.cantidad}

Precio: S/ ${producto.precio.toFixed(2)}

 Subtotal: S/ ${producto.subtotal.toFixed(2)}

──────────────────────

`;

});

   mensaje +=
` *RESUMEN DEL PEDIDO*

Subtotal: S/ ${total.toFixed(2)}

Delivery: Por confirmar

Descuento: S/ 0.00

━━━━━━━━━━━━━━━━━━━━━━

 *TOTAL A PAGAR*

 S/ ${total.toFixed(2)}

━━━━━━━━━━━━━━━━━━━━━━

 *¡Gracias por confiar en BRICO HOGAR PERÚ!*

 Nos comunicaremos contigo para confirmar tu pedido y coordinar la entrega.

 ¡Esperamos atenderte nuevamente! `;

    return mensaje;

  }

  /* ==========================================
     ABRIR WHATSAPP
  ========================================== */

  function abrirWhatsApp(mensaje) {

    const telefono = "51921883870";

    const url =

      `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(

      url,

      "_blank",

      "noopener,noreferrer"

    );

  }


    /* ==========================================
     CONFIRMAR PEDIDO
  ========================================== */

  async function confirmarPedido() {

    if (cargando) return;

    setCargando(true);

    try {

      /* ==========================
         VALIDAR FORMULARIO
      ========================== */

      validarFormulario();

      /* ==========================
         GUARDAR PEDIDO
      ========================== */

      const {

  idPedido,

  numeroPedido,

  productos,

} = await guardarPedidoFirebase();

      /* ==========================
         GENERAR MENSAJE
      ========================== */

      const mensaje = construirMensaje(

  numeroPedido,

  productos

);
abrirWhatsApp(mensaje);

// Ir a la página de éxito
router.push(`/checkout/exito?pedido=${numeroPedido}`);

/* ==========================
   REDIRECCIONAR
========================== */

    } catch (error) {

      console.error(error);

      alert(

        error.message ||

        "Ocurrió un error al registrar el pedido."

      );

    } finally {

      setCargando(false);

    }

  }
    /* ==========================================
     BOTÓN
  ========================================== */

  

return (
  <>

    <button
      type="button"
      onClick={confirmarPedido}
      disabled={cargando}
      className={`
        w-full
        mt-8
        py-4
        rounded-xl
        font-bold
        text-lg
        shadow-lg
        transition-all
        duration-300
        flex
        items-center
        justify-center
        gap-3

        ${
          cargando
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 text-white"
        }
      `}
    >
      {cargando ? (
        <>
          <div
            className="
              w-5
              h-5
              border-2
              border-white
              border-t-transparent
              rounded-full
              animate-spin
            "
          />

          Registrando pedido...
        </>
      ) : (
        <>
          <FaWhatsapp size={24} />
          Confirmar pedido por WhatsApp
        </>
      )}
    </button>

    <Link
      href="/productos"
      className="
        block
        w-full
        mt-4
        py-3
        text-center
        border
        border-gray-300
        rounded-xl
        font-semibold
        text-gray-700
        hover:bg-gray-100
        hover:border-gray-400
        transition
      "
    >
      <span className="inline-flex items-center gap-2 justify-center">
        <FaArrowLeft />
        Seguir comprando
      </span>
    </Link>

  </>
);

}