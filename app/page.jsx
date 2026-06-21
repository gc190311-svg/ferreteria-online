"use client";

import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";


export default function Home() {

  return (

    <div className="min-h-screen bg-gray-100">

      <TopBar />
      <Header />
      <Navbar />
      <Hero />
      <Servicios />
      <Productos />
      <Footer />
      <WhatsAppButton />

    </div>

  );

}
