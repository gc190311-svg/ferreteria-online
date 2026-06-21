"use client";

import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProductoDetalle({ params }) {

  const [producto, setProducto] = useState(null);
  const [imagenActiva, setImagenActiva] = useState(0);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    cargarProducto();
  }, []);

  const cargarProducto = async () => {

    const docRef = doc(db, "productos", params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setProducto(docSnap.data());
    }
  };

  if (!producto) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando...
      </div>
    );
  }

  return (

<div className="min-h-screen bg-gray-100 py-10 px-4">

<div className="max-w-7xl mx-auto">

<a
href="/"
className="inline-block bg-black text-white px-6 py-3 rounded-xl mb-8 hover:bg-gray-800"
>
← Volver al inicio
</a>

<div className="bg-white rounded-3xl shadow-lg p-8">

<div className="grid lg:grid-cols-3 gap-10">

  {/* MINIATURAS */}

<div className="order-2 lg:order-1">

<div className="flex lg:flex-col gap-4 overflow-x-auto">

{producto.imagenes?.map((img,index)=>(

<button
key={index}
onClick={()=>setImagenActiva(index)}
className={`border-2 rounded-xl p-2 bg-white

${imagenActiva===index
? "border-blue-500"
: "border-gray-200"
}`}

>

<img
src={img}
alt=""
className="h-20 w-20 object-contain"
/>

</button>

))}

</div>

</div>

{/* IMAGEN PRINCIPAL */}

<div className="order-1 lg:order-2 flex items-center justify-center">

<img
src={producto.imagenes?.[imagenActiva]}
alt={producto.nombre}
className="max-h-[600px] object-contain"
/>

</div>

{/* INFORMACIÓN */}

<div className="order-3">

<p className="text-gray-500 mb-2">

{producto.categoria}

</p>

<h1 className="text-3xl font-bold">

{producto.nombre}

</h1>

<div className="text-yellow-500 text-xl mt-3">

★★★★★

</div>

<div className="mt-8">

{producto.oferta ? (

<div>

<p className="text-gray-400 line-through text-xl">

S/ {producto.precio}

</p>

<p className="text-green-600 font-bold text-5xl">

S/ {producto.oferta}

</p>

<span className="bg-red-500 text-white px-3 py-1 rounded">

OFERTA

</span>

</div>

) : (

<p className="text-green-600 font-bold text-5xl">

S/ {producto.precio}

</p>

)}
  </div>

<div className="flex items-center gap-5 mt-8">

<button
onClick={() =>
setCantidad(cantidad > 1 ? cantidad - 1 : 1)
}
className="border w-12 h-12 rounded-xl"
>
-
</button>

<div className="text-2xl">

{cantidad}

</div>

<button
onClick={() => setCantidad(cantidad + 1)}
className="border w-12 h-12 rounded-xl"
>
+
</button>

</div>

<a
href={`https://wa.me/51921883870?text=Hola,%20quiero%20información%20del%20producto:%20${producto.nombre}`}
target="_blank"
className="block mt-8 bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-xl text-xl font-bold"
>

Consultar por WhatsApp

</a>

<div className="mt-10">

<h2 className="font-bold text-xl mb-5">

Características

</h2>

<ul className="space-y-3 text-gray-600">

<li>• Categoría: {producto.categoria}</li>

<li>• Marca: {producto.marca}</li>

<li>• Color: {producto.color}</li>

<li>• Material: {producto.material}</li>

</ul>

</div>

</div>

</div>

<hr className="my-12"/>

<h2 className="text-3xl font-bold mb-8">

Descripción

</h2>

<p className="text-gray-600 whitespace-pre-line leading-8">

{producto.descripcion}

</p>

</div>

</div>

</div>

);

}
   
