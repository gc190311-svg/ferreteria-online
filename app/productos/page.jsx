"use client";

import { Suspense, useEffect } from "react";

import {
  useSearchParams,
  useRouter,
  usePathname,
} from "next/navigation";

import Footer from "../../components/Footer";

import SidebarFiltros from "../../components/catalogo/SidebarFiltros";
import GridProductos from "../../components/catalogo/GridProductos";
import CabeceraCatalogo from "../../components/catalogo/CabeceraCatalogo";
import HeaderCatalogoCompleto from "../../components/HeaderCatalogoCompleto";

import {
  CatalogoProvider,
  useCatalogo,
} from "../../components/context/CatalogoContext";

/* =========================================================
   CONTENIDO DEL CATÁLOGO
========================================================= */

function CatalogoContenido() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const {
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    setTextoBusqueda,
  } = useCatalogo();

  /* =========================================================
     LEER PARÁMETROS DE LA URL
  ========================================================= */

  useEffect(() => {
    const buscar = searchParams.get("buscar");
    const categoria = searchParams.get("categoria");

    if (buscar) {
      setTextoBusqueda(buscar);
    }

    if (categoria) {
      setCategoriaSeleccionada(categoria);
    }

    /*
      Después de leer los parámetros eliminamos
      la información de la URL para que el catálogo
      quede limpio.
    */

    if (buscar || categoria) {
      router.replace(pathname);
    }
  }, [
    searchParams,
    pathname,
    router,
    setTextoBusqueda,
    setCategoriaSeleccionada,
  ]);

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <HeaderCatalogoCompleto
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
      />

      {/* =====================================================
          CONTENIDO PRINCIPAL
      ===================================================== */}

      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          py-6

          flex
          flex-col
          lg:flex-row

          gap-6
          lg:gap-8
        "
      >

        {/* =================================================
            FILTROS
           
            IMPORTANTE:
            Aquí usamos solamente SidebarFiltros.

            SidebarFiltros ya contiene:
            - filtro móvil
            - categorías
            - marcas
            - filtros activos
            - botón limpiar
            - panel móvil
            - filtro para PC
        ================================================= */}

        <aside
          className="
            w-full
            lg:w-72
            lg:flex-shrink-0
          "
        >
          <SidebarFiltros />
        </aside>

        {/* =================================================
            PRODUCTOS
        ================================================= */}

        <main
          className="
            flex-1
            min-w-0
            w-full
          "
        >

          {/* CABECERA */}

          <CabeceraCatalogo />

          {/* PRODUCTOS */}

          <GridProductos />

        </main>

      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />
    </>
  );
}


/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

export default function CatalogoProductos() {
  return (
    <CatalogoProvider>

      <Suspense
        fallback={
          <div
            className="
              min-h-[300px]
              flex
              items-center
              justify-center
              text-gray-600
            "
          >
            Cargando catálogo...
          </div>
        }
      >

        <CatalogoContenido />

      </Suspense>

    </CatalogoProvider>
  );
}