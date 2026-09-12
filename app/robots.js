export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/checkout/",
          "/pedido/",
          "/registro/",
          "/login/",
        ],
      },
    ],
    sitemap: "https://bricohogarperu.vercel.app/sitemap.xml",
    host: "https://bricohogarperu.vercel.app",
  };
}