

import Link from "next/link";

import {
    FaFacebookF,
    FaInstagram,
    FaTiktok,
    FaWhatsapp,
    FaPhoneAlt,
    FaEnvelope,
    FaClock
} from "react-icons/fa";

export default function Footer() {

    return (
        <footer className="footer-brico">

            <div className="footer-container">

                {/* =====================================================
                    COLUMNAS PRINCIPALES
                ===================================================== */}

                <div className="footer-columnas">

                    {/* =================================================
                        LA EMPRESA
                    ================================================= */}

                    <div className="footer-seccion">

                        <h3 className="footer-titulo">
                            <span className="footer-linea"></span>
                            LA EMPRESA
                        </h3>

                        <ul className="footer-links">

                            <li>
                                <Link href="/nosotros">
                                    ¿Quiénes somos?
                                </Link>
                            </li>

                            <li>
                                <Link href="/despacho">
                                    Política de venta y despacho
                                </Link>
                            </li>

                            <li>
                                <Link href="/politica-privacidad">
                                    Política de Privacidad
                                </Link>
                            </li>

                            <li>
                                <Link href="/politica-cookies">
                                    Política de Cookies
                                </Link>
                            </li>

                            <li>
                                <Link href="/terminos">
                                    Términos y Condiciones
                                </Link>
                            </li>

                        </ul>

                    </div>


                    {/* =================================================
                        ATENCIÓN AL CLIENTE
                    ================================================= */}

                    <div className="footer-seccion">

                        <h3 className="footer-titulo">
                            <span className="footer-linea"></span>
                            ATENCIÓN AL CLIENTE
                        </h3>

                        <ul className="footer-links">

                            <li>
                                <Link href="/preguntas-frecuentes">
                                    Preguntas Frecuentes
                                </Link>
                            </li>

                            <li>
                                <Link href="/libro-reclamaciones">
                                    Libro de Reclamaciones
                                </Link>
                            </li>

                            <li>
                                <Link href="/garantias">
                                    Política de Garantías
                                </Link>
                            </li>

                            <li>
                                <Link href="/devoluciones">
                                    Política de Devoluciones
                                </Link>
                            </li>

                            <li>
                                <Link href="/aviso-privacidad">
                                    Aviso de Privacidad
                                </Link>
                            </li>

                        </ul>

                    </div>


                    {/* =================================================
                        CONTACTO
                    ================================================= */}

                    <div className="footer-seccion footer-contacto">

                        <h3 className="footer-titulo">
                            <span className="footer-linea"></span>
                            CONTACTO
                        </h3>


                        <div className="contacto-lista">

                            {/* TELÉFONO */}

                            <div className="contacto-item">

                                <div className="contacto-icono amarillo">
                                    <FaPhoneAlt />
                                </div>

                                <div className="contacto-info">
                                    <span>
                                        921 883 870
                                    </span>
                                </div>

                            </div>


                            {/* CORREO */}

                            <div className="contacto-item">

                                <div className="contacto-icono amarillo">
                                    <FaEnvelope />
                                </div>

                                <div className="contacto-info">
                                    <span>
                                        ventas@bricohogarperu.com
                                    </span>
                                </div>

                            </div>


                            {/* WHATSAPP */}

                            <div className="contacto-item">

                                <div className="contacto-icono whatsapp">
                                    <FaWhatsapp />
                                </div>

                                <div className="contacto-info">
                                    <span>
                                        WhatsApp Ventas
                                    </span>
                                </div>

                            </div>


                            {/* HORARIO */}

                            <div className="horario-item">

                                <div className="contacto-icono amarillo">
                                    <FaClock />
                                </div>

                                <div className="horario-info">

                                    <strong>
                                        Horario de atención
                                    </strong>

                                    <span>
                                        Lunes a Sábado
                                    </span>

                                    <span>
                                        08:00 am - 07:00 pm
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =====================================================
                    SEPARADOR
                ===================================================== */}

                <div className="footer-separador"></div>


                {/* =====================================================
                    MEDIOS DE PAGO
                ===================================================== */}

                <div className="pagos">

                    <h3 className="titulo-pagos">
                        Medios de pago
                    </h3>

                    <div className="pagos-lista">

                        <img
                            src="/medios-pago/visa.svg"
                            alt="Visa"
                        />

                        <img
                            src="/medios-pago/mastercard.svg"
                            alt="Mastercard"
                        />

                        <img
                            src="/medios-pago/yape.svg"
                            alt="Yape"
                        />

                        <img
                            src="/medios-pago/plin.svg"
                            alt="Plin"
                        />

                        <img
                            src="/medios-pago/pagoefectivo.svg"
                            alt="PagoEfectivo"
                        />

                    </div>

                </div>


                {/* =====================================================
                    SEPARADOR
                ===================================================== */}

                <div className="footer-separador redes-separador"></div>

                {/* =====================================================
                    COPYRIGHT
                ===================================================== */}

                <div className="copyright">

                    <p>
                        © 2026{" "}
                        <strong>
                            BRICO HOGAR PERÚ
                        </strong>
                    </p>

                    <span>
                        Todos los derechos reservados.
                    </span>

                </div>

            </div>

            {/* =========================================================
                ESTILOS
            ========================================================= */}

            <style jsx>{`

                /* =====================================================
                   FOOTER GENERAL
                ===================================================== */

                .footer-brico {
                    width: 100%;
                    background: #111111;
                    color: white;
                    margin-top: 80px;
                    overflow: hidden;
                }


                .footer-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 55px 30px 30px;
                }


                /* =====================================================
                   COLUMNAS
                ===================================================== */

                .footer-columnas {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 60px;
                }


                /* =====================================================
                   TÍTULOS
                ===================================================== */

                .footer-titulo {
                    display: flex;
                    align-items: center;
                    gap: 12px;

                    margin: 0 0 24px;

                    color: #ffffff;

                    font-size: 20px;
                    font-weight: 800;
                }


                .footer-linea {
                    width: 4px;
                    height: 29px;

                    background: #f2c300;

                    flex-shrink: 0;
                }


                /* =====================================================
                   LINKS
                ===================================================== */

                .footer-links {
                    list-style: none;

                    padding: 0;
                    margin: 0;

                    display: flex;
                    flex-direction: column;

                    gap: 15px;
                }


                .footer-links li {
                    margin: 0;
                }


                .footer-links a {
                    display: inline-block;

                    color: #d0d3d8;

                    text-decoration: none;

                    font-size: 16px;
                    line-height: 1.4;

                    transition:
                        color .2s ease,
                        transform .2s ease;
                }


                .footer-links a:hover {
                    color: #f2c300;

                    transform: translateX(4px);
                }


                /* =====================================================
                   CONTACTO
                ===================================================== */

                .contacto-lista {
                    display: flex;
                    flex-direction: column;

                    gap: 15px;
                }


                .contacto-item {
                    display: flex;
                    align-items: center;

                    gap: 13px;

                    color: #d0d3d8;

                    min-height: 40px;
                }


                .contacto-icono {
                    width: 38px;
                    height: 38px;

                    flex-shrink: 0;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 50%;

                    font-size: 17px;
                }


                .contacto-icono.amarillo {
                    background: #f2c300;
                    color: #111111;
                }


                .contacto-icono.whatsapp {
                    background: transparent;

                    color: #25d366;

                    font-size: 25px;
                }


                .contacto-info {
                    min-width: 0;
                }


                .contacto-info span {
                    font-size: 15px;

                    color: #d0d3d8;
                }


                /* =====================================================
                   HORARIO
                ===================================================== */

                .horario-item {
                    display: flex;
                    align-items: flex-start;

                    gap: 13px;

                    margin-top: 2px;

                    color: #d0d3d8;
                }


                .horario-info {
                    display: flex;
                    flex-direction: column;

                    gap: 3px;

                    font-size: 14px;

                    line-height: 1.35;
                }


                .horario-info strong {
                    color: white;

                    font-size: 15px;

                    margin-bottom: 1px;
                }


                /* =====================================================
                   SEPARADORES
                ===================================================== */

                .footer-separador {
                    width: 100%;
                    height: 1px;

                    background: #343434;

                    margin: 42px 0 28px;
                }


                /* =====================================================
                   MEDIOS DE PAGO
                ===================================================== */

                .pagos {
                    width: 100%;
                }


                .titulo-pagos {
                    display: none;

                    margin: 0 0 20px;

                    color: #ffffff;

                    font-size: 20px;
                    font-weight: 700;
                }


                .pagos-lista {
                    display: flex;

                    align-items: center;
                    justify-content: center;

                    gap: 38px;
                }


                .pagos-lista img {
                    height: 48px;

                    width: auto;

                    object-fit: contain;

                    transition: transform .2s ease;
                }


                .pagos-lista img:hover {
                    transform: scale(1.08);
                }


                /* =====================================================
                   REDES
                ===================================================== */

                .redes-separador {
                    margin-top: 32px;
                }


                .redes-contenedor {
                    width: 100%;
                }


                .titulo-redes {
                    display: none;

                    color: #ffffff;

                    font-size: 20px;
                    font-weight: 700;

                    margin-bottom: 20px;
                }


                .redes {
                    display: flex;

                    align-items: center;
                    justify-content: center;

                    gap: 30px;
                }


                .redes-lista {
                    display: flex;

                    align-items: center;

                    gap: 18px;
                }


                .redes-lista a {
                    width: 48px;
                    height: 48px;

                    border-radius: 50%;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    background: #202020;

                    color: #ffffff;

                    font-size: 21px;

                    text-decoration: none;

                    transition:
                        background .2s ease,
                        color .2s ease,
                        transform .2s ease;
                }


                .redes-lista a:hover {
                    background: #f2c300;

                    color: #111111;

                    transform: translateY(-3px);
                }


                .redes-linea {
                    width: 1px;
                    height: 48px;

                    background: #454545;
                }


                /* =====================================================
                   LIBRO DE RECLAMACIONES
                ===================================================== */

                .libro {
                    display: flex;
                        align-items: center;
                        justify-content: center;
                        flex: 0 0 auto;
                        width: 155px;
                }


                .libro img {
                    width: 145px;

                    height: auto;

                    object-fit: contain;

                    transition: transform .2s ease;
                }


                .libro:hover img {
                    transform: scale(1.04);
                }


                /* =====================================================
                   COPYRIGHT
                ===================================================== */

                .copyright {
                    border-top: 1px solid #343434;

                    margin-top: 35px;

                    padding-top: 23px;

                    text-align: center;
                }


                .copyright p {
                    margin: 0;

                    color: #aeb2b8;

                    font-size: 15px;
                }


                .copyright strong {
                    color: white;
                }


                .copyright span {
                    display: block;

                    margin-top: 7px;

                    color: #686d74;

                    font-size: 13px;
                }


                /* =====================================================
                   TABLET
                ===================================================== */

                @media (max-width: 900px) {

                    .footer-columnas {
                        gap: 30px;
                    }


                    .footer-container {
                        padding-left: 22px;
                        padding-right: 22px;
                    }


                    .pagos-lista {
                        gap: 25px;
                    }

                }


                /* =====================================================
                   MÓVIL
                ===================================================== */

                @media (max-width: 600px) {

                    .footer-brico {
                        margin-top: 45px;

                        background:
                            linear-gradient(
                                180deg,
                                #111111 0%,
                                #151515 100%
                            );
                    }


                    .footer-container {
                        width: 100%;

                        padding:
                            32px 16px 22px;

                        box-sizing: border-box;
                    }


                    /* =================================================
                       COLUMNAS MÓVIL
                    ================================================= */

                    .footer-columnas {
                        display: flex;

                        flex-direction: column;

                        gap: 0;
                    }


                    .footer-seccion {
                        padding:
                            0 4px 23px;

                        margin-bottom: 22px;

                        border-bottom:
                            1px solid #303030;
                    }


                    .footer-contacto {
                        border-bottom: none;

                        margin-bottom: 0;

                        padding-bottom: 3px;
                    }


                    /* =================================================
                       TÍTULOS MÓVIL
                    ================================================= */

                    .footer-titulo {
                        font-size: 19px;

                        margin-bottom: 17px;

                        gap: 11px;
                    }


                    .footer-linea {
                        width: 4px;

                        height: 28px;
                    }


                    /* =================================================
                       LINKS MÓVIL
                    ================================================= */

                    .footer-links {
                        gap: 9px;
                    }


                    .footer-links a {
                        display: block;

                        padding: 2px 0;

                        font-size: 15px;

                        line-height: 1.45;

                        color: #d0d3d8;
                    }


                    /* =================================================
                       CONTACTO MÓVIL
                    ================================================= */

                    .contacto-lista {
                        gap: 9px;
                    }


                    .contacto-item,
                    .horario-item {
                        padding:
                            10px 12px;

                        border-radius: 13px;

                        background: #191919;

                        border:
                            1px solid #2b2b2b;

                        box-sizing: border-box;
                    }


                    .contacto-item {
                        min-height: 57px;

                        align-items: center;
                    }


                    .contacto-icono {
                        width: 38px;
                        height: 38px;
                    }


                    .contacto-info span {
                        font-size: 14px;
                    }


                    .contacto-icono.whatsapp {
                        font-size: 24px;
                    }


                    /* =================================================
                       HORARIO MÓVIL
                    ================================================= */

                    .horario-item {
                        min-height: 82px;

                        padding:
                            13px 12px;
                    }


                    .horario-info {
                        font-size: 13px;

                        gap: 3px;
                    }


                    .horario-info strong {
                        font-size: 15px;
                    }


                    /* =================================================
                       SEPARADOR MÓVIL
                    ================================================= */

                    .footer-separador {
                        margin:
                            25px 4px 22px;
                    }


                   /* =================================================
   MEDIOS DE PAGO MÓVIL
================================================= */

.titulo-pagos {
    display: block;
    text-align: left;
    margin-bottom: 18px;
}

.pagos-lista {
    width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 14px;
                        padding: 0;
                        box-sizing: border-box;
}

.pagos-lista img {
    width: auto;
    height: 45px;

    max-width: none;

    object-fit: contain;

    flex-shrink: 0;
}

                    /* =================================================
                       REDES MÓVIL
                    ================================================= */

                    .redes-separador {
                        margin:
                            27px 4px 25px;
                    }


                    .titulo-redes {
                        display: block;
                    }


                    .redes {
                        width: 100%;

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        gap: 28px;

                        padding:
                            0 8px;

                        box-sizing: border-box;
                    }


                    .redes-lista {
                        display: flex;

                        align-items: center;

                        gap: 16px;

                        flex-shrink: 0;
                    }


                    .redes-lista a {
                        width: 54px;
                        height: 54px;

                        border-radius: 50%;

                        display: flex;

                        align-items: center;
                        justify-content: center;

                        background: #202020;

                        color: #ffffff;

                        font-size: 23px;

                        text-decoration: none;
                    }


                    .redes-linea {
                        width: 1px;

                        height: 54px;

                        background: #454545;

                        flex-shrink: 0;
                    }


                    /* =================================================
                       LIBRO DE RECLAMACIONES MÓVIL
                    ================================================= */

                    .libro {
                        display: flex;

                        align-items: center;
                        justify-content: center;

                        flex: 0 0 auto;

                        width: 190px;
                    }


                    .libro img {
                        display: block;

                        width: 155px;

                        height: 62px;

                        object-fit: contain;
                    }


                    .libro:hover img {
                        transform: scale(1.03);
                    }


                    /* =================================================
                       COPYRIGHT MÓVIL
                    ================================================= */

                    .copyright {
                        margin-top: 24px;

                        padding-top: 18px;
                    }


                    .copyright p {
                        font-size: 14px;
                    }


                    .copyright span {
                        font-size: 12px;

                        margin-top: 6px;
                    }

                }


                /* =====================================================
                   TELÉFONOS PEQUEÑOS
                ===================================================== */

                @media (max-width: 380px) {

                    .footer-container {
                        padding-left: 12px;
                        padding-right: 12px;
                    }


                    .footer-titulo {
                        font-size: 18px;
                    }


                    .footer-links a {
                        font-size: 14px;
                    }


                    .contacto-info span {
                        font-size: 13px;
                    }


                    .pagos-lista {
                        gap: 4px;

                        padding-left: 3px;
                        padding-right: 3px;
                    }


                    .pagos-lista img {
                        height: 45px;
                    }


                    .redes {
                        gap: 16px;

                        padding:
                            0 3px;
                    }


                    .redes-lista {
                        gap: 8px;
                    }


                    .redes-lista a {
                        width: 46px;
                        height: 46px;

                        font-size: 20px;
                    }


                    .redes-linea {
                        height: 46px;
                    }


                    .libro {
                        width: 140px;
                    }


                    .libro img {
                        width: 140px;

                        height: 58px;
                    }

                }

            `}</style>

        </footer>
    );
}