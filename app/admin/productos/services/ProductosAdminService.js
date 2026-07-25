import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../../../firebase";

/* ============================
   CREAR PRODUCTO
============================ */

export async function crearProducto(producto) {

    try {

        const docRef = await addDoc(
            collection(db, "productos"),
           {
    ...producto,

    imagenes: (producto.imagenes || [])
        .filter(img => img && img.trim() !== ""),

    fechaCreacion: serverTimestamp(),
    fechaActualizacion: serverTimestamp()
}
        );

        return {
            ok: true,
            id: docRef.id
        };

    } catch (error) {

        console.error(error);

        return {
            ok: false,
            error
        };

    }

}

/* ============================
   LISTAR PRODUCTOS
============================ */

export async function obtenerProductos() {

    const snapshot = await getDocs(
        collection(db, "productos")
    );

    return snapshot.docs.map(doc => {

    const datos = doc.data();

    return {

        id: doc.id,

        ...datos,

        imagenes: datos.imagenes || (
            datos.imagen
                ? [datos.imagen]
                : []
        )

    };

});

}

/* ============================
   OBTENER PRODUCTO
============================ */

export async function obtenerProducto(id) {

  const documento = await getDoc(
    doc(db, "productos", id)
  );

  if (!documento.exists()) return null;

  const datos = documento.data();

return {
    id: documento.id,

    ...datos,

    imagenes: datos.imagenes || (
        datos.imagen
            ? [datos.imagen]
            : []
    )
}
} 
/* ============================
   ACTUALIZAR
============================ */

export async function actualizarProducto(id, datos) {

    await updateDoc(
    doc(db, "productos", id),
    {
        ...datos,

        imagenes: (datos.imagenes || [])
            .filter(img => img && img.trim() !== ""),

        fechaActualizacion: serverTimestamp()
    }
);

}

/* ============================
   ELIMINAR
============================ */

export async function eliminarProducto(id) {

  await deleteDoc(
    doc(db, "productos", id)
  );
}
