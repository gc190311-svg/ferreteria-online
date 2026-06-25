"use client";

import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function AdminProductos() {

  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {

    const snapshot = await getDocs(
      collection(db, "productos")
    );

    const lista = [];

    snapshot.forEach((item) => {

      lista.push({
        id: item.id,
        ...item.data(),
      });

    });

    setProductos(lista);

  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const eliminarProducto = async (id) => {

    const confirmar = confirm(
      "¿Eliminar producto?"
    );

    if (!confirmar) return;

    await deleteDoc(
      doc(db, "productos", id)
    );

    cargarProductos();

  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Administrar Productos
      </h1>

      <div className="grid gap-6">

        {productos.map((producto) => (

          <div
            key={producto.id}
            className="bg-white rounded-xl shadow p-4 flex gap-4 items-center"
          >

            <img
              src={
                producto.imagen ||
                "/sin-imagen.png"
              }
              alt={producto.nombre}
              className="w-24 h-24 object-contain border"
            />

            <div className="flex-1">

              <h2 className="font-bold text-xl">
                {producto.nombre}
              </h2>

              <p>
                Precio:
                S/ {producto.precio}
              </p>

              <p>
                Stock:
                {producto.stock}
              </p>

            </div>

            <a
              href={`/admin/productos/${producto.id}`}
              className="
                bg-blue-600
                text-white
                px-4
                py-2
                rounded-lg
              "
            >
              Editar
            </a>

            <button
              onClick={() =>
                eliminarProducto(
                  producto.id
                )
              }
              className="
                bg-red-600
                text-white
                px-4
                py-2
                rounded-lg
              "
            >
              Eliminar
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}
