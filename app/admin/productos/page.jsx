"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ProductosAdmin() {

  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

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

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre
      ?.toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (

    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Productos
        </h1>

        <Link
          href="/admin"
          className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-400"
        >
          + Nuevo Producto
        </Link>

      </div>

      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e)=>setBusqueda(e.target.value)}
        className="border p-3 rounded-xl w-full mb-6"
      />

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Imagen
              </th>

              <th className="p-4 text-left">
                Producto
              </th>

              <th className="p-4">
                Precio
              </th>

              <th className="p-4">
                Stock
              </th>

              <th className="p-4">
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {productosFiltrados.map((producto)=>(

              <tr
                key={producto.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4">

                <>
    <img
  src={producto.imagen}
  alt={producto.nombre}
  className="w-24 h-24 object-contain border"
  onError={(e) => {
    console.log("Imagen no encontrada:", producto.imagen);
    e.target.src = "/sin-imagen.png";
  }}
/>
                </td>

                <td className="p-4 font-semibold">
                  {producto.nombre}
                </td>

                <td className="text-center">
                  S/. {producto.precio}
                </td>

                <td className="text-center">
                  {producto.stock}
                </td>

                <td className="text-center space-x-2">

                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Editar
                  </button>

                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Eliminar
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}
