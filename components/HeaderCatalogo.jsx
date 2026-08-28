"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  FaUser,
  FaShoppingCart,
  FaHistory,
  FaList,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";

import { signOut } from "firebase/auth";

import SearchInput from "./SearchInput";

import { useCatalogo } from "./context/CatalogoContext";
import { useCarrito } from "./context/CarritoContext";
import { useAuth } from "./context/AuthContext";

import { auth } from "../app/firebase";

export default function HeaderCatalogo() {
  const router = useRouter();

  const [menuAbierto, setMenuAbierto] = useState(false);

  const menuRef = useRef(null);

  // =====================================================
  // CATALOGO
  // =====================================================

  const {
    textoInput,
    setTextoInput,
    setTextoBusqueda,
  } = useCatalogo();

  // =====================================================
  // CARRITO
  // =====================================================

  const {
    abrirCarrito,
    total,
  } = useCarrito();

  // =====================================================
  // AUTENTICACION
  // =====================================================

  const {
    usuario,
    cargando: cargandoAuth,
  } = useAuth();

  // =====================================================
  // CERRAR MENU AL HACER CLICK FUERA
  // =====================================================

  useEffect(() => {
    function cerrarMenu(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuAbierto(false);
      }
    }

    document.addEventListener("mousedown", cerrarMenu);

    return () => {
      document.removeEventListener("mousedown", cerrarMenu);
    };
  }, []);

  // =====================================================
  // BUSCAR PRODUCTO
  // =====================================================

  function buscarProducto() {
    const texto = textoInput.trim();

    if (texto === "") {
      router.push("/productos");
      return;
    }

    setTextoBusqueda(texto);
    setTextoInput("");

    router.push(
      `/productos?buscar=${encodeURIComponent(texto)}`
    );
  }

  // =====================================================
  // CERRAR SESION
  // =====================================================

  async function cerrarSesion() {
    try {
      await signOut(auth);

      setMenuAbierto(false);

      router.push("/");
    } catch (error) {
      console.error(
        "Error al cerrar sesión:",
        error
      );
    }
  }

  // =====================================================
  // NOMBRE DEL CLIENTE
  // =====================================================

  const nombreCompleto =
    usuario?.displayName?.trim() ||
    usuario?.email?.split("@")[0] ||
    "Cliente";

  const nombreUsuario =
    nombreCompleto.split(/\s+/)[0];

  // =====================================================
  // TOTAL CARRITO
  // =====================================================

  const totalCarrito = Number(total || 0).toFixed(2);

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="bg-black text-white relative z-[10000]">

        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">

          {/* =====================================================
              VERSIÓN DESKTOP
          ===================================================== */}

          <div
            className="
              hidden
              md:flex
              min-h-[120px]
              items-center
              gap-6
            "
          >

            {/* =================================================
                LOGO
            ================================================= */}

            <div className="flex-shrink-0">

              <Link href="/">

                <img
                  src="/logo.png"
                  alt="Brico Hogar"
                  className="
                    h-[82px]
                    w-auto
                    object-contain
                    cursor-pointer
                  "
                />

              </Link>

            </div>

            {/* =================================================
                BUSCADOR
            ================================================= */}

            <div className="flex-1 min-w-0">

              <SearchInput
                value={textoInput}
                onChange={setTextoInput}
                onSearch={buscarProducto}
              />

            </div>

            {/* =================================================
                USUARIO DESKTOP
            ================================================= */}

            <div
              className="
                relative
                flex-shrink-0
              "
              ref={menuRef}
            >

              {!cargandoAuth && usuario ? (

                <button
                  type="button"
                  onClick={() =>
                    setMenuAbierto(!menuAbierto)
                  }
                  className="
                    flex
                    items-center
                    gap-3
                    text-white
                    hover:text-yellow-400
                    transition
                    min-w-[145px]
                    cursor-pointer
                  "
                >

                  {/* ICONO */}

                  <FaUser
                    className="
                      text-[30px]
                      flex-shrink-0
                    "
                  />

                  {/* BIENVENIDO + NOMBRE */}

                  <span
                    className="
                      flex
                      flex-col
                      items-start
                      leading-tight
                    "
                  >

                    <span
                      className="
                        text-[12px]
                        text-gray-300
                      "
                    >
                      Bienvenido
                    </span>

                    <span
                      className="
                        text-[15px]
                        font-semibold
                        whitespace-nowrap
                      "
                    >
                      {nombreUsuario}
                    </span>

                  </span>

                  {/* FLECHA */}

                  <FaChevronDown
                    className={`
                      text-[11px]
                      transition-transform
                      ${
                        menuAbierto
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  />

                </button>

              ) : (

                <Link href="/login">

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      hover:text-yellow-400
                      transition
                    "
                  >

                    <FaUser className="text-[30px]" />

                    <span
                      className="
                        text-[14px]
                        font-medium
                        whitespace-nowrap
                      "
                    >
                      Iniciar sesión
                    </span>

                  </div>

                </Link>

              )}

              {/* =================================================
                  MENU DESPLEGABLE
              ================================================= */}

              {!cargandoAuth &&
                usuario &&
                menuAbierto && (

                  <div
                    className="
                      absolute
                      right-0
                      top-full
                      mt-3
                      w-[260px]
                      bg-white
                      rounded-xl
                      shadow-2xl
                      border
                      border-gray-200
                      overflow-hidden
                      z-[999999]
                      text-gray-800
                    "
                  >

                    {/* MI CUENTA */}

                    <Link
                      href="/mi-cuenta"
                      onClick={() =>
                        setMenuAbierto(false)
                      }
                      className="
                        flex
                        items-center
                        gap-4
                        px-5
                        py-4
                        hover:bg-gray-100
                        transition
                      "
                    >

                      <FaUser className="text-gray-600" />

                      <span>
                        Mi cuenta
                      </span>

                    </Link>

                    {/* HISTORIAL */}

                    <Link
                      href="/historial-pedidos"
                      onClick={() =>
                        setMenuAbierto(false)
                      }
                      className="
                        flex
                        items-center
                        gap-4
                        px-5
                        py-4
                        hover:bg-gray-100
                        transition
                        border-t
                        border-gray-100
                      "
                    >

                      <FaHistory className="text-gray-600" />

                      <span>
                        Historial de pedidos
                      </span>

                    </Link>

                    {/* ARMAR PEDIDO */}

                    <Link
                      href="/armar-pedido"
                      onClick={() =>
                        setMenuAbierto(false)
                      }
                      className="
                        flex
                        items-center
                        gap-4
                        px-5
                        py-4
                        hover:bg-gray-100
                        transition
                        border-t
                        border-gray-100
                      "
                    >

                      <FaList className="text-gray-600" />

                      <span>
                        Armar pedido
                      </span>

                    </Link>

                    {/* CERRAR SESION */}

                    <button
                      type="button"
                      onClick={cerrarSesion}
                      className="
                        w-full
                        flex
                        items-center
                        gap-4
                        px-5
                        py-4
                        text-red-600
                        hover:bg-red-50
                        transition
                        border-t
                        border-gray-100
                        text-left
                        cursor-pointer
                      "
                    >

                      <FaSignOutAlt />

                      <span>
                        Cerrar sesión
                      </span>

                    </button>

                  </div>

                )}

            </div>

            {/* =================================================
                CARRITO DESKTOP
            ================================================= */}

            <button
              type="button"
              onClick={abrirCarrito}
              className="
                flex
                items-center
                gap-3
                text-white
                hover:text-yellow-400
                transition
                relative
                flex-shrink-0
                cursor-pointer
              "
            >

              <FaShoppingCart
                className="text-[30px]"
              />

              <span
                className="
                  text-[15px]
                  font-semibold
                  whitespace-nowrap
                "
              >
                S/ {totalCarrito}
              </span>

            </button>

          </div>


          {/* =====================================================
              VERSIÓN MÓVIL
          ===================================================== */}

          <div className="md:hidden py-4">

            {/* =================================================
                FILA 1
                LOGO + CARRITO
            ================================================= */}

            <div
              className="
                flex
                items-center
                justify-between
                gap-3
                mb-4
              "
            >

              {/* LOGO */}

              <Link
                href="/"
                className="
                  flex-shrink-0
                "
              >

                <img
                  src="/logo.png"
                  alt="Brico Hogar"
                  className="
                    h-[58px]
                    w-auto
                    object-contain
                  "
                />

              </Link>


              {/* CARRITO */}

              <button
                type="button"
                onClick={abrirCarrito}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-yellow-400
                  text-black
                  rounded-full
                  px-4
                  py-2.5
                  shadow-md
                  flex-shrink-0
                  cursor-pointer
                  hover:bg-yellow-300
                  transition
                "
              >

                <FaShoppingCart
                  className="text-[18px]"
                />

                <span
                  className="
                    text-[14px]
                    font-bold
                    whitespace-nowrap
                  "
                >
                  S/ {totalCarrito}
                </span>

              </button>

            </div>


            {/* =================================================
                FILA 2
                BUSCADOR
            ================================================= */}

            <div
              className="
                w-full
                mb-4
              "
            >

              <SearchInput
                value={textoInput}
                onChange={setTextoInput}
                onSearch={buscarProducto}
              />

            </div>


            {/* =================================================
                FILA 3
                USUARIO
            ================================================= */}

            <div
              ref={menuRef}
              className="
                relative
                w-full
              "
            >

              {!cargandoAuth && usuario ? (

                <button
                  type="button"
                  onClick={() =>
                    setMenuAbierto(!menuAbierto)
                  }
                  className="
                    flex
                    items-center
                    gap-3
                    text-white
                    w-full
                    text-left
                    cursor-pointer
                  "
                >

                  {/* ICONO */}

                  <FaUser
                    className="
                      text-[28px]
                      flex-shrink-0
                    "
                  />

                  {/* TEXTO */}

                  <span
                    className="
                      flex
                      flex-col
                      items-start
                      leading-tight
                    "
                  >

                    <span
                      className="
                        text-[11px]
                        text-gray-300
                      "
                    >
                      Bienvenido
                    </span>

                    <span
                      className="
                        text-[15px]
                        font-semibold
                      "
                    >
                      {nombreUsuario}
                    </span>

                  </span>

                  {/* FLECHA */}

                  <FaChevronDown
                    className={`
                      text-[11px]
                      ml-1
                      transition-transform
                      ${
                        menuAbierto
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  />

                </button>

              ) : (

                <Link
                  href="/login"
                  className="
                    flex
                    items-center
                    gap-3
                    text-white
                  "
                >

                  <FaUser
                    className="text-[28px]"
                  />

                  <span
                    className="
                      text-[14px]
                      font-medium
                    "
                  >
                    Iniciar sesión
                  </span>

                </Link>

              )}


              {/* =================================================
                  MENU CUENTA MOVIL
              ================================================= */}

              {!cargandoAuth &&
                usuario &&
                menuAbierto && (

                  <div
                    className="
                      absolute
                      left-0
                      top-full
                      mt-3
                      w-[260px]
                      max-w-[90vw]
                      bg-white
                      rounded-xl
                      shadow-2xl
                      border
                      border-gray-200
                      overflow-hidden
                      z-[999999]
                      text-gray-800
                    "
                  >

                    {/* MI CUENTA */}

                    <Link
                      href="/mi-cuenta"
                      onClick={() =>
                        setMenuAbierto(false)
                      }
                      className="
                        flex
                        items-center
                        gap-4
                        px-5
                        py-4
                        hover:bg-gray-100
                        transition
                      "
                    >

                      <FaUser className="text-gray-600" />

                      <span>
                        Mi cuenta
                      </span>

                    </Link>


                    {/* HISTORIAL */}

                    <Link
                      href="/historial-pedidos"
                      onClick={() =>
                        setMenuAbierto(false)
                      }
                      className="
                        flex
                        items-center
                        gap-4
                        px-5
                        py-4
                        hover:bg-gray-100
                        transition
                        border-t
                        border-gray-100
                      "
                    >

                      <FaHistory className="text-gray-600" />

                      <span>
                        Historial de pedidos
                      </span>

                    </Link>


                    {/* ARMAR PEDIDO */}

                    <Link
                      href="/armar-pedido"
                      onClick={() =>
                        setMenuAbierto(false)
                      }
                      className="
                        flex
                        items-center
                        gap-4
                        px-5
                        py-4
                        hover:bg-gray-100
                        transition
                        border-t
                        border-gray-100
                      "
                    >

                      <FaList className="text-gray-600" />

                      <span>
                        Armar pedido
                      </span>

                    </Link>


                    {/* CERRAR SESION */}

                    <button
                      type="button"
                      onClick={cerrarSesion}
                      className="
                        w-full
                        flex
                        items-center
                        gap-4
                        px-5
                        py-4
                        text-red-600
                        hover:bg-red-50
                        transition
                        border-t
                        border-gray-100
                        text-left
                        cursor-pointer
                      "
                    >

                      <FaSignOutAlt />

                      <span>
                        Cerrar sesión
                      </span>

                    </button>

                  </div>

                )}

            </div>

          </div>

        </div>

      </header>
    </>
  );
}