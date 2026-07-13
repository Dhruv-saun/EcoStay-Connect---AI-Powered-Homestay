"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { apiRequest } from "@/lib/api";

export default function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  async function loadFavorites() {
    const { response, data } = await apiRequest("/favorites/");

    console.log("Favorites API Response:", data);

    if (!response.ok) {
      setLoading(false);
      return;
    }

    setFavorites(data || []);
    setLoading(false);
  }

  async function removeFavorite(homestayId: number) {
    const { response } = await apiRequest(
      `/favorites/${homestayId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) return;

    loadFavorites();
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-40 text-center">
          Loading...
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="pt-40 px-10 pb-20 min-h-screen">
        <h1 className="text-5xl font-bold mb-10">
          ❤️ My Favourite Homestays
        </h1>

        {favorites.length === 0 ? (
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold">
              No favourites yet.
            </h2>

            <Link
              href="/homestays"
              className="inline-block mt-8 bg-green-700 text-white px-8 py-4 rounded-xl"
            >
              Explore Homestays
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((fav: any) => (
              <div
                key={fav.id}
                className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-neutral-900"
              >
                <img
                  src={fav.homestays.image_url}
                  alt={fav.homestays.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">
                  <h2 className="text-2xl font-bold">
                    {fav.homestays.title}
                  </h2>

                  <p className="mt-3">
                    📍 {fav.homestays.location}
                  </p>

                  <p className="mt-3 font-bold text-green-700">
                    ₹{fav.homestays.price}/night
                  </p>

                  <div className="flex gap-3 mt-6">
                    <Link
                      href={`/booking?homestay=${fav.homestays.id}`}
                      className="flex-1 bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl text-center"
                    >
                      Book
                    </Link>

                    <button
                      onClick={() =>
                        removeFavorite(fav.homestays.id)
                      }
                      className="px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}