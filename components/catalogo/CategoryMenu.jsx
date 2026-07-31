"use client";

import { useMemo, useState } from "react";
import { useCatalogo } from "../context/CatalogoContext";

const PRINCIPALES = [
  "herramientas",
  "construccion",
  "electricidad",
  "pintura",
  "gasfiteria",
  "maquinaria",
  "seguridad",
];

function normalizar(texto = "") {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function CategoryMenu({ onCategoria }) {

  const { categorias } = useCatalogo();

  const [mostrarOtras, setMostrarOtras] = useState(false);
  const [animando, setAnimando] = useState("");

  const principales = useMemo(() => {

    return categorias.filter((cat) =>
      PRINCIPALES.includes(normalizar(cat))
    );

  }, [categorias]);

  const otras = useMemo(() => {

    return categorias.filter(
      (cat) => !PRINCIPALES.includes(normalizar(cat))
    );

  }, [categorias]);

  function seleccionar(cat) {

    setAnimando(cat);

    setTimeout(() => {
      setAnimando("");
    }, 300);

    onCategoria(normalizar(cat));

    setMostrarOtras(false);

  }

  function clase(cat) {

    return `
      w-full
      md:w-auto
      text-left
      md:text-center
      px-5
      py-4
      transition-all
      duration-300

      ${
        animando === cat
          ? "bg-yellow-400 text-black rounded-lg shadow-lg scale-105"
          : "text-white hover:text-yellow-500"
      }
    `;
  }

  return (
    <>

      {principales.map((cat) => (

        <button
          key={cat}
          onClick={() => seleccionar(cat)}
          className={clase(cat)}
        >
          {cat}
        </button>

      ))}

      {otras.length > 0 && (

        <div className="relative">

          <button
            onClick={() => setMostrarOtras(!mostrarOtras)}
            className="w-full md:w-auto px-5 py-4 text-left md:text-center text-white hover:text-yellow-500 transition"
          >
            OTROS ▾
          </button>

          {mostrarOtras && (

            <div className="absolute md:right-0 top-full bg-white rounded-lg shadow-xl min-w-[220px] overflow-hidden z-50">

              {otras.map((cat) => (

                <button
                  key={cat}
                  onClick={() => seleccionar(cat)}
                  className="block w-full text-left px-4 py-3 hover:bg-yellow-100 transition"
                >
                  {cat}
                </button>

              ))}

            </div>

          )}

        </div>

      )}

    </>
  );
}