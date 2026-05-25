export default function FerreteriaPage() {
  const categorias = [
    'Herramientas Eléctricas',
    'Herramientas Manuales',
    'Materiales de Construcción',
    'Electricidad',
    'Plomería',
    'Pinturas y Acabados',
  ];

  const productos = [
    {
      nombre: 'Taladro Percutor 800W',
      precio: 'S/ 149.90',
      imagen:
        'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1200&auto=format&fit=crop',
    },
    {
      nombre: 'Amoladora Angular',
      precio: 'S/ 189.90',
      imagen:
        'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?q=80&w=1200&auto=format&fit=crop',
    },
    {
      nombre: 'Juego de Destornilladores',
      precio: 'S/ 39.90',
      imagen:
        'https://images.unsplash.com/photo-1581147036324-c1c7591d4a2b?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-black text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">FERREMÁS</h1>
            <p className="text-sm">Todo en Ferretería</p>
          </div>

          <div className="hidden md:flex gap-6 text-sm">
            <a href="#">Inicio</a>
            <a href="#">Productos</a>
            <a href="#">Ofertas</a>
            <a href="#">Contacto</a>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6 py-16 items-center">
          <div>
            <h2 className="text-5xl font-extrabold leading-tight">
              Todo lo que necesitas para tu obra
            </h2>
            <p className="mt-6 text-lg text-gray-300">
              Venta online de herramientas, materiales eléctricos, plomería,
              pinturas y más.
            </p>

            <button className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-2xl shadow-lg transition">
              Ver Productos
            </button>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1400&auto=format&fit=crop"
              alt="Ferretería"
              className="rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        <h3 className="text-3xl font-bold mb-8">Categorías</h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {categorias.map((cat) => (
            <div
              key={cat}
              className="bg-white rounded-2xl p-5 shadow hover:shadow-xl transition text-center"
            >
              <div className="text-4xl mb-3">🛠️</div>
              <p className="font-semibold text-sm">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold">Productos Destacados</h3>
            <button className="bg-black text-white px-5 py-2 rounded-xl">
              Ver Todos
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {productos.map((producto) => (
              <div
                key={producto.nombre}
                className="bg-gray-50 rounded-3xl overflow-hidden shadow-lg hover:scale-105 transition"
              >
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="h-60 w-full object-cover"
                />

                <div className="p-5">
                  <h4 className="font-bold text-xl">{producto.nombre}</h4>
                  <p className="text-yellow-600 text-2xl font-extrabold mt-2">
                    {producto.precio}
                  </p>

                  <button className="mt-5 w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-2xl font-bold">
                    Agregar al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-yellow-400 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-extrabold">
            Ofertas Exclusivas Todos los Días
          </h3>
          <p className="mt-4 text-lg">
            Descuentos especiales en herramientas y materiales.
          </p>
        </div>
      </section>

      <footer className="bg-black text-white py-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-2xl font-bold text-yellow-400">FERREMÁS</h4>
            <p className="mt-4 text-gray-300">
              Tu tienda online de confianza para productos de ferretería.
            </p>
          </div>

          <div>
            <h5 className="font-bold mb-3">Enlaces</h5>
            <ul className="space-y-2 text-gray-300">
              <li>Inicio</li>
              <li>Productos</li>
              <li>Ofertas</li>
              <li>Contacto</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-3">Contacto</h5>
            <p className="text-gray-300">WhatsApp: 999 999 999</p>
            <p className="text-gray-300">correo@ferremas.com</p>
            <p className="text-gray-300">Lima, Perú</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


