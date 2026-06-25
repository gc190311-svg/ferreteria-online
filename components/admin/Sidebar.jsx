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

        <aside className="w-72 bg-zinc-900 text-white min-h-screen">

            <div className="text-center py-8">

                <img
                    src="/logo.png"
                    className="h-20 mx-auto"
                />

                <h2 className="mt-4 font-bold text-xl">
                    Brico Hogar
                </h2>

            </div>

            <nav className="mt-8">

                {menu.map((item) => {

                    const Icono = item.icono;

                    return (

                        <Link
                            key={item.ruta}
                            href={item.ruta}
                        >

                            <div
                                className={`flex items-center gap-4 px-8 py-4 transition hover:bg-yellow-500 hover:text-black ${
                                    pathname === item.ruta
                                        ? "bg-yellow-500 text-black"
                                        : ""
                                }`}
                            >

                                <Icono />

                                {item.nombre}

                            </div>

                        </Link>

                    );

                })}

                <hr className="my-6 border-zinc-700" />

                <Link href="/login">

                    <div className="flex items-center gap-4 px-8 py-4 hover:bg-red-500 transition">

                        <FaSignOutAlt />

                        Salir

                    </div>

                </Link>

            </nav>

        </aside>

    );

}
