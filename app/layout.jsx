import "./globals.css";

import { CatalogoProvider } from "../components/context/CatalogoContext";
import { CarritoProvider } from "../components/context/CarritoContext";
import { CheckoutProvider } from "../components/context/CheckoutContext";
import CarritoGlobal from "../components/CarritoGlobal";


export const metadata = {
  title: "Brico Hogar Peru",
  description: "Tienda online de ferretería",
};

export default function RootLayout({ children }) {

  return (

    <html lang="es">

   <body>

  <CheckoutProvider>

    <CarritoProvider>

      <CatalogoProvider>

        {children}

        <CarritoGlobal />

      </CatalogoProvider>

    </CarritoProvider>

  </CheckoutProvider>

</body> 

    </html>

  );

}
