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
    destacado: false,
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

```
await addDoc(collection(db, "productos"), {
  nombre: producto.nombre,
  categoria: producto.categoria,
  precio: Number(producto.precio),
  precioAnterior: Number(producto.precioAnterior),
  marca: producto.marca,
  stock: Number(producto.stock),

  // Compatibilidad con catálogo antiguo
  imagen: producto.imagen,

  // Compatibilidad con página de detalle
  imagenes: [
    producto.imagen
  ],

  descripcion: producto.descripcion,
  destacado: producto.destacado,
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
  destacado: false,
});
```

} catch (error) {

```
console.error(error);

alert(
  "Error: " +
  error.code +
  " - " +
  error.message
);
```

}
};


  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center mb-8">
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

          <select
            value={producto.categoria}
            onChange={(e) =>
              setProducto({
                ...producto,
                categoria: e.target.value,
              })
            }
            className="w-full border p-3 rounded-xl"
          >
            <option value="herramientas">
              Herramientas
            </option>

            <option value="electricidad">
              Electricidad
            </option>

            <option value="pintura">
              Pintura
            </option>

            <option value="gasfiteria">
              Gasfitería
            </option>

            <option value="construccion">
              Construcción
            </option>
          </select>

          <input
            type="number"
            placeholder="Precio"
            value={producto.precio}
            onChange={(e) =>
              setProducto({
                ...producto,
                precio: e.target.value,
              })
            }
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="number"
            placeholder="Precio anterior"
            value={producto.precioAnterior}
            onChange={(e) =>
              setProducto({
                ...producto,
                precioAnterior: e.target.value,
              })
            }
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            placeholder="Marca"
            value={producto.marca}
            onChange={(e) =>
              setProducto({
                ...producto,
                marca: e.target.value,
              })
            }
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="number"
            placeholder="Stock disponible"
            value={producto.stock}
            onChange={(e) =>
              setProducto({
                ...producto,
                stock: e.target.value,
              })
            }
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            placeholder="URL de imagen"
            value={producto.imagen}
            onChange={(e) =>
              setProducto({
                ...producto,
                imagen: e.target.value,
              })
            }
            className="w-full border p-3 rounded-xl"
          />

          {producto.imagen && (
            <img
              src={producto.imagen}
              alt="Vista previa"
              className="w-48 h-48 object-contain border rounded-xl mx-auto"
            />
          )}

          <textarea
            placeholder="Descripción"
            value={producto.descripcion}
            onChange={(e) =>
              setProducto({
                ...producto,
                descripcion: e.target.value,
              })
            }
            className="w-full border p-3 rounded-xl h-32"
          />

          <label className="flex items-center gap-3 font-medium">
            <input
              type="checkbox"
              checked={producto.destacado}
              onChange={(e) =>
                setProducto({
                  ...producto,
                  destacado: e.target.checked,
                })
              }
            />
            Mostrar en página principal
          </label>

          <button
            onClick={guardarProducto}
            className="
              w-full
              bg-yellow-500
              hover:bg-yellow-400
              text-black
              font-bold
              py-4
              rounded-xl
            "
          >
            Guardar Producto
          </button>

        </div>

      </div>

    </div>
  );
}
