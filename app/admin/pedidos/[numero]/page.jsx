"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import Image from "next/image";

import {
    FaArrowLeft,
    FaWhatsapp,
    FaPrint
} from "react-icons/fa";

import {
    obtenerPedido
} from "../../../../components/services/AdminPedidoDetalleService";

export default function PedidoAdminDetalle({ params }) {

    const [pedido, setPedido] = useState(null);

    const [cargando, setCargando] = useState(true);

    useEffect(() => {

        cargar();

    }, []);

    async function cargar() {

        const datos = await obtenerPedido(params.numero);

        setPedido(datos);

        setCargando(false);

    }

    if (cargando) {

        return (

            <main className="min-h-screen flex items-center justify-center">

                <h2 className="text-3xl font-bold">

                    Cargando...

                </h2>

            </main>

        );

    }

    if (!pedido) {

        return (

            <main className="min-h-screen flex items-center justify-center">

                <h2>

                    Pedido no encontrado

                </h2>

            </main>

        );

    }

    return (

        <main className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-6xl mx-auto">

                <Link

                    href="/admin/pedidos"

                    className="inline-flex gap-3 items-center mb-8 bg-black text-white px-6 py-3 rounded-xl"

                >

                    <FaArrowLeft />

                    Volver

                </Link>

                <div className="bg-white rounded-3xl shadow-xl p-8">

                    <h1 className="text-4xl font-bold">

                        {pedido.numeroPedido}

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Detalle del pedido

                    </p>
                                        <div className="grid lg:grid-cols-2 gap-8 mt-10">

                        {/* DATOS DEL CLIENTE */}

                        <div className="border rounded-2xl p-6">

                            <h2 className="text-2xl font-bold mb-6">
                                Cliente
                            </h2>

                            <div className="space-y-4">

                                <div>
                                    <p className="text-gray-500">Nombre</p>
                                    <p className="font-semibold">
                                        {pedido.cliente?.nombre}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Celular</p>
                                    <p className="font-semibold">
                                        {pedido.cliente?.celular}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Correo</p>
                                    <p className="font-semibold">
                                        {pedido.cliente?.correo || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Dirección</p>
                                    <p className="font-semibold">
                                        {pedido.cliente?.direccion}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Distrito</p>
                                    <p className="font-semibold">
                                        {pedido.cliente?.distrito}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Referencia</p>
                                    <p className="font-semibold">
                                        {pedido.cliente?.referencia || "-"}
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* RESUMEN */}

                        <div className="border rounded-2xl p-6">

                            <h2 className="text-2xl font-bold mb-6">
                                Resumen
                            </h2>

                            <div className="space-y-5">

                                <div className="flex justify-between">
                                    <span>Estado</span>
                                    <strong>{pedido.estado}</strong>
                                </div>

                                <div className="flex justify-between">
                                    <span>Entrega</span>
                                    <strong>{pedido.entrega?.tipo}</strong>
                                </div>

                                <div className="flex justify-between">
                                    <span>Pago</span>
                                    <strong>{pedido.pago?.metodo}</strong>
                                </div>

                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <strong>
                                        S/ {Number(pedido.subtotal || 0).toFixed(2)}
                                    </strong>
                                </div>

                                <div className="flex justify-between">
                                    <span>Delivery</span>
                                    <strong>
                                        S/ {Number(pedido.delivery || 0).toFixed(2)}
                                    </strong>
                                </div>

                                <div className="flex justify-between">
                                    <span>Descuento</span>
                                    <strong>
                                        S/ {Number(pedido.descuento || 0).toFixed(2)}
                                    </strong>
                                </div>

                                <hr />

                                <div className="flex justify-between text-2xl">

                                    <strong>TOTAL</strong>

                                    <strong className="text-green-700">

                                        S/ {Number(pedido.total || 0).toFixed(2)}

                                    </strong>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* PRODUCTOS */}

                    <div className="mt-10">

                        <h2 className="text-2xl font-bold mb-6">

                            Productos

                        </h2>

                        <div className="space-y-5">

                            {pedido.productos?.map((producto, index) => (

                                <div
                                    key={producto.id || index}
                                    className="border rounded-2xl p-5 flex gap-5 items-center"
                                >

                                    <Image
                                        src={producto.imagen || "/sin-imagen.png"}
                                        alt={producto.nombre}
                                        width={90}
                                        height={90}
                                        className="rounded-lg object-contain"
                                    />

                                    <div className="flex-1">

                                        <h3 className="font-bold text-xl">

                                            {producto.nombre}

                                        </h3>

                                        <p>

                                            Cantidad: {producto.cantidad}

                                        </p>

                                        <p>

                                            Precio: S/ {Number(producto.precio).toFixed(2)}

                                        </p>

                                    </div>

                                    <div className="text-right">

                                        <strong className="text-green-700 text-xl">

                                            S/ {Number(producto.subtotal).toFixed(2)}

                                        </strong>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* BOTONES */}

                    <div className="flex gap-4 mt-10">

                        <button
                            onClick={() => window.print()}
                            className="bg-gray-800 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                        >
                            <FaPrint />
                            Imprimir
                        </button>

                        <button
                            onClick={() => {

                                const mensaje =
                                    `Hola, deseo consultar mi pedido ${pedido.numeroPedido}`;

                                window.open(
                                    `https://wa.me/51921883870?text=${encodeURIComponent(mensaje)}`,
                                    "_blank"
                                );

                            }}
                            className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                        >
                            <FaWhatsapp />
                            WhatsApp
                        </button>

                    </div>

                </div>

            </div>

        </main>

    );

}