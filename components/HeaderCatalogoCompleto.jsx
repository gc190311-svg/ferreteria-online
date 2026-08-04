"use client";

import TopBar from "./TopBar";
import HeaderCatalogo from "./HeaderCatalogo";
import Navbar from "./Navbar";

import HeaderSticky from "./layout/HeaderSticky";

export default function HeaderCatalogoCompleto({
    categoriaSeleccionada,
    setCategoriaSeleccionada,
}) {

    return (

        <HeaderSticky

            top={<TopBar />}

            header={<HeaderCatalogo />}

            navbar={

                <Navbar

                    categoriaSeleccionada={categoriaSeleccionada}

                    setCategoriaSeleccionada={setCategoriaSeleccionada}

                />

            }

        />

    );

}