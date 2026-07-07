"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Traveller");

  async function handleRegister() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          role: role,
        },
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Registration successful!\n\nPlease verify your email before logging in."
    );

    router.push("/login");}

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
          max-w-[550px]
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
            Register
          </h1>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
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
            mb-4
            "
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
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
          >
            <option>Traveller</option>
            <option>Host</option>
          </select>

          <button
            onClick={handleRegister}
            className="
            bg-green-700
            hover:bg-green-800
            text-white
            w-full
            p-3
            rounded
            "
          >
            Create Account
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}