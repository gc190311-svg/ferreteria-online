"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {

  const [carrito, setCarrito] = useState([]);

  /* ============================= */

  /* CARGAR DEL LOCAL STORAGE */

  /* ============================= */

  useEffect(() => {

    const datos = localStorage.getItem("carrito");

    if (datos) {

      setCarrito(JSON.parse(datos));

    }

  }, []);

  /* ============================= */

  /* GUARDAR */

  /* ============================= */

  useEffect(() => {

    localStorage.setItem(

      "carrito",

      JSON.stringify(carrito)

    );

  }, [carrito]);

  /* ============================= */

  /* AGREGAR PRODUCTO */

  /* ============================= */

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

  }

  /* ============================= */

  /* ELIMINAR */

  /* ============================= */

  function eliminarProducto(id) {

    setCarrito(

      carrito.filter((p) => p.id !== id)

    );

  }

  /* ============================= */

  /* CAMBIAR CANTIDAD */

  /* ============================= */

  function actualizarCantidad(

    id,

    cantidad

  ) {

    setCarrito(

      carrito.map((p) =>

        p.id === id

          ? {

              ...p,

              cantidad,

            }

          : p

      )

    );

  }

  /* ============================= */

  /* LIMPIAR */

  /* ============================= */

  function limpiarCarrito() {

    setCarrito([]);

  }

  /* ============================= */

  /* TOTAL DE PRODUCTOS */

  /* ============================= */

  const totalItems = carrito.reduce(

    (acc, item) => acc + item.cantidad,

    0

  );

  /* ============================= */

  /* TOTAL MONTO */

  /* ============================= */

  const total = carrito.reduce(

    (acc, item) =>

      acc +

      item.cantidad *

        Number(item.oferta || item.precio),

    0

  );

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

      }}

    >

      {children}

    </CarritoContext.Provider>

  );

}

export function useCarrito() {

  return useContext(CarritoContext);

}
