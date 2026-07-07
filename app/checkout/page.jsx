"use client";

import { useState } from "react";
import { useCarrito } from "../../components/context/CarritoContext";

export default function CheckoutPage() {

  const { carrito, total } = useCarrito();

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [distrito, setDistrito] = useState("");
  const [referencia, setReferencia] = useState("");
  const [observaciones, setObservaciones] = useState("");

  return (

    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold">

          Finalizar pedido

        </h1>

        <p className="text-gray-600 mt-2">

          Complete sus datos para generar el pedido.

        </p>

        <div className="grid lg:grid-cols-2 gap-10 mt-10">
