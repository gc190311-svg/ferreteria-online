import "./globals.css";

import { CatalogoProvider } from "../components/context/CatalogoContext";

export const metadata = {
  title: "Brico Hogar Peru",
  description: "Tienda online de ferretería",
};

export default function RootLayout({ children }) {

  return (

    <html lang="es">

      <body>

        <CatalogoProvider>

          {children}

        </CatalogoProvider>

      </body>

    </html>

  );

}
