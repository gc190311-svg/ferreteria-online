"use client";

import Link from "next/link";
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

export default function Home() {

  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState("todos");

  console.log("Categoría actual:", categoriaSeleccionada);

  return (
    <>
      <TopBar />
      <Header />

      <Navbar
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
