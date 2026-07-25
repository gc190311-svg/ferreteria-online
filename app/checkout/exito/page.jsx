"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useCarrito } from "../../../components/context/CarritoContext";

function CheckoutExitoContenido() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { limpiarCarrito } = useCarrito();

  const numeroPedido =
    searchParams.get("pedido") || "SIN NÚMERO";

  function seguirComprando() {
    limpiarCarrito();
    router.push("/productos");
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-xl text-center">

        <div className="text-7xl">✅</div>

        <h1 className="text-3xl font-bold text-green-700 mt-6">
          ¡Pedido registrado correctamente!
        </h1>

        <p className="text-gray-600 mt-4">
          Gracias por comprar en
          <strong> BRICO HOGAR PERÚ</strong>.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mt-8">
          <p className="text-gray-500">
            Número de pedido
          </p>

          <h2 className="text-3xl font-bold text-green-700 mt-2">
            {numeroPedido}
          </h2>
        </div>

        <div className="mt-8 space-y-3">
          <button
            onClick={seguirComprando}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition"
          >
            🛍️ Seguir comprando
          </button>

          <Link
            href={`/pedido/${numeroPedido}`}
            className="block w-full border border-gray-300 rounded-xl py-3 font-semibold hover:bg-gray-100 transition"
          >
            📦 Ver mi pedido
          </Link>
        </div>

      </div>
    </main>
  );
}

export default function CheckoutExitoPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Cargando...</div>}>
      <CheckoutExitoContenido />
    </Suspense>
  );
}