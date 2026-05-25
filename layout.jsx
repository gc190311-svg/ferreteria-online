export const metadata = {
  title: 'Ferretería Online',
  description: 'Tienda online de ferretería',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}