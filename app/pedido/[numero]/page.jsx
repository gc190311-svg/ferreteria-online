"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  FaArrowLeft,
  FaWhatsapp,
  FaPrint,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaCreditCard,
  FaTruck,
  FaUser,
} from "react-icons/fa";

import { obtenerPedidoPorNumero } from "../../../components/services/PedidoConsultaService";

export default function PedidoDetalle({ params }) {
  const [pedido, setPedido] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarPedido() {
      try {
        const datos = await obtenerPedidoPorNumero(params.numero);
        setPedido(datos);
      } catch (error) {
        console.error("Error cargando pedido:", error);
      } finally {
        setCargando(false);
      }
    }

    cargarPedido();
  }, [params.numero]);

  const fechaPedido = useMemo(() => {
    if (!pedido?.fecha) return "-";

    if (pedido.fecha.seconds) {
      return new Date(
        pedido.fecha.seconds * 1000
      ).toLocaleString("es-PE", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    }

    return "-";
  }, [pedido]);

  function obtenerColorEstado(estado) {
    switch (estado) {
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800";

      case "Confirmado":
        return "bg-blue-100 text-blue-800";

      case "En preparación":
        return "bg-orange-100 text-orange-800";

      case "En reparto":
        return "bg-purple-100 text-purple-800";

      case "Entregado":
        return "bg-green-100 text-green-800";

      case "Cancelado":
        return "bg-red-100 text-red-800";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  function imprimirPedido() {
    window.print();
  }

  function contactarWhatsapp() {
    const telefono = "51921883870";

    const mensaje = `Hola, deseo consultar mi pedido ${pedido.numeroPedido}`;

    window.open(
      `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`,
      "_blank"
    );
  }

  if (cargando) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">

          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-black mx-auto mb-6"></div>

          <h2 className="text-2xl font-bold">
            Cargando pedido...
          </h2>

          <p className="text-gray-500 mt-2">
            Espere un momento.
          </p>

        </div>
      </main>
    );
  }

  if (!pedido) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-lg">

          <h2 className="text-3xl font-bold text-red-600 mb-4">
            Pedido no encontrado
          </h2>

          <p className="text-gray-600 mb-8">
            No se encontró información para el número solicitado.
          </p>

          <Link
            href="/productos"
            className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition"
          >
            <FaArrowLeft />
            Volver a la tienda
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-7xl mx-auto px-4">

        {/* ===========================
            CABECERA
        ============================ */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="bg-black text-white p-8">

            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

              <div className="flex items-center gap-6">

                <Image
                  src="/logo.png"
                  alt="BRICO HOGAR PERÚ"
                  width={95}
                  height={95}
                  className="bg-white rounded-xl p-2"
                />

                <div>

                  <h1 className="text-4xl font-bold">
                    BRICO HOGAR PERÚ
                  </h1>

                  <p className="text-gray-300 mt-2">
                    Detalle del Pedido
                  </p>

                </div>

              </div>

              <div className="text-center lg:text-right">

                <p className="text-gray-300">
                  Pedido Nº
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {pedido.numeroPedido}
                </h2>

                <span
                  className={`inline-block mt-5 px-5 py-2 rounded-full font-bold ${obtenerColorEstado(
                    pedido.estado
                  )}`}
                >
                  {pedido.estado}
                </span>

              </div>

            </div>

          </div>
                    {/* ===========================
              DATOS DEL CLIENTE
          ============================ */}

          <div className="p-8 border-b">

            <h2 className="text-2xl font-bold mb-8">
              Datos del Cliente
            </h2>

            <div className="grid md:grid-cols-2 gap-8">

              <div className="flex gap-4">

                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <FaUser className="text-blue-700" />
                </div>

                <div>

                  <p className="text-gray-500 text-sm">
                    Nombre
                  </p>

                  <p className="font-semibold text-lg">
                    {pedido.cliente.nombre}
                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <FaPhone className="text-green-700" />
                </div>

                <div>

                  <p className="text-gray-500 text-sm">
                    Celular
                  </p>

                  <p className="font-semibold text-lg">
                    {pedido.cliente.celular}
                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <FaEnvelope className="text-red-700" />
                </div>

                <div>

                  <p className="text-gray-500 text-sm">
                    Correo electrónico
                  </p>

                  <p className="font-semibold">
                    {pedido.cliente.correo || "-"}
                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <FaMapMarkerAlt className="text-orange-700" />
                </div>

                <div>

                  <p className="text-gray-500 text-sm">
                    Distrito
                  </p>

                  <p className="font-semibold">
                    {pedido.cliente.distrito}
                  </p>

                </div>

              </div>

              <div className="md:col-span-2">

                <p className="text-gray-500 mb-2">
                  Dirección
                </p>

                <div className="bg-gray-50 rounded-xl p-5 font-medium">

                  {pedido.cliente.direccion}

                </div>

              </div>

              <div className="md:col-span-2">

                <p className="text-gray-500 mb-2">
                  Referencia
                </p>

                <div className="bg-gray-50 rounded-xl p-5">

                  {pedido.cliente.referencia || "Sin referencia"}

                </div>

              </div>

            </div>

          </div>

          {/* ===========================
              PRODUCTOS
          ============================ */}

          <div className="p-8 border-b">

            <h2 className="text-2xl font-bold mb-8">

              Productos solicitados

            </h2>

            <div className="space-y-6">

              {pedido.productos.map((producto, index) => (

                <div
                  key={producto.id || index}
                  className="border rounded-2xl p-6 hover:shadow-lg transition duration-300 flex flex-col lg:flex-row gap-6"
                >

                  <div className="w-36 h-36 relative mx-auto lg:mx-0 flex-shrink-0">

                    <Image
                      src={producto.imagen || "/sin-imagen.png"}
                      alt={producto.nombre}
                      fill
                      className="object-contain rounded-xl"
                    />

                  </div>

                  <div className="flex-1">

                    <h3 className="text-2xl font-bold">

                      {producto.nombre}

                    </h3>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6">

                      <div>

                        <p className="text-gray-500 text-sm">
                          Precio
                        </p>

                        <p className="font-semibold text-lg">
                          S/ {Number(producto.precio).toFixed(2)}
                        </p>

                      </div>

                      <div>

                        <p className="text-gray-500 text-sm">
                          Cantidad
                        </p>

                        <p className="font-semibold text-lg">
                          {producto.cantidad}
                        </p>

                      </div>

                      <div>

                        <p className="text-gray-500 text-sm">
                          Subtotal
                        </p>

                        <p className="font-bold text-green-700 text-xl">
                          S/ {Number(producto.subtotal).toFixed(2)}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>
                    {/* ===========================
              INFORMACIÓN DEL PEDIDO
          ============================ */}

          <div className="p-8 border-b">

            <div className="grid lg:grid-cols-2 gap-10">

              <div>

                <h2 className="text-2xl font-bold mb-6">
                  Información del Pedido
                </h2>

                <div className="space-y-5">

                  <div className="flex justify-between items-center">

                    <span className="flex items-center gap-2 text-gray-600">
                      <FaCalendarAlt />
                      Fecha
                    </span>

                    <span className="font-semibold">
                      {fechaPedido}
                    </span>

                  </div>

                  <div className="flex justify-between items-center">

                    <span className="flex items-center gap-2 text-gray-600">
                      <FaTruck />
                      Tipo de entrega
                    </span>

                    <span className="font-semibold">
                      {pedido.entrega?.tipo || "-"}
                    </span>

                  </div>

                  <div className="flex justify-between items-center">

                    <span className="flex items-center gap-2 text-gray-600">
                      <FaCreditCard />
                      Método de pago
                    </span>

                    <span className="font-semibold">
                      {pedido.pago?.metodo || "-"}
                    </span>

                  </div>

                  <div className="flex justify-between items-center">

                    <span className="text-gray-600">
                      Estado
                    </span>

                    <span
                      className={`px-4 py-2 rounded-full font-semibold ${obtenerColorEstado(
                        pedido.estado
                      )}`}
                    >
                      {pedido.estado}
                    </span>

                  </div>

                </div>

              </div>

              {/* ===========================
                  RESUMEN
              ============================ */}

              <div>

                <h2 className="text-2xl font-bold mb-6">
                  Resumen del Pedido
                </h2>

                <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">

                  <div className="flex justify-between mb-4">
                    <span>Subtotal</span>
                    <strong>
                      S/ {Number(pedido.subtotal || 0).toFixed(2)}
                    </strong>
                  </div>

                  <div className="flex justify-between mb-4">
                    <span>Delivery</span>
                    <strong>
                      S/ {Number(pedido.delivery || 0).toFixed(2)}
                    </strong>
                  </div>

                  <div className="flex justify-between mb-4">
                    <span>Descuento</span>
                    <strong>
                      S/ {Number(pedido.descuento || 0).toFixed(2)}
                    </strong>
                  </div>

                  <hr className="my-6" />

                  <div className="flex justify-between items-center">

                    <span className="text-2xl font-bold">
                      TOTAL
                    </span>

                    <span className="text-4xl font-bold text-green-700">
                      S/ {Number(pedido.total || 0).toFixed(2)}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* ===========================
              BOTONES
          ============================ */}

          <div className="p-8">

            <div className="flex flex-col md:flex-row gap-4">

              <button
                type="button"
                onClick={contactarWhatsapp}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 font-bold transition flex items-center justify-center gap-3"
              >
                <FaWhatsapp size={22} />
                Consultar por WhatsApp
              </button>

              <Link
                href="/productos"
                className="flex-1 border border-gray-300 rounded-xl py-4 font-bold text-center hover:bg-gray-100 transition flex items-center justify-center gap-3"
              >
                <FaArrowLeft />
                Seguir comprando
              </Link>

              <button
                type="button"
                onClick={imprimirPedido}
                className="flex-1 bg-gray-800 hover:bg-black text-white rounded-xl py-4 font-bold transition flex items-center justify-center gap-3"
              >
                <FaPrint size={20} />
                Imprimir pedido
              </button>

            </div>

            <div className="mt-12 border-t pt-8 text-center">

              <h3 className="text-2xl font-bold">
                ¡Gracias por comprar en BRICO HOGAR PERÚ!
              </h3>

              <p className="text-gray-600 mt-4">
                Hemos recibido tu pedido correctamente.
              </p>

              <p className="text-gray-600 mt-2">
                Nuestro equipo revisará el pedido y se comunicará contigo para
                confirmar disponibilidad, coordinar la entrega y resolver
                cualquier consulta.
              </p>

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}