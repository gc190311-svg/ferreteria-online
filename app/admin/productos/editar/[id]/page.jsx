"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProductoModel from "../../models/ProductoModel";

import {
    obtenerProducto,
    actualizarProducto
} from "../../services/ProductosAdminService";


export default function EditarProductoPage({ params }) {

    const [producto, setProducto] = useState({
    ...ProductoModel
});

    const router = useRouter();

    useEffect(() => {

    cargarProducto();

}, [params.id]);

    async function cargarProducto() {

    try {

        const datos = await obtenerProducto(params.id);

        if (!datos) {

            alert("Producto no encontrado.");

            router.push("/admin/productos");

            return;

        }

        setProducto({
    ...ProductoModel,
    ...datos,

    imagenes: datos.imagenes || [
        datos.imagen || "",
        "",
        "",
        "",
        ""
    ]
});

    } catch (error) {

        console.error(error);

        alert("Error al cargar el producto.");

    }

}

const [guardando, setGuardando] = useState(false);

    function cambiar(e) {

        const { name, value, type, checked } = e.target;

        setProducto({

            ...producto,

            [name]:
                type === "checkbox"
                    ? checked
                    : value

        });

    }

    async function guardar(e) {

    e.preventDefault();

    setGuardando(true);

   try {

const productoActualizado = {
    ...producto,

    precio: Number(producto.precio),
    costo: Number(producto.costo),
    stock: Number(producto.stock),
    stockMinimo: Number(producto.stockMinimo),

};

   await actualizarProducto(
    params.id,
    productoActualizado
);

    alert("Producto actualizado correctamente.");

    router.push("/admin/productos");

} catch (error) {

    console.error(error);

    alert("No fue posible actualizar el producto.");

} finally {

    setGuardando(false);

}

}

    return (

        <main className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-6xl mx-auto">

                <h1 className="text-4xl font-bold mb-8">

                    Editar Producto

                </h1>

                <form
    onSubmit={guardar}
    className="bg-white rounded-3xl shadow-xl p-8"
>
                                    {/* INFORMACIÓN GENERAL */}

                    <h2 className="text-2xl font-bold mb-6">

                        Información General

                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>

                            <label className="block font-semibold mb-2">

                                Nombre del Producto

                            </label>

                            <input
                                type="text"
                                name="nombre"
                                value={producto.nombre}
                                onChange={cambiar}
                                className="w-full border rounded-xl p-3"
                                required
                            />

                        </div>

<div className="md:col-span-2">

    <label className="block font-semibold mb-4">
        Imágenes del producto
    </label>

    {[0,1,2,3,4].map((index) => (

        <div key={index} className="mb-4">

            <label className="block text-sm font-medium mb-2">

                {index === 0
                    ? "Imagen Principal"
                    : `Imagen ${index + 1}`}

            </label>

            <input
                type="text"
                placeholder="https://..."
                value={producto.imagenes?.[index] || ""}
                onChange={(e) => {

                    const nuevasImagenes = [
                        ...(producto.imagenes || ["","","","",""])
                    ];

                    nuevasImagenes[index] = e.target.value;

                    setProducto({
                        ...producto,
                        imagenes: nuevasImagenes
                    });

                }}
                className="w-full border rounded-xl p-3"
            />

        </div>

    ))}

</div>


                        <div>

                            <label className="block font-semibold mb-2">

                                Marca

                            </label>

                            <input
                                type="text"
                                name="marca"
                                value={producto.marca}
                                onChange={cambiar}
                                className="w-full border rounded-xl p-3"
                                required
                            />

                        </div>


                        <div>

                            <label className="block font-semibold mb-2">

                                SKU

                            </label>

                            <input
                                type="text"
                                name="sku"
                                value={producto.sku}
                                onChange={cambiar}
                                className="w-full border rounded-xl p-3"
                                required
                            />

                        </div>

                        <div>

                            <label className="block font-semibold mb-2">

                                Categoría

                            </label>

                           <select
    name="categoria"
    value={producto.categoria || ""}
    onChange={cambiar}
    className="w-full border rounded-xl p-3"
    required
>
    <option value="">Seleccione</option>
<option value="Herramientas">Herramientas</option>
<option value="Construcción">Construcción</option>
<option value="Electricidad">Electricidad</option>
<option value="Pintura">Pintura</option>
<option value="Gasfitería">Gasfitería</option>
<option value="Seguridad">Seguridad</option>
<option value="Jardinería">Jardinería</option>
<option value="Plomería">Plomería</option>
<option value="Adhesivos">Adhesivos</option>
<option value="Tornillería">Tornillería</option>
<option value="Iluminación">Iluminación</option>
<option value="Maquinaria">Maquinaria</option>

</select>

                        </div>

 <div>

                          <label className="block font-semibold mb-2">
                           Unidad de Medida
                          </label>

                        <select
                          name="unidadMedida"
                          value={producto.unidadMedida}
                          onChange={cambiar}
                         className="w-full border rounded-xl p-3"
                             required
                                     >
                              <option value="">Seleccione</option>
                              <option value="Unidad">Unidad</option>
                               <option value="Caja">Caja</option>
                               <option value="Metro">Metro</option>
                              <option value="Rollo">Rollo</option>
                              <option value="Bolsa">Bolsa</option>
                              <option value="Litro">Litro</option>
                              <option value="Galón">Galón</option>
                             <option value="Kilogramo">Kilogramo</option>
                              <option value="Par">Par</option>
                              <option value="Juego">Juego</option>
                             </select>

                             </div>

                        <div>

                            <label className="block font-semibold mb-2">

                                Stock

                            </label>

                            <input
                                type="number"
                                name="stock"
                                value={producto.stock}
                                onChange={cambiar}
                                className="w-full border rounded-xl p-3"
                                required
                            />

                        </div>

                    </div>

                    <div className="mt-6">

                        <label className="block font-semibold mb-2">

                            Descripción

                        </label>

                        <textarea
                            rows={5}
                            name="descripcion"
                            value={producto.descripcion}
                            onChange={cambiar}
                            className="w-full border rounded-xl p-3"
                        />

                    </div>

                    {/* PRECIOS */}

                    <h2 className="text-2xl font-bold mt-10 mb-6">

                        Precios

                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>

                            <label className="block font-semibold mb-2">

                                Precio

                            </label>

                            <input
                                type="number"
                                step="0.01"
                                name="precio"
                                value={producto.precio}
                                onChange={cambiar}
                                className="w-full border rounded-xl p-3"
                                required
                            />

                        </div>

                        

                        <div>

                            <label className="block font-semibold mb-2">

                                Costo

                            </label>

                            <input
                                type="number"
                                step="0.01"
                                name="costo"
                                value={producto.costo}
                                onChange={cambiar}
                                className="w-full border rounded-xl p-3"
                                required
                            />

                        </div>

                    </div>

                    {/* INVENTARIO */}

                    <h2 className="text-2xl font-bold mt-10 mb-6">

                        Inventario

                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>

                            <label className="block font-semibold mb-2">

                                Stock mínimo

                            </label>

                            <input
                                type="number"
                                name="stockMinimo"
                                value={producto.stockMinimo}
                                onChange={cambiar}
                                className="w-full border rounded-xl p-3"
                                required
                            />

                        </div>

                        <div className="flex items-center gap-3 mt-8">

                            <input
                                type="checkbox"
                                name="activo"
                                checked={producto.activo}
                                onChange={cambiar}
                            />

                            <label>

                                Producto Activo

                            </label>

                        </div>

                    </div>

                 

                    {/* BOTONES */}

                    <div className="flex justify-end gap-4 mt-12">

                        <Link
                            href="/admin/productos"
                            className="px-8 py-3 rounded-xl border border-gray-300 hover:bg-gray-100"
                        >

                            Cancelar

                        </Link>

                        <button
    type="submit"
    disabled={guardando}
    className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-400 text-black font-bold px-10 py-3 rounded-xl"
>

    {guardando
        ? "Guardando..."
        : "Guardar Cambios"}

</button>

                    </div>

                </form>

            </div>

        </main>

    );

}