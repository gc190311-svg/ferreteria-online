'use client';

import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export default function FerreteriaPage() {

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {

    const querySnapshot = await getDocs(collection(db, "productos"));

    const lista = [];

    querySnapshot.forEach((doc) => {
      lista.push({
        id: doc.id,
        ...doc.data()
      });
    });

    setProductos(lista);
  };

  return (

    <div className="min-h-screen bg-gray-100 text-gray-900">

      <header className="bg-black text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          <div>
            <h1 className="text-3xl font-bold text-yellow-400">
              FERREMÁS
            </h1>

            <p className="text-sm">
              Todo en Ferretería
            </p>
          </div>

          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#">Inicio</a>
            <a href="#">Productos</a>
            <a href="#">Ofertas</a>
            <a href="#">Contacto</a>
          </nav>

        </div>
      </header>

      <section className="bg-gradient-to-r from-black to-gray-900 text-white">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6 py-16 items-center">

          <div>

            <h2 className="text-5xl font-extrabold leading-tight">
              Todo lo que necesitas para tu obra
            </h2>

            <p className="mt-6 text-lg text-gray-300">
              Venta online de herramientas,
              materiales eléctricos,
              plomería y más.
            </p>

          </div>

          <div>

            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd"
              alt="Construcción"
              className="rounded-2xl shadow-2xl"
            />

          </div>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">

        <h3 className="text-4xl font-bold mb-10">
          Productos
        </h3>

        <div className="grid md:grid-cols-3 gap-8">

          {productos.map((producto) => (

            <div
  key={producto.id}
  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition"
>

  <div className="bg-gray-100 h-72 flex items-center justify-center">

    <img
      src={producto.imagen}
      alt={producto.nombre}
      className="max-h-64 object-contain"
    />

  </div>

  <div className="p-5">

    <h4 className="text-2xl font-bold">
      {producto.nombre}
    </h4>

    <p className="text-gray-500 mt-2">
      {producto.descripcion}
    </p>

    <p className="text-2xl font-bold text-green-600 mt-4">
      S/ {producto.precio}
    </p>

<a
  href="https://wa.me/51921883870"
  target="_blank"
  className="block mt-5 bg-black hover:bg-gray-800 text-white text-center py-3 rounded-xl"
>
  Pedir por WhatsApp
</a>

</div>

</div>

))}

</div>

);
}
