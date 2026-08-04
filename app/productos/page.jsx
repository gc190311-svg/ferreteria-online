"use client";

import { Suspense, useEffect } from "react";

import {
  useSearchParams,
  useRouter,
  usePathname,
} from "next/navigation";

import Navbar from "../../components/Navbar";
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

  const {
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    setTextoBusqueda,
  } = useCatalogo();

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

  return (

    <>

      <HeaderCatalogoCompleto
    categoriaSeleccionada={categoriaSeleccionada}
    setCategoriaSeleccionada={setCategoriaSeleccionada}
/>

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

  <aside
    className="
      w-full
      lg:w-72
      lg:flex-shrink-0
    "
  >
    <SidebarFiltros />
  </aside>

  <main
    className="
      flex-1
      min-w-0
      w-full
    "
  >
    <CabeceraCatalogo />

    <GridProductos />
  </main>

</div>

      <Footer />

    </>

  );

}

export default function CatalogoProductos() {

  return (

    <CatalogoProvider>

      <Suspense
        fallback={
          <div className="py-20 text-center">
            Cargando catálogo...
          </div>
        }
      >

        <CatalogoContenido />

      </Suspense>

    </CatalogoProvider>

  );

}
