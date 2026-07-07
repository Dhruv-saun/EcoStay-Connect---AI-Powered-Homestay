"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Homestays() {
  const [stays, setStays] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    async function loadData() {
      // Load Homestays
      const { data: staysData, error } = await supabase
        .from("homestays")
        .select("*")
        .order("id");

      if (error) {
        console.log(error);
      } else {
        setStays(staysData || []);
      }

      // Load logged in user's favourites
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: favData, error: favError } = await supabase
          .from("favorites")
          .select("homestay_id")
          .eq("user_id", user.id);

        if (!favError && favData) {
          setFavorites(
            favData.map((item: any) => item.homestay_id)
          );
        }
      }

      setLoading(false);
    }

    loadData();
  }, []);

  async function toggleFavorite(homestayId: number) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first.");
      return;
    }

    // Remove favourite
    if (favorites.includes(homestayId)) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("homestay_id", homestayId);

      if (error) {
        console.log(error);
        alert(error.message);
        return;
      }

      setFavorites((prev) =>
        prev.filter((id) => id !== homestayId)
      );
    }

    // Add favourite
    else {
      const { error } = await supabase
        .from("favorites")
        .insert({
          user_id: user.id,
          homestay_id: homestayId,
        });

      if (error) {
        console.log(error);
        alert(error.message);
        return;
      }

      setFavorites((prev) => [...prev, homestayId]);
    }
  }

  const locations = [
  "All",
  ...new Set(stays.map((stay) => stay.location)),
];

  const filteredStays = stays
  .filter((stay) => {
    const matchesSearch = stay.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesLocation =
      locationFilter === "All" ||
      stay.location === locationFilter;

    return matchesSearch && matchesLocation;
  })
  .sort((a, b) => {
    if (sortBy === "low") {
      return a.price - b.price;
    }

    if (sortBy === "high") {
      return b.price - a.price;
    }

    return 0;
  });

  return (
    <>
      <Navbar />

      <main className="pt-44 px-10 pb-20">

        <h1 className="text-5xl font-bold mb-10">
          Explore Homestays
        </h1>
       <div className="flex flex-col lg:flex-row gap-4 mb-10">

        {/* Search */}

        <input
          type="text"
          placeholder="🔍 Search Homestays..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            flex-1
            p-4
            rounded-xl
            border
            border-gray-300
            dark:border-neutral-700
            bg-white
            dark:bg-neutral-900
            outline-none
            focus:ring-2
            focus:ring-green-600
          "
        />

        {/* Location Filter */}

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="
            p-4
            rounded-xl
            border
            border-gray-300
            dark:border-neutral-700
            bg-white
            dark:bg-neutral-900
            outline-none
            focus:ring-2
            focus:ring-green-600
          "
        >
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>

        {/* Sort */}

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="
            p-4
            rounded-xl
            border
            border-gray-300
            dark:border-neutral-700
            bg-white
            dark:bg-neutral-900
            outline-none
            focus:ring-2
            focus:ring-green-600
          "
        >
          <option value="default">
            Sort By
          </option>

          <option value="low">
            💰 Price: Low → High
          </option>

          <option value="high">
            💰 Price: High → Low
          </option>
        </select>

      </div>

        {loading && (
          <p className="text-lg">Loading...</p>
        )}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
          "
        >
          {filteredStays.map((stay) => (
            <div
              key={stay.id}
              className="
                rounded-xl
                overflow-hidden
                shadow-lg
                bg-white
                dark:bg-neutral-900
                hover:shadow-2xl
                transition
                duration-300
              "
            >
              <img
                src={stay.image_url}
                alt={stay.title}
                className="
                  w-full
                  h-56
                  object-cover
                "
              />

              <div className="p-6">

                <div className="flex justify-between items-start">

                  <h2 className="text-2xl font-bold">
                    {stay.title}
                  </h2>

                  <button
                    onClick={() => toggleFavorite(stay.id)}
                    className="
                      text-3xl
                      hover:scale-110
                      transition
                    "
                  >
                    {favorites.includes(stay.id)
                      ? "❤️"
                      : "🤍"}
                  </button>

                </div>

                <p className="mt-3">
                  📍 {stay.location}
                </p>

                <p className="mt-3 text-xl font-bold text-green-700">
                  ₹{stay.price}/night
                </p>

                <Link
                  href={`/booking?homestay=${stay.id}`}
                  className="
                    inline-block
                    mt-6
                    bg-green-700
                    hover:bg-green-800
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    transition
                    font-semibold
                  "
                >
                  Book Stay
                </Link>

              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer />
    </>
  );
}