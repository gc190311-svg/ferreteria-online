"use client";

import { useEffect, useState } from "react";
import { db } from "../../firebase";
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
        Cargando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        
       <div className="bg-gray-100 p-10 flex items-center justify-center rounded-t-2xl">

  <img
    src={producto.imagen}
    alt={producto.nombre}
    className="w-full max-w-md object-contain hover:scale-105 transition duration-300"
  />

</div>

        <div className="p-8">
          <h1 className="text-4xl font-bold">
            {producto.nombre}
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            {producto.descripcion}
          </p>

          <p className="text-3xl font-bold text-green-600 mt-6">
            S/ {producto.precio}
          </p>

          <a
            href={`https://wa.me/51921883870?text=Hola,%20quiero%20información%20del%20producto:%20${producto.nombre}`}
            target="_blank"
            className="block mt-8 bg-black hover:bg-gray-800 text-white text-center py-4 rounded-xl"
          >
            Pedir por WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}

