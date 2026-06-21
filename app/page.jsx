"use client";

import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import SidebarCategorias from "../components/SidebarCategorias";
import Hero from "../components/Hero";
import Servicios from "../components/Servicios";
import Productos from "../components/Productos";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export default function Home() {

  return (

    <div className="min-h-screen bg-gray-100">

      <TopBar />
      <Header />
      <Navbar />
      <SidebarCategorias />
      <Hero />
      <Servicios />
      <Productos />
      <Footer />
      <WhatsAppButton />

    </div>

  );

}
