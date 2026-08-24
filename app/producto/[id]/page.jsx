import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import ProductoDetalleClient from "./ProductoDetalleClient";

const URL_BASE = "https://bricohogarperu.vercel.app";

export async function generateMetadata({ params }) {
  const docRef = doc(db, "productos", params.id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return {
      title: "Producto no encontrado | Brico Hogar Perú",
      description: "Producto no encontrado en Brico Hogar Perú.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const producto = docSnap.data();

  const nombre = producto.nombre || "Producto";
  const marca = producto.marca || "";
  const sku = producto.sku || "";

  const precioNumero = Number(
    producto.oferta || producto.precio || 0
  );

  const precio = precioNumero.toFixed(2);

  const descripcion =
    producto.descripcion ||
    `Compra ${nombre}${
      marca ? ` de la marca ${marca}` : ""
    } en Brico Hogar Perú. Precio S/ ${precio}.`;

  const imagen =
    producto.imagenes?.[0] ||
    producto.imagen ||
    `${URL_BASE}/sin-imagen.png`;

  const urlProducto = `${URL_BASE}/producto/${params.id}`;

  return {
    title: `${nombre}${marca ? ` | ${marca}` : ""} | Brico Hogar Perú`,

    description: descripcion.slice(0, 160),

    keywords: [
      nombre,
      marca,
      sku,
      "ferretería",
      "ferretería Lima",
      "herramientas",
      "materiales de construcción",
      "Brico Hogar Perú",
    ].filter(Boolean),

    alternates: {
      canonical: urlProducto,
    },

    openGraph: {
      title: `${nombre}${marca ? ` | ${marca}` : ""} | Brico Hogar Perú`,
      description: descripcion.slice(0, 160),
      url: urlProducto,
      siteName: "Brico Hogar Perú",
      locale: "es_PE",
      type: "website",
      images: [
        {
          url: imagen,
          width: 1200,
          height: 1200,
          alt: nombre,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${nombre}${marca ? ` | ${marca}` : ""} | Brico Hogar Perú`,
      description: descripcion.slice(0, 160),
      images: [imagen],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function Page({ params }) {
  const docRef = doc(db, "productos", params.id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return <ProductoDetalleClient params={params} />;
  }

  const producto = docSnap.data();

  const nombre = producto.nombre || "Producto";
  const marca = producto.marca || "";
  const sku = producto.sku || "";

  const precioNumero = Number(
    producto.oferta || producto.precio || 0
  );

  const precio = precioNumero.toFixed(2);

  const descripcion =
    producto.descripcion ||
    `Compra ${nombre}${
      marca ? ` de la marca ${marca}` : ""
    } en Brico Hogar Perú. Precio S/ ${precio}.`;

  const imagenes = Array.isArray(producto.imagenes)
    ? producto.imagenes.filter(Boolean)
    : [];

  const imagenPrincipal =
    imagenes[0] ||
    producto.imagen ||
    `${URL_BASE}/sin-imagen.png`;

  const urlProducto = `${URL_BASE}/producto/${params.id}`;

  /*
   * Determinar disponibilidad según el stock.
   */
  const stock = Number(producto.stock || 0);

  const disponibilidad =
    stock > 0
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock";

  /*
   * Datos estructurados para Google.
   */
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: nombre,

    description: descripcion,

    image:
      imagenes.length > 0
        ? imagenes
        : [imagenPrincipal],

    sku: sku || undefined,

    brand: marca
      ? {
          "@type": "Brand",
          name: marca,
        }
      : undefined,

    category: producto.categoria || "Ferretería",

    offers: {
      "@type": "Offer",
      url: urlProducto,
      priceCurrency: "PEN",
      price: precio,
      availability: disponibilidad,
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Brico Hogar Perú",
        url: URL_BASE,
      },
    },
  };

  /*
   * Evita problemas si algún dato contiene caracteres
   * especiales dentro del JSON-LD.
   */
  const jsonLd = JSON.stringify(productSchema).replace(
    /</g,
    "\\u003c"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd,
        }}
      />

      <ProductoDetalleClient params={params} />
    </>
  );
}   