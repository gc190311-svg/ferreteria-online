"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase";

export default function RegistroPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const destino =
    searchParams.get("redirect") || "/productos";

  const [nombre, setNombre] = useState("");
  const [celular, setCelular] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] =
    useState("");

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function registrar(e) {
    e.preventDefault();

    setError("");

    if (!nombre.trim()) {
      setError("Ingresa tu nombre.");
      return;
    }

    if (!/^\d{9}$/.test(celular)) {
      setError(
        "El celular debe tener exactamente 9 dígitos."
      );
      return;
    }

    if (!correo.trim()) {
      setError("Ingresa tu correo electrónico.");
      return;
    }

    if (password.length < 6) {
      setError(
        "La contraseña debe tener al menos 6 caracteres."
      );
      return;
    }

    if (password !== confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setCargando(true);

    try {
      const resultado =
        await createUserWithEmailAndPassword(
          auth,
          correo.trim(),
          password
        );

      const usuario = resultado.user;

      await updateProfile(usuario, {
        displayName: nombre.trim(),
      });

      await setDoc(
        doc(db, "clientes", usuario.uid),
        {
          uid: usuario.uid,
          nombre: nombre.trim(),
          celular: celular.trim(),
          correo: correo.trim(),
          fechaRegistro: serverTimestamp(),
          activo: true,
        },
        {
          merge: true,
        }
      );

      router.replace(destino);

    } catch (error) {
      console.error(error);

      if (
        error.code ===
        "auth/email-already-in-use"
      ) {
        setError(
          "Este correo ya está registrado. Inicia sesión."
        );
      } else if (
        error.code ===
        "auth/invalid-email"
      ) {
        setError("El correo electrónico no es válido.");
      } else if (
        error.code ===
        "auth/weak-password"
      ) {
        setError("La contraseña es demasiado débil.");
      } else {
        setError(
          "No fue posible crear la cuenta. Intenta nuevamente."
        );
      }
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <div className="text-center mb-8">

            <img
              src="/logo.png"
              alt="Brico Hogar"
              className="h-20 mx-auto mb-5"
            />

            <h1 className="text-3xl font-bold text-gray-900">
              Crear cuenta
            </h1>

            <p className="text-gray-500 mt-2">
              Regístrate para acceder a los precios
              y productos de Brico Hogar.
            </p>

          </div>

          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
              {error}
            </div>
          )}

          <form
            onSubmit={registrar}
            className="space-y-5"
          >

            <div>
              <label className="block font-semibold mb-2">
                Nombre completo
              </label>

              <input
                type="text"
                value={nombre}
                onChange={(e) =>
                  setNombre(e.target.value)
                }
                placeholder="Ingresa tu nombre"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Celular
              </label>

              <input
                type="tel"
                inputMode="numeric"
                maxLength={9}
                value={celular}
                onChange={(e) =>
                  setCelular(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                placeholder="987654321"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Correo electrónico
              </label>

              <input
                type="email"
                value={correo}
                onChange={(e) =>
                  setCorreo(e.target.value)
                }
                placeholder="correo@ejemplo.com"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Contraseña
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Mínimo 6 caracteres"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Confirmar contraseña
              </label>

              <input
                type="password"
                value={confirmarPassword}
                onChange={(e) =>
                  setConfirmarPassword(
                    e.target.value
                  )
                }
                placeholder="Repite tu contraseña"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-yellow-500"
              />
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="
                w-full
                bg-yellow-500
                hover:bg-yellow-400
                disabled:bg-gray-300
                text-black
                font-bold
                py-4
                rounded-xl
                transition
              "
            >
              {cargando
                ? "Creando cuenta..."
                : "Crear mi cuenta"}
            </button>

          </form>

          <div className="text-center mt-6">

            <p className="text-gray-500">
              ¿Ya tienes una cuenta?
            </p>

            <Link
              href={`/login?redirect=${encodeURIComponent(
                destino
              )}`}
              className="text-yellow-600 font-bold hover:underline"
            >
              Iniciar sesión
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}