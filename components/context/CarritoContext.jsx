"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {

  /* ===========================
     CARGAR DESDE LOCAL STORAGE
  =========================== */

  const [carrito, setCarrito] = useState(() => {
    if (typeof window === "undefined") return [];

    try {
      const datos = localStorage.getItem("carrito");
      return datos ? JSON.parse(datos) : [];
    } catch (error) {
      console.error("Error leyendo carrito:", error);
      return [];
    }
  });

  /* ===========================
     DRAWER
  =========================== */

  const [carritoAbierto, setCarritoAbierto] = useState(false);

  function abrirCarrito() {
    setCarritoAbierto(true);
  }

  function cerrarCarrito() {
    setCarritoAbierto(false);
  }

  /* ===========================
     GUARDAR EN LOCAL STORAGE
  =========================== */

  useEffect(() => {
    localStorage.setItem(
      "carrito",
      JSON.stringify(carrito)
    );
  }, [carrito]);

  /* ===========================
     AGREGAR PRODUCTO
  =========================== */

  function agregarProducto(producto) {

    setCarrito((actual) => {

      const existe = actual.find(
        (p) => p.id === producto.id
      );

      if (existe) {

        return actual.map((p) =>
          p.id === producto.id
            ? {
                ...p,
                cantidad:
                  p.cantidad + producto.cantidad,
              }
            : p
        );

      }

      return [...actual, producto];

    });

    abrirCarrito();

  }

  /* ===========================
     ELIMINAR
  =========================== */

  function eliminarProducto(id) {

    setCarrito((actual) =>
      actual.filter((p) => p.id !== id)
    );

  }

  /* ===========================
     ACTUALIZAR CANTIDAD
  =========================== */

  function actualizarCantidad(id, cantidad) {

    setCarrito((actual) =>
      actual.map((p) =>
        p.id === id
          ? {
              ...p,
              cantidad,
            }
          : p
      )
    );

  }

  /* ===========================
     LIMPIAR
  =========================== */

  function limpiarCarrito() {

    setCarrito([]);

  }

  /* ===========================
     TOTAL ITEMS
  =========================== */

  const totalItems = carrito.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );

  /* ===========================
     TOTAL
  =========================== */

  const total = carrito.reduce((acc, item) => {

    const precio =
      Number(item.oferta) > 0
        ? Number(item.oferta)
        : Number(item.precio);

    return acc + precio * Number(item.cantidad);

  }, 0);

  return (

    <CarritoContext.Provider
      value={{

        carrito,

        agregarProducto,
        eliminarProducto,
        actualizarCantidad,
        limpiarCarrito,

        total,
        totalItems,

        carritoAbierto,
        abrirCarrito,
        cerrarCarrito,

      }}
    >

      {children}

    </CarritoContext.Provider>

  );

}

export function useCarrito() {
  return useContext(CarritoContext);
}