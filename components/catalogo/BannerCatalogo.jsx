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

          <span className="font-semibold text-gray-700">
            Productos
          </span>

        </div>

        {/* Banner */}

        <div className="overflow-hidden rounded-3xl shadow-lg">

          <img
            src="/banner-catalogo.jpg"
            alt="Catálogo Brico Hogar"
            className="
              w-full
              h-[180px]
              md:h-[260px]
              lg:h-[320px]
              object-cover
              hover:scale-105
              duration-500
            "
          />

        </div>

      </div>

    </section>
  );
}
