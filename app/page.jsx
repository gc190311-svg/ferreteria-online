"use client";

import { useState } from "react";
import Hero from "../components/Hero";
import Marcas from "../components/Marcas";
import Productos from "../components/Productos";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

import { CatalogoProvider } from "../components/context/CatalogoContext";
import HeaderCompleto from "../components/HeaderCompleto";

function HomeContenido() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState("todos");

  return (
    <>
      <HeaderCompleto
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
      />

      <Hero />

      <Marcas />

      <Productos
        categoriaSeleccionada={categoriaSeleccionada}
      />

      <Footer />

      <WhatsAppButton />
    </>
  );
}

export default function Home() {
  return (
    <HomeContenido />
  );
}