"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;

    if (dark) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDark(!dark);
  };

  return (
    <nav
      className="
        fixed
        top-5
        left-1/2
        -translate-x-1/2

        w-[95%]
        max-w-[1400px]

        z-[999]

        backdrop-blur-xl

        bg-white/60
        dark:bg-black/40

        border
        border-white/30

        rounded-full

        px-10
        py-5

        flex
        justify-between
        items-center
      "
    >
      {/* Logo */}

      <div
        className="
          text-3xl
          font-black

          text-green-700
          dark:text-green-400
        "
      >
        🌿 EcoStay
      </div>

      {/* Navigation */}

      <div
        className="
          flex
          gap-10

          font-semibold

          text-black
          dark:text-white
        "
      >
        <Link href="/">Home</Link>

        <Link href="/homestays">Destinations</Link>

        <Link href="/booking">Booking</Link>

        <Link href="/dashboard">Dashboard</Link>
      </div>

      {/* Right Side */}

      <div className="flex items-center gap-4">

        <button
          onClick={toggleTheme}
          className="
            w-12
            h-12

            rounded-full

            bg-white
            dark:bg-neutral-800

            shadow
            text-xl
          "
        >
          {dark ? "☀️" : "🌙"}
        </button>

        <Link
          href="/login"
          className="
            px-6
            py-3

            text-black
            dark:text-white
          "
        >
          Login
        </Link>

        <Link
          href="/register"
          className="
            bg-green-600
            hover:bg-green-700

            text-white

            px-8
            py-3

            rounded-full
          "
        >
          Sign Up
        </Link>

      </div>

    </nav>
  );
}