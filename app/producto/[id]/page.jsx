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
      description:
        "Producto no encontrado en Brico Hogar Perú.",
    };
  }

  const producto = docSnap.data();

  const nombre = producto.nombre || "Producto";
  const marca = producto.marca || "";
  const sku = producto.sku || "";

  const precio = Number(
    producto.oferta || producto.precio || 0
  ).toFixed(2);

  const descripcion =
    producto.descripcion ||
    `Compra ${nombre}${
      marca ? ` de la marca ${marca}` : ""
    } en Brico Hogar Perú. Precio S/ ${precio}.`;

  const imagen =
    producto.imagenes?.[0] ||
    producto.imagen ||
    `${URL_BASE}/sin-imagen.png`;

  return {
    title: `${nombre}${marca ? ` | ${marca}` : ""} | Brico Hogar Perú`,

    description: descripcion.slice(0, 160),

    keywords: [
      nombre,
      marca,
      sku,
      "ferretería",
      "herramientas",
      "ferretería Lima",
      "Brico Hogar Perú",
    ].filter(Boolean),

    alternates: {
      canonical: `${URL_BASE}/producto/${params.id}`,
    },

    openGraph: {
      title: `${nombre}${marca ? ` | ${marca}` : ""}`,
      description: descripcion.slice(0, 160),
      url: `${URL_BASE}/producto/${params.id}`,
      siteName: "Brico Hogar Perú",
      images: [
        {
          url: imagen,
          alt: nombre,
        },
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `${nombre}${marca ? ` | ${marca}` : ""}`,
      description: descripcion.slice(0, 160),
      images: [imagen],
    },
  };
}

export default function Page({ params }) {
  return <ProductoDetalleClient params={params} />;
}