"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState<any>(null);

const [profile, setProfile] = useState({
  full_name: "",
  avatar_url: "",
});

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }

    // Check current session
    async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  setUser(user);

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("full_name, avatar_url")
      .eq("id", user.id)
      .single();

    if (data) {
      setProfile({
        full_name: data.full_name || "",
        avatar_url: data.avatar_url || "",
      });
    }
  }
}

    getUser();

    // Listen for login/logout
    const {
  data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        const { data } = await supabase
          .from("profiles")
          .select("full_name, avatar_url")
          .eq("id", session.user.id)
          .single();

        if (data) {
          setProfile({
            full_name: data.full_name || "",
            avatar_url: data.avatar_url || "",
          });
        }
      } else {
        setProfile({
          full_name: "",
          avatar_url: "",
        });
      }
    });

    return () => subscription.unsubscribe();
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

  async function handleLogout() {
    await supabase.auth.signOut();
    alert("Logged out successfully!");
    window.location.href = "/";
  }

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

        {user && (
          <>
            {user && (
              <Link href="/favorites">
                Favorites
              </Link>
            )}
            <Link href="/dashboard">
              Dashboard
            </Link>

            <Link href="/profile">
              Profile
            </Link>
          </>
        )}
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

        {!user ? (
          <>
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
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">

  <Link href="/profile">

    {profile.avatar_url ? (

      <img
        src={profile.avatar_url}
        alt="Avatar"
        className="
          w-12
          h-12
          rounded-full
          object-cover
          border-2
          border-green-600
        "
      />

    ) : (

      <div
        className="
          w-12
          h-12
          rounded-full
          bg-green-700
          text-white
          flex
          items-center
          justify-center
          font-bold
        "
      >
        {(profile.full_name || "U")
          .charAt(0)
          .toUpperCase()}
      </div>

    )}

  </Link>

  <div>

    <p className="font-semibold">
      {profile.full_name || "Traveller"}
    </p>

    <p className="text-xs text-gray-500">
      {user.email}
    </p>

  </div>

</div>

            <button
              onClick={handleLogout}
              className="
                bg-red-600
                hover:bg-red-700
                text-white
                px-6
                py-3
                rounded-full
              "
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}