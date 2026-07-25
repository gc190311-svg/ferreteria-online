import * as XLSX from "xlsx";

export function leerExcel(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = (e) => {

            try {

                const data = new Uint8Array(e.target.result);

                const workbook = XLSX.read(data, {
                    type: "array"
                });

                const hoja = workbook.Sheets[
                    workbook.SheetNames[0]
                ];

                const datos = XLSX.utils.sheet_to_json(hoja, {
    defval: ""
});

const productos = datos.map(item => ({

    sku: item.SKU || item.sku || "",

    nombre: item.Nombre || item.nombre || "",

    marca: item.Marca || item.marca || "",

    categoria: item["Categoría"] || item.categoria || "",

    descripcion: item["Descripción"] || item.descripcion || "",

    unidadMedida: item.UnidadMedida || item.unidadMedida || "",

    precio: item.Precio || item.precio || 0,

    costo: item.Costo || item.costo || 0,

    stock: item.Stock || item.stock || 0,

    stockMinimo: item.StockMinimo || item.stockMinimo || 0,

    activo: item.Activo ?? item.activo ?? true,

    imagenes: [
    item.Imagen1 || item.imagen1 || "",
    item.Imagen2 || item.imagen2 || "",
    item.Imagen3 || item.imagen3 || "",
    item.Imagen4 || item.imagen4 || "",
    item.Imagen5 || item.imagen5 || ""
].filter(img => img && img.trim() !== "")

}));

resolve(productos);


            } catch (error) {

                reject(error);

            }

        };

        reader.onerror = reject;

        reader.readAsArrayBuffer(file);

    });

}   // ← AQUÍ termina leerExcel


export function validarProductos(productos) {

    return productos.map((producto, index) => {

        const errores = [];

        if (!producto.nombre)
            errores.push("Falta nombre");

        if (!producto.marca)
            errores.push("Falta marca");

        if (!producto.categoria)
            errores.push("Falta categoría");

        if (
            producto.precio === "" ||
            isNaN(Number(producto.precio))
        )
            errores.push("Precio inválido");

        if (
            producto.stock === "" ||
            isNaN(Number(producto.stock))
        )
            errores.push("Stock inválido");

        return {
            ...producto,
            fila: index + 2,
            valido: errores.length === 0,
            errores
        };

    });

}