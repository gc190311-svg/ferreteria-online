import {
    collection,
    getDocs,
    doc,
    updateDoc
} from "firebase/firestore";

import { db } from "../../../firebase";

export async function obtenerReclamos() {

    const snapshot = await getDocs(collection(db, "reclamos"));

    const datos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    datos.sort((a, b) => {

        if (!a.fecha) return 1;
        if (!b.fecha) return -1;

        return b.fecha.seconds - a.fecha.seconds;

    });

    return datos;

}

export async function cambiarEstado(id, estado) {

    await updateDoc(
        doc(db, "reclamos", id),
        {
            estado
        }
    );

}