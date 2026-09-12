import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const baseUrl = "https://bricohogarperu.vercel.app";

// Convierte el nombre de una categoría en el mismo formato
// utilizado por las URLs de tu tienda.
function slugify(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
}

// Obtiene una fecha válida para lastModified.
function getLastModified(producto) {
  try {
    if (producto?.updatedAt?.toDate) {
      return producto.updatedAt.toDate();
    }

    if (producto?.updatedAt instanceof Date) {
      return producto.updatedAt;
    }
  } catch (error) {
    console.error("Error leyendo updatedAt:", error);
  }

  return new Date();
}

export default async function sitemap() {
  const urls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/productos`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  try {
    const snapshot = await getDocs(collection(db, "productos"));

    // Guardamos las categorías sin repetirlas
    const categorias = new Set();

    snapshot.forEach((productoDoc) => {
      const producto = productoDoc.data();

      // No incluir productos desactivados
      if (producto.activo === false) {
        return;
      }

      // Obtener categoría
      if (producto.categoria) {
        const slugCategoria = slugify(producto.categoria);

        if (slugCategoria) {
          categorias.add(slugCategoria);
        }
      }

      // Agregar producto
      urls.push({
        url: `${baseUrl}/producto/${productoDoc.id}`,
        lastModified: getLastModified(producto),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });

    // Agregar páginas de categorías
    categorias.forEach((slugCategoria) => {
      urls.push({
        url: `${baseUrl}/categorias/${slugCategoria}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    });
  } catch (error) {
    console.error("Error generando sitemap:", error);
  }

  return urls;
}