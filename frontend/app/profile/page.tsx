"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    city: "",
    avatar_url: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setProfile({
        full_name: data.full_name || "",
        phone: data.phone || "",
        city: data.city || "",
        avatar_url: data.avatar_url || "",
      });
    }

    setLoading(false);
  }

  async function saveProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        full_name: profile.full_name,
        phone: profile.phone,
        city: profile.city,
        avatar_url: profile.avatar_url,
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Profile Updated Successfully!");
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex justify-center items-center">
          <h1 className="text-3xl font-bold">Loading...</h1>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="pt-36 pb-20 px-6 flex justify-center">

        <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 shadow-xl rounded-3xl p-10">

          <h1 className="text-5xl font-bold mb-10">
            My Profile
          </h1>

          <div className="flex justify-center mb-8">

            <img
              src={
                profile.avatar_url ||
                "https://placehold.co/150x150?text=Profile"
              }
              className="w-40 h-40 rounded-full object-cover border-4 border-green-600"
            />

          </div>

          <div className="space-y-6">

            <input
              type="text"
              placeholder="Full Name"
              value={profile.full_name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  full_name: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl border"
            />

            <input
              type="text"
              placeholder="Phone"
              value={profile.phone}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  phone: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl border"
            />

            <input
              type="text"
              placeholder="City"
              value={profile.city}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  city: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl border"
            />

            <input
              type="text"
              placeholder="Avatar Image URL"
              value={profile.avatar_url}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  avatar_url: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl border"
            />

            <button
              onClick={saveProfile}
              className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-xl transition"
            >
              Save Profile
            </button>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}