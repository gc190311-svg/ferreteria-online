"use client";

import HeaderCatalogo from "../../../components/HeaderCatalogo";
import Navbar from "../../../components/Navbar";

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

  const [productosRelacionados, setProductosRelacionados] =
    useState([]);

  useEffect(() => {

    cargarProducto();

  }, []);

  async function cargarProducto() {

    const docRef = doc(
      db,
      "productos",
      params.id
    );

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

    setProductosRelacionados(
      lista.slice(0, 4)
    );

  }

  if (!producto) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Cargando...

      </div>

    );

  }

  return (

    <>

      <HeaderCatalogo />

      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10 px-4">

        <div className="max-w-7xl mx-auto">

          {/* CARRITO */}

          <div className="flex justify-end mb-6">

            <div className="bg-black text-white px-5 py-3 rounded-2xl shadow">

              🛒 {carrito}

            </div>

          </div>

          {/* BREADCRUMB */}

          <div className="text-sm text-gray-500 mb-8">

            <a
              href="/"
              className="hover:text-yellow-500"
            >

              Inicio

            </a>

            {" > "}

            <span>

              {producto.categoria}

            </span>

            {" > "}

            <span className="font-semibold text-black">

              {producto.nombre}

            </span>

          </div>

          {/* CONTENEDOR PRINCIPAL */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <div className="grid lg:grid-cols-3 gap-10">

              {/* MINIATURAS */}

              <div className="order-2 lg:order-1">

                <div className="flex lg:flex-col gap-4 overflow-x-auto">

                  {producto.imagenes?.map((img, index) => (

                    <button
                      key={index}
                      onClick={() =>
                        setImagenActiva(index)
                      }
                      className={`border-2 rounded-xl p-2 bg-white transition

                      ${
                        imagenActiva === index
                          ? "border-yellow-500"
                          : "border-gray-200"
                      }

                      `}
                    >

                      <img
                        src={img}
                        alt={`Imagen ${index + 1}`}
                        className="h-20 w-20 object-contain"
                      />

                    </button>

                  ))}

                </div>

              </div>

              {/* IMAGEN PRINCIPAL */}

<div className="order-1 lg:order-2 flex items-center justify-center">

  <div className="relative w-full">

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
      "
    />

    {/* Flecha izquierda */}

    <button
      onClick={() =>
        setImagenActiva(
          imagenActiva === 0
            ? producto.imagenes.length - 1
            : imagenActiva - 1
        )
      }
      className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        w-12
        h-12
        rounded-full
        bg-white
        shadow-lg
        hover:bg-yellow-500
        hover:text-black
        transition
      "
    >

      ◀

    </button>

    {/* Flecha derecha */}

    <button
      onClick={() =>
        setImagenActiva(
          imagenActiva ===
          producto.imagenes.length - 1
            ? 0
            : imagenActiva + 1
        )
      }
      className="
        absolute
        right-4
        top-1/2
        -translate-y-1/2
        w-12
        h-12
        rounded-full
        bg-white
        shadow-lg
        hover:bg-yellow-500
        hover:text-black
        transition
      "
    >

      ▶

    </button>

  </div>

</div>

{/* INFORMACIÓN */}

<div className="order-3">

  {/* CATEGORÍA */}

  <p
    className="
      uppercase
      tracking-[3px]
      text-sm
      text-gray-500
      font-semibold
    "
  >

    {producto.categoria}

  </p>

  {/* MARCA */}

  {producto.marca && (

    <p
      className="
        mt-2
        text-lg
        font-semibold
        text-yellow-600
      "
    >

      {producto.marca}

    </p>

  )}

  {/* NOMBRE */}

  <h1
    className="
      mt-4
      text-4xl
      font-bold
      leading-tight
      text-gray-900
    "
  >

    {producto.nombre}

  </h1>

  {/* FAVORITO */}

  <button
    onClick={() => setFavorito(!favorito)}
    className="
      mt-5
      text-3xl
      hover:scale-110
      transition
    "
  >

    {favorito ? "❤️" : "🤍"}

  </button>

  {/* ESTRELLAS */}

  <div
    className="
      flex
      items-center
      gap-2
      mt-5
    "
  >

    <div className="text-yellow-500 text-xl">

      ★★★★★

    </div>

    <span className="text-gray-500">

      (5 opiniones)

    </span>

  </div>

  {/* PRECIO */}

  <div className="mt-8">

    {producto.oferta ? (

      <>

        <p
          className="
            text-gray-400
            line-through
            text-xl
          "
        >

          S/ {Number(producto.precio).toFixed(2)}

        </p>

        <h2
          className="
            text-5xl
            font-bold
            text-emerald-600
          "
        >

          S/ {Number(producto.oferta).toFixed(2)}

        </h2>

        <span
          className="
            inline-block
            mt-3
            bg-red-600
            text-white
            px-4
            py-1
            rounded-lg
            text-sm
            font-bold
          "
        >

          OFERTA

        </span>

      </>

    ) : (

      <h2
        className="
          text-5xl
          font-bold
          text-emerald-600
        "
      >

        S/ {Number(producto.precio).toFixed(2)}

      </h2>

    )}

  </div>

  {/* STOCK */}

  <div className="mt-8">

    <span
      className="
        bg-green-100
        text-green-700
        px-4
        py-2
        rounded-full
        font-semibold
      "
    >

      ✔ En stock

    </span>

  </div>

  {/* ENTREGA */}

  <div
    className="
      mt-6
      space-y-3
      text-gray-600
    "
  >

    <p>

      🚚 Delivery a todo Lima Metropolitana

    </p>

    <p>

      🏪 Retiro gratis en tienda

    </p>

  </div>

  {/* CANTIDAD */}

  <div
    className="
      flex
      items-center
      gap-5
      mt-8
    "
  >

    <button
      onClick={() =>
        setCantidad(
          cantidad > 1
            ? cantidad - 1
            : 1
        )
      }
      className="
        w-12
        h-12
        rounded-xl
        border
        hover:bg-gray-100
      "
    >

      −

    </button>

    <span className="text-2xl font-semibold">

      {cantidad}

    </span>

    <button
      onClick={() =>
        setCantidad(cantidad + 1)
      }
      className="
        w-12
        h-12
        rounded-xl
        border
        hover:bg-gray-100
      "
    >

      +

    </button>

  </div>

  {/* BOTÓN CARRITO */}

  <button
    onClick={() =>
      setCarrito(carrito + cantidad)
    }
    className="
      w-full
      mt-8
      bg-yellow-500
      hover:bg-yellow-400
      text-black
      py-4
      rounded-xl
      text-xl
      font-bold
      transition
    "
  >

    Agregar al carrito

  </button>

  {/* BOTÓN WHATSAPP */}

  <a
    href={`https://wa.me/51921883870?text=Hola,%20quiero%20información%20del%20producto:%20${producto.nombre}`}
    target="_blank"
    className="
      block
      mt-4
      bg-green-600
      hover:bg-green-700
      text-white
      text-center
      py-4
      rounded-xl
      text-xl
      font-bold
      transition
    "
  >

    Consultar por WhatsApp

  </a>

 {/* INFORMACIÓN EXTRA */}

<div className="mt-10 border-t border-gray-200 pt-8">

  <div className="space-y-4 text-gray-700">

    <div className="flex items-center gap-3">

      <span className="text-green-600 text-xl">
        ✔
      </span>

      <span>

        Compra 100% segura

      </span>

    </div>

    <div className="flex items-center gap-3">

      <span className="text-green-600 text-xl">
        ✔
      </span>

      <span>

        Aceptamos Visa, Mastercard, Yape y Plin

      </span>

    </div>

    <div className="flex items-center gap-3">

      <span className="text-green-600 text-xl">
        ✔
      </span>

      <span>

        Envíos rápidos a Lima Metropolitana

      </span>

    </div>

    <div className="flex items-center gap-3">

      <span className="text-green-600 text-xl">
        ✔
      </span>

      <span>

        Garantía por defectos de fabricación

      </span>

    </div>

  </div>

  {/* CARACTERÍSTICAS */}

  <div className="mt-12">

    <h2
      className="
        text-2xl
        font-bold
        mb-6
      "
    >

      Especificaciones

    </h2>

    <div
      className="
        bg-gray-50
        rounded-2xl
        p-6
      "
    >

      <div className="grid grid-cols-2 gap-y-5">

        <span className="font-semibold">

          Categoría

        </span>

        <span>

          {producto.categoria}

        </span>

        <span className="font-semibold">

          Marca

        </span>

        <span>

          {producto.marca || "No especificado"}

        </span>

        <span className="font-semibold">

          Color

        </span>

        <span>

          {producto.color || "No especificado"}

        </span>

        <span className="font-semibold">

          Material

        </span>

        <span>

          {producto.material || "No especificado"}

        </span>

      </div>

    </div>

  </div>

</div>

{/* DESCRIPCIÓN */}

<div className="mt-16">

  <h2
    className="
      text-3xl
      font-bold
      mb-6
    "
  >

    Descripción del producto

  </h2>

  <div
    className="
      bg-white
      rounded-2xl
      p-8
      shadow-sm
      border
      border-gray-100
      whitespace-pre-line
      leading-8
      text-gray-700
    "
  >

    {producto.descripcion}

  </div>

</div>

{/* OPINIONES */}

<div className="mt-16">

  <h2
    className="
      text-3xl
      font-bold
      mb-8
    "
  >

    Opiniones

  </h2>

  <div className="space-y-6">

    <div
      className="
        bg-white
        border
        border-gray-200
        rounded-2xl
        p-6
      "
    >

      <div className="text-yellow-500 text-xl">

        ★★★★★

      </div>

      <p className="mt-3 text-gray-700">

        Excelente producto y muy buena calidad.

      </p>

    </div>

    <div
      className="
        bg-white
        border
        border-gray-200
        rounded-2xl
        p-6
      "
    >

      <div className="text-yellow-500 text-xl">

        ★★★★★

      </div>

      <p className="mt-3 text-gray-700">

        Recomendado para trabajos profesionales.

      </p>

    </div>

  </div>

</div>

{/* MEDIOS DE PAGO */}

<div className="mt-16">

  <h2
    className="
      text-3xl
      font-bold
      mb-6
    "
  >

    Medios de pago

  </h2>

  <div
    className="
      flex
      gap-5
      text-5xl
      bg-white
      rounded-2xl
      p-8
      shadow-sm
      border
      border-gray-100
    "
  >

    💳 🏦 💵 📱

  </div>

</div>

  {/* PRODUCTOS RELACIONADOS */}

<div className="max-w-7xl mx-auto mt-20">

  <h2
    className="
      text-4xl
      font-bold
      mb-10
      text-gray-900
    "
  >

    Productos relacionados

  </h2>

  <div
    className="
      grid
      grid-cols-2
      md:grid-cols-2
      lg:grid-cols-4
      gap-8
    "
  >

    {productosRelacionados.map((item) => (

      <a
        key={item.id}
        href={`/producto/${item.id}`}
        className="
          group
          bg-white
          rounded-3xl
          border
          border-gray-200
          overflow-hidden
          shadow-sm
          hover:shadow-xl
          transition-all
          duration-300
        "
      >

        {/* Imagen */}

        <div
          className="
            relative
            bg-gray-50
            h-[260px]
            overflow-hidden
          "
        >

          <img
            src={
              item.imagenes?.[0] ||
              item.imagen ||
              "/sin-imagen.png"
            }
            alt={item.nombre}
            className="
              w-full
              h-full
              object-contain
              p-6
            "
          />

          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              bg-yellow-500
              text-center
              text-black
              font-bold
              py-3
              translate-y-full
              group-hover:translate-y-0
              transition-all
              duration-300
            "
          >

            Ver producto

          </div>

        </div>

        {/* Información */}

        <div className="p-5">

          <p
            className="
              text-xs
              uppercase
              tracking-[2px]
              text-gray-500
            "
          >

            {item.marca}

          </p>

          <h3
            className="
              mt-3
              font-semibold
              text-lg
              leading-7
              min-h-[58px]
              line-clamp-2
            "
          >

            {item.nombre}

          </h3>

          <div className="mt-5 text-center">

            {item.oferta ? (

              <>

                <p className="text-gray-400 line-through">

                  S/ {Number(item.precio).toFixed(2)}

                </p>

                <p
                  className="
                    text-2xl
                    font-bold
                    text-emerald-600
                  "
                >

                  S/ {Number(item.oferta).toFixed(2)}

                </p>

              </>

            ) : (

              <p
                className="
                  text-2xl
                  font-bold
                  text-emerald-600
                "
              >

                S/ {Number(item.precio).toFixed(2)}

              </p>

            )}

          </div>

        </div>

      </a>

    ))}

  </div>

</div>

</div>

</>

);

}

  
