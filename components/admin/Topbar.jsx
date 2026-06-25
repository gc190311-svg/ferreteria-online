"use client";

import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Topbar() {
  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-8">

      <div>

        <h1 className="text-2xl font-bold">
          Panel de Administración
        </h1>

        <p className="text-gray-500 text-sm">
          Bienvenido al sistema Brico Hogar
        </p>

      </div>

      <div className="flex items-center gap-6">

        <button className="text-2xl text-gray-600 hover:text-yellow-500">
          <FaBell />
        </button>

        <div className="flex items-center gap-3">

          <FaUserCircle className="text-4xl text-yellow-500" />

          <div>

            <p className="font-bold">
              Administrador
            </p>

            <p className="text-sm text-gray-500">
              gc190311@gmail.com
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}
