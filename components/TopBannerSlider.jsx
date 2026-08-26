"use client";

import { useEffect, useState } from "react";

const banners = [
  {
    id: 1,
    pc: "/banners/pc/envio-gratis-pc.png",
    mobile: "/banners/mobile/envio-gratis-mobile.png",
    enlace: "/productos",
    alt: "Envío gratis en tu primera compra",
  },
  {
    id: 2,
    pc: "/banners/pc/ofertas-especiales-pc.png",
    mobile: "/banners/mobile/ofertas-especiales-mobile.png",
    enlace: "/productos",
    alt: "Ofertas especiales",
  },
  {
    id: 3,
    pc: "/banners/pc/whatsapp-pc.png",
    mobile: "/banners/mobile/whatsapp-mobile.png",
    enlace: "https://wa.me/51921883870",
    alt: "Ventas por WhatsApp",
  },
];

export default function TopBannerSlider() {
  const [activo, setActivo] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setActivo((actual) => (actual + 1) % banners.length);
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <section className="relative w-full h-[70px] overflow-hidden bg-black">
      {banners.map((banner, index) => (
        <a
          key={banner.id}
          href={banner.enlace}
          className={`
            absolute inset-0
            block w-full h-full
            transition-opacity duration-700 ease-in-out
            ${
              index === activo
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }
          `}
          aria-label={banner.alt}
        >
          <picture>
            {/* IMAGEN PARA CELULAR */}
            <source
              media="(max-width: 767px)"
              srcSet={banner.mobile}
            />

            {/* IMAGEN PARA PC */}
            <img
              src={banner.pc}
              alt={banner.alt}
              className="block w-full h-full object-cover object-center"
            />
          </picture>
        </a>
      ))}

      {/* INDICADORES */}
      
    </section>
  );
}