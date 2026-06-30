"use client";

import HeaderHome from "../../components/HeaderHome";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function CategoriasPage() {

  const categorias = [

    {
      nombre: "Herramientas",
      imagen: "/categorias/herramientas.jpg",
      url: "/productos?categoria=herramientas",
    },

    {
      nombre: "Construcción",
      imagen: "/categorias/construccion.jpg",
      url: "/productos?categoria=construccion",
    },

    {
      nombre: "Electricidad",
      imagen: "/categorias/electricidad.jpg",
      url: "/productos?categoria=electricidad",
    },

    {
      nombre: "Pintura",
      imagen: "/categorias/pintura.jpg",
      url: "/productos?categoria=pintura",
    },

    {
      nombre: "Gasfitería",
      imagen: "/categorias/gasfiteria.jpg",
      url: "/productos?categoria=gasfiteria",
    },

    {
      nombre: "Iluminación",
      imagen: "/categorias/iluminacion.jpg",
      url: "/productos?categoria=iluminacion",
    },

  ];

  return (

    <>

      <HeaderHome />

      <Navbar />

      {/* Banner */}

      <section
        className="relative h-72 bg-cover bg-center"
        style={{
          backgroundImage: "url('/banner-catalogo.jpg')",
        }}
      >

        <div className="absolute inset-0 bg-green-900/70"></div>

        <div className="relative h-full flex items-center justify-center">

          <h1 className="text-5xl font-bold text-white">

            Categorías

          </h1>

        </div>

      </section>

      {/* Grid */}

      <section className="max-w-7xl mx-auto py-16 px-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {categorias.map((categoria) => (

            <a

              key={categoria.nombre}

              href={categoria.url}

              className="group relative overflow-hidden rounded-xl shadow-xl"

            >

              <img

                src={categoria.imagen}

                alt={categoria.nombre}

                className="
                  h-72
                  w-full
                  object-cover
                  transition
                  duration-500
                  group-hover:scale-110
                "

              />

              <div className="absolute inset-0 bg-black/35"></div>

              <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-5">

                <h2 className="text-center text-white text-2xl font-bold">

                  {categoria.nombre}

                </h2>

              </div>

            </a>

          ))}

        </div>

      </section>

      <Footer />

    </>

  );

}
