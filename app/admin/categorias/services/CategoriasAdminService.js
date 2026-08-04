import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
} from "firebase/firestore";

import { db } from "../../../firebase";

// ===========================
// LISTAR CATEGORÍAS
// ===========================

export async function obtenerCategorias() {

    const q = query(
        collection(db, "categorias"),
        orderBy("orden")
    );

    const snapshot = await getDocs(q);

    const categorias = [];

    snapshot.forEach((docItem) => {

        categorias.push({
            id: docItem.id,
            ...docItem.data(),
        });

    });

    return categorias;

}

// ===========================
// OBTENER UNA CATEGORÍA
// ===========================

export async function obtenerCategoria(id) {

    const documento = await getDoc(
        doc(db, "categorias", id)
    );

    if (!documento.exists()) return null;

    return {
        id: documento.id,
        ...documento.data(),
    };

}

// ===========================
// CREAR
// ===========================

export async function crearCategoria(datos) {

    return await addDoc(
        collection(db, "categorias"),
        datos
    );

}

// ===========================
// ACTUALIZAR
// ===========================

export async function actualizarCategoria(id, datos) {

    return await updateDoc(
        doc(db, "categorias", id),
        datos
    );

}

// ===========================
// ELIMINAR
// ===========================

export async function eliminarCategoria(id) {

    return await deleteDoc(
        doc(db, "categorias", id)
    );

}