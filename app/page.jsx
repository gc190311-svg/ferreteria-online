"use client";

import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export default function FerreteriaPage() {

  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {

    const querySnapshot = await getDocs(collection(db, "productos"));

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
    producto.nombre?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const productosPorCategoria =
    categoriaSeleccionada === "Todos"
      ? productosFiltrados
      : productosFiltrados.filter(
          (producto) => producto.categoria === categoriaSeleccionada
        );

  return (

    <div className="min-h-screen bg-gray-100">

      {/* BARRA SUPERIOR */}

      <div className="bg-black text-white text-sm py-2 px-6">

        <div className="max-w-7xl mx-auto flex justify-between">

          <p>📞 Atención al cliente: 921 883 870</p>

          <p>🚚 Delivery a todo Lima</p>

        </div>

      </div>

      {/* HEADER */}

      <header className="bg-white shadow sticky top-0 z-50">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-4">

          {/* LOGO */}

          <div className="flex items-center overflow-hidden w-36 md:w-52 h-20">

            <img
              src="https://i.postimg.cc/7YYcLDSq/BRICO-HOGAR-PERU-(2).png"
              alt="Logo"
              className="w-full h-full object-contain scale-200"
            />

          </div>

          {/* BUSCADOR */}

          <div className="w-full md:flex-1">

            <input
              type="text"
              placeholder="Buscar productos..."'
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-black"
            />

          </div>

          {/* MENÚ */}

          <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
            
            <a href="#" className="hover:text-yellow-500 transition"> 
              Inicio
            </a>

            <a href="#productos" className="hover:text-yellow-500 transition">
              Productos
            </a>

            <a href="#" className="hover:text-yellow-500 transition">
              Ofertas
            </a>

            <a href="#" className="hover:text-yellow-500 transition">
              Contacto
            </a>

          </div>

        </div>

      </header>

      {/* HERO */}

      <section className="bg-gradient-to-r from-black to-blue-950 text-white">

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 py-16 items-center">

          <div>

            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Todo lo que necesitas
              <br />
              para tu obra
            </h2>

            <p className="mt-6 text-xl text-gray-300">
              Herramientas, electricidad, construcción,
              pintura, gasfitería y mucho más.
            </p>

            <a
              href="#productos"
              className="inline-block mt-8 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-2xl transition"
            >
              Ver Productos
            </a>

          </div>

          <div>

            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd"
              alt="Construcción"
              className="rounded-3xl shadow-2xl w-full"
            />

          </div>

        </div>

      </section>
            {/* CATEGORÍAS */}

      <section className="max-w-7xl mx-auto px-6 py-14">

        <h3 className="text-4xl font-bold mb-10">
          Categorías
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4>

          {[
            "Todos",
            "Herramientas",
            "Construcción",
            "Electricidad",
            "Pintura",
            "Gasfitería",
          ].map((categoria, index) => (

            <button
              key={index}
              onClick={() => setCategoriaSeleccionada(categoria)}
              className={`rounded-2xl shadow p-8 text-center font-bold text-lg transition hover:-translate-y-1
              ${
                categoriaSeleccionada === categoria
                  ? "bg-black text-white"
                  : "bg-white hover:shadow-xl"
              }`}
            >
              {categoria}
            </button>

          ))}

        </div>

      </section>

      {/* PRODUCTOS */}

      <section
        id="productos"
        className="max-w-7xl mx-auto px-6 pb-20"
      >

        <div className="flex items-center justify-between mb-10">

          <h3 className="text-4xl font-bold">
            Productos
          </h3>

          <p className="text-gray-500">
            {productosPorCategoria.length} productos
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {productosPorCategoria.map((producto) => (

            <a
              href={`/producto/${producto.id}`}
              key={producto.id}
              className="bg-white rounded-3xl shadow hover:shadow-2xl overflow-hidden transition hover:-translate-y-2"
            >

              {/* IMAGEN */}

              <div className="bg-gray-100 h-72 flex items-center justify-center p-6">

                <img
                  src={
                    producto.imagenes?.[0] ||
                    "/sin-imagen.png"
                  }
                  alt={producto.nombre}
                  className="max-h-48 md:max-h-60 object-contain hover:scale-105 transition duration-300"
                />

              </div>

              {/* INFO */}

              <div className="p-6">

                <h4 className="text-xl font-bold min-h-[60px]">
                  {producto.nombre}
                </h4>

                {producto.oferta ? (

                  <div className="mt-4">

                    <p className="text-gray-400 line-through text-lg">
                      S/ {producto.precio}
                    </p>

                    <p className="text-green-600 font-bold text-2xl">
                      S/ {producto.oferta}
                    </p>

                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                      OFERTA
                    </span>

                  </div>

                ) : (

                  <p className="text-green-600 font-bold text-2xl mt-4">
                    S/ {producto.precio}
                  </p>

                )}

                <div className="mt-6">

                  <button className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-2xl font-semibold transition">
                    Ver Producto
                  </button>

                </div>

              </div>

            </a>

          ))}

        </div>

      </section> 

            {/* FOOTER */}

      <footer className="bg-black text-white py-10">

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* EMPRESA */}

          <div>

            <h4 className="text-3xl font-bold text-yellow-500">
              BRICO HOGAR PERÚ
            </h4>

            <p className="mt-4 text-gray-400">
              Tu tienda online de herramientas y materiales para construcción, electricidad, pintura y gasfitería.
            </p>

          </div>

          {/* CONTACTO */}

          <div>

            <h5 className="font-bold mb-4">
              Contacto
            </h5>

            <p>📞 921 883 870</p>

            <p>📍 Lima, Perú</p>

            <p>📧 ventas@bricohogarperu.com</p>

          </div>

          {/* HORARIO */}

          <div>

            <h5 className="font-bold mb-4">
              Horario de Atención
            </h5>

            <p>Lunes a Sábado</p>

            <p>8:00 am - 7:00 pm</p>

          </div>

        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">

          © 2026 BRICO HOGAR PERÚ. Todos los derechos reservados.

        </div>

      </footer>

    </div>

  );

}
