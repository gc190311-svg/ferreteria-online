"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import BannerCatalogo from "../../components/catalogo/BannerCatalogo";
import SidebarFiltros from "../../components/catalogo/SidebarFiltros";
import BuscadorCatalogo from "../../components/catalogo/BuscadorCatalogo";
import GridProductos from "../../components/catalogo/GridProductos";
import OrdenarProductos from "../../components/catalogo/OrdenarProductos";

export default function CatalogoProductos() {

  const searchParams = useSearchParams();

  const categoriaInicial =
    searchParams.get("categoria") || "todos";

  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState(categoriaInicial);

  return (

    <>

      <Header />

      <Navbar
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
      />

      <BannerCatalogo />

      <div className="max-w-7xl mx-auto flex gap-8 py-10 px-4">

        <SidebarFiltros
          categoriaSeleccionada={categoriaSeleccionada}
          setCategoriaSeleccionada={setCategoriaSeleccionada}
        />

        <div className="flex-1">

          <BuscadorCatalogo />

          <OrdenarProductos />

          <GridProductos
            categoriaSeleccionada={categoriaSeleccionada}
          />

        </div>

      </div>

      <Footer />

    </>

  );

}
