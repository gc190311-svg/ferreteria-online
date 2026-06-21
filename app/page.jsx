"use client";

import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export default function FerreteriaPage() {

  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [mostrarCategorias, setMostrarCategorias] = useState(false);

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

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between text-center gap-2">

  <p className="w-full md:w-auto">
    📞 Atención al cliente: 921 883 870
  </p>

  <p className="w-full md:w-auto">
    🚚 Delivery a todo Lima
  </p>

</div>

      </div>

      {/* HEADER */}

<header className="bg-white shadow sticky top-0 z-50">

  <div className="max-w-7xl mx-auto px-4 py-4">

    {/* FILA SUPERIOR */}

    <div className="flex flex-col lg:flex-row items-center gap-6">

      {/* LOGO */}

      <div className="flex items-center overflow-hidden w-40 md:w-52 h-20">

        <img
          src="https://i.postimg.cc/7YYcLDSq/BRICO-HOGAR-PERU-(2).png"
          alt="Logo"
          className="w-full h-full object-contain scale-200"
        />

      </div>

      {/* BUSCADOR */}

      <div className="w-full flex-1">

        <input
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-black"
        />

      </div>

    </div>

    {/* FILA INFERIOR */}

    <div className="flex justify-center items-center gap-8 mt-5 text-sm font-semibold">

      <button
        onClick={() => setMostrarCategorias(true)}
        className="bg-black text-white px-5 py-2 rounded-xl shadow hover:bg-gray-800 transition"
      >
        ☰ Categorías
      </button>

      <a href="#">Inicio</a>

      <a href="#productos">Productos</a>

      <a href="#">Ofertas</a>

      <a href="#">Contacto</a>

    </div>

  </div>

</header>

      </header>

      {/* HERO */}

      <section className="bg-gradient-to-r from-black to-blue-950 text-white">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 py-16 items-center">

          <div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
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
              className="inline-block mt-8 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-2xl"
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

      {mostrarCategorias && (

<div className="fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 p-6 overflow-y-auto">

  <div className="flex justify-between items-center mb-8">

    <h3 className="text-2xl font-bold">
      Categorías
    </h3>

    <button
      onClick={() => setMostrarCategorias(false)}
      className="text-2xl font-bold"
    >
      ×
    </button>

  </div>

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
      onClick={() => {
        setCategoriaSeleccionada(categoria);
        setMostrarCategorias(false);
      }}
      className={`w-full text-left p-4 rounded-xl mb-3 font-bold transition
      ${
        categoriaSeleccionada === categoria
          ? "bg-black text-white"
          : "bg-gray-100 hover:bg-yellow-400"
      }`}
    >
      {categoria === "Herramientas" && "🔧 "}
      {categoria === "Construcción" && "🧱 "}
      {categoria === "Electricidad" && "⚡ "}
      {categoria === "Pintura" && "🎨 "}
      {categoria === "Gasfitería" && "🚿 "}
      {categoria}
    </button>

  ))}

</div>
      
)}  

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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">

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
                    producto.imagen?.[0] ||
                    producto.imagen ||
                    "/sin-imagen.png"
                  }
                  alt={producto.nombre}
                  className="max-h-48 md:max-h-60 object-contain hover:scale-105 transition duration-300"
                />

              </div>

              {/* INFORMACIÓN */}

              <div className="p-6">

                <h4 className="text-xl font-bold min-h-[70px]">
                  {producto.nombre}
                </h4>

                {producto.oferta ? (

                  <div className="mt-4">

                    <p className="text-gray-400 line-through text-lg">
                      S/ {producto.precio}
                    </p>

                    <p className="text-green-600 font-bold text-3xl">
                      S/ {producto.oferta}
                    </p>

                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                      OFERTA
                    </span>

                  </div>

                ) : (

                  <p className="mt-4 text-green-600 font-bold text-3xl">
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

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* EMPRESA */}

          <div>

            <h4 className="text-3xl font-bold text-yellow-500">
              BRICO HOGAR PERÚ
            </h4>

            <p className="mt-4 text-gray-400">
              Tu tienda online de herramientas, materiales de construcción,
              electricidad, pintura y gasfitería.
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

      {/* BOTÓN FLOTANTE WHATSAPP */}

      <a
        href="https://wa.me/51921883870"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl z-50 transition"
      >

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.52 3.48A11.79 11.79 0 0 0 12.05 0C5.54 0 .24 5.3.24 11.82c0 2.08.54 4.1 1.57 5.88L0 24l6.47-1.7a11.75 11.75 0 0 0 5.58 1.42h.01c6.51 0 11.81-5.3 11.81-11.82 0-3.16-1.23-6.13-3.35-8.42ZM12.06 21.7h-.01a9.8 9.8 0 0 1-4.99-1.36l-.36-.21-3.84 1.01 1.03-3.75-.24-.39a9.82 9.82 0 1 1 8.41 4.7Zm5.39-7.36c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.73.94-.9 1.13-.16.19-.33.22-.62.07-.29-.15-1.21-.45-2.31-1.44-.85-.76-1.42-1.7-1.59-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.33.44-.49.15-.16.19-.29.29-.49.1-.19.05-.36-.02-.51-.08-.15-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.49.07-.75.36-.26.29-.98.96-.98 2.33s1.01 2.69 1.15 2.88c.15.19 1.98 3.02 4.8 4.24.67.29 1.2.46 1.61.59.68.22 1.3.19 1.79.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34Z" />
        </svg>

      </a>

    </div>

  );

}
