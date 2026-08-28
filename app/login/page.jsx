"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase";

// =====================================================
// COMPONENTE PRINCIPAL
// =====================================================

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
          <div className="text-center">
            <div className="text-gray-600 font-semibold">
              Cargando...
            </div>
          </div>
        </main>
      }
    >
      <Login />
    </Suspense>
  );
}

// =====================================================
// LOGIN
// =====================================================

function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Si el usuario llegó desde un producto,
  // después de iniciar sesión volverá a ese producto.
  const destino = searchParams.get("redirect") || "/productos";

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // INICIAR SESIÓN CON CORREO Y CONTRASEÑA
  // ==========================================

  const loginCorreo = async (e) => {
    e.preventDefault();

    setError("");

    if (!correo.trim()) {
      setError("Ingresa tu correo electrónico.");
      return;
    }

    if (!password) {
      setError("Ingresa tu contraseña.");
      return;
    }

    setCargando(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        correo.trim(),
        password
      );

      // Volver al lugar de donde vino el cliente
      router.replace(destino);
    } catch (error) {
      console.error(error);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setError(
          "El correo o la contraseña son incorrectos."
        );
      } else if (
        error.code === "auth/invalid-email"
      ) {
        setError(
          "El correo electrónico no es válido."
        );
      } else if (
        error.code === "auth/too-many-requests"
      ) {
        setError(
          "Demasiados intentos. Intenta nuevamente más tarde."
        );
      } else {
        setError(
          "No fue posible iniciar sesión. Intenta nuevamente."
        );
      }
    } finally {
      setCargando(false);
    }
  };

  // ==========================================
  // INICIAR SESIÓN CON GOOGLE
  // ==========================================

  const loginGoogle = async () => {
    setError("");
    setCargando(true);

    try {
      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider);

      // Volver al lugar de donde vino el cliente
      router.replace(destino);
    } catch (error) {
      console.error(error);

      if (
        error.code ===
        "auth/popup-closed-by-user"
      ) {
        setError(
          "Cerraste la ventana de inicio de sesión."
        );
      } else {
        setError(
          "No fue posible iniciar sesión con Google."
        );
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-md">

        {/* TARJETA */}
        <div className="bg-white rounded-2xl shadow-xl p-8">

          {/* LOGO */}
          <div className="flex justify-center mb-6">
            <img
              src="/logo.png"
              alt="Brico Hogar"
              className="h-24 w-auto"
            />
          </div>

          {/* TÍTULO */}
          <h1 className="text-3xl font-bold text-center text-gray-900">
            Iniciar sesión
          </h1>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Ingresa a tu cuenta de Brico Hogar
          </p>

          {/* ERROR */}
          {error && (
            <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* FORMULARIO */}
          <form
            onSubmit={loginCorreo}
            className="space-y-5"
          >

            {/* CORREO */}
            <div>
              <label
                htmlFor="correo"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Correo electrónico
              </label>

              <input
                id="correo"
                type="email"
                value={correo}
                onChange={(e) =>
                  setCorreo(e.target.value)
                }
                placeholder="ejemplo@correo.com"
                autoComplete="email"
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:border-yellow-500
                  focus:ring-2
                  focus:ring-yellow-200
                  transition
                "
              />
            </div>

            {/* CONTRASEÑA */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Contraseña
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Ingresa tu contraseña"
                autoComplete="current-password"
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:border-yellow-500
                  focus:ring-2
                  focus:ring-yellow-200
                  transition
                "
              />
            </div>

            {/* BOTÓN INICIAR SESIÓN */}
            <button
              type="submit"
              disabled={cargando}
              className="
                w-full
                bg-yellow-500
                hover:bg-yellow-400
                disabled:bg-gray-300
                disabled:cursor-not-allowed
                text-black
                font-bold
                py-3
                rounded-xl
                transition
                shadow-md
              "
            >
              {cargando
                ? "Ingresando..."
                : "Iniciar sesión"}
            </button>

          </form>

          {/* SEPARADOR */}
          <div className="flex items-center gap-4 my-7">

            <div className="flex-1 h-px bg-gray-200"></div>

            <span className="text-sm text-gray-400">
              o
            </span>

            <div className="flex-1 h-px bg-gray-200"></div>

          </div>

          {/* GOOGLE */}
          <button
            type="button"
            onClick={loginGoogle}
            disabled={cargando}
            className="
              w-full
              border
              border-gray-300
              bg-white
              hover:bg-gray-50
              disabled:bg-gray-100
              disabled:cursor-not-allowed
              text-gray-800
              font-semibold
              py-3
              rounded-xl
              transition
              flex
              items-center
              justify-center
              gap-3
            "
          >

            {/* ICONO GOOGLE */}
            <span className="text-lg font-bold">
              G
            </span>

            {cargando
              ? "Procesando..."
              : "Ingresar con Google"}

          </button>

          {/* REGISTRO */}
          <div className="text-center mt-7">

            <p className="text-gray-500 text-sm">
              ¿No tienes una cuenta?
            </p>

            <Link
              href={`/registro?redirect=${encodeURIComponent(
                destino
              )}`}
              className="
                inline-block
                mt-2
                text-yellow-600
                hover:text-yellow-700
                font-bold
                hover:underline
              "
            >
              Regístrate
            </Link>

          </div>

          {/* VOLVER */}
          <div className="text-center mt-6">

            <Link
              href="/productos"
              className="
                text-sm
                text-gray-500
                hover:text-gray-800
              "
            >
              ← Volver a productos
            </Link>

          </div>

        </div>

        {/* SEGURIDAD */}
        <p className="text-center text-xs text-gray-400 mt-5">
          🔒 Tu información está protegida
        </p>

      </div>

    </main>
  );
}