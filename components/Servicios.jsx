"use client";

import { FaTruck, FaTools, FaPaintRoller, FaHardHat } from "react-icons/fa";

export default function Servicios() {
  const servicios = [
    {
      icono: <FaTruck />,
      titulo: "Delivery a domicilio",
      descripcion: "Envíos rápidos a toda Lima Metropolitana.",
    },
    {
      icono: <FaTools />,
      titulo: "Asesoría técnica",
      descripcion: "Te ayudamos a elegir la herramienta adecuada.",
    },
    {
      icono: <FaPaintRoller />,
      titulo: "Productos de calidad",
      descripcion: "Marcas reconocidas para construcción y acabados.",
    },
    {
      icono: <FaHardHat />,
      titulo: "Atención personalizada",
      descripcion: "Soporte antes y después de tu compra.",
    },
  ];

  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Nuestros Servicios
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {servicios.map((servicio, index) => (
            <div
             <div
  key={index}
  className="bg-white rounded-3xl shadow-lg p-8 text-center flex flex-col items-center justify-center hover:-translate-y-2 duration-300"
>
  <div className="text-5xl text-yellow-500 mb-6">
    {servicio.icono}
  </div>

  <h3 className="text-2xl font-bold mb-4 text-center">
    {servicio.titulo}
  </h3>

  <p className="text-gray-600 text-center">
    {servicio.descripcion}
  </p>
</div>
          ))}

        </div>

      </div>
    </section>
  );
}
