"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUser, FaShoppingCart } from "react-icons/fa";

import SearchInput from "./SearchInput";
import { useCatalogo } from "./context/CatalogoContext";

export default function HeaderHome() {

  const router = useRouter();

  const {
    textoInput,
    setTextoInput,
    setTextoBusqueda,
  } = useCatalogo();

  function buscarProducto() {

    const texto = textoInput.trim();

    if (texto === "") {

      router.push("/productos");
      return;

    }

    // Guarda el filtro
    setTextoBusqueda(texto);

    // Limpia el input
    setTextoInput("");

    // Navega al catálogo
    router.push(`/productos?buscar=${encodeURIComponent(texto)}`);

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
                className="h-16 md:h-20 lg:h-28 w-auto cursor-pointer"
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

            <SearchInput
              value={textoInput}
              onChange={setTextoInput}
              onSearch={buscarProducto}
            />

          </div>

          {/* ICONOS ESCRITORIO */}

          <div className="hidden lg:flex items-center gap-10 text-white">

            <Link href="/login">

              <div className="flex flex-col items-center hover:text-yellow-400">

                <FaUser className="text-2xl" />

                <span className="text-sm">

                  Mi Cuenta

                </span>

              </div>

            </Link>

            <Link href="/carrito">

              <div className="flex flex-col items-center hover:text-yellow-400">

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
