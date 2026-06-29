"use client";

import { useState } from "react";

import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Servicios from "../components/Servicios";
import Marcas from "../components/Marcas";
import Productos from "../components/Productos";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

import { CatalogoProvider } from "../components/context/CatalogoContext";

function HomeContenido() {

  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState("todos");

  return (
    <>
      <TopBar />

      <Header />

      <Navbar
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
      />

      <Hero />

      <Servicios />

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

    <CatalogoProvider>

      <HomeContenido />

    </CatalogoProvider>

  );

}
