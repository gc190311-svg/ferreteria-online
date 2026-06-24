"use client";

import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AdminPage() {

  const [producto, setProducto] = useState({
    nombre: "",
    categoria: "herramientas",
    precio: "",
    precioAnterior: "",
    marca: "",
    stock: "",
    imagen: "",
    descripcion: "",
  });

  const guardarProducto = async () => {

  if (
    !producto.nombre ||
    !producto.precio ||
    !producto.imagen
  ) {
    alert("Completa los campos obligatorios");
    return;
  }

  try {

    await addDoc(collection(db, "productos"), {
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: Number(producto.precio),
      precioAnterior: Number(producto.precioAnterior),
      marca: producto.marca,
      stock: Number(producto.stock),
      imagen: producto.imagen,
      descripcion: producto.descripcion,
      fechaCreacion: new Date(),
    });

    alert("Producto agregado correctamente");

    setProducto({
      nombre: "",
      categoria: "herramientas",
      precio: "",
      precioAnterior: "",
      marca: "",
      stock: "",
      imagen: "",
      descripcion: "",
    });

  } catch (error) {

    console.error("ERROR FIREBASE:", error);

    alert(
      "Error: " +
      error.code +
      " - " +
      error.message
    );
  }

};
