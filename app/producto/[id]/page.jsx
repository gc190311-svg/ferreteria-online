"use client";

import HeaderCatalogo from "../../../components/HeaderCatalogo";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc,  getDoc,  collection, getDocs,} from "firebase/firestore";
import { useCarrito } from "../../../components/context/CarritoContext";

export default function ProductoDetalle({ params }) {

  const [producto, setProducto] = useState(null);
  const [imagenActiva, setImagenActiva] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [favorito, setFavorito] = useState(false);
  
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
 const {
    agregarProducto,
    totalItems,
} = useCarrito();

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

  <>

    <HeaderCatalogo />

    <Navbar
      categoriaSeleccionada={categoriaSeleccionada}
      setCategoriaSeleccionada={setCategoriaSeleccionada}
    />

    <div className="min-h-screen bg-gray-100 pb-10 px-4">

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

          <div
  className="
    grid
    lg:grid-cols-[120px_1.5fr_1fr]
    gap-10
    items-start
  "
>
            
                      {/* MINIATURAS */}

          <div className="order-2 lg:order-1">

            <div className="flex lg:flex-col gap-4 overflow-x-auto">

              {producto.imagenes?.map((img, index) => (

                <button
                  key={index}
                  onClick={() => setImagenActiva(index)}
                  className={`
w-28
h-28
border-2
rounded-xl
bg-white
flex
items-center
justify-center
overflow-hidden
transition-all
duration-300
${
  imagenActiva === index
    ? "border-yellow-500 shadow-md"
    : "border-gray-200 hover:border-yellow-400"
}
`}
                >

                  <img
                    src={img}
                    alt={`Imagen ${index + 1}`}
                  className="
w-20
h-20
object-contain
"
                  />

                </button>

              ))}

            </div>

          </div>

          {/* IMAGEN PRINCIPAL */}

          <div
  className="
    order-1
    lg:order-2
    flex
    items-center
    justify-center
    self-start
  "
>

          <div
  className="
    relative
    flex
    items-center
    justify-center
    w-full
    aspect-square
    max-h-[650px]
    bg-white
  "
>
            
<img
  src={
    producto.imagenes?.[imagenActiva] ||
    producto.imagen ||
    "/sin-imagen.png"
  }
  alt={producto.nombre}
  className="
    object-contain
    w-full
    h-full
    p-10
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
    tracking-[4px]
    text-xs
    font-semibold
    text-gray-500
    mb-2
  "
>
  {producto.categoria}
</p>

       <h1
  className="
    text-2xl
    lg:text-3xl
    font-semibold
    leading-snug
    text-gray-700
    mb-4
  "
>
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

                       {/* PRECIO */}

<div className="mt-8">

  {producto.oferta ? (

    <>
      <p className="text-gray-400 line-through text-lg font-medium">
        S/ {Number(producto.precio).toFixed(2)}
      </p>

      <div className="flex items-end gap-1 mt-2">

        <span className="text-base font-bold text-emerald-700">
          S/
        </span>

        <span className="text-xl lg:text-2xl font-bold text-emerald-700 leading-none">
          {Number(producto.oferta).toFixed(2)}
        </span>

      </div>

      <span className="inline-block mt-4 bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-lg">
        OFERTA
      </span>

    </>

  ) : (

    <div className="flex items-end gap-1">

      <span className="text-base font-bold text-emerald-700">
        S/
      </span>

      <span className="text-xl lg:text-2xl font-bold text-emerald-700 leading-none">
        {Number(producto.precio).toFixed(2)}
      </span>

    </div>

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
  agregarProducto({
    id: params.id,
    nombre: producto.nombre,
    precio: producto.precio,
    oferta: producto.oferta,
    imagen:
      producto.imagenes?.[0] ||
      producto.imagen ||
      "/sin-imagen.png",
    cantidad,
  })
}
              className="
w-full
mt-8
bg-yellow-500
hover:bg-yellow-400
text-black
font-bold
text-xl
py-5
rounded-2xl
shadow-lg
transition-all
duration-300
hover:shadow-xl
"
            >

              🛒 {totalItems}
              
            </button>

            {/* BOTÓN WHATSAPP */}

            <a
              href={`https://wa.me/51921883870?text=Hola,%20quiero%20información%20del%20producto:%20${producto.nombre}`}
              target="_blank"
              className="
block
w-full
mt-5
bg-green-600
hover:bg-green-700
text-white
text-center
font-bold
text-xl
py-5
rounded-2xl
transition-all
duration-300
shadow-lg
hover:shadow-xl
"
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

    <Footer />

  </>

);

}
