"use client";


import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import SidebarFiltros from "../../components/catalogo/SidebarFiltros";
import GridProductos from "../../components/catalogo/GridProductos";
import CabeceraCatalogo from "../../components/catalogo/CabeceraCatalogo";

import { CatalogoProvider, useCatalogo } from "../../components/context/CatalogoContext";

function CatalogoContenido() {

const {
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  textoBusqueda,
  setTextoBusqueda,
} = useCatalogo();

 

useEffect(() => {

  const buscar = searchParams.get("buscar") || "";

  

  return (
    <>
     <Header
  textoBusqueda={textoBusqueda}
  setTextoBusqueda={setTextoBusqueda}
/>

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

export default function CatalogoProductos() {

  return (

    <CatalogoProvider>

      <CatalogoContenido />

    </CatalogoProvider>

  );

}
