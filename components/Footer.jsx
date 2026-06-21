export default function Footer() {

  return (

    <footer
      id="contacto"
      className="bg-black text-white py-16"
    >

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* EMPRESA */}

        <div>

          <h2 className="text-3xl font-bold text-yellow-500">

            BRICO HOGAR PERÚ

          </h2>

          <p className="mt-5 text-gray-400">

            Tu tienda online de herramientas y materiales para construcción, electricidad, pintura y gasfitería.

          </p>

        </div>

        {/* CONTACTO */}

        <div>

          <h3 className="font-bold text-xl mb-5">

            Contacto

          </h3>

          <p className="mb-3">

            📞 921 883 870

          </p>

          <p className="mb-3">

            📧 ventas@bricohogarperu.com

          </p>

          <p>

            📍 Lima, Perú

          </p>

        </div>

        {/* HORARIOS */}

        <div>

          <h3 className="font-bold text-xl mb-5">

            Horario

          </h3>

          <p className="mb-3">

            Lunes a Sábado

          </p>

          <p>

            08:00 am - 07:00 pm

          </p>

        </div>

        {/* MEDIOS DE PAGO */}

        <div>

          <h3 className="font-bold text-xl mb-5">

            Medios de pago

          </h3>

          <div className="text-4xl flex gap-4">

            💳

            🏦

            📱

            💵

          </div>

        </div>

      </div>

      {/* DERECHOS */}

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">

        © 2026 BRICO HOGAR PERÚ - Todos los derechos reservados.

      </div>

    </footer>

  );

}
