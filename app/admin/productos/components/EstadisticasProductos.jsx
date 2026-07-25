"use client";

import {
    FaBox,
    FaExclamationTriangle,
    FaTags,
    FaWarehouse
} from "react-icons/fa";

export default function EstadisticasProductos({ productos }) {

    const total = productos.length;

    const stockBajo = productos.filter(
        p => Number(p.stock) <= 5
    ).length;

    const ofertas = productos.filter(
        p => p.oferta
    ).length;

    const stockTotal = productos.reduce(
        (acum, p) => acum + Number(p.stock || 0),
        0
    );

    const tarjetas = [

        {
            titulo: "Productos",
            valor: total,
            icono: <FaBox />,
            color: "bg-blue-500"
        },

        {
            titulo: "Stock Total",
            valor: stockTotal,
            icono: <FaWarehouse />,
            color: "bg-green-600"
        },

        {
            titulo: "Stock Bajo",
            valor: stockBajo,
            icono: <FaExclamationTriangle />,
            color: "bg-red-500"
        },

        {
            titulo: "En Oferta",
            valor: ofertas,
            icono: <FaTags />,
            color: "bg-yellow-500"
        }

    ];

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

            {

                tarjetas.map((item, index)=>(

                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow p-5"
                    >

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-gray-500">

                                    {item.titulo}

                                </p>

                                <h2 className="text-3xl font-bold mt-2">

                                    {item.valor}

                                </h2>

                            </div>

                            <div
                                className={`${item.color} text-white p-4 rounded-xl text-2xl`}
                            >

                                {item.icono}

                            </div>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}