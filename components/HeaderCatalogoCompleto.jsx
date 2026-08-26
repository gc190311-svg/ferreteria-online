"use client";

import TopBannerSlider from "./TopBannerSlider";
import HeaderCatalogo from "./HeaderCatalogo";
import Navbar from "./Navbar";

import HeaderSticky from "./layout/HeaderSticky";

export default function HeaderCatalogoCompleto({
    categoriaSeleccionada,
    setCategoriaSeleccionada,
}) {
    return (
        <HeaderSticky
            top={<TopBannerSlider />}
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