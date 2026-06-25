"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { auth, db } from "../firebase";

import { onAuthStateChanged } from "firebase/auth";

import {
  collection,
  addDoc,
} from "firebase/firestore";

export default function AdminPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [subiendo, setSubiendo] = useState(false);

  const [archivo, setArchivo] = useState(null);

  const [producto, setProducto] = useState({

    nombre: "",

    categoria: "herramientas",

    precio: "",

    precioAnterior: "",

    marca: "",

    stock: "",

    descripcion: "",

    destacado: false,

  });

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(

      auth,

      (user) => {

        if (!user) {

          router.push("/login");

          return;

        }

        if (
          user.email !==
          "gc190311@gmail.com"
        ) {

          alert("No autorizado");

          router.push("/");

          return;

        }

        console.log("Administrador:", user.email);

        setLoading(false);

      }

    );

    return () => unsubscribe();

  }, [router]);

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center text-xl">

        Verificando acceso...

      </div>

    );

  }
    const guardarProducto = async () => {

    if (!archivo) {
      alert("Selecciona una imagen.");
      return;
    }

    if (
      !producto.nombre ||
      !producto.precio
    ) {
      alert("Completa los campos obligatorios.");
      return;
    }

    try {

      setSubiendo(true);

      // Subir imagen a Cloudinary
      const formData = new FormData();

      formData.append("file", archivo);

      formData.append(
        "upload_preset",
        "productos_brico"
      );

      const respuesta = await fetch(
        "https://api.cloudinary.com/v1_1/dl7tlwhoy/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const datos = await respuesta.json();

      if (!datos.secure_url) {

        throw new Error(
          "No se pudo subir la imagen."
        );

      }

      // Guardar producto en Firestore

      await addDoc(
        collection(db, "productos"),
        {

          nombre: producto.nombre,

          categoria: producto.categoria,

          precio: Number(producto.precio),

          precioAnterior: Number(
            producto.precioAnterior
          ),

          marca: producto.marca,

          stock: Number(
            producto.stock
          ),

          imagen: datos.secure_url,

          imagenes: [
            datos.secure_url,
          ],

          descripcion:
            producto.descripcion,

          destacado:
            producto.destacado,

          fechaCreacion:
            new Date(),

        }
      );

      alert(
        "Producto agregado correctamente."
      );

      setProducto({

        nombre: "",

        categoria:
          "herramientas",

        precio: "",

        precioAnterior: "",

        marca: "",

        stock: "",

        descripcion: "",

        destacado: false,

      });

      setArchivo(null);

      const inputFile =
        document.querySelector(
          'input[type="file"]'
        );

      if (inputFile) {
        inputFile.value = "";
      }

    } catch (error) {

      console.error(error);

      alert(
        "Error al guardar el producto."
      );

    } finally {

      setSubiendo(false);

    }

  };
    return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center mb-8">
          Panel Administrador
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Nombre del producto"
            value={producto.nombre}
            onChange={(e)=>
              setProducto({
                ...producto,
                nombre:e.target.value
              })
            }
            className="w-full border p-3 rounded-xl"
          />

          <select
            value={producto.categoria}
            onChange={(e)=>
              setProducto({
                ...producto,
                categoria:e.target.value
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
            onChange={(e)=>
              setProducto({
                ...producto,
                precio:e.target.value
              })
            }
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="number"
            placeholder="Precio anterior"
            value={producto.precioAnterior}
            onChange={(e)=>
              setProducto({
                ...producto,
                precioAnterior:e.target.value
              })
            }
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            placeholder="Marca"
            value={producto.marca}
            onChange={(e)=>
              setProducto({
                ...producto,
                marca:e.target.value
              })
            }
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="number"
            placeholder="Stock"
            value={producto.stock}
            onChange={(e)=>
              setProducto({
                ...producto,
                stock:e.target.value
              })
            }
            className="w-full border p-3 rounded-xl"
          />

          <textarea
            placeholder="Descripción"
            value={producto.descripcion}
            onChange={(e)=>
              setProducto({
                ...producto,
                descripcion:e.target.value
              })
            }
            className="w-full border p-3 rounded-xl h-32"
          />

          <div>

            <label className="block mb-2 font-semibold">

              Imagen del producto

            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e)=>
                setArchivo(
                  e.target.files[0]
                )
              }
              className="w-full border p-3 rounded-xl"
            />

          </div>

          {archivo && (

            <div className="text-center">

              <img
                src={URL.createObjectURL(archivo)}
                alt="Vista previa"
                className="w-56 h-56 object-contain border rounded-xl mx-auto"
              />

              <p className="mt-3 text-gray-500">

                Vista previa

              </p>

            </div>

          )}

          <label className="flex items-center gap-3">

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

            Mostrar en la página principal

          </label>

          <button

            onClick={guardarProducto}

            disabled={subiendo}

            className="
              w-full
              bg-yellow-500
              hover:bg-yellow-400
              disabled:bg-gray-400
              text-black
              font-bold
              py-4
              rounded-xl
              transition
            "

          >

            {

              subiendo

                ? "Subiendo imagen..."

                : "Guardar Producto"

            }

          </button>

        </div>

      </div>

    </div>

  );

}
