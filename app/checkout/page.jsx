"use client";

import CheckoutForm from "../../components/checkout/CheckoutForm";
import CheckoutEntrega from "../../components/checkout/CheckoutEntrega";
import CheckoutPago from "../../components/checkout/CheckoutPago";
import CheckoutResumen from "../../components/checkout/CheckoutResumen";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-bold mb-8">
          Finalizar pedido
        </h1>

        <div className="grid lg:grid-cols-2 gap-10">

          <section>
            <CheckoutForm />
            <CheckoutEntrega />
            <CheckoutPago />
          </section>

          <section>
            <CheckoutResumen />
          </section>

        </div>

      </div>
    </main>
  );
}