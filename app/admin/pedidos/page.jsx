"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  FaSearch,
  FaEye,
  FaTrash,
  FaShoppingCart,
  FaMoneyBillWave,
  FaClock,
  FaPlus,
  FaBoxOpen,
  FaUsers,
  FaChartBar,
  FaCog
} from "react-icons/fa";

import {
  obtenerPedidos,
  eliminarPedido
} from "../../../components/services/AdminPedidosService";

export default function AdminPedidosPage() {

  const [pedidos, setPedidos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarPedidos();
  }, []);

  async function cargarPedidos() {

    setCargando(true);

    const datos = await obtenerPedidos();

    setPedidos(datos);

    setCargando(false);

  }

  async function eliminar(id) {

    const confirmar = window.confirm(
      "¿Desea eliminar este pedido?"
    );

    if (!confirmar) return;

    const ok = await eliminarPedido(id);

    if (ok) {

      alert("Pedido eliminado correctamente.");

      cargarPedidos();

    }

  }

  const pedidosFiltrados = useMemo(() => {

    const texto = busqueda.toLowerCase();

    return pedidos.filter((pedido) => {

      return (

        pedido.numeroPedido
          ?.toLowerCase()
          .includes(texto)

        ||

        pedido.cliente?.nombre
          ?.toLowerCase()
          .includes(texto)

        ||

        pedido.cliente?.celular
          ?.includes(texto)

      );

    });

  }, [pedidos, busqueda]);

  const totalVentas = pedidos.reduce(
    (t, p) => t + Number(p.total || 0),
    0
  );

  const pendientes = pedidos.filter(
    p => p.estado === "Pendiente"
  ).length;

  function colorEstado(estado) {

    switch (estado) {

      case "Pendiente":
        return "bg-yellow-100 text-yellow-700";

      case "Confirmado":
        return "bg-blue-100 text-blue-700";

      case "En preparación":
        return "bg-orange-100 text-orange-700";

      case "En reparto":
        return "bg-purple-100 text-purple-700";

      case "Entregado":
        return "bg-green-100 text-green-700";

      case "Cancelado":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";

    }

  }

  if (cargando) {

    return (

      <main className="min-h-screen flex items-center justify-center">

        <h2 className="text-2xl font-bold">

          Cargando pedidos...

        </h2>

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-gray-100">

      <div className="flex">

        {/* CONTENIDO */}

        <section className="flex-1 p-8">

          <h1 className="text-4xl font-bold mb-8">

            Panel de Pedidos

          </h1>

          {/* TARJETAS */}

          <div className="grid md:grid-cols-3 gap-6 mb-8">

            <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">

              <div>

                <p className="text-gray-500">

                  Pedidos

                </p>

                <h2 className="text-4xl font-bold">

                  {pedidos.length}

                </h2>

              </div>

              <FaShoppingCart
                size={42}
                className="text-blue-600"
              />

            </div>

            <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">

              <div>

                <p className="text-gray-500">

                  Ventas

                </p>

                <h2 className="text-4xl font-bold text-green-700">

                  S/ {totalVentas.toFixed(2)}

                </h2>

              </div>

              <FaMoneyBillWave
                size={42}
                className="text-green-600"
              />

            </div>

            <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">

              <div>

                <p className="text-gray-500">

                  Pendientes

                </p>

                <h2 className="text-4xl font-bold text-yellow-700">

                  {pendientes}

                </h2>

              </div>

              <FaClock
                size={42}
                className="text-yellow-500"
              />

            </div>

          </div>
                    {/* BUSCADOR */}

          <div className="bg-white rounded-2xl shadow p-6 mb-8">

            <div className="relative">

              <FaSearch
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="text"
                placeholder="Buscar por pedido, cliente o celular..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />

            </div>

          </div>

          {/* TABLA */}

          <div className="bg-white rounded-2xl shadow overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-black text-white">

                  <tr>

                    <th className="text-left p-4">
                      Pedido
                    </th>

                    <th className="text-left p-4">
                      Cliente
                    </th>

                    <th className="text-left p-4">
                      Celular
                    </th>

                    <th className="text-left p-4">
                      Total
                    </th>

                    <th className="text-left p-4">
                      Estado
                    </th>

                    <th className="text-center p-4">
                      Acción
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {pedidosFiltrados.length === 0 ? (

                    <tr>

                      <td
                        colSpan={6}
                        className="text-center p-10 text-gray-500"
                      >

                        No existen pedidos registrados.

                      </td>

                    </tr>

                  ) : (

                    pedidosFiltrados.map((pedido) => (

                      <tr
                        key={pedido.id}
                        className="border-b hover:bg-gray-50 transition"
                      >

                        <td className="p-4 font-semibold">

                          {pedido.numeroPedido}

                        </td>

                        <td className="p-4">

                          {pedido.cliente?.nombre}

                        </td>

                        <td className="p-4">

                          {pedido.cliente?.celular}

                        </td>

                        <td className="p-4 font-bold text-green-700">

                          S/ {Number(pedido.total || 0).toFixed(2)}

                        </td>

                        <td className="p-4">

                          <span
                            className={`px-4 py-2 rounded-full text-sm font-semibold ${colorEstado(
                              pedido.estado
                            )}`}
                          >

                            {pedido.estado}

                          </span>

                        </td>

                        <td className="p-4">

                          <div className="flex justify-center gap-2">

                            <Link
                              href={`/admin/pedidos/${pedido.numeroPedido}`}
                              className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                            >

                              <FaEye />

                              Ver

                            </Link>

                            <button
                              onClick={() => eliminar(pedido.id)}
                              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                            >

                              <FaTrash />

                              Eliminar

                            </button>

                          </div>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </section>

      </div>

    </main>

  );

}