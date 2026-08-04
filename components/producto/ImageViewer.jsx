"use client";

import { useEffect, useState } from "react";

export default function ImageViewer({
    imagenes = [],
    nombre,
    imagenActiva,
    setImagenActiva,
}) {

    const [modalAbierto, setModalAbierto] = useState(false);
    const [zoom, setZoom] = useState(1);

    useEffect(() => {

        const cerrar = (e) => {
            if (e.key === "Escape") {
                setModalAbierto(false);
                setZoom(1);
            }
        };

        window.addEventListener("keydown", cerrar);

        return () => window.removeEventListener("keydown", cerrar);

    }, []);

    const siguiente = () => {

        setImagenActiva(
            imagenActiva === imagenes.length - 1
                ? 0
                : imagenActiva + 1
        );

        setZoom(1);

    };

    const anterior = () => {

        setImagenActiva(
            imagenActiva === 0
                ? imagenes.length - 1
                : imagenActiva - 1
        );

        setZoom(1);

    };

    const wheelZoom = (e) => {

        e.preventDefault();

        if (e.deltaY < 0) {

            setZoom((z) => Math.min(z + 0.2, 4));

        } else {

            setZoom((z) => Math.max(z - 0.2, 1));

        }

        };

    return (
        <>
            <div className="relative w-full">

                {/* Imagen principal */}
                <div className="relative flex items-center justify-center">

                    <img
                        src={imagenes[imagenActiva]}
                        alt={nombre}
                        onClick={() => setModalAbierto(true)}
                        className="object-contain w-full h-full p-10 cursor-zoom-in transition duration-300 hover:scale-105"
                    />

                    {imagenes.length > 1 && (
                        <>
                            <button
                                onClick={anterior}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg w-10 h-10 hover:bg-yellow-500 hover:text-white transition"
                            >
                                ◀
                            </button>

                            <button
                                onClick={siguiente}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg w-10 h-10 hover:bg-yellow-500 hover:text-white transition"
                            >
                                ▶
                            </button>
                        </>
                    )}
                </div>

              

                {/* Modal */}
                {modalAbierto && (
                    <div
                        onClick={() => {
                            setModalAbierto(false);
                            setZoom(1);
                        }}
                        className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center"
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full h-full flex items-center justify-center overflow-hidden"
                        >

                            <img
                                src={imagenes[imagenActiva]}
                                alt={nombre}
                                onWheel={wheelZoom}
                                style={{
                                    transform: `scale(${zoom})`,
                                    transition: "transform .2s"
                                }}
                                className="max-w-[90%] max-h-[90%] object-contain"
                            />

                            <button
                                onClick={() => {
                                    setModalAbierto(false);
                                    setZoom(1);
                                }}
                                className="absolute top-5 right-5 bg-white rounded-full w-12 h-12 text-xl"
                            >
                                ✕
                            </button>

                            {imagenes.length > 1 && (
                                <>
                                    <button
                                        onClick={anterior}
                                        className="absolute left-6 text-white text-5xl"
                                    >
                                        ‹
                                    </button>

                                    <button
                                        onClick={siguiente}
                                        className="absolute right-6 text-white text-5xl"
                                    >
                                        ›
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}