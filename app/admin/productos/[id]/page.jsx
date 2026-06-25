"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { db } from "../../../firebase";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export default function EditarProducto() {

  const params = useParams();
  const router = useRouter();

  const [cargando, setCargando] = useState(true);

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

  useEffect(() => {

    cargarProducto();

  }, []);

  const cargarProducto = async () => {

    try {

      const referencia = doc(
        db,
        "productos",
        params.id
      );

      const documento = await getDoc(referencia);

      if (!documento.exists()) {

        alert("Producto no encontrado");

        router.push("/admin/productos");

        return;

      }

      setProducto(documento.data());

      setCargando(false);

    } catch (error) {

      console.log(error);

    }

  };

  const guardarCambios = async () => {

    try {

      await updateDoc(

        doc(db, "productos", params.id),

        {
          nombre: producto.nombre,
          categoria: producto.categoria,
          precio: Number(producto.precio),
          precioAnterior: Number(producto.precioAnterior),
          marca: producto.marca,
          stock: Number(producto.stock),
          imagen: producto.imagen,
          imagenes: [producto.imagen],
          descripcion: producto.descripcion,
          destacado: producto.destacado,
        }

      );

      alert("Producto actualizado correctamente");

      router.push("/admin/productos");

    } catch (error) {

      console.log(error);

      alert("Error al actualizar");

    }

  };

  if (cargando) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Cargando...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold mb-8">

          Editar Producto

        </h1>

        <div className="space-y-5">

          <input
            className="w-full border rounded-xl p-3"
            value={producto.nombre}
            onChange={(e)=>
              setProducto({
                ...producto,
                nombre:e.target.value
              })
            }
            placeholder="Nombre"
          />

          <select
            className="w-full border rounded-xl p-3"
            value={producto.categoria}
            onChange={(e)=>
              setProducto({
                ...producto,
                categoria:e.target.value
              })
            }
          >

            <option value="herramientas">Herramientas</option>

            <option value="electricidad">Electricidad</option>

            <option value="pintura">Pintura</option>

            <option value="gasfiteria">Gasfitería</option>

            <option value="construccion">Construcción</option>

          </select>

          <input
            type="number"
            className="w-full border rounded-xl p-3"
            value={producto.precio}
            placeholder="Precio"
            onChange={(e)=>
              setProducto({
                ...producto,
                precio:e.target.value
              })
            }
          />

          <input
            type="number"
            className="w-full border rounded-xl p-3"
            value={producto.precioAnterior}
            placeholder="Precio anterior"
            onChange={(e)=>
              setProducto({
                ...producto,
                precioAnterior:e.target.value
              })
            }
          />

          <input
            className="w-full border rounded-xl p-3"
            value={producto.marca}
            placeholder="Marca"
            onChange={(e)=>
              setProducto({
                ...producto,
                marca:e.target.value
              })
            }
          />

          <input
            type="number"
            className="w-full border rounded-xl p-3"
            value={producto.stock}
            placeholder="Stock"
            onChange={(e)=>
              setProducto({
                ...producto,
                stock:e.target.value
              })
            }
          />

          <input
            className="w-full border rounded-xl p-3"
            value={producto.imagen}
            placeholder="URL Imagen"
            onChange={(e)=>
              setProducto({
                ...producto,
                imagen:e.target.value
              })
            }
          />

          {producto.imagen && (

            <img
              src={producto.imagen}
              alt=""
              className="w-60 h-60 object-contain mx-auto border rounded-xl"
            />

          )}

          <textarea
            className="w-full border rounded-xl p-3 h-40"
            value={producto.descripcion}
            placeholder="Descripción"
            onChange={(e)=>
              setProducto({
                ...producto,
                descripcion:e.target.value
              })
            }
          />

          <label className="flex gap-3 items-center">

            <input
              type="checkbox"
              checked={producto.destacado}
              onChange={(e)=>
                setProducto({
                  ...producto,
                  destacado:e.target.checked
                })
              }
            />

            Producto destacado

          </label>

          <div className="flex gap-4">

            <button
              onClick={guardarCambios}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold"
            >

              Guardar Cambios

            </button>

            <button
              onClick={()=>
                router.push("/admin/productos")
              }
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-4 rounded-xl font-bold"
            >

              Cancelar

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}
