            import { db } from "../../app/firebase";

import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  runTransaction,
} from "firebase/firestore";

export async function guardarPedido(datosPedido) {

  const contadorRef = doc(db, "configuracion", "contadorPedidos");

  const numeroPedido = await runTransaction(db, async (transaction) => {

    const contadorDoc = await transaction.get(contadorRef);

    let ultimoNumero = 0;

    if (contadorDoc.exists()) {
      ultimoNumero = contadorDoc.data().ultimo || 0;
    }

    const siguienteNumero = ultimoNumero + 1;

    transaction.set(
      contadorRef,
      {
        ultimo: siguienteNumero,
      },
      { merge: true }
    );

    return siguienteNumero;
  });

  const numeroFormateado =
    "PED-" + String(numeroPedido).padStart(6, "0");

  const docRef = await addDoc(collection(db, "pedidos"), {

    ...datosPedido,

    numeroPedido: numeroFormateado,

    estado: "Pendiente",

    fecha: serverTimestamp(),

  });

  return {

    id: docRef.id,

    numeroPedido: numeroFormateado,

  };

}
