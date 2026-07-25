"use client";

import { useCheckout } from "../context/CheckoutContext";

export default function CheckoutForm() {

  const {

    nombre,
    setNombre,

    celular,
    setCelular,

    correo,
    setCorreo,

    direccion,
    setDireccion,

    distrito,
    setDistrito,

    referencia,
    setReferencia,

  } = useCheckout();

  return (

    <div className="bg-white rounded-2xl shadow-md p-8">

      <h2 className="text-2xl font-bold mb-6">

        Datos del cliente

      </h2>

      <div className="grid gap-5">

        {/* Nombre */}

        <div>

          <label className="font-medium text-gray-700">

            Nombre completo *

          </label>

          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingrese su nombre completo"
            className="w-full mt-2 border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-yellow-500"
          />

        </div>

        {/* Celular */}

        <div>

          <label className="font-medium text-gray-700">

            Celular *

          </label>

          <input
            type="tel"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            placeholder="999999999"
            maxLength={9}
            className="w-full mt-2 border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-yellow-500"
          />

        </div>

        {/* Correo */}

        <div>

          <label className="font-medium text-gray-700">

            Correo electrónico

          </label>

          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="correo@ejemplo.com"
            className="w-full mt-2 border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-yellow-500"
          />

        </div>

        {/* Dirección */}

        <div>

          <label className="font-medium text-gray-700">

            Dirección *

          </label>

          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Av., Jr., Calle..."
            className="w-full mt-2 border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-yellow-500"
          />

        </div>

        {/* Distrito */}

        <div>

          <label className="font-medium text-gray-700">

            Distrito *

          </label>

          <select
            value={distrito}
            onChange={(e) => setDistrito(e.target.value)}
            className="w-full mt-2 border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-yellow-500"
          >

            <option value="">
              Seleccione un distrito
            </option>

            <option>San Luis</option>
            <option>San Borja</option>
            <option>La Victoria</option>
            <option>Surquillo</option>
            <option>Surco</option>
            <option>Miraflores</option>
            <option>San Isidro</option>
            <option>Lince</option>
            <option>Breña</option>
            <option>Cercado de Lima</option>

          </select>

        </div>

        {/* Referencia */}

        <div>

          <label className="font-medium text-gray-700">

            Referencia

          </label>

          <textarea
            rows="3"
            value={referencia}
            onChange={(e) => setReferencia(e.target.value)}
            placeholder="Frente al parque, al costado de..."
            className="w-full mt-2 border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-yellow-500"
          />

        </div>

      </div>

    </div>

  );

}