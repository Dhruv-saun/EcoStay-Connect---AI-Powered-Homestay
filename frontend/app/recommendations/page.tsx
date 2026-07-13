"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { apiRequest } from "@/lib/api";

type Recommendation = {
  id: number;
  title: string;
  location: string;
  price: number;
  image_url: string;
  eco_score: number;
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pet_friendly: boolean;
  score: number;
};

export default function RecommendationsPage() {
  const [maxPrice, setMaxPrice] = useState(3000);
  const [guests, setGuests] = useState(2);
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  async function getRecommendations() {
    setLoading(true);

    try {
      const { response, data } = await apiRequest("/recommendations/", {
        method: "POST",
        body: JSON.stringify({
          max_price: maxPrice,
          guests,
          location,
        }),
      });

      console.log(data);

      if (response.ok) {
        setRecommendations(data.recommendations);
      } else {
        alert("Unable to fetch recommendations.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-36 pb-20 px-8">

        <h1 className="text-5xl font-bold mb-10">
          AI Smart Recommendations
        </h1>

        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 mb-10">

          <div className="grid md:grid-cols-3 gap-4">

            <div>
              <label className="block mb-2 font-semibold">
                Maximum Budget
              </label>

              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Guests
              </label>

              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Preferred Location
              </label>

              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Mussoorie"
                className="w-full border rounded-lg p-3"
              />
            </div>

          </div>

          <button
            onClick={getRecommendations}
            className="mt-6 bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg"
          >
            {loading ? "Finding..." : "Find Best Homestays"}
          </button>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {recommendations.map((stay) => (

            <div
              key={stay.id}
              className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg overflow-hidden"
            >

              <img
                src={stay.image_url}
                alt={stay.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">

                <h2 className="text-2xl font-bold">
                  {stay.title}
                </h2>

                <p className="mt-2">
                  📍 {stay.location}
                </p>

                <p className="mt-1">
                  ₹{stay.price} / night
                </p>

                <p className="mt-2 text-green-700 font-bold">
                  🌿 Eco Score : {stay.eco_score}
                </p>

                <p className="text-blue-700 font-bold">
                  ⭐ AI Score : {stay.score}
                </p>

                <div className="mt-4 space-y-1 text-sm">

                  {stay.wifi && <p>✔ WiFi</p>}
                  {stay.parking && <p>✔ Parking</p>}
                  {stay.breakfast && <p>✔ Breakfast</p>}
                  {stay.pet_friendly && <p>✔ Pet Friendly</p>}

                </div>

                <Link
                  href={`/booking?homestay=${stay.id}`}
                  className="block mt-6 text-center bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-bold"
                >
                  Book Now
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