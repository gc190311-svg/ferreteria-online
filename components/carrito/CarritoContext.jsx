"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {

  const [carrito, setCarrito] = useState([]);

  /* ===========================
     CARGAR LOCAL STORAGE
  =========================== */

  useEffect(() => {

    const datos = localStorage.getItem("carrito");

    if (datos) {
      setCarrito(JSON.parse(datos));
    }

  }, []);

  /* ===========================
     GUARDAR LOCAL STORAGE
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
        (item) => item.id === producto.id
      );

      if (existe) {

        return actual.map((item) =>

          item.id === producto.id

            ? {
                ...item,
                cantidad:
                  item.cantidad + producto.cantidad,
              }

            : item

        );

      }

      return [...actual, producto];

    });

  }

  /* ===========================
     ELIMINAR PRODUCTO
  =========================== */

  function eliminarProducto(id) {

    setCarrito((actual) =>
      actual.filter((item) => item.id !== id)
    );

  }

  /* ===========================
     ACTUALIZAR CANTIDAD
  =========================== */

  function actualizarCantidad(id, cantidad) {

    if (cantidad < 1) cantidad = 1;

    setCarrito((actual) =>

      actual.map((item) =>

        item.id === id

          ? {
              ...item,
              cantidad,
            }

          : item

      )

    );

  }

  /* ===========================
     LIMPIAR CARRITO
  =========================== */

  function limpiarCarrito() {
    setCarrito([]);
  }
    /* ===========================
     TOTALES
  =========================== */

  const totalItems = useMemo(() => {

    return carrito.reduce(
      (total, item) => total + item.cantidad,
      0
    );

  }, [carrito]);

  const totalProductos = useMemo(() => {

    return carrito.length;

  }, [carrito]);

  const subtotal = useMemo(() => {

    return carrito.reduce((total, item) => {

      const precio =
        Number(item.oferta) > 0
          ? Number(item.oferta)
          : Number(item.precio);

      return total + precio * item.cantidad;

    }, 0);

  }, [carrito]);

  // Por ahora el total es igual al subtotal.
  // Más adelante aquí podremos descontar cupones
  // o sumar el costo de envío.

  const total = subtotal;

  /* ===========================
     PROVIDER
  =========================== */

  return (

    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        eliminarProducto,
        actualizarCantidad,
        limpiarCarrito,
        totalItems,
        totalProductos,
        subtotal,
        total,
      }}
    >

      {children}

    </CarritoContext.Provider>

  );

}

/* ===========================
   HOOK
=========================== */

export function useCarrito() {

  const context = useContext(CarritoContext);

  if (!context) {

    throw new Error(
      "useCarrito debe usarse dentro de CarritoProvider"
    );

  }

  return context;

}
