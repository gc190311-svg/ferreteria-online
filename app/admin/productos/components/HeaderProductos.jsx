"use client";

import Link from "next/link";
import {
    FaPlus,
    FaFileExcel,
    FaDownload,
    FaBoxOpen
} from "react-icons/fa";

export default function HeaderProductos() {

    return (

        <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                <div>

                    <div className="flex items-center gap-3">

                        <div className="bg-yellow-400 p-3 rounded-xl">

                            <FaBoxOpen
                                className="text-2xl text-white"
                            />

                        </div>

                        <div>

                            <h1 className="text-3xl font-bold">

                                Productos

                            </h1>

                            <p className="text-gray-500">

                                Administra el catálogo de Brico Hogar Perú

                            </p>

                        </div>

                    </div>

                </div>

                <div className="flex flex-wrap gap-3">

                    <Link
                        href="/admin/productos/nuevo"
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2"
                    >

                        <FaPlus />

                        Nuevo Producto

                    </Link>

                    <Link
                        href="/admin/productos/importar"
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2"
                    >

                        <FaFileExcel />

                        Importar

                    </Link>

                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2"
                    >

                        <FaDownload />

                        Exportar

                    </button>

                </div>

            </div>

        </div>

    );

}