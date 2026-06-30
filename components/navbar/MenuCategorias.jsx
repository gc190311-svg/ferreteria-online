"use client";

import Link from "next/link";

export default function MenuCategorias() {

  return (

    <div className="w-[80px]">

      <Link href="/categorias">

        <button
          className="
            w-full
            bg-yellow-500
            hover:bg-yellow-400
            text-black
            text-3xl
            font-bold
            py-5
            transition
            flex
            items-center
            justify-center
          "
        >
          ☰
        </button>

      </Link>

    </div>

  );

}
