"use client";

import TopBar from "./TopBar";
import HeaderHome from "./HeaderHome";
import Navbar from "./Navbar";

import HeaderSticky from "./layout/HeaderSticky";

export default function HeaderCompleto({

    categoriaSeleccionada,

    setCategoriaSeleccionada,

}) {

    return (

        <HeaderSticky

            top={<TopBar />}

            header={<HeaderHome />}

            navbar={

                <Navbar

                    categoriaSeleccionada={categoriaSeleccionada}

                    setCategoriaSeleccionada={setCategoriaSeleccionada}

                />

            }

        />

    );

}