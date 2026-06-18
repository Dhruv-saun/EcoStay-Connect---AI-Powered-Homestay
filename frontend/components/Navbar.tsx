"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

export default function Navbar() {
  const {
    darkMode,
    setDarkMode,
  } = useTheme();

  return (
    <nav
      className="
      flex
      justify-between
      items-center
      p-6
      shadow-md
      "
    >
      <Link
        href="/"
        className="
        text-2xl
        font-bold
        text-green-700
        "
      >
        EcoStay Connect
      </Link>

      <div
        className="
        flex
        gap-8
        items-center
        "
      >
        <Link href="/">
          Home
        </Link>

        <Link href="/homestays">
          Homestays
        </Link>

        <Link href="/dashboard">
          Dashboard
        </Link>

        <Link href="/login">
          Login
        </Link>

        <Link href="/register">
          Register
        </Link>

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="
          border
          px-4
          py-2
          rounded-lg
          "
        >
          {darkMode
            ? "☀️ Light Mode"
            : "🌙 Dark Mode"}
        </button>
      </div>
    </nav>
  );
}