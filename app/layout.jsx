import "./globals.css";

import { CatalogoProvider } from "../components/context/CatalogoContext";
import { CarritoProvider } from "../components/context/CarritoContext";

export const metadata = {
  title: "Brico Hogar Peru",
  description: "Tienda online de ferretería",
};

export default function RootLayout({ children }) {

  return (

    <html lang="es">

   <body>

  <CarritoProvider>

    <CatalogoProvider>

      {children}

    </CatalogoProvider>

  </CarritoProvider>

</body>

    </html>

  );

}
