"use client";

import Link from "next/link";

export default function BannerCatalogo() {
  return (
    <section className="bg-gray-100">

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Breadcrumb */}

        <div className="flex items-center text-sm text-gray-500 mb-5">

          <Link
            href="/"
            className="hover:text-yellow-500 transition"
          >
            Inicio
          </Link>

          <span className="mx-2">/</span>

          <span className="font-semibold text-gray-800">
            Productos
          </span>

        </div>

        {/* Banner */}

        <div
          className="
            relative
            rounded-3xl
            overflow-hidden
            h-[220px]
            md:h-[320px]
            bg-cover
            bg-center
          "
          style={{
            backgroundImage: "url('/banner-catalogo.jpg')",
          }}
        >

          {/* Oscurecer imagen */}

          <div className="absolute inset-0 bg-black/55"></div>

          {/* Contenido */}

          <div className="relative z-10 h-full flex items-center">

            <div className="px-8 md:px-14 max-w-2xl">

              <span className="bg-yellow-500 text-black px-4 py-2 rounded-full font-bold text-sm">

                BRICO HOGAR

              </span>

              <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-5">

                Catálogo de Productos

              </h1>

              <p className="text-white/90 mt-5 text-base md:text-xl">

                Descubre herramientas profesionales,
                materiales de construcción, electricidad,
                pintura, gasfitería y mucho más.

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
