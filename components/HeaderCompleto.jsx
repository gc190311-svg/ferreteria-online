"use client";

import HeaderHome from "./HeaderHome";
import Navbar from "./Navbar";
import HeaderSticky from "./layout/HeaderSticky";
import TopBannerSlider from "./TopBannerSlider";

export default function HeaderCompleto({
  categoriaSeleccionada,
  setCategoriaSeleccionada,
}) {
  return (
    <HeaderSticky
      top={<TopBannerSlider />}
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