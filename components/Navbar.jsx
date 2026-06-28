"use client";

import NavbarDesktop from "./navbar/NavbarDesktop";
import NavbarMobile from "./navbar/NavbarMobile";

export default function Navbar(props) {

  return (

    <>

      {/* Escritorio */}

      <div className="hidden lg:block">

        <NavbarDesktop {...props} />

      </div>

      {/* Celular */}

      <div className="lg:hidden">

        <NavbarMobile {...props} />

      </div>

    </>

  );

}
