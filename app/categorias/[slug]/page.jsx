"use client";

import { Suspense, useEffect } from "react";

import { useParams } from "next/navigation";

import HeaderCatalogo from "../../../components/HeaderCatalogo";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

import SidebarFiltros from "../../../components/catalogo/SidebarFiltros";
import GridProductos from "../../../components/catalogo/GridProductos";
import CabeceraCatalogo from "../../../components/catalogo/CabeceraCatalogo";

import {
  CatalogoProvider,
  useCatalogo,
} from "../../../components/context/CatalogoContext";

function CategoriaContenido() {

  const { slug } = useParams();

  const {

    categoriaSeleccionada,
    setCategoriaSeleccionada,

  } = useCatalogo();

  useEffect(() => {

    if (slug) {

      setCategoriaSeleccionada(slug);

    }

  }, [

    slug,

    setCategoriaSeleccionada,

  ]);

  return (

    <>

      <HeaderCatalogo />

      <Navbar
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
      w-full
      min-w-0
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

export default function CategoriaPage() {

  return (

    <CatalogoProvider>

      <Suspense
        fallback={
          <div className="py-20 text-center">
            Cargando...
          </div>
        }
      >

        <CategoriaContenido />

      </Suspense>

    </CatalogoProvider>

  );

}
