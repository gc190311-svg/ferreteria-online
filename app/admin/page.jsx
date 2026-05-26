'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function AdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginAdmin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert('Bienvenido administrador');

      window.location.href = '/';

    } catch (error) {
      alert('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Login Administrador
        </h2>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={loginAdmin}
          className="w-full bg-black text-white p-3 rounded"
        >
          Ingresar
        </button>
      </div>
    </div>
  );
}
