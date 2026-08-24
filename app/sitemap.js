import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const baseUrl = "https://bricohogarperu.vercel.app";

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
    const snapshot = await getDocs(
      collection(db, "productos")
    );

    snapshot.forEach((productoDoc) => {
      const producto = productoDoc.data();

      // No incluir productos desactivados
      if (producto.activo === false) {
        return;
      }

      urls.push({
        url: `${baseUrl}/producto/${productoDoc.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });
  } catch (error) {
    console.error("Error generando sitemap:", error);
  }

  return urls;
}