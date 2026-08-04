"use client";

import { useEffect, useState } from "react";
import {
    obtenerCategorias,
    eliminarCategoria,
    crearCategoria,
    actualizarCategoria
} from "./services/CategoriasAdminService";

export default function CategoriasPage() {

    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre: "",
    slug: "",
    orden: "",
    activo: true,
});

    useEffect(() => {
        cargarCategorias();
    }, []);

    async function cargarCategorias() {

        try {

            const datos = await obtenerCategorias();
            setCategorias(datos);

        } catch (error) {

            console.error(error);

        } finally {

            setCargando(false);

        }

    }

    async function eliminar(id) {

    const confirmar = confirm(
        "¿Está seguro de eliminar esta categoría?"
    );

    if (!confirmar) return;

    try {

        await eliminarCategoria(id);

        cargarCategorias();

    } catch (error) {

        console.error(error);

        alert("No fue posible eliminar la categoría.");

    }

}

function generarSlug(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
}

async function guardarCategoria() {

    try {

        const datos = {
            ...nuevaCategoria,
            slug:
                nuevaCategoria.slug.trim() ||
                generarSlug(nuevaCategoria.nombre),
        };

        if (modoEdicion) {

    await actualizarCategoria(
        categoriaEditando.id,
        datos
    );

} else {

    await crearCategoria(datos);

}

        setMostrarFormulario(false);
        setModoEdicion(false);
        setCategoriaEditando(null);

        setNuevaCategoria({
    nombre: "",
    slug: "",
    orden: categorias.length + 1,
    activo: true,
});

await cargarCategorias();

    } catch (error) {

        console.error(error);

        alert("No fue posible guardar la categoría.");

    }

}

const [modoEdicion, setModoEdicion] = useState(false);

const [categoriaEditando, setCategoriaEditando] = useState(null);

function editarCategoria(categoria) {

    setModoEdicion(true);

    setCategoriaEditando(categoria);

    setNuevaCategoria({
        nombre: categoria.nombre,
        slug: categoria.slug,
        orden: categoria.orden,
        activo: categoria.activo
    });

    setMostrarFormulario(true);

}

    return (

        <div className="max-w-7xl mx-auto p-8">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-3xl font-bold">
                    Administrar Categorías
                </h1>

                <button
                    onClick={() => setMostrarFormulario(true)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded-lg font-bold"
                >
                    + Nueva categoría
                </button>

            </div>

            {cargando ? (

                <p>Cargando categorías...</p>

            ) : (

                <table className="w-full border">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="border p-3 text-left">
                                Orden
                            </th>

                            <th className="border p-3 text-left">
                                Nombre
                            </th>

                            <th className="border p-3 text-left">
                                Slug
                            </th>

                            <th className="border p-3 text-left">
                                Estado
                            </th>

                            <th className="border p-3 text-center">
                                Acciones
                            </th>

                        </tr>

                    </thead>

                   <tbody>

    {categorias.map((categoria) => (

        <tr key={categoria.id}>

            <td className="border p-3">
                {categoria.orden}
            </td>

            <td className="border p-3">
                {categoria.nombre}
            </td>

            <td className="border p-3">
                {categoria.slug}
            </td>

            <td className="border p-3">

                {categoria.activo
                    ? "🟢 Activa"
                    : "🔴 Inactiva"}

            </td>

            <td className="border p-3">

                <div className="flex justify-center gap-2">

                    <button
    onClick={() => editarCategoria(categoria)}
    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
>
    ✏️ Editar
</button>

<button
    onClick={() => eliminar(categoria.id)}
    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
>
    🗑️ Eliminar
</button>

                </div> 

            </td>

        </tr>

    ))}

</tbody>

</table>

)}

            {mostrarFormulario && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8">

                        <h2 className="text-2xl font-bold mb-6">
    {modoEdicion ? "Editar Categoría" : "Nueva Categoría"}
</h2>

                        <div className="space-y-5">

                            <div>

                                <label className="block font-semibold mb-2">
                                    Nombre
                                </label>

                                <input
                                    type="text"
                                    value={nuevaCategoria.nombre}
                                    onChange={(e) =>
                                        setNuevaCategoria({
                                            ...nuevaCategoria,
                                            nombre: e.target.value
                                        })
                                    }
                                    className="w-full border rounded-lg p-3"
                                />

                            </div>

                            <div>

                                <label className="block font-semibold mb-2">
                                    Slug
                                </label>

                                <input
                                    type="text"
                                    value={nuevaCategoria.slug}
                                    onChange={(e) =>
                                        setNuevaCategoria({
                                            ...nuevaCategoria,
                                            slug: e.target.value
                                        })
                                    }
                                    className="w-full border rounded-lg p-3"
                                />

                            </div>

                            <div>

                                <label className="block font-semibold mb-2">
                                    Orden
                                </label>

                                <input
                                    type="number"
                                    value={nuevaCategoria.orden}
                                    onChange={(e) =>
                                        setNuevaCategoria({
                                            ...nuevaCategoria,
                                            orden: Number(e.target.value)
                                        })
                                    }
                                    className="w-full border rounded-lg p-3"
                                />

                            </div>

                            <label className="flex items-center gap-3">

                                <input
                                    type="checkbox"
                                    checked={nuevaCategoria.activo}
                                    onChange={(e) =>
                                        setNuevaCategoria({
                                            ...nuevaCategoria,
                                            activo: e.target.checked
                                        })
                                    }
                                />

                                Activa

                            </label>

                            <div className="flex justify-end gap-3 pt-4">

                                <button
                                    onClick={() => setMostrarFormulario(false)}
                                    className="px-5 py-2 rounded-lg border"
                                >
                                    Cancelar
                                </button>

                                <button
    onClick={guardarCategoria}
    className="bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded-lg font-bold"
>
    Guardar
</button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}