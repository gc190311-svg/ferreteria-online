"use client";

import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import BannerCatalogo from "../../components/catalogo/BannerCatalogo";
import SidebarFiltros from "../../components/catalogo/SidebarFiltros";
import BuscadorCatalogo from "../../components/catalogo/BuscadorCatalogo";
import GridProductos from "../../components/catalogo/GridProductos";
import OrdenarProductos from "../../components/catalogo/OrdenarProductos";
import CabeceraCatalogo from "../../components/catalogo/CabeceraCatalogo";

export default function CatalogoProductos() {
  return (
    <>
      <Header />

      <Navbar />

      <BannerCatalogo />
      
      <div className="max-w-7xl mx-auto px-4 pt-10">
    <CabeceraCatalogo />
</div>

      <div className="max-w-7xl mx-auto flex gap-8 py-10 px-4">

        <SidebarFiltros />

        <div className="flex-1">

          <BuscadorCatalogo />

          <OrdenarProductos />

          <GridProductos />

        </div>

      </div>

      <Footer />
    </>
  );
}
