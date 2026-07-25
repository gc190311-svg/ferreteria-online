import { deleteDoc, doc } from "firebase/firestore";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";

import { db } from "../../app/firebase";

export async function obtenerPedidos() {
  try {

    const pedidosRef = collection(db, "pedidos");

    const q = query(
      pedidosRef,
      orderBy("fecha", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

  } catch (error) {

    console.error("Error obteniendo pedidos:", error);

    return [];
  }
}
export async function eliminarPedido(id) {

  try {

    await deleteDoc(doc(db, "pedidos", id));

    return true;

  } catch (error) {

    console.error(error);

    return false;

  }

}