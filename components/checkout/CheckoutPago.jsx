"use client";

import { useState } from "react";
import {
  FaUniversity,
  FaMoneyBillWave,
  FaMobileAlt,
} from "react-icons/fa";

export default function CheckoutPago() {

  const [metodoPago, setMetodoPago] = useState("transferencia");

  const opciones = [
    {
      id: "transferencia",
      titulo: "Transferencia bancaria",
      descripcion: "BCP • Interbank • BBVA • Scotiabank",
      icono: <FaUniversity size={26} />,
    },
    {
      id: "yape",
      titulo: "Yape",
      descripcion: "Pago rápido mediante Yape",
      icono: <FaMobileAlt size={26} />,
    },
    {
      id: "plin",
      titulo: "Plin",
      descripcion: "Pago rápido mediante Plin",
      icono: <FaMobileAlt size={26} />,
    },
    {
      id: "contraentrega",
      titulo: "Pago contra entrega",
      descripcion: "Paga al recibir tu pedido",
      icono: <FaMoneyBillWave size={26} />,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 mt-6">

      <h2 className="text-2xl font-bold mb-6">
        Método de pago
      </h2>

      <div className="grid gap-4">

        {opciones.map((opcion) => (

          <label
            key={opcion.id}
            className={`border rounded-2xl p-5 cursor-pointer transition flex items-center gap-5 ${
              metodoPago === opcion.id
                ? "border-yellow-500 bg-yellow-50"
                : "border-gray-300 hover:border-yellow-400"
            }`}
          >

            <input
              type="radio"
              name="metodoPago"
              checked={metodoPago === opcion.id}
              onChange={() => setMetodoPago(opcion.id)}
            />

            <div className="text-yellow-500">
              {opcion.icono}
            </div>

            <div>

              <h3 className="font-bold text-lg">
                {opcion.titulo}
              </h3>

              <p className="text-gray-500 text-sm">
                {opcion.descripcion}
              </p>

            </div>

          </label>

        ))}

      </div>

    </div>
  );
}