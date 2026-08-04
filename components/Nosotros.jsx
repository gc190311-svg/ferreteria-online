"use client";

import Link from "next/link";
import Image from "next/image";

export default function Nosotros() {
  return (
    <main className="bg-white">

      {/* =================== BANNER =================== */}

      <section
        className="relative h-[500px] flex items-center justify-center overflow-hidden"
      >

        {/* Imagen de fondo */}

        <Image
          src="/banner-categorias.jpg"
          alt="Nosotros"
          fill
          priority
          className="object-cover"
        />

        {/* Fondo oscuro */}

        <div className="absolute inset-0 bg-black/60"></div>

        {/* Contenido */}

        <div className="relative z-10 text-center text-white px-6">

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">

            BRICO HOGAR PERÚ

          </h1>

          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">

            Más que una ferretería,

            somos el aliado de tus proyectos,

            ofreciendo herramientas,

            materiales de construcción,

            electricidad,

            pintura y gasfitería con la mejor atención.

          </p>

          <Link
            href="/productos"
            className="inline-block mt-10 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-10 py-4 rounded-lg transition"
          >
            Ver Productos
          </Link>

        </div>

      </section>

      {/* =================== NUESTRA HISTORIA =================== */}

<section className="max-w-7xl mx-auto py-20 px-6">

  <div className="grid lg:grid-cols-2 gap-14 items-center">

    {/* Imagen */}

    <div className="relative h-[450px] rounded-xl overflow-hidden shadow-xl">

      <Image
        src="/banner-categorias.jpg"
        alt="Brico Hogar Perú"
        fill
        className="object-cover"
      />

    </div>

    {/* Texto */}

    <div>

      <span className="text-yellow-500 font-bold uppercase tracking-widest">
        Nuestra Empresa
      </span>

      <h2 className="text-4xl font-extrabold mt-3 mb-6 text-gray-900">
        Construimos confianza desde el primer día
      </h2>

      <p className="text-gray-600 leading-8 text-lg mb-6">

        En <strong>Brico Hogar Perú</strong> trabajamos para ofrecer una amplia
        variedad de herramientas, materiales de construcción, productos de
        electricidad, pintura y gasfitería.

      </p>

      <p className="text-gray-600 leading-8 text-lg mb-6">

        Nuestro compromiso es brindar productos de calidad,
        precios competitivos y una atención personalizada para
        cada cliente.

      </p>

      <p className="text-gray-600 leading-8 text-lg">

        Nos esforzamos por convertirnos en el aliado de
        profesionales, contratistas y familias que buscan soluciones
        confiables para sus proyectos.

      </p>

    </div>

  </div>

</section>

{/* =================== MISIÓN Y VISIÓN =================== */}

<section className="bg-gray-50 py-20">

    <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

            <span className="text-yellow-500 uppercase font-bold tracking-widest">
                Nuestra Filosofía
            </span>

            <h2 className="text-4xl font-extrabold mt-3 text-gray-900">
                Misión y Visión
            </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-10">

            {/* MISIÓN */}

            <div className="bg-white rounded-2xl shadow-lg p-10 border-t-4 border-yellow-400 hover:shadow-2xl transition">

                <div className="text-5xl mb-6">
                    🎯
                </div>

                <h3 className="text-3xl font-bold mb-6">

                    Nuestra Misión

                </h3>

                <p className="text-gray-600 leading-8 text-lg">

                    Brindar soluciones integrales en herramientas,
                    materiales de construcción, electricidad,
                    pintura y gasfitería, ofreciendo productos de
                    calidad, precios competitivos y una atención
                    personalizada que supere las expectativas de
                    nuestros clientes.

                </p>

            </div>

            {/* VISIÓN */}

            <div className="bg-white rounded-2xl shadow-lg p-10 border-t-4 border-yellow-400 hover:shadow-2xl transition">

                <div className="text-5xl mb-6">
                    🚀
                </div>

                <h3 className="text-3xl font-bold mb-6">

                    Nuestra Visión

                </h3>

                <p className="text-gray-600 leading-8 text-lg">

                    Consolidarnos como una de las ferreterías líderes
                    del Perú, reconocida por la calidad de nuestros
                    productos, la innovación en nuestros servicios y
                    el compromiso permanente con nuestros clientes.

                </p>

            </div>

        </div>

    </div>

</section>

{/* =================== VALORES =================== */}

<section className="py-24 bg-white">

    <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

            <span className="text-yellow-500 uppercase font-bold tracking-widest">

                Lo que nos caracteriza

            </span>

            <h2 className="text-4xl font-extrabold mt-3">

                Nuestros Valores

            </h2>

            <p className="text-gray-500 mt-4 max-w-3xl mx-auto">

                Estos principios guían cada decisión y cada servicio que brindamos a nuestros clientes.

            </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition">

                <div className="text-6xl mb-5">🤝</div>

                <h3 className="font-bold text-xl mb-2">
                    Honestidad
                </h3>

                <p className="text-gray-500 text-sm">
                    Transparencia y confianza en cada venta.
                </p>

            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition">

                <div className="text-6xl mb-5">⭐</div>

                <h3 className="font-bold text-xl mb-2">
                    Calidad
                </h3>

                <p className="text-gray-500 text-sm">
                    Productos seleccionados de las mejores marcas.
                </p>

            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition">

                <div className="text-6xl mb-5">⚡</div>

                <h3 className="font-bold text-xl mb-2">
                    Innovación
                </h3>

                <p className="text-gray-500 text-sm">
                    Siempre incorporando nuevas soluciones.
                </p>

            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition">

                <div className="text-6xl mb-5">💛</div>

                <h3 className="font-bold text-xl mb-2">
                    Compromiso
                </h3>

                <p className="text-gray-500 text-sm">
                    Acompañamos a nuestros clientes antes y después de la compra.
                </p>

            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition">

                <div className="text-6xl mb-5">🛠️</div>

                <h3 className="font-bold text-xl mb-2">
                    Servicio
                </h3>

                <p className="text-gray-500 text-sm">
                    Atención personalizada para cada proyecto.
                </p>

            </div>

        </div>

    </div>

</section>

{/* =================== ¿POR QUÉ ELEGIRNOS? =================== */}

<section className="py-24 bg-gray-100">

    <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

            <span className="text-yellow-500 uppercase font-bold tracking-widest">
                Nuestras ventajas
            </span>

            <h2 className="text-4xl font-extrabold mt-3 mb-5">
                ¿Por qué elegir Brico Hogar Perú?
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                Nos esforzamos por brindar una experiencia de compra segura,
                rápida y con productos de calidad para todos tus proyectos.
            </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition">

                <div className="text-5xl mb-5">🚚</div>

                <h3 className="font-bold text-2xl mb-4">
                    Delivery rápido
                </h3>

                <p className="text-gray-600">
                    Entregamos tus pedidos en Lima Metropolitana y realizamos envíos a todo el Perú.
                </p>

            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition">

                <div className="text-5xl mb-5">🛒</div>

                <h3 className="font-bold text-2xl mb-4">
                    Gran variedad
                </h3>

                <p className="text-gray-600">
                    Contamos con un amplio catálogo de herramientas, materiales y accesorios para cada proyecto.
                </p>

            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition">

                <div className="text-5xl mb-5">🏆</div>

                <h3 className="font-bold text-2xl mb-4">
                    Marcas reconocidas
                </h3>

                <p className="text-gray-600">
                    Trabajamos con marcas reconocidas para garantizar calidad y durabilidad.
                </p>

            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition">

                <div className="text-5xl mb-5">💳</div>

                <h3 className="font-bold text-2xl mb-4">
                    Pago seguro
                </h3>

                <p className="text-gray-600">
                    Aceptamos Visa, Mastercard, Yape, Plin y PagoEfectivo para tu comodidad.
                </p>

            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition">

                <div className="text-5xl mb-5">📞</div>

                <h3 className="font-bold text-2xl mb-4">
                    Atención personalizada
                </h3>

                <p className="text-gray-600">
                    Nuestro equipo está listo para ayudarte a encontrar el producto adecuado.
                </p>

            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition">

                <div className="text-5xl mb-5">🛠️</div>

                <h3 className="font-bold text-2xl mb-4">
                    Asesoría especializada
                </h3>

                <p className="text-gray-600">
                    Te orientamos para elegir las mejores soluciones para tu hogar, negocio o proyecto.
                </p>

            </div>

        </div>

    </div>

</section>

{/* =================== NUESTRAS CIFRAS =================== */}

<section className="py-24 bg-yellow-400">

    <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

            <h2 className="text-4xl font-extrabold text-black">

                Brico Hogar Perú en cifras

            </h2>

            <p className="text-black mt-4 text-lg">

                Nuestro compromiso se refleja en cada cliente y cada proyecto.

            </p>

        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">

            <div className="text-center">

                <h3 className="text-6xl font-extrabold text-black">

                    +5,000

                </h3>

                <p className="mt-4 text-lg font-semibold text-gray-900">

                    Productos

                </p>

            </div>

            <div className="text-center">

                <h3 className="text-6xl font-extrabold text-black">

                    +2,000

                </h3>

                <p className="mt-4 text-lg font-semibold text-gray-900">

                    Clientes satisfechos

                </p>

            </div>

            <div className="text-center">

                <h3 className="text-6xl font-extrabold text-black">

                    +30

                </h3>

                <p className="mt-4 text-lg font-semibold text-gray-900">

                    Categorías

                </p>

            </div>

            <div className="text-center">

                <h3 className="text-6xl font-extrabold text-black">

                    100%

                </h3>

                <p className="mt-4 text-lg font-semibold text-gray-900">

                    Compromiso

                </p>

            </div>

        </div>

    </div>

</section>

{/* =================== CTA FINAL =================== */}

<section className="py-24 bg-neutral-900 text-white">

    <div className="max-w-5xl mx-auto text-center px-6">

        <h2 className="text-5xl font-extrabold mb-6">

            ¿Listo para empezar tu próximo proyecto?

        </h2>

        <p className="text-xl text-gray-300 leading-8 mb-10">

            Descubre nuestro catálogo de herramientas, materiales
            de construcción y productos para el hogar.
            Estamos listos para ayudarte.

        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">

            <Link
                href="/productos"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-10 py-4 rounded-lg transition"
            >
                Ver Productos
            </Link>

            <Link
                href="/contacto"
                className="border-2 border-white hover:bg-white hover:text-black font-bold px-10 py-4 rounded-lg transition"
            >
                Contáctanos
            </Link>

        </div>

    </div>

</section>

    </main>
  );
}