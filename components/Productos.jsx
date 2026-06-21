"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Productos() {

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {

    const querySnapshot = await getDocs(
      collection(db, "productos")
    );

    const lista = [];

    querySnapshot.forEach((doc) => {

      lista.push({
        id: doc.id,
        ...doc.data(),
      });

    });

    setProductos(lista);

  };

  return (

    <section
      id="productos"
      className="max-w-7xl mx-auto px-6 pb-20"
    >

      <div className="flex justify-between items-center mb-10">

        <h2 className="text-4xl font-bold">

          Productos destacados

        </h2>

        <p className="text-gray-500">

          {productos.length} productos

        </p>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {productos.map((producto) => (
                <a
            href={`/producto/${producto.id}`}
            key={producto.id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition hover:-translate-y-2"
          >

            {/* IMAGEN */}

            <div className="bg-gray-100 h-72 flex items-center justify-center p-6">

              <img
                src={
                  producto.imagenes?.[0] ||
                  producto.imagen ||
                  "/sin-imagen.png"
                }
                alt={producto.nombre}
                className="max-h-56 object-contain"
              />

            </div>

            {/* INFORMACIÓN */}

            <div className="p-6">

              <h3 className="font-bold text-xl min-h-[70px]">

                {producto.nombre}

              </h3>
                            {producto.oferta ? (

                <div className="mt-5">

                  <p className="text-gray-400 line-through text-lg">

                    S/ {producto.precio}

                  </p>

                  <p className="text-green-600 font-bold text-3xl">

                    S/ {producto.oferta}

                  </p>

                  <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">

                    OFERTA

                  </span>

                </div>

              ) : (

                <p className="mt-5 text-green-600 font-bold text-3xl">

                  S/ {producto.precio}

                </p>

              )}

              <button
                className="w-full mt-6 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-2xl transition"
              >

                Ver producto

              </button>

            </div>

          </a>

        ))}

      </div>

    </section>

  );

}
