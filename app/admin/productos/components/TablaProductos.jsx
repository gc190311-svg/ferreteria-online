"use client";

import FilaProducto from "./FilaProducto";

export default function TablaProductos({
    productos,
    eliminar,
}) {
    return (
        <div className="bg-white rounded-2xl shadow overflow-hidden">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-gray-100 sticky top-0 z-10">

                        <tr>

                            <th className="p-4 text-left">Imagen</th>

                            <th className="p-4 text-left">Producto</th>

                            <th className="p-4 text-center">Precio</th>

                            <th className="p-4 text-center">Stock</th>

                            <th className="p-4 text-center">Acciones</th>

                        </tr>

                    </thead>

                    <tbody>

                        {productos.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={5}
                                    className="py-16 text-center text-gray-500"
                                >

                                    <div className="space-y-2">

                                        <p className="text-lg font-semibold">

                                            No hay productos registrados

                                        </p>

                                        <p>

                                            Agrega un producto para comenzar.

                                        </p>

                                    </div>

                                </td>

                            </tr>

                        ) : (

                            productos.map((producto) => (

                                <FilaProducto
                                    key={producto.id}
                                    producto={producto}
                                    eliminar={eliminar}
                                />

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}