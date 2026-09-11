"use client";

import Footer from "../../../components/Footer";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc,  getDoc,  collection, getDocs,} from "firebase/firestore";
import { useCarrito } from "../../../components/context/CarritoContext";
import ImageViewer from "../../../components/producto/ImageViewer";

import HeaderCatalogoCompleto from "../../../components/HeaderCatalogoCompleto";
import { useAuth } from "../../../components/context/AuthContext";


export default function ProductoDetalleClient({ params }) {

  const [producto, setProducto] = useState(null);
  const [imagenActiva, setImagenActiva] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [favorito, setFavorito] = useState(false);
  
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [categoriasDisponibles, setCategoriasDisponibles] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [filtroMovilAbierto, setFiltroMovilAbierto] = useState(false);
 const { agregarProducto,  totalItems,} = useCarrito();
 const { usuario, cargando: cargandoAuth } = useAuth();
 
useEffect(() => {
  cargarProducto();
}, []);

const solicitarRegistro = () => {
  const destino = `/producto/${params.id}`;

  window.location.href =
    `/registro?redirect=${encodeURIComponent(destino)}`;
};

const agregarRelacionado = (item) => {
  if (!usuario) {
    const destino = `/producto/${item.id}`;
    window.location.href =
      `/registro?redirect=${encodeURIComponent(destino)}`;
    return;
  }

  agregarProducto({
    id: item.id,
    nombre: item.nombre,
    precio: item.precio,
    oferta: item.oferta,
    imagen: item.imagen,
    imagenes: item.imagenes,
    cantidad: 1,
  });
};

  const cargarProducto = async () => {

    const docRef = doc(db, "productos", params.id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

    const datos = docSnap.data();

    datos.imagenes = datos.imagenes?.length
        ? datos.imagenes
        : datos.imagen
            ? [datos.imagen]
            : ["/sin-imagen.png"];

    setProducto(datos);

}

    const querySnapshot = await getDocs(
      collection(db, "productos")
    );

    const lista = [];
    const mapaCategorias = {};

    querySnapshot.forEach((item) => {
      const datosItem = item.data();

      // Guardamos las categorías de TODOS los productos
      // para mostrarlas en el filtro móvil.
      if (datosItem.categoria) {
        const nombreCategoria = String(datosItem.categoria).trim();
        const clave = nombreCategoria
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();

        if (!mapaCategorias[clave]) {
          mapaCategorias[clave] = {
            nombre: nombreCategoria,
            cantidad: 0,
          };
        }

        mapaCategorias[clave].cantidad += 1;
      }

      if (item.id !== params.id) {
        lista.push({
          id: item.id,
          ...datosItem,
        });
      }
    });

    setCategoriasDisponibles(
      Object.values(mapaCategorias).sort((a, b) =>
        a.nombre.localeCompare(b.nombre, "es")
      )
    );

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


    <HeaderCatalogoCompleto
  categoriaSeleccionada={categoriaSeleccionada}
  setCategoriaSeleccionada={setCategoriaSeleccionada}
  onAbrirFiltros={() => setFiltroMovilAbierto(true)}
/>

{filtroMovilAbierto && (
  <div
    className="
      fixed
      inset-0
      z-[99999]
      bg-black/50
      lg:hidden
    "
    onClick={() => setFiltroMovilAbierto(false)}
  >
    <div
      className="
        absolute
        left-0
        right-0
        bottom-0
        bg-white
        rounded-t-[28px]
        max-h-[88vh]
        overflow-y-auto
        shadow-2xl
        p-5
      "
      onClick={(e) => e.stopPropagation()}
    >

      {/* INDICADOR */}
      <div className="flex justify-center mb-5">
        <div className="w-12 h-1.5 rounded-full bg-gray-300" />
      </div>

      {/* CABECERA */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">
            Filtrar productos
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Selecciona una categoría
          </p>
        </div>

        <button
          type="button"
          onClick={() => setFiltroMovilAbierto(false)}
          className="
            w-10 h-10 rounded-full bg-gray-100
            flex items-center justify-center
            text-xl text-gray-700 font-bold
            active:scale-95
          "
          aria-label="Cerrar filtros"
        >
          ×
        </button>
      </div>

      {/* CATEGORÍAS */}
      <div className="border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-4 bg-gray-50 border-b border-gray-200">
          <div className="w-9 h-9 rounded-xl bg-yellow-400 flex items-center justify-center text-black">
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </div>
          <span className="font-bold text-gray-900">Categorías</span>
        </div>

        <div className="p-3 space-y-2">
          {/* TODAS */}
          <button
            type="button"
            onClick={() => {
              setCategoriaSeleccionada("todos");
              setFiltroMovilAbierto(false);
              window.location.href = "/productos";
            }}
            className="
              w-full flex items-center justify-between
              px-4 py-3 rounded-xl
              bg-white text-gray-700
              hover:bg-gray-50 transition
            "
          >
            <span>Todas</span>
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-gray-100 text-gray-600">
              Todos
            </span>
          </button>

          {categoriasDisponibles.map(({ nombre, cantidad }) => {
            const activo =
              String(producto.categoria || "").trim().toLowerCase() ===
              nombre.trim().toLowerCase();

            const slug = nombre
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
              .trim()
              .replace(/\s+/g, "-");

            return (
              <button
                key={nombre}
                type="button"
                onClick={() => {
                  setCategoriaSeleccionada(nombre);
                  setFiltroMovilAbierto(false);
                  window.location.href = `/categorias/${slug}`;
                }}
                className={`
                  w-full flex items-center justify-between
                  px-4 py-3 rounded-xl transition
                  ${
                    activo
                      ? "bg-yellow-400 text-black font-bold"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                <span className="text-left">{nombre}</span>
                <span
                  className={`
                    text-xs font-bold px-2 py-1 rounded-full
                    ${activo ? "bg-black/10 text-black" : "bg-gray-100 text-gray-600"}
                  `}
                >
                  {cantidad}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CERRAR */}
      <button
        type="button"
        onClick={() => setFiltroMovilAbierto(false)}
        className="
          w-full mt-5 py-3.5 rounded-xl
          bg-yellow-400 text-black font-bold
          active:scale-[0.98]
        "
      >
        Cerrar
      </button>
    </div>
  </div>
)}

    <div className="min-h-screen bg-gray-100 pb-8 px-2 sm:px-4 mobile-product-page">

      <div className="max-w-7xl mx-auto">

      

        {/* BREADCRUMB */}

<nav
  className="
    flex
    items-center
    gap-2
    text-sm
    text-gray-500
    mb-4
    sm:mb-8
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
    href={`/categorias/${String(producto.categoria || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")}`}
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

        <div
  className="
    bg-white
    rounded-2xl
    sm:rounded-3xl
    shadow-lg
    p-3
    sm:p-6
    lg:p-8
    overflow-hidden
    mobile-product-card
  "
>

          <div
  className="
    grid
    grid-cols-1
    lg:grid-cols-[110px_minmax(0,1.4fr)_minmax(0,1fr)]
    gap-6
    lg:gap-10
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
    w-16
    h-16
    sm:w-24
    sm:h-24
    lg:w-28
    lg:h-28
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
                    alt={`${producto.nombre} - imagen ${index + 1}`}
                  className="
w-12
h-12
sm:w-20
sm:h-20
object-contain
"
                  />

                </button>

              ))}

            </div>

          </div>

        <div
    className="
        order-1
        lg:order-2
        flex
        items-center
        justify-center
        self-start
        mobile-product-image
    "
>
    <ImageViewer
        imagenes={producto.imagenes}
        nombre={producto.nombre}
        imagenActiva={imagenActiva}
        setImagenActiva={setImagenActiva}
    />
</div>

          {/* INFORMACIÓN */}

          <div className=" order-3 w-full min-w-0 ">

          <p
  className="
    uppercase
    tracking-[3px]
    text-[11px]
    sm:text-xs
    font-semibold
    text-gray-500
    mb-1.5
  "
>
  {producto.categoria}
</p>

       <h1
  className="
    text-[20px]
    sm:text-2xl
    lg:text-3xl
    font-semibold
    leading-tight
    text-gray-700
    mb-3
  "
>
  {producto.nombre}
</h1>

            {/* FAVORITO */}

            <button
              onClick={() => setFavorito(!favorito)}
              className="
w-10
h-10
sm:w-12
sm:h-12
rounded-full
border
border-gray-200
flex
items-center
justify-center
hover:bg-yellow-500
hover:text-white
transition
mb-4
"
            >
              {favorito ? "❤️" : "🤍"}
            </button>

            {/* ESTRELLAS */}

           <span className="text-yellow-500 text-base sm:text-xl">

★★★★★

</span>

              <span className="text-gray-400 text-sm sm:text-base ml-1.5">

                (5 opiniones)

              </span>

                       {/* PRECIO */}

<div className="mt-5 sm:mt-8">

  {usuario ? (

    producto.oferta ? (

      <>
        <p className="text-gray-400 line-through text-sm sm:text-lg font-medium">
          S/ {Number(producto.precio).toFixed(2)}
        </p>

        <div className="flex items-end gap-1 mt-2">
          <span className="text-sm sm:text-base font-bold text-emerald-700">
            S/
          </span>

          <span className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-700 leading-none">
            {Number(producto.oferta).toFixed(2)}
          </span>
        </div>

        <span className="inline-block mt-3 bg-red-600 text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg">
          OFERTA
        </span>
      </>

    ) : (

      <div className="flex items-end gap-1">
        <span className="text-sm sm:text-base font-bold text-emerald-700">
          S/
        </span>

        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-700 leading-none">
          {Number(producto.precio).toFixed(2)}
        </span>
      </div>

    )

  ) : (

    <button
      type="button"
      onClick={solicitarRegistro}
      className="
        w-full
        bg-yellow-500
        hover:bg-yellow-400
        text-black
        font-bold
        text-base
        sm:text-lg
        py-4
        px-6
        rounded-2xl
        shadow-lg
        transition-all
        duration-300
        hover:shadow-xl
      "
    >
      🔒 Registrate para consultar el precio
    </button>

  )}

</div>

            {/* STOCK */}

            <div className="mt-4">
              {Number(producto.stock || 0) > 0 ? (
                <p className="text-green-600 font-semibold">
                  ✔ Stock disponible
                </p>
              ) : (
                <p className="text-red-600 font-semibold">
                  ✘ Producto agotado
                </p>
              )}

            </div>

            {/* DELIVERY */}

            <div className="mt-3 space-y-1.5 text-sm sm:text-base text-gray-600">

              <p>🚚 Delivery a todo Lima</p>

              <p>📍 Retiro en tienda</p>

            </div>

           {usuario && (
  <>
    {/* CANTIDAD */}

    <div className="flex items-center gap-4 mt-5 sm:mt-8">

      <button
        onClick={() =>
          setCantidad(
            cantidad > 1
              ? cantidad - 1
              : 1
          )
        }
        className="border w-10 h-10 sm:w-12 sm:h-12 rounded-xl"
      >
        -
      </button>

      <div className="text-xl sm:text-2xl">
        {cantidad}
      </div>

      <button
        onClick={() =>
          setCantidad(
            cantidad + 1
          )
        }
        className="border w-10 h-10 sm:w-12 sm:h-12 rounded-xl"
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
          imagen: producto.imagen,
          imagenes: producto.imagenes,
          cantidad,
        })
      }
      className="
        w-full
        mt-5 sm:mt-8
        bg-yellow-500
        hover:bg-yellow-400
        text-black
        font-bold
        text-base
        sm:text-lg
        py-3
        sm:py-4
        rounded-xl
        sm:rounded-2xl
        shadow-lg
        transition-all
        duration-300
        hover:shadow-xl
        flex
        items-center
        justify-center
        gap-2
      "
    >
      🛒 Agregar al carrito
    </button>
  </>
)}

            {/* BOTÓN WHATSAPP */}

            <a
              href={`https://wa.me/51921883870?text=Hola,%20quiero%20información%20del%20producto:%20${producto.nombre}`}
              target="_blank"
              className="
block
w-full
mt-3 sm:mt-4
bg-green-600
hover:bg-green-700
text-white
text-center
font-bold
text-base
sm:text-lg
py-3
sm:py-4
rounded-xl
sm:rounded-2xl
shadow-lg
transition-all
duration-300
"
            >

              Consultar por WhatsApp

            </a>

            {/* INFORMACIÓN EXTRA */}

            <div className="mt-6 sm:mt-8 border-t pt-4 sm:pt-6 space-y-2.5 text-sm sm:text-base">

              <p>🔒 Compra segura</p>

              <p>💳 Pago con tarjeta, Yape y Plin</p>

              <p>🚚 Envíos rápidos</p>

            </div>

            {/* CARACTERÍSTICAS */}

            <div className="mt-7 sm:mt-10">

              <h2 className="font-bold text-lg sm:text-xl mb-4">

                Características

              </h2>

              <ul className="space-y-2.5 text-sm sm:text-base text-gray-600">

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

          <hr className="my-7 sm:my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-8">

            Descripción

          </h2>

          <div className="text-sm sm:text-base text-gray-600 whitespace-pre-line leading-7 sm:leading-8">

            {producto.descripcion}

          </div>

          {/* OPINIONES */}

          <div className="mt-10 sm:mt-16">

            <h2 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-8">

              Opiniones

            </h2>

            <div className="border rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <p className="text-gray-600">
                Aún no hay opiniones para este producto.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Sé el primero en compartir tu experiencia con este producto.
              </p>
            </div>

          </div>

          {/* MEDIOS DE PAGO */}

          <div className="mt-10 sm:mt-16">

            <h2 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-8">

              Medios de pago

            </h2>

            <div className="flex gap-6 text-5xl">

              💳 🏦 💵 📱

            </div>

          </div>

        </div>

      </div>
            {/* PRODUCTOS RELACIONADOS */}

      <section className="max-w-7xl mx-auto mt-10 sm:mt-16">

        <div className="flex items-center justify-between mb-5 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Productos relacionados
          </h2>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("productos-relacionados-carrusel")
                  ?.scrollBy({ left: -300, behavior: "smooth" })
              }
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-lg font-bold hover:bg-gray-100 transition"
              aria-label="Productos anteriores"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("productos-relacionados-carrusel")
                  ?.scrollBy({ left: 300, behavior: "smooth" })
              }
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-lg font-bold hover:bg-gray-100 transition"
              aria-label="Productos siguientes"
            >
              ›
            </button>
          </div>
        </div>

        <div
          id="productos-relacionados-carrusel"
          className="
            flex
            gap-4
            sm:gap-5
            overflow-x-auto
            scroll-smooth
            snap-x
            snap-mandatory
            pb-4
            px-1
            [scrollbar-width:none]
            [-ms-overflow-style:none]
          "
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {productosRelacionados.map((item) => (
            <article
              key={item.id}
              className="
                flex-none
                w-[72%]
                sm:w-[250px]
                lg:w-[270px]
                snap-start
                bg-white
                rounded-2xl
                shadow-sm
                border
                border-gray-100
                p-4
                hover:shadow-lg
                transition
              "
            >
              <a href={`/producto/${item.id}`} className="block">
                <div className="h-36 sm:h-44 flex items-center justify-center">
                  <img
                    src={
                      item.imagenes?.[0] ||
                      item.imagen ||
                      "/sin-imagen.png"
                    }
                    alt={item.nombre}
                    className="w-full h-full object-contain"
                  />
                </div>

                <p className="mt-3 text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-gray-400 text-center uppercase truncate">
                  {item.marca || "SIN MARCA"}
                </p>

                <h3 className="font-bold text-[15px] sm:text-base mt-2 min-h-[44px] text-center text-gray-900 line-clamp-2">
                  {item.nombre}
                </h3>

                <p className="text-xs sm:text-sm font-semibold text-gray-500 text-center mt-2">
                  SKU: {item.sku || "N/A"}
                </p>

                {item.oferta ? (
                  <div className="mt-3 text-center">
                    <p className="text-gray-400 line-through text-xs sm:text-sm">
                      S/ {Number(item.precio || 0).toFixed(2)}
                    </p>
                    <p className="text-green-600 text-xl sm:text-2xl font-bold">
                      S/ {Number(item.oferta || 0).toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <p className="text-green-600 text-xl sm:text-2xl font-bold mt-3 text-center">
                    S/ {Number(item.precio || 0).toFixed(2)}
                  </p>
                )}
              </a>

              <button
                type="button"
                onClick={() => agregarRelacionado(item)}
                className="
                  w-full
                  mt-4
                  bg-yellow-500
                  hover:bg-yellow-400
                  text-black
                  font-bold
                  text-sm
                  py-3
                  rounded-xl
                  shadow-sm
                  transition
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                🛒 Agregar al carrito
              </button>
            </article>
          ))}
        </div>
      </section>

    </div>

    <style jsx>{`
      #productos-relacionados-carrusel::-webkit-scrollbar {
        display: none;
      }

      /* Ajustes exclusivos para celulares.
         En escritorio se conserva el diseño actual. */
      @media (max-width: 767px) {
        .mobile-product-page {
          overflow-x: hidden;
        }

        .mobile-product-page .mobile-product-card {
          box-shadow: 0 3px 14px rgba(0, 0, 0, 0.08);
        }

        /* Reduce el bloque de la imagen principal sin tocar ImageViewer. */
       .mobile-product-page .mobile-product-image {
  width: 100%;
  height: auto;
  min-height: 0;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-product-page .mobile-product-image > * {
  width: 100%;
  max-width: 100%;
  height: auto;
  flex-shrink: 1;
  transform: none;
  margin-left: 0;
}

        /* Menos espacio entre la imagen, miniatura e información. */
        .mobile-product-page .mobile-product-card {
          padding-top: 10px;
          padding-bottom: 16px;
        }

        .mobile-product-page nav {
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
        }
      }

      @media (max-width: 767px) {
        /* En móvil dejamos que el visor tenga espacio suficiente
           para mostrar TODA la imagen sin recortarla. */
        .mobile-product-page .mobile-product-image {
          height: 390px;
          min-height: 390px;
          overflow: visible;
        }

        .mobile-product-page .mobile-product-image > * {
          width: 100%;
          max-width: 100%;
          height: 390px;
          transform: none;
          margin: 0;
          overflow: visible;
        }
      }
    `}</style>

    <Footer />

  </>

);

}
