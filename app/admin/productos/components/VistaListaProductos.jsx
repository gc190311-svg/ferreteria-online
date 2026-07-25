"use client";

import ProductoCard from "./ProductoCard";

export default function VistaListaProductos({

    productos,
    eliminar

}) {

    if (productos.length === 0) {

        return (

            <div className="bg-white rounded-2xl shadow p-16 text-center">

                <h2 className="text-2xl font-bold">

                    No existen productos

                </h2>

                <p className="text-gray-500 mt-3">

                    Agrega tu primer producto.

                </p>

            </div>

        );

    }

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">

            {

                productos.map((producto)=>(

                    <ProductoCard

                        key={producto.id}

                        producto={producto}
                        eliminar={eliminar}

                    />

                ))

            }

        </div>

    );

}