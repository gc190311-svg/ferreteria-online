"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Hammer,
  Paintbrush,
  ShoppingCart,
  Building2,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#07152F] via-[#0B1E45] to-[#081126]">

      {/* Figuras decorativas */}

      <div className="absolute top-20 left-20 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"></div>

      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="absolute inset-0 opacity-5">

        <div className="absolute top-20 left-40 w-72 h-72 border border-white rounded-full"></div>

        <div className="absolute bottom-10 right-40 w-56 h-56 border border-white rounded-full"></div>

      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-16">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ========================= */}

          {/* TEXTO PRINCIPAL */}

          {/* ========================= */}

          <div>

            <span className="inline-flex items-center gap-2 bg-yellow-500 text-black font-bold px-5 py-2 rounded-full text-sm">

              <Building2 size={18} />

              BRICO HOGAR PERÚ

            </span>

            <h1 className="mt-8 text-white font-black leading-none text-5xl md:text-6xl xl:text-7xl">

              Todo lo que

              <br />

              <span className="text-yellow-400">

                necesitas

              </span>

              <br />

              para tu obra.

            </h1>

            <p className="mt-8 text-gray-300 text-xl leading-9 max-w-xl">

              Encuentra herramientas, materiales de construcción,
              pinturas, electricidad, gasfitería y miles de productos
              con la mejor calidad y al mejor precio.

            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                href="/productos"
                className="flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-xl transition duration-300 shadow-xl"
              >

                <ShoppingCart size={22} />

                Ver Productos

              </Link>

              <Link
                href="/nosotros"
                className="flex items-center gap-3 border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-xl transition duration-300"
              >

                Conoce Más

                <ArrowRight size={20} />

              </Link>

            </div>

            <div className="grid grid-cols-3 gap-6 mt-14">

              <div>

                <h2 className="text-yellow-400 text-4xl font-black">

                  +5000

                </h2>

                <p className="text-gray-300 mt-2">

                  Productos

                </p>

              </div>

              <div>

                <h2 className="text-yellow-400 text-4xl font-black">

                  +120

                </h2>

                <p className="text-gray-300 mt-2">

                  Marcas

                </p>

              </div>

              <div>

                <h2 className="text-yellow-400 text-4xl font-black">

                  100%

                </h2>

                <p className="text-gray-300 mt-2">

                  Garantía

                </p>

              </div>

            </div>

          </div>

          {/* ========================= */}

          {/* TARJETAS PROMOCIONALES */}

          {/* ========================= */}

          <div className="grid md:grid-cols-2 gap-6">

                        {/* TARJETA HERRAMIENTAS */}

            <div className="group relative h-[620px] rounded-3xl overflow-hidden shadow-2xl">

              <Image
                src="/hero/hero-herramientas.jpg"
                alt="Herramientas"
                fill
                priority
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="absolute top-6 left-6">

                <span className="bg-red-600 text-white font-bold px-4 py-2 rounded-full text-sm">

                  HASTA 30% OFF

                </span>

              </div>

              <div className="absolute bottom-8 left-8 right-8">

                <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center mb-6">

                  <Hammer className="text-black" size={30} />

                </div>

                <p className="uppercase tracking-[4px] text-yellow-400 font-bold">

                  Línea Profesional

                </p>

                <h2 className="text-white text-4xl font-black mt-3">

                  Herramientas

                </h2>

                <p className="text-gray-200 mt-5 leading-7">

                  Taladros, amoladoras, lijadoras, cajas de herramientas
                  y mucho más para profesionales y aficionados.

                </p>

                <Link
                  href="/categorias/herramientas"
                  className="inline-flex items-center gap-3 mt-8 bg-yellow-500 hover:bg-yellow-400 text-black px-7 py-4 rounded-xl font-bold transition"
                >

                  Comprar Ahora

                  <ArrowRight size={20} />

                </Link>

              </div>

            </div>

            {/* TARJETA PINTURAS */}

            <div className="group relative h-[620px] rounded-3xl overflow-hidden shadow-2xl">

              <Image
                src="/hero/hero-pinturas.jpg"
                alt="Pinturas"
                fill
                priority
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="absolute top-6 left-6">

                <span className="bg-blue-600 text-white font-bold px-4 py-2 rounded-full text-sm">

                  NUEVA COLECCIÓN

                </span>

              </div>

              <div className="absolute bottom-8 left-8 right-8">

                <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center mb-6">

                  <Paintbrush className="text-black" size={30} />

                </div>

                <p className="uppercase tracking-[4px] text-yellow-400 font-bold">

                  Acabados Premium

                </p>

                <h2 className="text-white text-4xl font-black mt-3">

                  Pinturas

                </h2>

                <p className="text-gray-200 mt-5 leading-7">

                  Dale vida a tus espacios con pinturas de alta calidad
                  para interiores y exteriores.

                </p>

                <Link
                  href="/categorias/pintura"
                  className="inline-flex items-center gap-3 mt-8 bg-yellow-500 hover:bg-yellow-400 text-black px-7 py-4 rounded-xl font-bold transition"
                >

                  Ver Colección

                  <ArrowRight size={20} />

                </Link>

              </div>

            </div>

          </div>

        </div>

          </div>

                  {/* ========================= */}
        {/* BARRA DE BENEFICIOS */}
        {/* ========================= */}

        <div className="mt-20">

          <div className="bg-white rounded-3xl shadow-2xl p-8">

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

              {/* Beneficio 1 */}

              <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-2xl bg-yellow-500 flex items-center justify-center text-3xl">

                  🚚

                </div>

                <div>

                  <h3 className="font-black text-lg">

                    Entrega Rápida

                  </h3>

                  <p className="text-gray-500 text-sm">

                    Envíos a Lima y Callao.

                  </p>

                </div>

              </div>

              {/* Beneficio 2 */}

              <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-2xl bg-blue-900 text-white flex items-center justify-center text-3xl">

                  ⭐

                </div>

                <div>

                  <h3 className="font-black text-lg">

                    Calidad Garantizada

                  </h3>

                  <p className="text-gray-500 text-sm">

                    Trabajamos con las mejores marcas.

                  </p>

                </div>

              </div>

              {/* Beneficio 3 */}

              <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-2xl bg-green-600 text-white flex items-center justify-center text-3xl">

                  💲

                </div>

                <div>

                  <h3 className="font-black text-lg">

                    Mejor Precio

                  </h3>

                  <p className="text-gray-500 text-sm">

                    Ofertas permanentes.

                  </p>

                </div>

              </div>

              {/* Beneficio 4 */}

              <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-2xl bg-red-600 text-white flex items-center justify-center text-3xl">

                  👷

                </div>

                <div>

                  <h3 className="font-black text-lg">

                    Asesoría Técnica

                  </h3>

                  <p className="text-gray-500 text-sm">

                    Atención personalizada.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

    </section>

  );

}