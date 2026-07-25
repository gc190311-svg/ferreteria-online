"use client";

import Link from "next/link";
import { FaFileExcel, FaUpload, FaArrowLeft } from "react-icons/fa";

import { useState } from "react";
import { leerExcel, validarProductos} from "../services/ImportadorExcelService";
import VistaPreviaImportacion from "../components/VistaPreviaImportacion";
import { importarProductos } from "../services/ImportadorFirebaseService";

export default function ImportarProductosPage() {

const [productos, setProductos] = useState([]);
const [archivo, setArchivo] = useState(null);
const [cargando, setCargando] = useState(false);
const [importando, setImportando] = useState(false);

async function seleccionarArchivo(e) {

    const file = e.target.files[0];

    if (!file) return;

    setArchivo(file);
    setCargando(true);

    try {

        const datos = await leerExcel(file);

        const productosValidados = validarProductos(datos);

    setProductos(productosValidados);

    } catch (error) {

        console.error(error);

        alert("No se pudo leer el archivo.");

    } finally {

        setCargando(false);

    }

}

async function importar() {

    if (!productos.length) {
        alert("No hay productos para importar.");
        return;
    }

    setImportando(true);

    try {

        const resultado = await importarProductos(productos);

        alert(
`Importación finalizada

✅ Importados: ${resultado.importados}
⚠️ Duplicados: ${resultado.duplicados}
❌ Errores: ${resultado.errores}`
        );

        setProductos([]);
        setArchivo(null);

    } catch (error) {

        console.error(error);

        alert("Ocurrió un error durante la importación.");

    } finally {

        setImportando(false);

    }

}

    return (

        <main className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-6xl mx-auto">

                {/* Encabezado */}

                <div className="flex items-center justify-between mb-8">

                    <div>

                        <h1 className="text-4xl font-bold">

                            Importar Productos

                        </h1>

                        <p className="text-gray-600 mt-2">

                            Importa cientos de productos desde un archivo Excel.

                        </p>

                    </div>

                    <Link
                        href="/admin/productos"
                        className="border rounded-xl px-6 py-3 hover:bg-gray-100 flex items-center gap-2"
                    >
                        <FaArrowLeft />

                        Volver

                    </Link>

                </div>

                {/* Tarjeta principal */}

                <div className="bg-white rounded-3xl shadow-xl p-10">

                    <div className="flex flex-col items-center text-center">

                        <FaFileExcel
                            className="text-green-600 mb-6"
                            size={70}
                        />

                        <h2 className="text-3xl font-bold">

                            Importación Masiva

                        </h2>

                        <p className="text-gray-500 mt-3 max-w-xl">

                            Selecciona un archivo Excel para registrar
                            múltiples productos automáticamente.

                        </p>





                    </div>

                    {/* Zona de carga */}

                    <div className="border-2 border-dashed rounded-3xl p-16 mt-10 text-center">

                        <FaUpload
                            size={55}
                            className="mx-auto text-gray-400"
                        />

                        <h3 className="mt-6 text-xl font-semibold">

                            Arrastra aquí tu archivo Excel

                        </h3>

                        <p className="text-gray-500 mt-2">

                            o selecciónalo desde tu computadora.

                        </p>

                        <input
                          id="archivoExcel"
                          type="file"
                          accept=".xlsx,.xls"
                          onChange={seleccionarArchivo}
                          className="hidden"
                         />

<label
    htmlFor="archivoExcel"
    className="inline-block mt-8 cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-xl"
>
    {cargando ? "Leyendo..." : "Seleccionar archivo"}
</label>

                    </div>

                    {/* Información */}

                    <div className="grid md:grid-cols-3 gap-6 mt-10">

                        <div className="bg-gray-50 rounded-2xl p-6">

                            <h3 className="font-bold">

                                Plantilla

                            </h3>

                            <p className="text-gray-500 mt-2">

                                Descarga el formato oficial para importar productos.

                            </p>

                            <a
    href="/plantilla-productos.xlsx"
    download
    className="inline-block mt-4 text-green-700 font-semibold hover:underline"
>
    Descargar plantilla
</a>

                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6">

                            <h3 className="font-bold">

                                Formato

                            </h3>

                            <p className="text-gray-500 mt-2">

                                Compatible con archivos XLS y XLSX.

                            </p>

                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6">

                            <h3 className="font-bold">

                                Recomendación

                            </h3>

                            <p className="text-gray-500 mt-2">

                                Mantén los encabezados originales del archivo.

                            </p>

                        </div>

                    </div>

                    <VistaPreviaImportacion
    productos={productos}
/>
{productos.length > 0 && (

    <div className="mt-8 flex justify-end">

        <button
            type="button"
            onClick={importar}
            disabled={importando}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold px-8 py-3 rounded-xl"
        >

            {importando
                ? "Importando..."
                : `Importar ${productos.filter(p => p.valido).length} productos`
            }

        </button>

    </div>

)}

                </div>

            </div>

        </main>

    );

}