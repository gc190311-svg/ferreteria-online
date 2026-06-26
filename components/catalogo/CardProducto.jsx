"use client";

import Link from "next/link";
import {
    FaShoppingCart,
    FaEye
} from "react-icons/fa";

export default function CardProducto({ producto }) {

    return (

        <div
            className="
            bg-white
            rounded-3xl
            shadow-md
            hover:shadow-2xl
            transition
            overflow-hidden
            group
            "
        >

            <div className="relative">

                <img
                    src={
                        producto.imagenes?.[0] ||
                        producto.imagen ||
                        "/sin-imagen.png"
                    }
                    alt={producto.nombre}
                    onError={(e)=>{
                        e.target.src="/sin-imagen.png";
                    }}
                    className="
                    w-full
                    h-64
                    object-contain
                    bg-white
                    p-5
                    "
                />

                {producto.destacado && (

                    <span
                        className="
                        absolute
                        top-4
                        left-4
                        bg-red-600
                        text-white
                        text-xs
                        px-3
                        py-1
                        rounded-full
                        "
                    >
                        Destacado
                    </span>

                )}

            </div>

            <div className="p-5">

                <p className="text-gray-500 text-sm">

                    {producto.marca}

                </p>

                <h3
                    className="
                    font-bold
                    text-lg
                    mt-2
                    h-16
                    overflow-hidden
                    "
                >
                    {producto.nombre}
                </h3>

                <div className="mt-4">

                    {producto.precioAnterior > 0 && (

                        <p className="line-through text-gray-400">

                            S/ {producto.precioAnterior}

                        </p>

                    )}

                    <p
                        className="
                        text-3xl
                        text-green-600
                        font-extrabold
                        "
                    >
                        S/ {producto.precio}
                    </p>

                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">

                    <Link
                        href={`/producto/${producto.id}`}
                        className="
                        bg-gray-100
                        hover:bg-gray-200
                        rounded-xl
                        py-3
                        flex
                        justify-center
                        items-center
                        gap-2
                        "
                    >

                        <FaEye />

                        Ver

                    </Link>

                    <button
                        className="
                        bg-yellow-500
                        hover:bg-yellow-400
                        rounded-xl
                        py-3
                        font-bold
                        flex
                        justify-center
                        items-center
                        gap-2
                        "
                    >

                        <FaShoppingCart />

                        Comprar

                    </button>

                </div>

            </div>

        </div>

    );

}
