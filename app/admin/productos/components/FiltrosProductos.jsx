"use client";

import {
    FaSearch,
    FaThLarge,
    FaTable
} from "react-icons/fa";

export default function FiltrosProductos({

    busqueda,
    setBusqueda,

    vista,
    setVista

}) {

    return (

        <div className="bg-white rounded-2xl shadow p-5 mb-8">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                {/* BUSCADOR */}

                <div className="lg:col-span-6 relative">

                    <FaSearch
                        className="absolute left-4 top-4 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        value={busqueda}
                        onChange={(e)=>setBusqueda(e.target.value)}
                        className="w-full border rounded-xl pl-12 pr-4 py-3"
                    />

                </div>

                {/* CATEGORIA */}

                <div className="lg:col-span-2">

                    <select
                        className="w-full border rounded-xl p-3"
                    >

                        <option>

                            Todas las categorías

                        </option>

                    </select>

                </div>

                {/* MARCA */}

                <div className="lg:col-span-2">

                    <select
                        className="w-full border rounded-xl p-3"
                    >

                        <option>

                            Todas las marcas

                        </option>

                    </select>

                </div>

                {/* VISTA */}

                <div className="lg:col-span-2">

                    <div className="flex border rounded-xl overflow-hidden">

                        <button

                            onClick={()=>setVista("lista")}

                            className={`flex-1 p-3 flex justify-center ${
                                vista==="lista"
                                    ? "bg-yellow-400"
                                    : "bg-white"
                            }`}

                        >

                            <FaThLarge />

                        </button>

                        <button

                            onClick={()=>setVista("tabla")}

                            className={`flex-1 p-3 flex justify-center ${
                                vista==="tabla"
                                    ? "bg-yellow-400"
                                    : "bg-white"
                            }`}

                        >

                            <FaTable />

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}