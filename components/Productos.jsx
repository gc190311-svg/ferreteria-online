"use client";

import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { db } from "../app/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Productos({ categoriaSeleccionada }) {

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {

    async function cargarProductos() {

      try {

        const querySnapshot = await getDocs(
          collection(db, "productos")
        );

        const listaProductos = [];

        querySnapshot.forEach((doc) => {

          listaProductos.push({
            id: doc.id,
            ...doc.data(),
          });

        });

        // Mostrar solo los primeros 4 productos
        setProductos(listaProductos.slice(0, 4));

      } catch (error) {

        console.error("Error cargando productos:", error);

      } finally {

        setCargando(false);

      }

    }

    cargarProductos();

  }, []);

  const productosFiltrados =
    categoriaSeleccionada === "todos"
      ? productos
      : productos.filter(
          (producto) =>
            producto.categoria === categoriaSeleccionada
        );

  return (

    <section
      id="productos"
      className="bg-gray-100 py-20"
    >

      <div className="max-w-7xl mx-auto px-6">

        {/* TÍTULO */}

        <div className="mb-12">

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">

            Productos más vendidos

          </h2>

          <p className="text-gray-500 text-lg mt-3">

            Descubre los productos preferidos por nuestros clientes.

          </p>

        </div>

        {/* CARGANDO */}

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

          <>

            {/* PRODUCTOS */}

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">

              {productosFiltrados.map((producto) => (

               <div
key={producto.id}
className="
group
bg-white
rounded-[28px]
overflow-hidden
shadow-md
hover:shadow-2xl
transition-all
duration-500
hover:-translate-y-2
border
border-gray-100
"
>

                  <div className="bg-gray-50 overflow-hidden">

  <img
    src={
      producto.imagenes?.[0] ||
      producto.imagen ||
      "/sin-imagen.png"
    }
    alt={producto.nombre}
    className="
      w-full
      h-72
      object-contain
      p-6
      transition-transform
      duration-500
      group-hover:scale-110
    "
  />

</div>

                  <div className="p-6 flex flex-col h-[260px]">

                  <h3
  className="
    text-[21px]
    font-semibold
    text-gray-900
    leading-7
    min-h-[90px]
  "
>
  {producto.nombre}
</h3>

                    {producto.marca && (

                     <p
  className="
    text-xs
    uppercase
    tracking-wider
    text-gray-500
    font-semibold
    mt-2
  "
>
  {producto.marca}
</p>

                    )}

                    <div className="mt-4">

                      {producto.precioAnterior > 0 && (

                        <p className="text-gray-400 line-through text-lg">

                          S/ {producto.precioAnterior}

                        </p>

                      )}

                      <p
  className="
    mt-4
    text-4xl
    font-extrabold
    text-emerald-600
  "
>
  S/
  <span className="ml-1">
    {producto.precio}
  </span>
</p>

                    </div>

                    <a
                      href={`/producto/${producto.id}`}
                      className="mt-6 w-full block text-center bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl transition"
                    >

                      Ver producto

                    </a>

                  </div>

                </div>

              ))}

            </div>

            {/* BOTÓN */}

            <div className="text-center mt-14">

              <a
                href="/productos"
                className="inline-block bg-black hover:bg-gray-800 text-white px-10 py-4 rounded-xl font-bold transition"
              >

                Ver mas productos

              </a>

            </div>

          </>

        )}

      </div>

    </section>

  );

}
