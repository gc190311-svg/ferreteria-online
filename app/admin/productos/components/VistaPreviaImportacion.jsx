export default function VistaPreviaImportacion({ productos }) {

    if (!productos.length) return null;

    return (

        <div className="mt-10">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">

                    Vista previa

                </h2>

                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-semibold">

                    {productos.length} productos encontrados

                </span>

            </div>

            <div className="overflow-x-auto rounded-2xl border">

                <table className="min-w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-3">Estado</th>
                            <th className="p-3 text-left">Fila</th>
                            <th className="p-3 text-left">SKU</th>
                            <th className="p-3 text-left">Producto</th>
                            <th className="p-3 text-left">Marca</th>
                            <th className="p-3 text-left">Categoría</th>
                            <th className="p-3 text-right">Precio</th>
                            <th className="p-3 text-right">Stock</th>
                            <th className="p-3 text-left">Errores</th>

                        </tr>

                    </thead>

                    <tbody>

                        {productos.map((p, index) => (

                            <tr
                                key={index}
                                className="border-t hover:bg-gray-50"
                            >

                                <td className="p-3 text-center">

                                    {p.valido ? "🟢" : "🔴"}

                                </td>

                                <td className="p-3">

                                    {p.fila}

                                </td>

                                <td className="p-3">

                                    {p.sku || "-"}

                                </td>

                                <td className="p-3">

                                    {p.nombre}

                                </td>

                                <td className="p-3">

                                    {p.marca}

                                </td>

                                <td className="p-3">

                                    {p.categoria}

                                </td>

                                <td className="p-3 text-right">

                                    S/. {p.precio}

                                </td>

                                <td className="p-3 text-right">

                                    {p.stock}

                                </td>

                                <td className="p-3 text-red-600">

                                    {p.errores.length
                                        ? p.errores.join(", ")
                                        : "-"}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}