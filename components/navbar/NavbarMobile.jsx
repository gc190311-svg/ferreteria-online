"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useCatalogo } from "../context/CatalogoContext";
import { useCarrito } from "../context/CarritoContext";
import CategoryMenu from "../catalogo/CategoryMenu";

export default function NavbarMobile({
  setCategoriaSeleccionada,
}) {

  const [abierto, setAbierto] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { setTextoBusqueda } = useCatalogo();
  const { carritoAbierto } = useCarrito();

  const esCatalogo =
    pathname === "/productos" ||
    pathname.startsWith("/categorias") ||
    pathname.startsWith("/producto");

  function cambiarCategoria(categoria) {

    setTextoBusqueda("");

    setCategoriaSeleccionada?.(categoria);

    setAbierto(false);

    if (categoria === "todos") {
      router.push("/productos");
      return;
    }

    router.push(`/categorias/${categoria}`);
  }

  if (carritoAbierto) return null;

  if (!esCatalogo) return null;

  return (
    <nav className="bg-black border-y border-gray-800 relative">

      <div className="h-16 flex items-center px-5">

        <button
          onClick={() => setAbierto(!abierto)}
          className="text-white text-3xl"
        >
          ☰
        </button>

      </div>

      {abierto && (

        <div className="absolute left-0 right-0 top-full bg-black shadow-xl z-50">

          <div className="flex flex-col">

            <CategoryMenu
              onCategoria={cambiarCategoria}
            />

          </div>

        </div>

      )}

    </nav>
  );
}