"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    badge: "🔥 OFERTAS ESPECIALES",
    title: "Precios especiales en productos seleccionados",
    button: "Ver ofertas",
    href: "/ofertas",
    className: "from-[#111827] via-[#172554] to-[#0f172a]",
  },
  {
    id: 2,
    badge: "🚚 DELIVERY EN LIMA",
    title: "Recibe tus productos directamente en tu domicilio",
    button: "Comprar ahora",
    href: "/productos",
    className: "from-[#111827] via-[#1e3a8a] to-[#0f172a]",
  },
  {
    id: 3,
    badge: "🔨 TODO PARA TU PROYECTO",
    title: "Herramientas y materiales para construcción",
    button: "Ver productos",
    href: "/productos",
    className: "from-[#111827] via-[#3f2a00] to-[#111827]",
  },
  {
    id: 4,
    badge: "🏆 BRICO HOGAR PERÚ",
    title: "Calidad, variedad y buenos precios",
    button: "Conócenos",
    href: "/nosotros",
    className: "from-[#111827] via-[#292524] to-[#0f172a]",
  },
];

export default function TopBannerSlider() {
  const [activo, setActivo] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivo((actual) => (actual + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[activo];

  return (
    <div className={`relative overflow-hidden bg-gradient-to-r ${slide.className} text-white`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="min-h-[58px] sm:min-h-[64px] flex items-center justify-center">
          <div
            key={slide.id}
            className="w-full flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-5 text-center animate-[fadeIn_.45s_ease-out]"
          >
            <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-wide text-yellow-400">
              {slide.badge}
            </span>

            <span className="hidden sm:block h-6 w-px bg-white/30" />

            <span className="text-xs sm:text-sm md:text-base font-medium">
              {slide.title}
            </span>

            <Link
              href={slide.href}
              className="text-[10px] sm:text-xs md:text-sm font-bold text-yellow-400 hover:text-yellow-300 transition-colors whitespace-nowrap"
            >
              {slide.button} →
            </Link>
          </div>
        </div>

        <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1.5">
          {slides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Mostrar banner ${index + 1}`}
              onClick={() => setActivo(index)}
              className={`h-1 rounded-full transition-all ${
                index === activo
                  ? "w-6 bg-yellow-400"
                  : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}