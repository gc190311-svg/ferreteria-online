export default function Hero() {

  return (

    <section className="bg-gradient-to-r from-black to-blue-950 text-white">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center px-6 py-20">

        {/* TEXTO */}

        <div>

          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">

            Todo lo que
            <br />

            necesitas
            <br />

            para tu obra

          </h1>

          <p className="mt-8 text-2xl text-gray-300">

            Herramientas, electricidad,
            construcción, pintura,
            gasfitería y mucho más.

          </p>

          <a
            href="#productos"
            className="inline-block mt-10 bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-5 rounded-2xl text-xl font-bold transition"
          >

            Ver Productos

          </a>

        </div>

        {/* IMAGEN */}

        <div>

          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd"
            alt="Construcción"
            className="rounded-3xl shadow-2xl w-full"
          />

        </div>

      </div>

    </section>

  );

}
