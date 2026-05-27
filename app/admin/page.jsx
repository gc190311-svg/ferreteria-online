'use client';

import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AdminPage() {

  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    imagen: "",
    descripcion: ""
  });

  const guardarProducto = async () => {

    if (!producto.nombre) {
      alert("Ingresa nombre");
      return;
    }

    try {

      await addDoc(collection(db, "productos"), {
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        descripcion: producto.descripcion
      });

      alert("Producto agregado");

      setProducto({
        nombre: "",
        precio: "",
        imagen: "",
        descripcion: ""
      });

    } catch (error) {
      console.log(error);
      alert("Error al guardar");
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">

        <h1 className="text-3xl font-bold mb-8">
          Panel Administrador
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Nombre del producto"
            value={producto.nombre}
            onChange={(e) =>
              setProducto({
                ...producto,
                nombre: e.target.value
              })
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Precio"
            value={producto.precio}
            onChange={(e) =>
              setProducto({
                ...producto,
                precio: e.target.value
              })
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="URL de imagen"
            value={producto.imagen}
            onChange={(e) =>
              setProducto({
                ...producto,
                imagen: e.target.value
              })
            }
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            placeholder="Descripción"
            value={producto.descripcion}
            onChange={(e) =>
              setProducto({
                ...producto,
                descripcion: e.target.value
              })
            }
            className="w-full border p-3 rounded-lg h-32"
          />

          <button
            onClick={guardarProducto}
            className="bg-black text-white px-6 py-3 rounded-xl w-full"
          >
            Guardar Producto
          </button>

        </div>

      </div>

    </div>
  );
}
