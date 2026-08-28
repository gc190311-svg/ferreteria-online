"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

import {
  FaUser,
  FaShoppingCart,
  FaClipboardList,
  FaSignOutAlt,
  FaList,
  FaChevronDown,
} from "react-icons/fa";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../app/firebase";

import SearchInput from "./SearchInput";
import CarritoDrawer from "./CarritoDrawer";

import { useCatalogo } from "./context/CatalogoContext";
import { useCarrito } from "./context/CarritoContext";

export default function HeaderHome() {
  const router = useRouter();

  const [usuario, setUsuario] = useState(null);
  const [menuUsuario, setMenuUsuario] = useState(false);

  const menuMovilRef = useRef(null);
const menuPcRef = useRef(null);

  // =====================================================
  // USUARIO FIREBASE
  // =====================================================

  useEffect(() => {
    const cancelar = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });

    return () => cancelar();
  }, []);

  // =====================================================
  // CERRAR MENU AL HACER CLICK FUERA
  // =====================================================

 useEffect(() => {
  function cerrarMenu(event) {
    const dentroDelMenuMovil =
      menuMovilRef.current?.contains(event.target);

    const dentroDelMenuPc =
      menuPcRef.current?.contains(event.target);

    if (!dentroDelMenuMovil && !dentroDelMenuPc) {
      setMenuUsuario(false);
    }
  }

  document.addEventListener("mousedown", cerrarMenu);

  return () => {
    document.removeEventListener("mousedown", cerrarMenu);
  };
}, []);

  // =====================================================
  // CERRAR SESIÓN
  // =====================================================

  async function cerrarSesion() {
    try {
      await signOut(auth);

      setMenuUsuario(false);

      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }

  // =====================================================
  // BUSCADOR
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
    carritoAbierto,
    abrirCarrito,
    cerrarCarrito,
    total,
  } = useCarrito();

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
  // NOMBRE DEL USUARIO
  // =====================================================

  const nombreCompleto =
    usuario?.displayName?.trim() ||
    usuario?.email?.split("@")[0] ||
    "Cliente";

  const nombreUsuario = nombreCompleto.split(/\s+/)[0];

  // =====================================================
  // TOTAL CARRITO
  // =====================================================

  const totalCarrito = Number(total || 0);

  return (
    <>
      <header className="bg-black text-white relative z-[10000] overflow-visible">

        {/* ==================================================
            CABECERA
        ================================================== */}

        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">

          {/* ==================================================
              VERSION MOVIL
          ================================================== */}

          <div className="md:hidden">

            {/* FILA SUPERIOR:
                LOGO + CARRITO
            */}

            <div className="h-[78px] flex items-center justify-between gap-3">

              {/* LOGO */}

              <Link
                href="/"
                className="flex-shrink-0"
              >
                <img
                  src="/logo.png"
                  alt="Brico Hogar"
                  className="
                    h-[62px]
                    w-auto
                    object-contain
                    cursor-pointer
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
                  gap-2
                  bg-yellow-400
                  text-black
                  rounded-full
                  px-4
                  py-2
                  flex-shrink-0
                  shadow-md
                  hover:bg-yellow-300
                  transition
                "
              >
                <FaShoppingCart className="text-[19px]" />

                <span className="text-[14px] font-bold whitespace-nowrap">
                  S/ {totalCarrito.toFixed(2)}
                </span>
              </button>

            </div>

            {/* ==================================================
                BUSCADOR MOVIL
            ================================================== */}

            <div className="pb-4 w-full">

              <SearchInput
                value={textoInput}
                onChange={setTextoInput}
                onSearch={buscarProducto}
              />

            </div>

            {/* ==================================================
                USUARIO MOVIL
            ================================================== */}

            <div
  ref={menuMovilRef}
  className="
    relative
    w-full
    pb-4
  "
>

              {usuario ? (

                <button
                  type="button"
                  onClick={() =>
                    setMenuUsuario((prev) => !prev)
                  }
                  className="
                    w-full
                    flex
                    items-center
                    text-left
                    gap-3
                    py-1
                    text-white
                    hover:text-yellow-400
                    transition
                  "
                >

                  {/* ICONO */}

                  <FaUser
                    className="
                      text-[27px]
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
                      min-w-0
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
                        whitespace-nowrap
                      "
                    >
                      {nombreUsuario}
                    </span>

                  </span>

                  {/* FLECHA */}

                  <FaChevronDown
                    className={`
                      text-[10px]
                      ml-1
                      transition-transform
                      ${
                        menuUsuario
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
                    py-1
                    hover:text-yellow-400
                    transition
                  "
                >

                  <FaUser className="text-[27px]" />

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

              {/* ==================================================
                  MENU DESPLEGABLE MOVIL
              ================================================== */}

              {usuario && menuUsuario && (

                <div
                  className="
                    absolute
                    left-0
                    right-0
                    top-full
                    mt-1
                    w-full
                    bg-white
                    text-gray-800
                    rounded-xl
                    shadow-2xl
                    border
                    border-gray-200
                    overflow-hidden
                    z-[999999]
                  "
                >

                  {/* MI CUENTA */}

                  <button
                    type="button"
                    onClick={() => {
                      setMenuUsuario(false);
                      router.push("/mi-cuenta");
                    }}
                    className="
                      w-full
                      flex
                      items-center
                      gap-4
                      px-5
                      py-4
                      text-left
                      hover:bg-gray-100
                      transition
                    "
                  >
                    <FaUser className="text-gray-600" />

                    <span>
                      Mi cuenta
                    </span>
                  </button>

                  {/* HISTORIAL */}

                  <button
                    type="button"
                    onClick={() => {
                      setMenuUsuario(false);
                      router.push("/historial-pedidos");
                    }}
                    className="
                      w-full
                      flex
                      items-center
                      gap-4
                      px-5
                      py-4
                      text-left
                      hover:bg-gray-100
                      transition
                      border-t
                      border-gray-100
                    "
                  >
                    <FaClipboardList className="text-gray-600" />

                    <span>
                      Historial de pedidos
                    </span>
                  </button>

                  {/* ARMAR PEDIDO */}

                  <button
                    type="button"
                    onClick={() => {
                      setMenuUsuario(false);
                      router.push("/armar-pedido");
                    }}
                    className="
                      w-full
                      flex
                      items-center
                      gap-4
                      px-5
                      py-4
                      text-left
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
                  </button>

                  {/* CERRAR SESIÓN */}

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
                      text-left
                      text-red-600
                      hover:bg-red-50
                      transition
                      border-t
                      border-gray-100
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


          {/* ==================================================
              VERSION PC / TABLET
          ================================================== */}

          <div
            className="
              hidden
              md:flex
              min-h-[120px]
              items-center
              gap-6
            "
          >

            {/* ==================================================
                LOGO
            ================================================== */}

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


            {/* ==================================================
                BUSCADOR
            ================================================== */}

            <div className="flex-1 min-w-0">

              <SearchInput
                value={textoInput}
                onChange={setTextoInput}
                onSearch={buscarProducto}
              />

            </div>


            {/* ==================================================
                USUARIO PC
            ================================================== */}

           <div
  ref={menuPcRef}
  className="
    relative
    flex-shrink-0
  "
>

              {usuario ? (

                <button
                  type="button"
                  onClick={() =>
                    setMenuUsuario((prev) => !prev)
                  }
                  className="
                    flex
                    items-center
                    gap-3
                    text-white
                    hover:text-yellow-400
                    transition
                    min-w-[145px]
                    relative
                  "
                >

                  {/* ICONO A LA IZQUIERDA */}

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
                        menuUsuario
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


              {/* ==================================================
                  MENU DESPLEGABLE PC
              ================================================== */}

              {usuario && menuUsuario && (

                <div
                  className="
                    absolute
                    right-0
                    top-full
                    mt-3
                    w-[260px]
                    bg-white
                    text-gray-800
                    rounded-xl
                    shadow-2xl
                    border
                    border-gray-200
                    overflow-hidden
                    z-[999999]
                  "
                >

                  {/* MI CUENTA */}

                  <button
                    type="button"
                    onClick={() => {
                      setMenuUsuario(false);
                      router.push("/mi-cuenta");
                    }}
                    className="
                      w-full
                      flex
                      items-center
                      gap-4
                      px-5
                      py-4
                      text-left
                      hover:bg-gray-100
                      transition
                    "
                  >

                    <FaUser className="text-gray-600" />

                    <span>
                      Mi cuenta
                    </span>

                  </button>


                  {/* HISTORIAL */}

                  <button
                    type="button"
                    onClick={() => {
                      setMenuUsuario(false);
                      router.push("/historial-pedidos");
                    }}
                    className="
                      w-full
                      flex
                      items-center
                      gap-4
                      px-5
                      py-4
                      text-left
                      hover:bg-gray-100
                      transition
                      border-t
                      border-gray-100
                    "
                  >

                    <FaClipboardList className="text-gray-600" />

                    <span>
                      Historial de pedidos
                    </span>

                  </button>


                  {/* ARMAR PEDIDO */}

                  <button
                    type="button"
                    onClick={() => {
                      setMenuUsuario(false);
                      router.push("/armar-pedido");
                    }}
                    className="
                      w-full
                      flex
                      items-center
                      gap-4
                      px-5
                      py-4
                      text-left
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

                  </button>


                  {/* CERRAR SESIÓN */}

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
                      text-left
                      text-red-600
                      hover:bg-red-50
                      transition
                      border-t
                      border-gray-100
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


            {/* ==================================================
                CARRITO PC
            ================================================== */}

            <button
              type="button"
              onClick={abrirCarrito}
              className="
                flex
                items-center
                gap-2
                text-white
                hover:text-yellow-400
                transition
                relative
                flex-shrink-0
              "
            >

              <FaShoppingCart
                className="
                  text-[30px]
                "
              />

              <span
                className="
                  text-[15px]
                  font-semibold
                  whitespace-nowrap
                "
              >
                S/ {totalCarrito.toFixed(2)}
              </span>

            </button>

          </div>

        </div>

      </header>


      {/* ==================================================
          CARRITO DRAWER
      ================================================== */}

      <CarritoDrawer
        abierto={carritoAbierto}
        cerrar={cerrarCarrito}
      />

    </>
  );
}