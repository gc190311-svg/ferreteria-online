"use client";

import { useEffect, useState } from "react";

import {
    obtenerReclamos,
    cambiarEstado
} from "./services/ReclamosAdminService";




export default function ReclamosPage() {

    const [reclamos, setReclamos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [detalle, setDetalle] = useState(null);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        cargarReclamos();
    }, []);

    async function cargarReclamos() {

        try {

            const datos = await obtenerReclamos();
            setReclamos(datos);

        } finally {

            setCargando(false);

        }

    }

    async function actualizarEstado(id, estado) {

        await cambiarEstado(id, estado);

        cargarReclamos();

    }

    if (cargando) {

        return (

            <div className="p-10">

                Cargando reclamos...


            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">

                Libro de Reclamaciones

            </h1>

<div className="mb-6">

    <input
        type="text"
        placeholder="Buscar por nombre, documento, pedido o correo..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full border rounded-lg px-4 py-3"
    />

</div>


            <table className="w-full border">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="border p-3">
                            Fecha
                        </th>

                        <th className="border p-3">
                            Cliente
                        </th>

                        <th className="border p-3">
                            Documento
                        </th>

                        <th className="border p-3">
                            Tipo
                        </th>

                        <th className="border p-3">
                            Estado
                        </th>

                        <th className="border p-3">
                            Acción
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {reclamos
.filter((item) => {

    const texto = busqueda.toLowerCase();

    return (

        item.nombre?.toLowerCase().includes(texto) ||

        item.apellido?.toLowerCase().includes(texto) ||

        item.documento?.includes(texto) ||

        item.pedido?.toLowerCase().includes(texto) ||

        item.correo?.toLowerCase().includes(texto)

    );

})
.map((item) => (

                        <tr key={item.id}>

                            <td className="border p-3">

                                {item.fecha?.toDate().toLocaleDateString()}

                            </td>

                            <td className="border p-3">

                                {item.nombre} {item.apellido}

                            </td>

                            <td className="border p-3">

                                {item.documento}

                            </td>

                            <td className="border p-3">

                                {item.tipoReclamo}

                            </td>

                            <td className="border p-3">

                                <select
                                    value={item.estado}
                                    onChange={(e) =>
                                        actualizarEstado(
                                            item.id,
                                            e.target.value
                                        )
                                    }
                                    className="border rounded px-2 py-1"
                                >

                                    <option>
                                        Pendiente
                                    </option>

                                    <option>
                                        En proceso
                                    </option>

                                    <option>
                                        Atendido
                                    </option>

                                </select>

                            </td>

                            <td className="border p-3 text-center">

                                <button
    onClick={() => setDetalle(item)}
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
>
    Ver detalle
</button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

{detalle && (

<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

    <div className="bg-white rounded-xl w-full max-w-3xl p-8 max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-6">

            <h2 className="text-3xl font-bold">

                Detalle del Reclamo

            </h2>

            <button
                onClick={() => setDetalle(null)}
                className="text-2xl font-bold hover:text-red-600"
            >
                ✕
            </button>

        </div>

        <div className="grid grid-cols-2 gap-6">

            <div>
                <strong>Nombre</strong>
                <p>{detalle.nombre}</p>
            </div>

            <div>
                <strong>Apellido</strong>
                <p>{detalle.apellido}</p>
            </div>

            <div>
                <strong>Documento</strong>
                <p>{detalle.documento}</p>
            </div>

            <div>
                <strong>Tipo Documento</strong>
                <p>{detalle.tipoDocumento}</p>
            </div>

            <div>
                <strong>Correo</strong>
                <p>{detalle.correo}</p>
            </div>

            <div>
                <strong>Teléfono</strong>
                <p>{detalle.telefono}</p>
            </div>

            <div className="col-span-2">
                <strong>Dirección</strong>
                <p>{detalle.direccion}</p>
            </div>

            <div>
                <strong>Ciudad</strong>
                <p>{detalle.ciudad}</p>
            </div>

            <div>
                <strong>Departamento</strong>
                <p>{detalle.departamento}</p>
            </div>

            <div>
                <strong>País</strong>
                <p>{detalle.pais}</p>
            </div>

            <div>
                <strong>Pedido</strong>
                <p>{detalle.pedido}</p>
            </div>

            <div>
                <strong>Tipo Reclamo</strong>
                <p>{detalle.tipoReclamo}</p>
            </div>

            <div>
                <strong>Estado</strong>
                <p>{detalle.estado}</p>
            </div>

            <div className="col-span-2">

                <strong>Descripción</strong>

                <div className="border rounded-lg p-4 mt-2 bg-gray-50 whitespace-pre-wrap">

                    {detalle.descripcion}

                </div>

            </div>

        </div>

        <div className="flex justify-end mt-8">

            <button
                onClick={() => setDetalle(null)}
                className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-lg"
            >
                Cerrar
            </button>

        </div>

    </div>

</div>

)}

        </div>

    );

}

