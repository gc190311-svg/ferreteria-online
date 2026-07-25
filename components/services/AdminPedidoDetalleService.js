import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";

import { db } from "../../app/firebase";

export async function obtenerPedido(numeroPedido) {

  const pedidosRef = collection(db, "pedidos");

  const q = query(
    pedidosRef,
    where("numeroPedido", "==", numeroPedido)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data()
  };

}