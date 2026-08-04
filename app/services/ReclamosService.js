import { db } from "../firebase";

import {
    collection,
    addDoc,
    serverTimestamp
} from "firebase/firestore";

export async function guardarReclamo(datos) {

    return await addDoc(
        collection(db, "reclamos"),
        {
            ...datos,
            estado: "Pendiente",
            fecha: serverTimestamp()
        }
    );

}