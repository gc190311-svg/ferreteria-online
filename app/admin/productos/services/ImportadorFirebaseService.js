import {
    collection,
    getDocs,
    query,
    where,
    writeBatch,
    doc,
    serverTimestamp
} from "firebase/firestore";

import { db } from "../../../firebase";

export async function importarProductos(productos) {

    const batch = writeBatch(db);

    let importados = 0;
    let duplicados = 0;
    let errores = 0;

    const productosValidos = productos.filter(p => p.valido);

    for (const producto of productosValidos) {

        try {

            const consulta = query(
                collection(db, "productos"),
                where("sku", "==", producto.sku)
            );

            const resultado = await getDocs(consulta);

            if (!resultado.empty) {
                duplicados++;
                continue;
            }

            const referencia = doc(collection(db, "productos"));

            batch.set(referencia, {

                sku: producto.sku,
                nombre: producto.nombre,
                marca: producto.marca,
                categoria: producto.categoria,
                descripcion: producto.descripcion || "",
                unidadMedida: producto.unidadMedida || "Unidad",

                precio: Number(producto.precio),
                costo: Number(producto.costo),

                stock: Number(producto.stock),
                stockMinimo: Number(producto.stockMinimo),

                activo: producto.activo !== false,
                imagenes: (producto.imagenes || [])
    .filter(img => img && img.trim() !== ""),

                fechaCreacion: serverTimestamp(),
                fechaActualizacion: serverTimestamp()

            });

            importados++;

        } catch (error) {

            console.error(error);

            errores++;

        }

    }

    await batch.commit();

    return {
        importados,
        duplicados,
        errores
    };

}