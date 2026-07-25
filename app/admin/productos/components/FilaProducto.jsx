"use client";

import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function FilaProducto({
    producto,
    eliminar,
}) {
    const imagen =
        producto.imagenes?.[0] ||
        producto.imagen ||
        "/sin-imagen.png";

    return (
        <tr className="border-b hover:bg-gray-50 transition">

            <td className="p-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">

                    <Image
                        src={imagen}
                        alt={producto.nombre}
                        fill
                        className="object-contain"
                    />

                </div>
            </td>

            <td className="p-4">

                <div className="font-semibold">

                    {producto.nombre}

                </div>

                <div className="text-sm text-gray-500">

                    {producto.marca || "Sin marca"}

                </div>

                <div className="text-xs text-gray-400 mt-1">

                    {producto.categoria || "Sin categoría"}

                </div>

            </td>

            <td className="p-4 text-center">

                {producto.oferta ? (

                    <div>

                        <div className="text-gray-400 line-through text-sm">

                            S/. {producto.precio}

                        </div>

                        <div className="text-red-600 font-bold">

                            S/. {producto.oferta}

                        </div>

                    </div>

                ) : (

                    <span className="font-bold text-yellow-600">

                        S/. {producto.precio}

                    </span>

                )}

            </td>

            <td className="p-4 text-center">

                <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        producto.stock <= 5
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                    }`}
                >
                    {producto.stock}
                </span>

            </td>

            <td className="p-4">

                <div className="flex justify-center gap-2">

                    <Link
                        href={`/admin/productos/editar/${producto.id}`}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-lg"
                        title="Editar"
                    >
                        <FaEdit />
                    </Link>

                    <button
                        onClick={() => eliminar(producto.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
                        title="Eliminar"
                    >
                        <FaTrash />
                    </button>

                </div>

            </td>

        </tr>
    );
}