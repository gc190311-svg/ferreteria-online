export default function Servicios() {

  return (

    <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* DELIVERY */}

        <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl transition">

          <div className="text-5xl">

            🚚

          </div>

          <h3 className="font-bold text-2xl mt-5">

            Delivery rápido

          </h3>

          <p className="text-gray-500 mt-4">

            Envíos a todo Lima Metropolitana.

          </p>

        </div>

        {/* CALIDAD */}

        <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl transition">

          <div className="text-5xl">

            ⭐

          </div>

          <h3 className="font-bold text-2xl mt-5">

            Calidad garantizada

          </h3>

          <p className="text-gray-500 mt-4">

            Productos de las mejores marcas.

          </p>

        </div>

        {/* PRECIOS */}

        <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl transition">

          <div className="text-5xl">

            💰

          </div>

          <h3 className="font-bold text-2xl mt-5">

            Mejores precios

          </h3>

          <p className="text-gray-500 mt-4">

            Ofertas especiales todos los días.

          </p>

        </div>

        {/* ASESORÍA */}

        <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl transition">

          <div className="text-5xl">

            👨‍🔧

          </div>

          <h3 className="font-bold text-2xl mt-5">

            Atención personalizada

          </h3>

          <p className="text-gray-500 mt-4">

            Te asesoramos en cada compra.

          </p>

        </div>

      </div>

    </section>

  );

}
