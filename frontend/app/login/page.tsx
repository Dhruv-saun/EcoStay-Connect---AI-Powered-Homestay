"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    if (user) {
      // Check if profile already exists
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      // Create profile on first login
      if (!profile) {
        const { error: profileError } = await supabase
          .from("profiles")
          .insert([
            {
              id: user.id,
              full_name: user.user_metadata?.full_name || "",
              avatar_url: "",
              phone: "",
              city: "",
            },
          ]);

        if (profileError) {
          console.log("PROFILE INSERT ERROR:", profileError);
          alert(JSON.stringify(profileError, null, 2));
        }
      }
    }

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