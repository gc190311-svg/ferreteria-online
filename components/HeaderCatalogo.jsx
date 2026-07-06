"use client";

import Link from "next/link";
import { useState } from "react";

import {
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";

import SearchInput from "./SearchInput";
import CarritoDrawer from "./CarritoDrawer";
import { useCatalogo } from "./context/CatalogoContext";



export default function HeaderCatalogo() {
  
const [carritoAbierto, setCarritoAbierto] = useState(false);
  
  const {
    textoInput,
    setTextoInput,
    setTextoBusqueda,
  } = useCatalogo();


  function buscarProducto() {

    const texto = textoInput.trim();

    // Actualiza el filtro del catálogo
    setTextoBusqueda(texto);

    // Limpia únicamente el cuadro de búsqueda
    setTextoInput("");

  }

  return (
  <>
    <header className="bg-black py-4">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex flex-col lg:flex-row lg:items-center gap-4">

          {/* LOGO */}

          <div className="flex items-center justify-between lg:w-auto">

            <Link href="/">

              <img
                src="/logo.png"
                alt="Brico Hogar"
                className="h-16 md:h-20 lg:h-28 w-auto cursor-pointer"
              />

            </Link>

            <div className="flex lg:hidden gap-6 text-white">

              <Link href="/login">
                <FaUser className="text-2xl hover:text-yellow-400"/>
              </Link>

              <button
                onClick={() => setCarritoAbierto(true)}
              >
                <FaShoppingCart className="text-2xl hover:text-yellow-400"/>
              </button>

            </div>

          </div>

          {/* BUSCADOR */}

          <div className="flex-1">

            <SearchInput
              value={textoInput}
              onChange={setTextoInput}
              onSearch={buscarProducto}
            />

          </div>

          {/* ICONOS */}

          <div className="hidden lg:flex items-center gap-10 text-white">

            <Link href="/login">

              <div className="flex flex-col items-center hover:text-yellow-400">

                <FaUser className="text-2xl"/>

                <span className="text-sm">
                  Mi Cuenta
                </span>

              </div>

            </Link>

            <button
              onClick={() => setCarritoAbierto(true)}
              className="flex flex-col items-center hover:text-yellow-400 transition"
            >

              <FaShoppingCart className="text-2xl" />

              <span className="text-sm">
                Carrito
              </span>

            </button>

          </div>

        </div>

      </div>

    </header>

    <CarritoDrawer
      abierto={carritoAbierto}
      cerrar={() => setCarritoAbierto(false)}
    />

  </>
);
  }
