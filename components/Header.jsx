"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";


import {
  FaSearch,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";

import { useCatalogo } from "./context/CatalogoContext";

export default function Header() {

  const router = useRouter();
  const pathname = usePathname();

  const {
  textoBusqueda,
  setTextoBusqueda,
  
} = useCatalogo();

  function buscarProducto() {

  // Elimina espacios al inicio y final
  const texto = textoBusqueda.trim();

  // Si no escribió nada, ir al catálogo
  if (texto === "") {

    router.push("/productos");

    return;

  }

  // Si ya estamos en la página de productos,
  // NO hacemos nada.
  if (pathname === "/productos") {

    return;

  }

  // Solo si estamos en Inicio
  // navegamos al catálogo.
  router.push("/productos");

}

  return (

    <header className="bg-black py-4">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex flex-col lg:flex-row lg:items-center gap-4">

          {/* LOGO */}

          <div className="flex items-center justify-between lg:w-auto">

            <Link href="/">

              <img
                src="/logo.png"
                alt="Brico Hogar"
                className="
                  h-16
                  md:h-20
                  lg:h-28
                  w-auto
                  cursor-pointer
                "
              />

            </Link>

            {/* ICONOS CELULAR */}

            <div className="flex lg:hidden gap-6 text-white">

              <Link href="/login">
                <FaUser className="text-2xl hover:text-yellow-400" />
              </Link>

              <Link href="/carrito">
                <FaShoppingCart className="text-2xl hover:text-yellow-400" />
              </Link>

            </div>

          </div>

          {/* BUSCADOR */}

          <div className="flex-1">

            <div className="flex w-full">

             <input
  type="text"
  value={textoBusqueda}
  onChange={(e)=>setTextoBusqueda(e.target.value)}
  onKeyDown={(e)=>{

    if(e.key==="Enter"){

      buscarProducto();

    }

  }}
/>

              <button onClick={buscarProducto}>

                <FaSearch />

                <span className="hidden md:block">

                  Buscar

                </span>

              </button>

            </div>

          </div>

          {/* ICONOS ESCRITORIO */}

          <div
            className="
              hidden
              lg:flex
              items-center
              gap-10
              text-white
            "
          >

            <Link href="/login">

              <div className="flex flex-col items-center hover:text-yellow-400 transition">

                <FaUser className="text-2xl" />

                <span className="text-sm">

                  Mi Cuenta

                </span>

              </div>

            </Link>

            <Link href="/carrito">

              <div className="flex flex-col items-center hover:text-yellow-400 transition">

                <FaShoppingCart className="text-2xl" />

                <span className="text-sm">

                  Carrito

                </span>

              </div>

            </Link>

          </div>

        </div>

      </div>

    </header>

  );

}
