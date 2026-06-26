"use client";

import Link from "next/link";

export default function BannerCatalogo() {
  return (
    <section className="max-w-7xl mx-auto px-4 pt-8">

      <div className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-yellow-500">
          Inicio
        </Link>

        <span className="mx-2">›</span>

        <span className="font-semibold">
          Catálogo
        </span>
      </div>

      <div
        className="relative h-[320px] rounded-3xl overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: "url('/banner-catalogo.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 h-full flex items-center px-12">

          <div className="max-w-xl">

            <h1 className="text-5xl font-bold text-white">
              Todo para tu proyecto
            </h1>

            <p className="text-xl text-gray-200 mt-5">
              Herramientas, electricidad, pintura,
              gasfitería y construcción.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}
