"use client";

import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

export default function ProductoDetalle({ params }) {

  const [producto, setProducto] = useState(null);
  const [imagenActiva, setImagenActiva] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [favorito, setFavorito] = useState(false);
  const [carrito, setCarrito] = useState(0);
  const [productosRelacionados, setProductosRelacionados] = useState([]);

  useEffect(() => {
    cargarProducto();
  }, []);

  const cargarProducto = async () => {

    const docRef = doc(db, "productos", params.id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setProducto(docSnap.data());
    }

    const querySnapshot = await getDocs(
      collection(db, "productos")
    );

    const lista = [];

    querySnapshot.forEach((item) => {

      if (item.id !== params.id) {

        lista.push({
          id: item.id,
          ...item.data(),
        });

      }

    });

    setProductosRelacionados(lista.slice(0, 4));

  };

  if (!producto) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        Cargando...

      </div>
    );

  }

  return (

    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-7xl mx-auto">

        {/* CARRITO */}

        <div className="flex justify-end mb-6">

          <div className="bg-black text-white px-5 py-3 rounded-2xl shadow">

            🛒 {carrito}

          </div>

        </div>

        {/* BREADCRUMB */}

<nav
  className="
    flex
    items-center
    gap-2
    text-sm
    text-gray-500
    mb-8
  "
>

  <a
    href="/"
    className="hover:text-yellow-500 transition"
  >
    Inicio
  </a>

  <span>›</span>

  <a
    href={`/categorias/${producto.categoria}`}
    className="hover:text-yellow-500 transition capitalize"
  >
    {producto.categoria}
  </a>

  <span>›</span>

  <span className="font-semibold text-gray-900 truncate">
    {producto.nombre}
  </span>

</nav>

        {/* CONTENEDOR PRINCIPAL */}

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="grid lg:grid-cols-3 gap-10">
                      {/* MINIATURAS */}

          <div className="order-2 lg:order-1">

            <div className="flex lg:flex-col gap-4 overflow-x-auto">

              {producto.imagenes?.map((img, index) => (

                <button
                  key={index}
                  onClick={() => setImagenActiva(index)}
                  className={`
  border-2
  rounded-2xl
  p-3
  bg-white
  transition
  duration-300
                  ${
                   imagenActiva === index
  ? "border-yellow-500 shadow-lg"
  : "border-gray-200 hover:border-yellow-300"
                  }`}
                >

                  <img
                    src={img}
                    alt={`Imagen ${index + 1}`}
                    className="
                    h-24
                    w-24
                    object-contain
                    p-2
                    "
                  />

                </button>

              ))}

            </div>

          </div>

          {/* IMAGEN PRINCIPAL */}

          <div className="order-1 lg:order-2 flex items-center justify-center">

            <div className="relative">

              <img
                src={
                  producto.imagenes?.[imagenActiva] ||
                  producto.imagen ||
                  "/sin-imagen.png"
                }
                alt={producto.nombre}
                className="
  w-full
  max-h-[650px]
  object-contain
  transition
  duration-300
"
              />

              {/* FLECHA IZQUIERDA */}

              <button
                onClick={() =>
                  setImagenActiva(
                    imagenActiva === 0
                      ? producto.imagenes.length - 1
                      : imagenActiva - 1
                  )
                }
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full w-10 h-10"
              >
                ◀
              </button>

              {/* FLECHA DERECHA */}

              <button
                onClick={() =>
                  setImagenActiva(
                    imagenActiva === producto.imagenes.length - 1
                      ? 0
                      : imagenActiva + 1
                  )
                }
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full w-10 h-10"
              >
                ▶
              </button>

            </div>

          </div>

          {/* INFORMACIÓN */}

          <div className="order-3">

           <p
  className="
    uppercase
    tracking-[3px]
    text-sm
    font-semibold
    text-gray-500
    mb-3
  "
>

              {producto.categoria}

            </p>

            <h1 className="
text-4xl
lg:text-5xl
font-extrabold
leading-tight
text-gray-900
mb-5
">

              {producto.nombre}

            </h1>

            {/* FAVORITO */}

            <button
              onClick={() => setFavorito(!favorito)}
              className="
w-12
h-12
rounded-full
border
border-gray-200
flex
items-center
justify-center
hover:bg-yellow-500
hover:text-white
transition
mb-6
"
            >
              {favorito ? "❤️" : "🤍"}
            </button>

            {/* ESTRELLAS */}

           <span className="text-yellow-500 text-xl">

★★★★★

</span>

              <span className="text-gray-400 text-base ml-2">

                (5 opiniones)

              </span>

            </div>
                        {/* PRECIO */}

            <div className="mt-8">

              {producto.oferta ? (

                <div>

                  <p className="text-gray-400 line-through text-xl">

                    S/ {producto.precio}

                  </p>

                  <p className="text-green-600 font-bold text-5xl">

                    S/ {producto.oferta}

                  </p>

                  <span className="bg-red-500 text-white px-3 py-1 rounded">

                    OFERTA

                  </span>

                </div>

              ) : (

                <p className="text-green-600 font-bold text-5xl">

                  S/ {producto.precio}

                </p>

              )}

            </div>

            {/* STOCK */}

            <div className="mt-5">

              <p className="text-green-600 font-semibold">

                ✔ Stock disponible

              </p>

            </div>

            {/* DELIVERY */}

            <div className="mt-4 space-y-2 text-gray-600">

              <p>🚚 Delivery a todo Lima</p>

              <p>📍 Retiro en tienda</p>

            </div>

            {/* CANTIDAD */}

            <div className="flex items-center gap-5 mt-8">

              <button
                onClick={() =>
                  setCantidad(
                    cantidad > 1
                      ? cantidad - 1
                      : 1
                  )
                }
                className="border w-12 h-12 rounded-xl"
              >
                -
              </button>

              <div className="text-2xl">

                {cantidad}

              </div>

              <button
                onClick={() =>
                  setCantidad(
                    cantidad + 1
                  )
                }
                className="border w-12 h-12 rounded-xl"
              >
                +
              </button>

            </div>

            {/* BOTÓN CARRITO */}

            <button
              onClick={() =>
                setCarrito(
                  carrito + cantidad
                )
              }
              className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-xl font-bold"
            >

              🛒 Agregar al carrito

            </button>

            {/* BOTÓN WHATSAPP */}

            <a
              href={`https://wa.me/51921883870?text=Hola,%20quiero%20información%20del%20producto:%20${producto.nombre}`}
              target="_blank"
              className="block mt-6 bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-xl text-xl font-bold"
            >

              Consultar por WhatsApp

            </a>

            {/* INFORMACIÓN EXTRA */}

            <div className="mt-8 border-t pt-6 space-y-3">

              <p>🔒 Compra segura</p>

              <p>💳 Pago con tarjeta, Yape y Plin</p>

              <p>🚚 Envíos rápidos</p>

            </div>

            {/* CARACTERÍSTICAS */}

            <div className="mt-10">

              <h2 className="font-bold text-xl mb-5">

                Características

              </h2>

              <ul className="space-y-3 text-gray-600">

                <li>
                  • Categoría: {producto.categoria}
                </li>

                <li>
                  • Marca: {producto.marca || "No especificado"}
                </li>

                <li>
                  • Color: {producto.color || "No especificado"}
                </li>

                <li>
                  • Material: {producto.material || "No especificado"}
                </li>

              </ul>

            </div>

          </div>

        </div>
                    {/* DESCRIPCIÓN */}

          <hr className="my-12" />

          <h2 className="text-3xl font-bold mb-8">

            Descripción

          </h2>

          <div className="text-gray-600 whitespace-pre-line leading-8">

            {producto.descripcion}

          </div>

          {/* OPINIONES */}

          <div className="mt-16">

            <h2 className="text-3xl font-bold mb-8">

              Opiniones

            </h2>

            <div className="space-y-6">

              <div className="border rounded-2xl p-6">

                <div className="text-yellow-500 text-2xl">

                  ★★★★★

                </div>

                <p className="mt-3">

                  Excelente producto y muy buena calidad.

                </p>

              </div>

              <div className="border rounded-2xl p-6">

                <div className="text-yellow-500 text-2xl">

                  ★★★★★

                </div>

                <p className="mt-3">

                  Recomendado para trabajos profesionales.

                </p>

              </div>

            </div>

          </div>

          {/* MEDIOS DE PAGO */}

          <div className="mt-16">

            <h2 className="text-3xl font-bold mb-8">

              Medios de pago

            </h2>

            <div className="flex gap-6 text-5xl">

              💳 🏦 💵 📱

            </div>

          </div>

        </div>

      </div>
            {/* PRODUCTOS RELACIONADOS */}

      <div className="max-w-7xl mx-auto mt-16">

        <h2 className="text-3xl font-bold mb-8">

          Productos relacionados

        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {productosRelacionados.map((item) => (

            <a
              href={`/producto/${item.id}`}
              key={item.id}
              className="bg-white rounded-2xl shadow p-4 hover:shadow-xl transition hover:-translate-y-1"
            >

              <img
                src={
                  item.imagenes?.[0] ||
                  item.imagen ||
                  "/sin-imagen.png"
                }
                alt={item.nombre}
                className="h-48 mx-auto object-contain"
              />

              <h3 className="font-bold mt-4 min-h-[60px]">

                {item.nombre}

              </h3>

              {item.oferta ? (

                <div className="mt-3">

                  <p className="text-gray-400 line-through">

                    S/ {item.precio}

                  </p>

                  <p className="text-green-600 text-2xl font-bold">

                    S/ {item.oferta}

                  </p>

                </div>

              ) : (

                <p className="text-green-600 text-2xl font-bold mt-3">

                  S/ {item.precio}

                </p>

              )}

            </a>

          ))}

        </div>

      </div>

    </div>

  );

}
