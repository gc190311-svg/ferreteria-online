'use client';

import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useState, useEffect } from 'react';

export default function FerreteriaPage() {
  const categorias = [
    'Herramientas Eléctricas',
    'Herramientas Manuales',
    'Materiales de Construcción',
    'Electricidad',
    'Gasfinteria',
    'Pinturas y Acabados',
  ];

const [productos, setProductos] = useState([]);
useEffect(() => {
  cargarProductos();
}, []);

const cargarProductos = async () => {
  const querySnapshot = await getDocs(collection(db, "productos"));

  const listaProductos = [];

  querySnapshot.forEach((doc) => {
    listaProductos.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  setProductos(listaProductos);
};
const [nuevoProducto, setNuevoProducto] = useState({
  nombre: "",
  descripcion: "",
  precio: "",
  imagen: "",
});

const agregarProducto = async () => {
  if (!nuevoProducto.nombre) return;

  try {
    await addDoc(collection(db, "productos"), {
      nombre: nuevoProducto.nombre,
      descripcion: nuevoProducto.descripcion,
      precio: nuevoProducto.precio,
      imagen: nuevoProducto.imagen,
    });

    alert("Producto agregado correctamente");
    
  } catch (error) {
    console.error(error);
    alert("Error al guardar");
  }
  
return (
    <div className="min-h-screen bg-gray-100 text-gray-900">

  <header className="bg-black text-white">
    <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      <div>
        <h1 className="text-3xl font-bold text-yellow-400">FERREMÁS</h1>
        <p className="text-sm">Todo en Ferretería</p>
      </div>

      <div className="hidden md:flex gap-6 text-sm">
        <a href="#">Inicio</a>
        <a href="#">Productos</a>
        <a href="#">Ofertas</a>
        <a href="#">Contacto</a>
      </div>
    </div>
  </header>

  <section className="bg-gradient-to-r from-black to-gray-900 text-white">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6 py-16 items-center">

      <div>
        <h2 className="text-5xl font-extrabold leading-tight">
          Todo lo que necesitas para tu obra
        </h2>

        <p className="mt-6 text-lg text-gray-300">
          Venta online de herramientas, materiales eléctricos,
          plomería, pinturas y más.
        </p>

        <button className="mt-8 bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold">
          Ver Productos
        </button>
      </div>

      <img
        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd"
        alt="Construcción"
        className="rounded-3xl shadow-2xl"
      />
    </div>
  </section>

  <footer className="bg-black text-white py-10">
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6">

      <div>
        <h4 className="font-bold mb-3">FERREMÁS</h4>
        <p className="text-gray-300">
          Todo en herramientas y materiales para construcción.
        </p>
      </div>

      <div>
        <h5 className="font-bold mb-3">Enlaces</h5>
        <ul className="space-y-2">
          <li>Inicio</li>
          <li>Productos</li>
          <li>Ofertas</li>
          <li>Contacto</li>
        </ul>
      </div>

      <div>
        <h5 className="font-bold mb-3">Contacto</h5>
        <p className="text-gray-300">WhatsApp: 51921883870</p>
        <p className="text-gray-300">bricohogarperu@hotmail.com</p>
        <p className="text-gray-300">Lima, Perú</p>
      </div>

    </div>

    <a
      href="https://wa.me/51921883870"
      target="_blank"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-2xl z-50 font-bold"
    >
      WhatsApp
    </a>
      </footer>
    </div>
  );
}
