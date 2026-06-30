"use client";

import { Suspense, useEffect } from "react";

import {
  useSearchParams,
  useRouter,
  usePathname,
} from "next/navigation";

import HeaderCatalogo from "../../components/HeaderCatalogo";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import SidebarFiltros from "../../components/catalogo/SidebarFiltros";
import GridProductos from "../../components/catalogo/GridProductos";
import CabeceraCatalogo from "../../components/catalogo/CabeceraCatalogo";

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

      <div className="max-w-7xl mx-auto flex gap-8 py-10 px-4">

        <SidebarFiltros />

        <div className="flex-1">

          <CabeceraCatalogo />

          <GridProductos />

        </div>

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
