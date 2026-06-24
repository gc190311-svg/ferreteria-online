"use client";

export default function Productos({
categoriaSeleccionada,
}) {

const productos = [
{
id: 1,
nombre: "Rotomartillo SDS Plus Truper",
categoria: "herramientas",
precio: 399,
precioAnterior: 450,
imagen: "/productos/rotomartillo.jpg",
},
{
id: 2,
nombre: "Compresor lubricado 25 L",
categoria: "herramientas",
precio: 615,
precioAnterior: 700,
imagen: "/productos/compresor.jpg",
},
{
id: 3,
nombre: "Escalera tipo tijera Truper",
categoria: "construccion",
precio: 295,
precioAnterior: 340,
imagen: "/productos/escalera.jpg",
},
{
id: 4,
nombre: "Carretilla neumática 6 ft³",
categoria: "construccion",
precio: 205,
precioAnterior: 250,
imagen: "/productos/carretilla.jpg",
},
];

const productosFiltrados =
categoriaSeleccionada === "todos"
? productos
: productos.filter(
(producto) =>
producto.categoria === categoriaSeleccionada
);

const tituloCategoria = {
todos: "Todos los productos",
herramientas: "Herramientas",
electricidad: "Electricidad",
pintura: "Pintura",
gasfiteria: "Gasfitería",
construccion: "Construcción",
};

return ( <section
   id="productos"
   className="bg-gray-100 py-20"
 > <div className="max-w-7xl mx-auto px-6">

```
    <div className="flex justify-between items-center mb-10">

      <div>
        <h2 className="text-4xl font-bold">
          Productos destacados
        </h2>

        <p className="text-yellow-600 font-semibold mt-2">
          Categoría: {tituloCategoria[categoriaSeleccionada]}
        </p>
      </div>

      <span className="text-gray-500 text-xl">
        {productosFiltrados.length} productos
      </span>

    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

      {productosFiltrados.map((producto) => (

        <div
          key={producto.id}
          className="
            bg-white
            rounded-3xl
            shadow-lg
            overflow-hidden
            hover:shadow-2xl
            duration-300
          "
        >

          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="
              w-full
              h-72
              object-contain
              bg-gray-50
              p-6
            "
          />

          <div className="p-6">

            <h3 className="font-bold text-xl min-h-[90px]">
              {producto.nombre}
            </h3>

            <div className="mt-4">

              <p className="text-gray-400 line-through text-lg">
                S/ {producto.precioAnterior}
              </p>

              <p className="text-3xl font-bold text-green-600">
                S/ {producto.precio}
              </p>

            </div>

            <button
              className="
                mt-6
                w-full
                bg-yellow-500
                hover:bg-yellow-400
                text-black
                font-bold
                py-4
                rounded-xl
                duration-300
              "
            >
              Ver producto
            </button>

          </div>

        </div>

      ))}

    </div>

  </div>
</section>
```

);
}
