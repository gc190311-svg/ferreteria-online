"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function CatalogoProductos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "productos")
      );

      const lista = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProductos(lista);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-10">
          Catálogo Completo
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {productos.map((producto) => (

            <div
              key={producto.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >

              <img
  src={
    producto.imagenes?.[0] ||
    producto.imagen ||
    "/sin-imagen.png"
  }
  alt={producto.nombre}
  onError={(e) => {
    e.target.src = "/sin-imagen.png";
  }}
  className="
    w-full
    h-64
    object-contain
    bg-white
    p-4
  "
/>

              <div className="p-5">

                <h3 className="font-bold text-xl mb-3">
                  {producto.nombre}
                </h3>

                <p className="text-gray-500">
                  Marca: {producto.marca}
                </p>

                <p className="text-green-600 text-3xl font-bold mt-3">
                  S/ {producto.precio}
                </p>

                <a
                  href={`/producto/${producto.id}`}
                  className="
                    block
                    text-center
                    mt-4
                    bg-yellow-500
                    hover:bg-yellow-400
                    py-3
                    rounded-xl
                    font-bold
                  "
                >
                  Ver producto
                </a>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}
