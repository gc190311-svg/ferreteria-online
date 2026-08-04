"use client";

import { useState } from "react";
import { guardarReclamo } from "../services/ReclamosService";

import HeaderCompleto from "../../components/HeaderCompleto";
import Footer from "../../components/Footer";

export default function LibroReclamacionesPage() {

    const formularioInicial = {

        nombre: "",
        apellido: "",
        tipoDocumento: "DNI",
        documento: "",
        telefono: "",
        correo: "",
        direccion: "",
        departamento: "",
        provincia: "",
        distrito: "",
        pedido: "",
        tipoReclamo: "Reclamo",
        producto: "",
        descripcion: "",
        solicitud: "",

    };

    const [formulario, setFormulario] = useState(formularioInicial);
    const [guardando, setGuardando] = useState(false);

    function cambiar(e) {

        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value,
        });

    }

    async function enviar(e) {

        e.preventDefault();

        try {

            setGuardando(true);

            await guardarReclamo(formulario);

            alert("Su reclamo fue enviado correctamente.");

            setFormulario(formularioInicial);

        } catch (error) {

            console.error(error);

            alert("Ocurrió un error al enviar el reclamo.");

        } finally {

            setGuardando(false);

        }

    }

    return (

        <>

            <HeaderCompleto />

            <main className="bg-gray-100 min-h-screen py-12">

                <div className="max-w-6xl mx-auto px-5">

                    <h1 className="text-4xl font-bold text-center mb-10">
                        Libro de Reclamaciones
                    </h1>

                    <form
                        onSubmit={enviar}
                        className="bg-white rounded-2xl shadow-xl p-8"
                    >

                        <h2 className="text-2xl font-bold mb-6">
                            Datos del consumidor
                        </h2>

                        <div className="grid md:grid-cols-2 gap-5">

                            <input
                                name="nombre"
                                value={formulario.nombre}
                                onChange={cambiar}
                                placeholder="Nombre"
                                className="border rounded-lg p-3"
                                required
                            />

                            <input
                                name="apellido"
                                value={formulario.apellido}
                                onChange={cambiar}
                                placeholder="Apellido"
                                className="border rounded-lg p-3"
                                required
                            />

                            <select
                                name="tipoDocumento"
                                value={formulario.tipoDocumento}
                                onChange={cambiar}
                                className="border rounded-lg p-3"
                            >
                                <option>DNI</option>
                                <option>CE</option>
                                <option>Pasaporte</option>
                            </select>

                            <input
                                name="documento"
                                value={formulario.documento}
                                onChange={cambiar}
                                placeholder="Número de documento"
                                className="border rounded-lg p-3"
                                required
                            />

                            <input
                                name="telefono"
                                value={formulario.telefono}
                                onChange={cambiar}
                                placeholder="Teléfono"
                                className="border rounded-lg p-3"
                                required
                            />

                            <input
                                type="email"
                                name="correo"
                                value={formulario.correo}
                                onChange={cambiar}
                                placeholder="Correo electrónico"
                                className="border rounded-lg p-3"
                                required
                            />

                        </div>

                        <input
                            name="direccion"
                            value={formulario.direccion}
                            onChange={cambiar}
                            placeholder="Dirección"
                            className="border rounded-lg p-3 mt-5 w-full"
                            required
                        />

                        <div className="grid md:grid-cols-3 gap-5 mt-5">

                            <input
                                name="departamento"
                                value={formulario.departamento}
                                onChange={cambiar}
                                placeholder="Departamento"
                                className="border rounded-lg p-3"
                            />

                            <input
                                name="provincia"
                                value={formulario.provincia}
                                onChange={cambiar}
                                placeholder="Provincia"
                                className="border rounded-lg p-3"
                            />

                            <input
                                name="distrito"
                                value={formulario.distrito}
                                onChange={cambiar}
                                placeholder="Distrito"
                                className="border rounded-lg p-3"
                            />

                        </div>

                        <hr className="my-8"/>

                        <h2 className="text-2xl font-bold mb-6">
                            Datos del reclamo
                        </h2>

                        <div className="grid md:grid-cols-2 gap-5">

                            <input
                                name="pedido"
                                value={formulario.pedido}
                                onChange={cambiar}
                                placeholder="Número de pedido"
                                className="border rounded-lg p-3"
                            />

                            <select
                                name="tipoReclamo"
                                value={formulario.tipoReclamo}
                                onChange={cambiar}
                                className="border rounded-lg p-3"
                            >
                                <option>Reclamo</option>
                                <option>Queja</option>
                            </select>

                        </div>
                                                <input
                            name="producto"
                            value={formulario.producto}
                            onChange={cambiar}
                            placeholder="Producto o servicio"
                            className="border rounded-lg p-3 mt-5 w-full"
                            required
                        />

                        <textarea
                            name="descripcion"
                            value={formulario.descripcion}
                            onChange={cambiar}
                            rows={6}
                            placeholder="Descripción del reclamo"
                            className="border rounded-lg p-3 mt-5 w-full resize-none"
                            required
                        />

                        <textarea
                            name="solicitud"
                            value={formulario.solicitud}
                            onChange={cambiar}
                            rows={4}
                            placeholder="¿Qué solicita el consumidor?"
                            className="border rounded-lg p-3 mt-5 w-full resize-none"
                            required
                        />

                        <div className="mt-8 bg-gray-50 border rounded-lg p-5">

                            <p className="text-sm text-gray-600 leading-7">

                                Conforme al Código de Protección y Defensa del
                                Consumidor, la formulación del reclamo no impide
                                acudir a otras vías de solución de controversias
                                ni constituye un requisito previo para interponer
                                una denuncia ante INDECOPI.

                            </p>

                        </div>

                        <div className="flex justify-end mt-8">

                            <button
                                type="submit"
                                disabled={guardando}
                                className="
                                    bg-yellow-500
                                    hover:bg-yellow-600
                                    disabled:bg-gray-400
                                    text-black
                                    font-bold
                                    px-8
                                    py-3
                                    rounded-lg
                                    transition
                                "
                            >

                                {guardando
                                    ? "Enviando..."
                                    : "Enviar Reclamo"}

                            </button>

                        </div>

                    </form>

                </div>

            </main>

            <Footer />

        </>

    );

}