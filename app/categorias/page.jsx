"use client";

import Link from "next/link";

import HeaderHome from "../../components/HeaderHome";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const categorias = [

  {
    nombre: "Herramientas",
    imagen: "/categorias/herramientas.jpg",
    ruta: "/categoria/herramientas",
  },

  {
    nombre: "Construcción",
    imagen: "/categorias/construccion.jpg",
    ruta: "/categoria/construccion",
  },

  {
    nombre: "Electricidad",
    imagen: "/categorias/electricidad.jpg",
    ruta: "/categoria/electricidad",
  },

  {
    nombre: "Pintura",
    imagen: "/categorias/pintura.jpg",
    ruta: "/categoria/pintura",
  },

  {
    nombre: "Gasfitería",
    imagen: "/categorias/gasfiteria.jpg",
    ruta: "/categoria/gasfiteria",
  },

  {
    nombre: "Iluminación",
    imagen: "/categorias/iluminacion.jpg",
    ruta: "/categoria/iluminacion",
  },

];

export default function CategoriasPage() {

  return (

    <>

      <HeaderHome />

      <Navbar />

      {/* Banner */}

      <section
        className="relative h-[300px] overflow-hidden"
      >

        <img
          src="/banner-categorias.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />

        <div className="absolute inset-0 bg-black/55"></div>

        <div className="relative h-full flex flex-col items-center justify-center">

          <h1 className="text-white text-5xl font-bold">

            Categorías

          </h1>

          <p className="text-gray-200 mt-5 text-xl">

            Encuentra todo lo que necesitas para tu proyecto

          </p>

        </div>

      </section>

      {/* GRID */}

      <section className="max-w-7xl mx-auto py-16 px-5">

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
          "
        >

          {categorias.map((categoria) => (

            <Link

              key={categoria.nombre}

              href={categoria.ruta}

              className="
                group
                rounded-xl
                overflow-hidden
                shadow-xl
                bg-white
                transition
                duration-300
                hover:-translate-y-2
              "

            >

              <div className="relative overflow-hidden">

                <img

                  src={categoria.imagen}

                  className="
                    h-72
                    w-full
                    object-cover
                    transition
                    duration-500
                    group-hover:scale-110
                  "

                  alt={categoria.nombre}

                />

                <div className="absolute inset-0 bg-black/25"></div>

              </div>

              <div className="bg-white p-6">

                <h2 className="text-2xl font-bold">

                  {categoria.nombre}

                </h2>

                <p className="text-gray-500 mt-2">

                  Ver productos →

                </p>

              </div>

            </Link>

          ))}

        </div>

      </section>

      <Footer />

    </>

  );

}
