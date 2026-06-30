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
