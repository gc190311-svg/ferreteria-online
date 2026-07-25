import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../../app/firebase";

/**
 * Buscar un pedido por su número
 * Ejemplo: PED-000001
 */
export async function obtenerPedidoPorNumero(numeroPedido) {

  const q = query(
    collection(db, "pedidos"),
    where("numeroPedido", "==", numeroPedido)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  };

}