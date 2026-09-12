import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const BASE_URL = "https://bricohogarperu.vercel.app";

function slugify(text = "") {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getLastModified(producto) {
  if (producto?.updatedAt?.toDate) {
    return producto.updatedAt.toDate();
  }

  return new Date();
}

export default async function sitemap() {
  const urls = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/productos`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/categorias`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/nosotros`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const categorias = new Set();

  try {
    const productosSnapshot = await getDocs(
      collection(db, "productos")
    );

    productosSnapshot.forEach((doc) => {
      const producto = doc.data();

      // No incluir productos desactivados
      if (producto.activo === false) {
        return;
      }

      // Producto individual
      urls.push({
        url: `${BASE_URL}/producto/${doc.id}`,
        lastModified: getLastModified(producto),
        changeFrequency: "weekly",
        priority: 0.8,
      });

      // Categoría
      if (producto.categoria) {
        categorias.add(producto.categoria);
      }
    });

    // Agregar categorías
    categorias.forEach((categoria) => {
      const slug = slugify(categoria);

      if (slug) {
        urls.push({
          url: `${BASE_URL}/categorias/${slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    });
  } catch (error) {
    console.error("Error generando sitemap:", error);
  }

  return urls;
}