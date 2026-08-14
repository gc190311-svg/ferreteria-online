"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#07152F] via-[#0B1E45] to-[#081126]">

      {/* Fondo */}

      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-yellow-500/10 blur-3xl"></div>

      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl"></div>

      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(white 1px, transparent 1px),
            linear-gradient(90deg, white 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* TEXTO */}

          <div>


            <div className="w-24 h-1 bg-yellow-500 rounded-full mt-6"></div>

            <h1 className="mt-8 text-5xl md:text-6xl xl:text-7xl font-black text-white leading-tight">

              Todo lo que

              <br />

              <span className="text-yellow-400">

                necesitas

              </span>

              <br />

              para tu obra

            </h1>

            <p className="mt-8 text-gray-300 text-xl leading-9 max-w-xl">

              Encuentra herramientas profesionales, materiales de
              construcción, electricidad, pinturas, gasfitería
              y miles de productos con la mejor calidad.

            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                href="/productos"
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
              >

                Ver Productos

              </Link>

              <Link
                href="/nosotros"
                className="border border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-xl transition-all duration-300"
              >

                Conoce Más

              </Link>

            </div>

            <div className="grid grid-cols-3 gap-8 mt-14">

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

          {/* PANEL DERECHO */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                      {/* TARJETA HERRAMIENTAS */}

          <div className="
relative
overflow-hidden
rounded-3xl
h-[430px]
sm:h-[480px]
lg:h-[620px]
group
shadow-2xl
">

           {/* Imagen PC */}
<Image
  src="/hero/hero-herramientas.jpg"
  alt="Herramientas"
  fill
  priority
  className="
    hidden
    lg:block
    object-cover
    transition-transform
    duration-700
    group-hover:scale-105
  "
/>

{/* Imagen CELULAR */}
<Image
  src="/hero/hero-herramientas-mobile.jpg"
  alt="Herramientas"
  fill
  priority
  className="
    block
    lg:hidden
    object-cover
  "
/>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
            
            </div>

            <div className="absolute inset-0 flex flex-col justify-between p-8">

  {/* Etiqueta */}

  <div>

    <span className="inline-flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded-lg font-semibold text-xs shadow-md">

      🔥 DESCUENTO 30%

    </span>

  </div>

  {/* Información */}

  <div>

    <h2 className="text-white text-2xl lg:text-3xl font-extrabold leading-tight">

      Herramientas

    </h2>

    <div className="w-16 h-1 bg-yellow-500 rounded-full mt-4 mb-6">
      
      </div>

    <p className="text-white/90 text-lg lg:text-xl leading-8">

      Taladros, amoladoras, lijadoras,
      cajas de herramientas y equipos
      para profesionales.

    </p>

    <Link
      href="/categorias/herramientas"
      className="inline-flex items-center justify-center gap-2 mt-5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-xs lg:text-base px-4 lg:px-7 py-2.5 lg:py-3 rounded-xl transition-all duration-300 w-fit"
    >

      Comprar Ahora

      <span className="text-2xl">

      

      </span>

    </Link>

  </div>

</div>

</div>
          {/* TARJETA PINTURAS */}

          <div className="
relative
overflow-hidden
rounded-3xl
h-[430px]
sm:h-[480px]
lg:h-[620px]
group
shadow-2xl
">

            {/* Imagen PC */}
<Image
  src="/hero/hero-pinturas.jpg"
  alt="Pinturas"
  fill
  priority
  className="
    hidden
    lg:block
    object-cover
    transition-transform
    duration-700
    group-hover:scale-105
  "
/>

{/* Imagen CELULAR */}
<Image
  src="/hero/hero-pinturas-mobile.jpg"
  alt="Pinturas"
  fill
  priority
  className="
    block
    lg:hidden
    object-cover
  "
/>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
            
            </div>

            <div className="absolute inset-0 flex flex-col justify-between p-8">

  {/* Etiqueta */}

  <div>

    <span className="inline-flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg font-semibold text-xs shadow-md">

     NUEVA COLECCIÓN

    </span>

  </div>

  {/* Información */}

  <div>

    <h2 className="text-white text-2xl lg:text-3xl font-extrabold leading-tight">

      Pinturas

    </h2>

    <div className="w-16 h-1 bg-blue-500 rounded-full mt-4 mb-6">


    </div>

    <p className="text-white/90 text-lg lg:text-xl leading-8">

      Pinturas para interiores y exteriores
      con excelente cobertura y acabados
      duraderos.

    </p>

    <Link
      href="/categorias/pintura"
      className="inline-flex items-center justify-center gap-2 mt-5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-xs lg:text-base px-4 lg:px-7 py-2.5 lg:py-3 rounded-xl transition-all duration-300 w-fit"
    >

      Ver Colección

      <span className="text-2xl">

        

      </span>

    </Link>

  </div>

</div>

</div>

        </div>

                </div>

      </div>

    </section>
  );
}


            