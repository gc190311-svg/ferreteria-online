"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import MenuCategorias from "./MenuCategorias";
import CategoryMenu from "../catalogo/CategoryMenu";
import { useCatalogo } from "../context/CatalogoContext";

export default function NavbarDesktop({
  setCategoriaSeleccionada,
}) {
  const pathname = usePathname();
  const router = useRouter();

  const { setTextoBusqueda } = useCatalogo();

  // Detecta si estamos en el catálogo
  const esCatalogo =
    pathname === "/productos" ||
    pathname.startsWith("/categorias") ||
    pathname.startsWith("/producto");

  function cambiarCategoria(categoria) {

    // Limpia el buscador
    setTextoBusqueda("");

    // Mantiene compatibilidad con el resto del proyecto
    setCategoriaSeleccionada?.(categoria);

    // Navegación
    if (categoria === "todos") {
      router.push("/productos");
      return;
    }

    router.push(`/categorias/${categoria}`);
  }

  return (

    <nav
  className="
    bg-black/95
    backdrop-blur-md
    border-y
    border-gray-800
    shadow-xl
    transition-all
    duration-300
  "
>

<div className="max-w-7xl mx-auto h-[72px] flex items-center">
        <MenuCategorias />

        <div className="flex-1">

          {esCatalogo ? (

            <div className="flex justify-center items-center gap-6">

              <CategoryMenu
                onCategoria={cambiarCategoria}
              />

            </div>

          ) : (

            <div className="flex justify-center gap-20">

             <Link
  href="/nosotros"
  className={`font-bold py-5 transition ${
    pathname === "/nosotros"
      ? "text-yellow-500"
      : "text-white hover:text-yellow-500"
  }`}
>
  NOSOTROS
</Link>

              <Link
                href="/productos"
                className="text-white hover:text-yellow-500 font-bold py-5 transition"
              >
                PRODUCTOS
              </Link>

              <Link
                href="/ofertas"
                className="text-white hover:text-yellow-500 font-bold py-5 transition"
              >
                OFERTAS
              </Link>

              <Link
                href="/#contacto"
                className="text-white hover:text-yellow-500 font-bold py-5 transition"
              >
                CONTACTO
              </Link>

            </div>

          )}

        </div>

      </div>

    </nav>

  );

}