"use client";

import { useState } from "react";
import { FaTruck, FaStore } from "react-icons/fa";

export default function CheckoutEntrega() {
  const [tipoEntrega, setTipoEntrega] = useState("delivery");

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 mt-6">

      <h2 className="text-2xl font-bold mb-6">
        Tipo de entrega
      </h2>

      <div className="grid gap-4">

        <label
          className={`border rounded-xl p-5 cursor-pointer flex items-center gap-4 transition ${
            tipoEntrega === "delivery"
              ? "border-yellow-500 bg-yellow-50"
              : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="entrega"
            checked={tipoEntrega === "delivery"}
            onChange={() => setTipoEntrega("delivery")}
          />

          <FaTruck size={24} className="text-yellow-500" />

          <div>
            <h3 className="font-bold">Delivery</h3>
            <p className="text-gray-500 text-sm">
              Envío a domicilio en Lima Metropolitana.
            </p>
          </div>
        </label>

        <label
          className={`border rounded-xl p-5 cursor-pointer flex items-center gap-4 transition ${
            tipoEntrega === "tienda"
              ? "border-yellow-500 bg-yellow-50"
              : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="entrega"
            checked={tipoEntrega === "tienda"}
            onChange={() => setTipoEntrega("tienda")}
          />

          <FaStore size={24} className="text-yellow-500" />

          <div>
            <h3 className="font-bold">Recojo en tienda</h3>
            <p className="text-gray-500 text-sm">
              Sin costo de envío.
            </p>
          </div>
        </label>

      </div>

    </div>
  );
}