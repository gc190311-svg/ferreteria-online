"use client";

import { useEffect, useMemo, useState } from "react";

import HeaderProductos from "./components/HeaderProductos.jsx";
import EstadisticasProductos from "./components/EstadisticasProductos";
import FiltrosProductos from "./components/FiltrosProductos";
import VistaListaProductos from "./components/VistaListaProductos";
import TablaProductos from "./components/TablaProductos";

import {
    obtenerProductos,
    eliminarProducto
} from "./services/ProductosAdminService";

export default function ProductosAdmin() {

    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [vista, setVista] = useState("lista");
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarProductos();
    }, []);

    async function cargarProductos() {

        try {

            const lista = await obtenerProductos();

            setProductos(lista);

        } catch (error) {

            console.error(error);

        } finally {

            setCargando(false);

        }

    }

    async function eliminar(id) {

        const confirmar = confirm(
            "¿Deseas eliminar este producto?"
        );

        if (!confirmar) return;

        try {

            await eliminarProducto(id);

            cargarProductos();

        } catch (error) {

            console.error(error);

        }

    }

    const productosFiltrados = useMemo(() => {

        return productos.filter((producto) => {

            if (!busqueda) return true;

            return (
                producto.nombre
                    ?.toLowerCase()
                    .includes(busqueda.toLowerCase()) ||

                producto.marca
                    ?.toLowerCase()
                    .includes(busqueda.toLowerCase()) ||

                producto.categoria
                    ?.toLowerCase()
                    .includes(busqueda.toLowerCase())
            );

        });

    }, [productos, busqueda]);

    if (cargando) {

        return (

            <div className="p-10 text-center">

                Cargando productos...

            </div>

        );

    }

    return (

        <div className="p-8 space-y-6">

            <HeaderProductos />

            <EstadisticasProductos
                productos={productos}
            />

            <FiltrosProductos
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                vista={vista}
                setVista={setVista}
            />

            {
                vista === "lista"

                    ? (

                        <VistaListaProductos
                            productos={productosFiltrados}
                            eliminar={eliminar}
                        />

                    )

                    : (

                        <TablaProductos
                            productos={productosFiltrados}
                            eliminar={eliminar}
                        />

                    )
            }

        </div>

    );

}