"use client";

export default function Marcas() {

  const marcas = [
    "/marcas/truper.png",
    "/marcas/anypsa.png",
    "/marcas/cpp.png",
    "/marcas/kamasa.png",
    "/marcas/stanley.png",
    "/marcas/bticino.png",
    "/marcas/indeco.png",
   
  ];

  return (
    <section className="bg-white py-20 overflow-hidden">

      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-14">

          Trabajamos con las mejores marcas

        </h2>

        <div className="overflow-hidden">

          <div className="flex items-center gap-20 animate-marcas">

            {[...marcas, ...marcas].map((marca, index) => (

              <div
                key={index}
                className="flex-shrink-0"
              >

                <img
                  src={marca}
                  alt="Marca"
                  className="
                    w-[180px]
                    h-[80px]
                    object-contain
                    grayscale
                    hover:grayscale-0
                    duration-300
                  "
                />

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}
