"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCatalogo } from "../context/CatalogoContext";
import { useCarrito } from "../context/CarritoContext";


export default function NavbarMobile({
  setCategoriaSeleccionada,
}) {

  const [abierto, setAbierto] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { setTextoBusqueda } = useCatalogo();

  const { carritoAbierto } = useCarrito();

 function cambiarCategoria(categoria){

    setTextoBusqueda("");

    setCategoriaSeleccionada?.(categoria);

    setAbierto(false);

    if(categoria==="todos"){

        router.push("/productos");

    }else{

        router.push(`/categorias/${categoria}`);

    }

}

if (carritoAbierto) return null;

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

        <div className="absolute left-0 right-0 top-full bg-white shadow-xl">

          <button
            onClick={() => cambiarCategoria("todos")}
            className="block w-full text-left px-6 py-4 border-b hover:bg-yellow-100"
          >
            Todos
          </button>

          <button
            onClick={() => cambiarCategoria("herramientas")}
            className="block w-full text-left px-6 py-4 border-b hover:bg-yellow-100"
          >
            Herramientas
          </button>

          <button
            onClick={() => cambiarCategoria("construccion")}
            className="block w-full text-left px-6 py-4 border-b hover:bg-yellow-100"
          >
            Construcción
          </button>

          <button
            onClick={() => cambiarCategoria("electricidad")}
            className="block w-full text-left px-6 py-4 border-b hover:bg-yellow-100"
          >
            Electricidad
          </button>

          <button
            onClick={() => cambiarCategoria("pintura")}
            className="block w-full text-left px-6 py-4 border-b hover:bg-yellow-100"
          >
            Pintura
          </button>

          <button
            onClick={() => cambiarCategoria("gasfiteria")}
            className="block w-full text-left px-6 py-4 hover:bg-yellow-100"
          >
            Gasfitería
          </button>

        </div>

      )}

    </nav>

  );

}