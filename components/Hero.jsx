export default function Hero() {
  return (
    <section className="bg-blue-900 text-white py-24">

      <div className="max-w-7xl mx-auto px-8">

        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* TEXTO */}

          <div>

            <h1 className="text-7xl font-extrabold leading-tight">

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

            <button className="mt-10 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-10 py-5 rounded-2xl text-xl">

              Ver Productos

            </button>

          </div>

          {/* IMAGEN */}

          <div>

            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200"
              className="w-full rounded-3xl shadow-2xl"
            />

          </div>

        </div>

      </div>

    </section>
  );
}
