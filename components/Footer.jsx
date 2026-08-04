"use client";

import Link from "next/link";

import {
    FaFacebookF,
    FaInstagram,
    FaTiktok,
    FaWhatsapp,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock
} from "react-icons/fa";

export default function Footer() {

    return (

        <footer className="bg-neutral-900 text-white mt-20">

            <div className="max-w-7xl mx-auto px-6 py-14">

                {/* ========================= */}
                {/* COLUMNAS */}
                {/* ========================= */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-14">

                    {/* ========================= */}
                    {/* EMPRESA */}
                    {/* ========================= */}

                    <div>

                        <h3 className="text-xl font-bold border-l-4 border-yellow-400 pl-3 mb-6">

                            LA EMPRESA

                        </h3>

                        <ul className="space-y-4 text-gray-300">

                            <li>

                                <Link
                                    href="/nosotros"
                                    className="hover:text-yellow-400 hover:translate-x-1 transition-all duration-300"
                                >
                                    ¿Quiénes somos?
                                </Link>

                            </li>

                            <li>

                                <Link
                                    href="/despacho"
                                    className="hover:text-yellow-400 hover:translate-x-1 transition-all duration-300"
                                >
                                    Política de venta y despacho
                                </Link>

                            </li>

                            <li>

                                <Link
                                    href="/politica-privacidad"
                                    className="hover:text-yellow-400 hover:translate-x-1 transition-all duration-300"
                                >
                                    Política de Privacidad
                                </Link>

                            </li>

                            <li>

                                <Link
                                    href="/politica-cookies"
                                    className="hover:text-yellow-400 hover:translate-x-1 transition-all duration-300"
                                >
                                    Política de Cookies
                                </Link>

                            </li>

                            <li>

                                <Link
                                    href="/terminos"
                                    className="hover:text-yellow-400 hover:translate-x-1 transition-all duration-300"
                                >
                                    Términos y Condiciones
                                </Link>

                            </li>

                        </ul>

                    </div>

                    {/* ========================= */}
                    {/* ATENCIÓN */}
                    {/* ========================= */}

                    <div>

                        <h3 className="text-xl font-bold border-l-4 border-yellow-400 pl-3 mb-6">

                            ATENCIÓN AL CLIENTE

                        </h3>

                        <ul className="space-y-4 text-gray-300">

                            <li>

                                <Link
                                    href="/preguntas-frecuentes"
                                    className="hover:text-yellow-400 hover:translate-x-1 transition-all duration-300"
                                >
                                    Preguntas Frecuentes
                                </Link>

                            </li>

                            <li>

                                <Link
                                    href="/libro-reclamaciones"
                                    className="hover:text-yellow-400 hover:translate-x-1 transition-all duration-300"
                                >
                                   Libro de Reclamaciones
                                </Link>

                            </li>

                            <li>

                                <Link
                                    href="/garantias"
                                    className="hover:text-yellow-400 hover:translate-x-1 transition-all duration-300"
                                >
                                    Política de Garantías
                                </Link>

                            </li>

                            <li>

                                <Link
                                    href="/devoluciones"
                                    className="hover:text-yellow-400 hover:translate-x-1 transition-all duration-300"
                                >
                                    Política de Devoluciones
                                </Link>

                            </li>

                            <li>

                                <Link
                                    href="/aviso-privacidad"
                                    className="hover:text-yellow-400 hover:translate-x-1 transition-all duration-300"
                                >
                                    Aviso de Privacidad
                                </Link>

                            </li>

                        </ul>

                    </div>

                    

                                        {/* ========================= */}
                    {/* CONTACTO */}
                    {/* ========================= */}

                    <div>

                        <h3 className="text-xl font-bold border-l-4 border-yellow-400 pl-3 mb-6">

                            CONTACTO

                        </h3>

                        <div className="space-y-5 text-gray-300">

                            

                            <div className="flex items-center gap-3">

                                <FaPhoneAlt
                                    className="text-yellow-400"
                                />

                                <span>

                                    921 883 870

                                </span>

                            </div>

                            <div className="flex items-center gap-3">

                                <FaEnvelope
                                    className="text-yellow-400"
                                />

                                <span>

                                    ventas@bricohogarperu.com

                                </span>

                            </div>

                            <div className="flex items-center gap-3">

                                <FaWhatsapp
                                    className="text-green-500 text-xl"
                                />

                                <span>

                                    WhatsApp Ventas

                                </span>

                            </div>

                            <div className="flex items-start gap-3">

                                <FaClock
                                    className="text-yellow-400 mt-1"
                                />

                                <div>

                                    <strong className="text-white">

                                        Horario

                                    </strong>

                                    <br />

                                    Lunes a Sábado

                                    <br />

                                    08:00 am - 07:00 pm

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ========================= */}
                {/* DIVISIÓN */}
                {/* ========================= */}

                <div className="border-t border-neutral-700 my-10"></div>

                {/* ========================= */}
                {/* MEDIOS DE PAGO */}
                {/* ========================= */}

                <div className="flex flex-wrap justify-center items-center gap-8 mb-8">

    <img
        src="/medios-pago/visa.svg"
        alt="Visa"
        className="h-12 md:h-14 object-contain transition-all duration-300 hover:scale-110"
    />

    <img
        src="/medios-pago/mastercard.svg"
        alt="Mastercard"
        className="h-12 md:h-14 object-contain transition-all duration-300 hover:scale-110"
    />

    <img
        src="/medios-pago/yape.svg"
        alt="Yape"
        className="h-12 md:h-14 object-contain transition-all duration-300 hover:scale-110"
    />

    <img
        src="/medios-pago/plin.svg"
        alt="Plin"
        className="h-12 md:h-14 object-contain transition-all duration-300 hover:scale-110"
    />

    <img
        src="/medios-pago/pagoefectivo.svg"
        alt="PagoEfectivo"
        className="h-12 md:h-14 object-contain transition-all duration-300 hover:scale-110"
    />

</div>

                {/* ========================= */}
                {/* REDES SOCIALES */}
                {/* ========================= */}

               <div className="flex flex-wrap justify-center items-center gap-6 mb-8">

    <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-3xl text-white hover:text-yellow-400 transition"
    >
        <FaFacebookF />
    </a>

    <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-3xl text-white hover:text-yellow-400 transition"
    >
        <FaInstagram />
    </a>

    <a
        href="https://tiktok.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-3xl text-white hover:text-yellow-400 transition"
    >
        <FaTiktok />
    </a>

    <Link
        href="/libro-reclamaciones"
        className="transition hover:scale-105"
        title="Libro de Reclamaciones"
    >
        <img
            src="/libro-reclamaciones.png"
            alt="Libro de Reclamaciones"
            className="w-24 hover:scale-110 transition duration-300"
        />
    </Link>

</div>


                {/* ========================= */}
                {/* COPYRIGHT */}
                {/* ========================= */}

                <div className="border-t border-neutral-700 pt-6 text-center">

                    <p className="text-gray-400">

                        © 2026

                        <span className="font-semibold text-white">

                            {" "}BRICO HOGAR PERÚ
                            

                        </span>

                    </p>

                    <p className="text-gray-500 text-sm mt-2">

                        Todos los derechos reservados.

                    </p>

                </div>

            </div>

        </footer>

    );

}