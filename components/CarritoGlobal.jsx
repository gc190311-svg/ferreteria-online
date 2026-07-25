"use client";

import CarritoDrawer from "./CarritoDrawer";
import { useCarrito } from "./context/CarritoContext";

export default function CarritoGlobal() {

    const {
        carritoAbierto,
        cerrarCarrito
    } = useCarrito();

    return (

        <CarritoDrawer
            abierto={carritoAbierto}
            cerrar={cerrarCarrito}
        />

    );

}