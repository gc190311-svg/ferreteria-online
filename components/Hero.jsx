"use client";

import Link from "next/link";
"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {

  return (

<section className="relative bg-[#081126] overflow-hidden">

<div className="max-w-7xl mx-auto px-6 lg:px-10">

<div className="grid lg:grid-cols-2 gap-10 items-center min-h-[720px]">


          {/* TEXTO */}

        <div>

<p className="text-yellow-500 uppercase tracking-[6px] font-bold mb-6">

BRICO HOGAR PERÚ

</p>

<h1 className="text-white font-black leading-none text-6xl">

Todo lo que

<br />

<span className="text-yellow-400">

necesitas

</span>

<br />

para tu obra

</h1>

<p className="text-gray-300 text-xl mt-10 leading-10 max-w-xl">

Herramientas, electricidad, construcción,

pintura, gasfitería y mucho más para tus

proyectos.

</p>

<div className="flex gap-6 mt-12">

<Link

href="/productos"

className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl px-10 py-5 transition"

>

Ver Productos

</Link>

<Link

href="/nosotros"

className="border-2 border-white text-white rounded-xl px-10 py-5 hover:bg-white hover:text-black transition"

>

Conoce Más

</Link>

</div>

</div>

{/* Panel derecho */}

<div className="grid grid-cols-2 gap-6">

  {/* Herramientas */}

  <div className="relative rounded-3xl overflow-hidden group h-[620px]">

    <Image
      src="/hero/hero-herramientas.jpg"
      alt="Herramientas"
      fill
      className="object-cover transition duration-700 group-hover:scale-110"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

    <div className="absolute bottom-8 left-8 right-8">

      <div className="w-16 h-16 rounded-full border-2 border-yellow-400 flex items-center justify-center mb-6">

        🔨

      </div>

      <h3 className="text-white text-4xl font-black">

        HERRAMIENTAS

      </h3>

      <p className="text-gray-200 mt-4 text-lg">

        Potencia y rendimiento para profesionales.

      </p>

      <Link
        href="/categorias/herramientas"
        className="inline-flex mt-8 bg-yellow-500 text-black px-8 py-4 rounded-xl font-bold hover:bg-yellow-400 transition"
      >

        Ver más →

      </Link>

    </div>

  </div>

    {/* Pinturas */}

  <div className="relative rounded-3xl overflow-hidden group h-[620px]">

    <Image
      src="/hero/hero-pinturas.jpg"
      alt="Pinturas"
      fill
      className="object-cover transition duration-700 group-hover:scale-110"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

    <div className="absolute bottom-8 left-8 right-8">

      <div className="w-16 h-16 rounded-full border-2 border-yellow-400 flex items-center justify-center mb-6">

        🎨

      </div>

      <h3 className="text-white text-4xl font-black">

        PINTURAS

      </h3>

      <p className="text-gray-200 mt-4 text-lg">

        Colores que inspiran y acabados duraderos.

      </p>

      <Link
        href="/categorias/pintura"
        className="inline-flex mt-8 bg-yellow-500 text-black px-8 py-4 rounded-xl font-bold hover:bg-yellow-400 transition"
      >

        Ver más →

      </Link>

    </div>

  </div>

</div>

</div>

</div>

</section>

);

}
