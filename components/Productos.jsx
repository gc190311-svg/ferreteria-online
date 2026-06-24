"use client";

import { useEffect, useState } from "react";
import { db } from "../app/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Productos({
  categoriaSeleccionada,
}) {

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {

    const cargarProductos = async () => {

      try {

        const querySnapshot =
          await getDocs(collection(db, "productos"));

        const listaProductos = [];

        querySnapshot.forEach((doc) => {

          listaProductos.push({
            id: doc.id,
            ...doc.data(),
          });

        });

       const destacados = lista.slice(0, 4);
setProductos(destacados);

      } catch (error) {

        console.log(error);

      } finally {

        setCargando(false);

      }

    };

    cargarProductos();

  }, []);

  const productosFiltrados =
    categoriaSeleccionada === "todos"
      ? productos
      : productos.filter(
          (producto) =>
            producto.categoria === categoriaSeleccionada
        );

  const tituloCategoria = {
    todos: "Todos los productos",
    herramientas: "Herramientas",
    electricidad: "Electricidad",
    pintura: "Pintura",
    gasfiteria: "Gasfitería",
    construccion: "Construcción",
  };

  return (
    <section
      id="productos"
      className="bg-gray-100 py-20"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h2 className="text-4xl font-bold">
              Productos destacados
            </h2>

            <p className="text-yellow-600 font-semibold mt-2">
              Categoría:{" "}
              {tituloCategoria[categoriaSeleccionada]}
            </p>

          </div>

          <span className="text-gray-500 text-xl">
            {productosFiltrados.length} productos
          </span>

        </div>

        {cargando ? (

          <div className="text-center py-20">
            <p className="text-2xl font-semibold">
              Cargando productos...
            </p>
          </div>

        ) : productosFiltrados.length === 0 ? (

          <div className="text-center py-20">

            <h3 className="text-3xl font-bold mb-4">
              No hay productos
            </h3>

            <p className="text-gray-500">
              No se encontraron productos para esta categoría.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {productosFiltrados.map((producto) => (

              <div
                key={producto.id}
                className="
                  bg-white
                  rounded-3xl
                  shadow-lg
                  overflow-hidden
                  hover:shadow-2xl
                  duration-300
                "
              >

                <img
                  src={
                    producto.imagen ||
                    "/sin-imagen.png"
                  }
                  alt={producto.nombre}
                  className="
                    w-full
                    h-72
                    object-contain
                    bg-gray-50
                    p-6
                  "
                />

                <div className="p-6">

                  <h3 className="font-bold text-xl min-h-[90px]">
                    {producto.nombre}
                  </h3>

                  {producto.marca && (
                    <p className="text-gray-500 text-sm mb-2">
                      Marca: {producto.marca}
                    </p>
                  )}

                  <div className="mt-4">

                    {producto.precioAnterior > 0 && (
                      <p className="text-gray-400 line-through text-lg">
                        S/ {producto.precioAnterior}
                      </p>
                    )}

                    <p className="text-3xl font-bold text-green-600">
                      S/ {producto.precio}
                    </p>

                  </div>

                  <button
                    className="
                      mt-6
                      w-full
                      bg-yellow-500
                      hover:bg-yellow-400
                      text-black
                      font-bold
                      py-4
                      rounded-xl
                      duration-300
                    "
                  >
                    Ver producto
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </section>
  );
}
