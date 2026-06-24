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

```
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
```

};

return ( <div className="min-h-screen bg-gray-100 py-10 px-4">

```
  <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">

    <h1 className="text-4xl font-bold mb-8 text-center">
      Panel Administrador
    </h1>

    <div className="space-y-4">

      <input
        type="text"
        placeholder="Nombre del producto"
        value={producto.nombre}
        onChange={(e) =>
          setProducto({
            ...producto,
            nombre: e.target.value,
          })
        }
        className="w-full border p-3 rounded-xl"
      />

      <button
        onClick={guardarProducto}
        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl"
      >
        Guardar Producto
      </button>

    </div>

  </div>

</div>

);
}
