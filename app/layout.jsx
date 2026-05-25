import './globals.css';
export const metadata = {
  title: 'Brico Hogar Peru',
  description: 'Tienda online de ferretería',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
