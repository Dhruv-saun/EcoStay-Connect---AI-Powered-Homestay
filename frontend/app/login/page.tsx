"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { apiRequest } from "@/lib/api";
import { saveToken } from "@/lib/auth";


export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const { response, data } = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      alert(data.detail || data.message || "Login failed");
      return;
    }

    saveToken(data.access_token);

    alert("Login Successful!");

    router.push("/dashboard");
  }

  return (
    <>
      <Navbar />

      <main
        className="
          min-h-screen
          flex
          justify-center
          items-center
          p-10
        "
      >
        <div
          className="
            w-full
            max-w-[500px]
            p-8
            rounded-xl
            shadow-xl
            border
            border-gray-300
            dark:border-gray-500
            bg-white
            dark:bg-neutral-900
            text-black
            dark:text-white
          "
        >
          <h1
            className="
              text-4xl
              font-bold
              mb-6
            "
          >
            Login
          </h1>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="
              w-full
              p-3
              rounded
              border
              border-gray-300
              dark:border-gray-500
              bg-white
              dark:bg-neutral-800
              text-black
              dark:text-white
              mb-4
            "
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="
              w-full
              p-3
              rounded
              border
              border-gray-300
              dark:border-gray-500
              bg-white
              dark:bg-neutral-800
              text-black
              dark:text-white
              mb-6
            "
          />

          <button
            onClick={handleLogin}
            className="
              bg-green-700
              hover:bg-green-800
              text-white
              w-full
              p-3
              rounded
            "
          >
            Login
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}