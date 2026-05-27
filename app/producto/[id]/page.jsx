"use client";

import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProductoDetalle({ params }) {

  const [producto, setProducto] = useState(null);

  useEffect(() => {
    cargarProducto();
  }, []);

  const cargarProducto = async () => {

    const docRef = doc(db, "productos", params.id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setProducto(docSnap.data());
    }

  };

  if (!producto) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando producto...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg grid md:grid-cols-2 gap-10 p-10">

        <div className="bg-gray-100 rounded-2xl flex items-center justify-center p-10">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="max-h-[500px] object-contain"
          />
        </div>

        <div>

          <h1 className="text-4xl font-bold">
            {producto.nombre}
          </h1>

          <p className="text-3xl text-green-600 font-bold mt-6">
            S/ {producto.precio}
          </p>

          <p className="text-gray-600 mt-6 text-lg">
            {producto.descripcion}
          </p>

          <a
            href={`https://wa.me/51921883870?text=Hola quiero informacion del producto ${producto.nombre}`}
            target="_blank"
            className="inline-block mt-10 bg-black text-white px-10 py-4 rounded-xl"
          >
            Pedir por WhatsApp
          </a>

        </div>

      </div>

    </div>

  );

}
