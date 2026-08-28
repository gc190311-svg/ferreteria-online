"use client";

import { Suspense, useEffect, useState } from "react";

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


function CatalogoContenido() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filtroMovilAbierto, setFiltroMovilAbierto] = useState(false);

  const {
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    setTextoBusqueda,
  } = useCatalogo();


  /* =====================================================
     LEER PARÁMETROS DE LA URL
  ===================================================== */

  useEffect(() => {

    const buscar = searchParams.get("buscar");
    const categoria = searchParams.get("categoria");

    if (buscar) {
      setTextoBusqueda(buscar);
    }

    if (categoria) {
      setCategoriaSeleccionada(categoria);
    }

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


  /* =====================================================
     CERRAR FILTRO CON ESC
  ===================================================== */

  useEffect(() => {

    const cerrarConEscape = (e) => {

      if (e.key === "Escape") {
        setFiltroMovilAbierto(false);
      }

    };

    window.addEventListener("keydown", cerrarConEscape);

    return () => {
      window.removeEventListener("keydown", cerrarConEscape);
    };

  }, []);


  /* =====================================================
     BLOQUEAR SCROLL CUANDO EL FILTRO ESTÁ ABIERTO
  ===================================================== */

  useEffect(() => {

    if (filtroMovilAbierto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };

  }, [filtroMovilAbierto]);


  return (

    <>

      {/* =================================================
          HEADER
      ================================================= */}

      <HeaderCatalogoCompleto
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
      />


      {/* =================================================
          CONTENIDO PRINCIPAL
      ================================================= */}

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
            FILTRO DESKTOP
            Se mantiene como estaba
        ================================================= */}

        <aside
          className="
            hidden
            lg:block

            w-72
            flex-shrink-0
          "
        >

          <SidebarFiltros />

        </aside>


        {/* =================================================
            CONTENIDO
        ================================================= */}

        <main
          className="
            flex-1
            min-w-0
            w-full
          "
        >


          {/* =================================================
              BOTÓN FILTRO MÓVIL
          ================================================= */}

          <div
            className="
              block
              lg:hidden

              mb-5
            "
          >

            <button
              type="button"
              onClick={() => setFiltroMovilAbierto(true)}
              className="
                w-full
                h-14

                flex
                items-center
                justify-between

                px-5

                bg-white

                border
                border-gray-200

                rounded-xl

                shadow-sm

                text-gray-900

                active:scale-[0.99]

                transition
              "
            >

              <span
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <span
                  className="
                    text-xl
                    leading-none
                  "
                >
                  ☷
                </span>

                <span
                  className="
                    font-semibold
                    text-base
                  "
                >
                  Filtrar por marca
                </span>

              </span>


              <span
                className="
                  text-xl
                  leading-none
                "
              >
                ☰
              </span>

            </button>

          </div>


          {/* =================================================
              CABECERA DEL CATÁLOGO
          ================================================= */}

          <CabeceraCatalogo />


          {/* =================================================
              PRODUCTOS
          ================================================= */}

          <GridProductos />

        </main>

      </div>


      {/* =====================================================
          PANEL LATERAL DE FILTROS - MÓVIL
      ===================================================== */}

      {filtroMovilAbierto && (

        <div
          className="
            fixed
            inset-0

            z-[99999]

            flex
            justify-end

            bg-black/70
          "
          onClick={() => setFiltroMovilAbierto(false)}
        >


          {/* =================================================
              PANEL
          ================================================= */}

          <div
            className="
              relative

              w-[88%]
              max-w-[390px]

              h-full

              bg-[#111111]

              text-white

              shadow-2xl

              flex
              flex-col

              animate-[slideIn_.25s_ease-out]
            "
            onClick={(e) => e.stopPropagation()}
          >


            {/* =================================================
                CABECERA DEL PANEL
            ================================================= */}

            <div
              className="
                flex
                items-center
                justify-between

                px-5

                h-[72px]

                flex-shrink-0

                border-b
                border-white/10
              "
            >

              <h2
                className="
                  text-xl
                  font-bold

                  m-0
                "
              >
                Filtrar por marca
              </h2>


              <button
                type="button"
                onClick={() => setFiltroMovilAbierto(false)}
                className="
                  w-10
                  h-10

                  flex
                  items-center
                  justify-center

                  bg-transparent

                  border-none

                  text-white

                  text-3xl

                  leading-none

                  cursor-pointer

                  hover:text-[#f5c400]

                  transition
                "
                aria-label="Cerrar filtros"
              >
                ×
              </button>

            </div>


            {/* =================================================
                CONTENIDO DEL FILTRO
            ================================================= */}

            <div
              className="
                flex-1

                overflow-y-auto

                px-4
                py-4

                overscroll-contain

                [&::-webkit-scrollbar]:w-1
                [&::-webkit-scrollbar-thumb]:bg-white/20
              "
            >

              {/*

                IMPORTANTE:

                Aquí reutilizamos exactamente tu
                SidebarFiltros actual.

                De esta manera no modificamos:
                - Firebase
                - selección de marcas
                - cantidades
                - filtros
                - productos
                - búsqueda

              */}

              <div
                className="
                  filtro-sidebar-movil
                "
              >

                <SidebarFiltros />

              </div>

            </div>


            {/* =================================================
                PIE DEL PANEL
            ================================================= */}

            <div
              className="
                flex-shrink-0

                p-4

                border-t
                border-white/10

                bg-[#111111]
              "
            >

              <button
                type="button"
                onClick={() => setFiltroMovilAbierto(false)}
                className="
                  w-full

                  h-14

                  rounded-lg

                  bg-[#f5c400]

                  hover:bg-[#ffd21a]

                  active:scale-[0.98]

                  text-black

                  font-bold

                  text-base

                  transition
                "
              >
                Aplicar filtros
              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />


      {/* =====================================================
          ANIMACIÓN
      ===================================================== */}

      <style jsx global>{`

        @keyframes slideIn {

          from {
            transform: translateX(100%);
          }

          to {
            transform: translateX(0);
          }

        }


        /* =================================================
           SIDEBAR DENTRO DEL PANEL MÓVIL
        ================================================= */

        @media (max-width: 1023px) {

          .filtro-sidebar-movil {
            width: 100%;
          }


          /*
             El Sidebar original puede traer estilos
             pensados para fondo blanco.

             El panel móvil fuerza el ancho completo.
          */

          .filtro-sidebar-movil > * {
            width: 100% !important;
            max-width: none !important;
          }

        }


        /* =================================================
           MÓVILES PEQUEÑOS
        ================================================= */

        @media (max-width: 480px) {

          .filtro-sidebar-movil {
            padding: 0;
          }

        }

      `}</style>

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