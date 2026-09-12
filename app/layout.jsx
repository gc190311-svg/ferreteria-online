import "./globals.css";
import { CatalogoProvider } from "../components/context/CatalogoContext";
import { CarritoProvider } from "../components/context/CarritoContext";
import { CheckoutProvider } from "../components/context/CheckoutContext";
import CarritoGlobal from "../components/CarritoGlobal";
import { AuthProvider } from "../components/context/AuthContext";

const URL_BASE = "https://bricohogarperu.vercel.app";

export const metadata = {
  metadataBase: new URL(URL_BASE),
  title: {
    default: "Brico Hogar Perú | Ferretería en Lima",
    template: "%s | Brico Hogar Perú",
  },
  description:
    "Brico Hogar Perú: ferretería en Lima con herramientas, pinturas, electricidad, gasfitería y materiales para construcción. Compra online y consulta delivery.",
  keywords: [
    "Brico Hogar Perú",
    "Brico Hogar",
    "ferretería en Lima",
    "ferretería San Luis",
    "ferretería online Lima",
    "herramientas Lima",
    "pinturas Lima",
    "electricidad Lima",
    "gasfitería Lima",
    "materiales de construcción Lima",
  ],
  alternates: { canonical: URL_BASE },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Brico Hogar Perú | Ferretería en Lima",
    description:
      "Herramientas, pinturas, electricidad, gasfitería y materiales para tus proyectos. Compra online en Brico Hogar Perú.",
    url: URL_BASE,
    siteName: "Brico Hogar Perú",
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brico Hogar Perú | Ferretería en Lima",
    description:
      "Ferretería en Lima: herramientas, pinturas, electricidad, gasfitería y materiales de construcción.",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HardwareStore",
  "@id": `${URL_BASE}/#localbusiness`,
  name: "Brico Hogar Perú",
  url: URL_BASE,
  telephone: "+51 921 883 870",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Avenida Agustín de la Rosa Toro 896",
    addressLocality: "San Luis",
    addressRegion: "Lima",
    postalCode: "15021",
    addressCountry: "PE",
  },
  areaServed: { "@type": "City", name: "Lima" },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${URL_BASE}/#website`,
  name: "Brico Hogar Perú",
  url: URL_BASE,
  inLanguage: "es-PE",
  publisher: { "@id": `${URL_BASE}/#localbusiness` },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-PE">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <AuthProvider>
          <CheckoutProvider>
            <CarritoProvider>
              <CatalogoProvider>
                {children}
                <CarritoGlobal />
              </CatalogoProvider>
            </CarritoProvider>
          </CheckoutProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
