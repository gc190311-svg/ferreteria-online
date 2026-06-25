"use client";

import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Login() {

  const router = useRouter();

  const loginGoogle = async () => {

    try {

      const provider = new GoogleAuthProvider();

      const result =
        await signInWithPopup(auth, provider);

      console.log(result.user.email);

      router.push("/admin");

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center">

      <button
        onClick={loginGoogle}
        className="
          bg-yellow-500
          px-8
          py-4
          rounded-xl
          font-bold
        "
      >
        Ingresar con Google
      </button>

    </div>

  );
}
