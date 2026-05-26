'use client';

export default function FerreteriaPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">

      <header className="bg-black text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">FERREMÁS</h1>
            <p className="text-sm">Todo en Ferretería</p>
          </div>

          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#">Inicio</a>
            <a href="#">Productos</a>
            <a href="#">Ofertas</a>
            <a href="#">Contacto</a>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6 py-16 items-center">
          <div>
            <h2 className="text-5xl font-extrabold leading-tight">
              Todo lo que necesitas para tu obra
            </h2>

            <p className="mt-6 text-lg text-gray-300">
              Venta online de herramientas, materiales eléctricos,
              plomería, pinturas y más.
            </p>

            <button className="mt-8 bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold">
              Ver Productos
            </button>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd"
              alt="Construcción"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-4xl font-bold mb-10">Categorías</h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            'Herramientas',
            'Electricidad',
            'Gasfitería',
            'Pinturas',
            'Construcción',
            'Accesorios',
          ].map((cat) => (
            <div
              key={cat}
              className="bg-white rounded-2xl shadow p-6 text-center font-bold"
            >
              🔨
              <p className="mt-3">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-black text-white py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h4 className="font-bold text-xl mb-4">Contacto</h4>

          <p>WhatsApp: 51921883870</p>
          <p>bricohogarperu@hotmail.com</p>
          <p>Lima, Perú</p>
        </div>
      </footer>

      <a
        href="https://wa.me/51921883870"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-2xl z-50 font-bold"
      >
        WhatsApp
      </a>

    </div>
  );
}
