"use client";

import { useState } from "react";

import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import SidebarFiltros from "../../components/catalogo/SidebarFiltros";
import BuscadorCatalogo from "../../components/catalogo/BuscadorCatalogo";
import GridProductos from "../../components/catalogo/GridProductos";

export default function CatalogoProductos() {

  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState("todos");

  return (
    <>
      <Header />

      <Navbar
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
      />

      <div className="max-w-7xl mx-auto flex gap-8 py-10 px-4">

        <SidebarFiltros
          categoriaSeleccionada={categoriaSeleccionada}
          setCategoriaSeleccionada={setCategoriaSeleccionada}
        />

        <div className="flex-1">

          <BuscadorCatalogo />

          <GridProductos
            categoriaSeleccionada={categoriaSeleccionada}
          />

        </div>

      </div>

      <Footer />

    </>
  );

}
