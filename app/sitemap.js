import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function sitemap() {
  const baseUrl = "https://bricohogarperu.vercel.app";

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

    snapshot.forEach((doc) => {
      urls.push({
        url: `${baseUrl}/producto/${doc.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });
  } catch (error) {
    console.error(
      "Error generando sitemap:",
      error
    );
  }

  return urls;
}