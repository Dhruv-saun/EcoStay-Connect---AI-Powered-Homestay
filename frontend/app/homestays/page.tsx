"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Homestays() {

  const [stays, setStays] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    fetch("http://localhost:8000/homestays")

      .then((res) => {

        if (!res.ok) {
          throw new Error("Backend not reachable");
        }

        return res.json();
      })

      .then((data) => {
        setStays(data);
        setLoading(false);
      })

      .catch(() => {
        setError("Could not load homestays");
        setLoading(false);
      });

  }, []);

  return (
    <>
      <Navbar />

      <main className="p-10">

        <h1 className="text-5xl font-bold mb-10">
          Explore Homestays
        </h1>

        {loading && (
          <p className="text-xl">
            Loading homestays...
          </p>
        )}

        {error && (
          <p className="text-red-500">
            {error}
          </p>
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

          {!loading &&
            stays.map((stay) => (

              <div
                key={stay.id}
                className="
                rounded-xl
                overflow-hidden
                shadow-lg
                border
                border-gray-300
                dark:border-gray-700
                bg-white
                dark:bg-neutral-900
                text-black
                dark:text-white
                "
              >

                <div
                  className="
                  h-52
                  bg-green-200
                  flex
                  items-center
                  justify-center
                  text-5xl
                  "
                >
                  🌿
                </div>

                <div className="p-6">

                  <h2 className="text-2xl font-bold">
                    {stay.title}
                  </h2>

                  <p className="mt-2">
                    📍 {stay.location}
                  </p>

                  <p className="mt-2 font-semibold">
                    ₹{stay.price}/night
                  </p>

                  <Link
                    href="/booking"
                    className="
                    mt-6
                    inline-block
                    bg-green-700
                    text-white
                    px-5
                    py-2
                    rounded-lg
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