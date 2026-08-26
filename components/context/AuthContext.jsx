"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../../app/firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cancelar = onAuthStateChanged(
      auth,
      (usuarioFirebase) => {
        setUsuario(usuarioFirebase);
        setCargando(false);
      }
    );

    return () => cancelar();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cargando,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}