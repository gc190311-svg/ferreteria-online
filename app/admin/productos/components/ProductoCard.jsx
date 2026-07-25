"use client";

import Image from "next/image";
import Link from "next/link";
import {
    FaEdit,
    FaTrash,
    FaBoxes,
    FaTag
} from "react-icons/fa";

export default function ProductoCard({

    producto,
    eliminar

}) {

    const imagen =
        producto.imagenes?.[0] ||
        producto.imagen ||
        "/sin-imagen.png";

    return (

        <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">

            <div className="relative h-56 bg-gray-100">

                <Image
                    src={imagen}
                    alt={producto.nombre}
                    fill
                    className="object-contain p-4"
                />

                {producto.oferta && (

                    <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full">

                        OFERTA

                    </span>

                )}

            </div>

            <div className="p-5">

                <h2 className="font-bold text-lg line-clamp-2">

                    {producto.nombre}

                </h2>

                <p className="text-sm text-gray-500 mt-1">

                    {producto.marca || "Sin marca"}

                </p>

                <div className="mt-4 space-y-2">

                    <div className="flex items-center justify-between">

                        <span className="flex items-center gap-2 text-gray-500">

                            <FaTag />

                            Categoría

                        </span>

                        <span className="font-medium">

                            {producto.categoria}

                        </span>

                    </div>

                    <div className="flex items-center justify-between">

                        <span className="flex items-center gap-2 text-gray-500">

                            <FaBoxes />

                            Stock

                        </span>

                        <span
                            className={`font-bold ${
                                producto.stock <= 5
                                    ? "text-red-600"
                                    : "text-green-600"
                            }`}
                        >

                            {producto.stock}

                        </span>

                    </div>

                </div>

                <div className="mt-5">

                    {

                        producto.oferta ? (

                            <>

                                <p className="text-gray-400 line-through">

                                    S/. {producto.precio}

                                </p>

                                <p className="text-2xl font-bold text-red-600">

                                    S/. {producto.oferta}

                                </p>

                            </>

                        ) : (

                            <p className="text-2xl font-bold text-yellow-600">

                                S/. {producto.precio}

                            </p>

                        )

                    }

                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">

                    <Link
                        href={`/admin/productos/editar/${producto.id}`}
                        className="bg-yellow-400 hover:bg-yellow-500 text-center py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                    >

                        <FaEdit />

                        Editar

                    </Link>

                    <button

                        onClick={() => eliminar(producto.id)}

                        className="bg-red-600 hover:bg-red-700 text-white rounded-xl flex items-center justify-center gap-2"

                    >

                        <FaTrash />

                        Eliminar

                    </button>

                </div>

            </div>

        </div>

    );

}