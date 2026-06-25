"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FaHome,
  FaBoxOpen,
  FaClipboardList,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaPlus
} from "react-icons/fa";

const menu = [
  {
    nombre: "Dashboard",
    ruta: "/admin",
    icono: FaHome,
  },
  {
    nombre: "Productos",
    ruta: "/admin/productos",
    icono: FaBoxOpen,
  },
  {
    nombre: "Pedidos",
    ruta: "/admin/pedidos",
    icono: FaClipboardList,
  },
  {
    nombre: "Clientes",
    ruta: "/admin/clientes",
    icono: FaUsers,
  },
  {
    nombre: "Reportes",
    ruta: "/admin/reportes",
    icono: FaChartBar,
  },
  {
    nombre: "Configuración",
    ruta: "/admin/configuracion",
    icono: FaCog,
  },
];

export default function Sidebar() {

  const pathname = usePathname();

  return (

    <aside className="w-72 bg-zinc-900 text-white min-h-screen flex flex-col">

      {/* LOGO */}

      <div className="text-center py-8 border-b border-zinc-700">

        <img
          src="/logo.png"
          alt="Brico Hogar"
          className="h-20 mx-auto"
        />

        <h2 className="mt-4 text-2xl font-bold">
          Brico Hogar
        </h2>

        <p className="text-zinc-400 text-sm">
          Panel Administrativo
        </p>

      </div>

      {/* BOTÓN NUEVO PRODUCTO */}

      <div className="p-5">

        <Link
          href="/admin"
          className="flex items-center justify-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl transition"
        >

          <FaPlus />

          Nuevo Producto

        </Link>

      </div>

      {/* MENÚ */}

      <nav className="flex-1">

        {menu.map((item) => {

          const Icono = item.icono;

          return (

            <Link
              key={item.ruta}
              href={item.ruta}
            >

              <div
                className={`flex items-center gap-4 px-8 py-4 transition

                ${
                  pathname === item.ruta
                    ? "bg-yellow-500 text-black font-bold"
                    : "hover:bg-zinc-800"
                }

                `}
              >

                <Icono className="text-lg" />

                {item.nombre}

              </div>

            </Link>

          );

        })}

      </nav>

      {/* PIE */}

      <div className="border-t border-zinc-700">

        <Link href="/">

          <div className="flex items-center gap-4 px-8 py-4 hover:bg-zinc-800">

            <FaBell />

            Ir a la tienda

          </div>

        </Link>

        <Link href="/login">

          <div className="flex items-center gap-4 px-8 py-4 hover:bg-red-600">

            <FaSignOutAlt />

            Cerrar sesión

          </div>

        </Link>

      </div>

    </aside>

  );

}
