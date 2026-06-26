"use client";

import Link from "next/link";

export default function BannerCatalogo() {
  return (
    <section className="max-w-7xl mx-auto px-4 pt-8">

      {/* Breadcrumb */}

      <div className="text-sm text-gray-500 mb-4">

        <Link href="/" className="hover:text-yellow-500">
          Inicio
        </Link>

        <span className="mx-2">›</span>

        <span className="font-semibold text-gray-700">
          Catálogo
        </span>

      </div>

      {/* Banner */}

      <div
        className="relative rounded-3xl overflow-hidden h-[280px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/banner-catalogo.jpg')",
        }}
      >

        <div className="absolute inset-0 bg-black/55"></div>

        <div className="relative z-10 h-full flex items-center px-12">

          <div className="max-w-xl">

            <h1 className="text-5xl font-extrabold text-white leading-tight">

              Catálogo de

              <span className="block text-yellow-400">

                Productos

              </span>

            </h1>

            <p className="mt-6 text-white text-lg">

              Encuentra herramientas profesionales,
              materiales de construcción, electricidad,
              pintura, gasfitería y mucho más.

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}
