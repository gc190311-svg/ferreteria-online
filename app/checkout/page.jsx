"use client";

import { useState } from "react";
import { useCarrito } from "../../components/context/CarritoContext";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function CheckoutPage() {

  const { carrito, total } = useCarrito();

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [distrito, setDistrito] = useState("");
  const [referencia, setReferencia] = useState("");
  const [observaciones, setObservaciones] = useState("");

  async function confirmarPedido() {

  if (
    !nombre ||
    !telefono ||
    !direccion ||
    !distrito
  ) {

    alert("Complete todos los datos obligatorios.");

    return;

  }

  try {

    const pedido = {

      fecha: serverTimestamp(),

      estado: "Pendiente",

      cliente: {

        nombre,

        telefono,

        direccion,

        distrito,

        referencia,

        observaciones,

      },

      productos: carrito,

      total,

    };

    const docRef = await addDoc(

      collection(db, "pedidos"),

      pedido

    );

    alert(
      `Pedido registrado correctamente.\nCódigo: ${docRef.id}`
    );

  } catch (error) {

    console.error(error);

    alert("Ocurrió un error al registrar el pedido.");

  }

}

  

  return (

    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold">

          Finalizar pedido

        </h1>

        <p className="text-gray-600 mt-2">

          Complete sus datos para generar el pedido.

        </p>

        <div className="grid lg:grid-cols-2 gap-10 mt-10">

          {/* DATOS DEL CLIENTE */}

<div className="bg-white rounded-2xl shadow-lg p-8">

  <h2 className="text-2xl font-bold mb-6">

    Datos del cliente

  </h2>

  <div className="space-y-5">

    <input
      type="text"
      placeholder="Nombre completo"
      value={nombre}
      onChange={(e)=>setNombre(e.target.value)}
      className="w-full border rounded-xl p-4"
    />

    <input
      type="text"
      placeholder="Celular"
      value={telefono}
      onChange={(e)=>setTelefono(e.target.value)}
      className="w-full border rounded-xl p-4"
    />

    <input
      type="text"
      placeholder="Dirección"
      value={direccion}
      onChange={(e)=>setDireccion(e.target.value)}
      className="w-full border rounded-xl p-4"
    />

    <input
      type="text"
      placeholder="Distrito"
      value={distrito}
      onChange={(e)=>setDistrito(e.target.value)}
      className="w-full border rounded-xl p-4"
    />

    <input
      type="text"
      placeholder="Referencia"
      value={referencia}
      onChange={(e)=>setReferencia(e.target.value)}
      className="w-full border rounded-xl p-4"
    />

    <textarea
      rows={4}
      placeholder="Observaciones"
      value={observaciones}
      onChange={(e)=>setObservaciones(e.target.value)}
      className="w-full border rounded-xl p-4"
    />

  </div>

</div>
          {/* RESUMEN DEL PEDIDO */}

<div className="bg-white rounded-2xl shadow-lg p-8">

  <h2 className="text-2xl font-bold mb-6">

    Resumen del pedido

  </h2>

  <div className="space-y-4">

    {carrito.length === 0 ? (

      <p className="text-gray-500">

        No hay productos en el carrito.

      </p>

    ) : (

      carrito.map((item) => {

        const precio =
          Number(item.oferta) > 0
            ? Number(item.oferta)
            : Number(item.precio);

        return (

          <div
            key={item.id}
            className="flex justify-between border-b pb-3"
          >

            <div>

              <p className="font-semibold">

                {item.nombre}

              </p>

              <p className="text-gray-500 text-sm">

                Cantidad: {item.cantidad}

              </p>

            </div>

            <p className="font-bold text-green-700">

              S/ {(precio * item.cantidad).toFixed(2)}

            </p>

          </div>

        );

      })

    )}

  </div>

  <div className="border-t mt-8 pt-6">

    <div className="flex justify-between items-center">

      <span className="text-2xl font-bold">

        TOTAL

      </span>

      <span className="text-3xl font-extrabold text-green-700">

        S/ {total.toFixed(2)}

      </span>

    </div>

   <button
  onClick={confirmarPedido}
  className="
w-full
mt-8
bg-green-600
hover:bg-green-700
text-white
font-bold
py-4
rounded-xl
transition
"
>

  Confirmar pedido

</button>

  </div>

</div>
                  </div>

      </div>

    </div>

  );

}

          
