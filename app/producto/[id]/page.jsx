"use client";

import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProductoDetalle({ params }) {
  const [producto, setProducto] = useState(null);
  const [imagenActiva, setImagenActiva] = useState(0);

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

    <div className="max-w-4xl mx-auto mb-6">
      <a
        href="/"
        className="inline-block bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl transition"
      >
        ← Volver al inicio
      </a>
    </div>
    
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        
       <div className="bg-white p-6 rounded-t-2xl">

  {/* Imagen principal */}

  <div className="border rounded-2xl bg-gray-50 p-6 flex items-center justify-center">

    <img
      src={producto.imagenes?.[imagenActiva]}
      alt={producto.nombre}
      className="max-h-[500px] object-contain"
    />

  </div>

  {/* Miniaturas */}

  <div className="flex gap-4 mt-4 overflow-x-auto">

    {producto.imagenes?.map((img, index) => (

      <button
        key={index}
        onClick={() => setImagenActiva(index)}
        className={`border-2 rounded-xl p-2 min-w-[90px] bg-white ${
          imagenActiva === index
            ? "border-blue-500"
            : "border-gray-200"
        }`}
      >

        <img
          src={img}
          alt="miniatura"
          className="h-20 w-20 object-contain"
        />

      </button>

    ))}

  </div>

</div>

        <div className="p-8">
          <h1 className="text-4xl font-bold">
            {producto.nombre}
          </h1>

          <p className="text-gray-600 mt-4 text-lg whitespace-pre-line leading-8">
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

