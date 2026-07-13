"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { supabase } from "@/lib/supabase";
import { apiRequest } from "@/lib/api";

export default function HomestayDetails() {
  const params = useParams();

  const homestayId = Number(params.id);

  const [stay, setStay] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [favorite, setFavorite] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

    useEffect(() => {
    loadHomestay();
    loadReviews();
    }, []);

  async function loadHomestay() {
    setLoading(true);

    const { data, error } = await supabase
      .from("homestays")
      .select("*")
      .eq("id", homestayId)
      .single();

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setStay(data);

    const token = localStorage.getItem("token");

    if (token) {
      const { response, data: favs } = await apiRequest(
        "/favorites/"
      );

      if (response.ok) {
        const exists = favs.some(
          (item: any) =>
            item.homestays.id === homestayId
        );

        setFavorite(exists);
      }
    }

    setLoading(false);
  }

  async function loadReviews() {
    const { response, data } = await apiRequest(
      `/reviews/${homestayId}`
    );

    console.log("Reviews Response:", response.status);
    console.log("Reviews Data:", data);

    if (!response.ok) {
      return;
    }

    setReviews(data);
  }

    async function submitReview() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first.");
        return;
    }

    if (!reviewText.trim()) {
        alert("Please write a review.");
        return;
    }

    setReviewLoading(true);

    const { response, data } = await apiRequest(
        "/reviews/",
        {
        method: "POST",
        body: JSON.stringify({
            homestay_id: homestayId,
            rating,
            review: reviewText,
        }),
        }
    );

    setReviewLoading(false);

    if (!response.ok) {
        alert(data.detail || "Unable to submit review.");
        return;
    }

    setReviewText("");
    setRating(5);

    loadReviews();
    }

  async function toggleFavorite() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    if (favorite) {
      const { response } = await apiRequest(
        `/favorites/${homestayId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setFavorite(false);
      }
    } else {
      const { response } = await apiRequest(
        "/favorites/",
        {
          method: "POST",
          body: JSON.stringify({
            homestay_id: homestayId,
          }),
        }
      );

      if (response.ok) {
        setFavorite(true);
      }
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="pt-40 text-center text-2xl">
          Loading Homestay...
        </main>

        <Footer />
      </>
    );
  }

  if (!stay) {
    return (
      <>
        <Navbar />

        <main className="pt-40 text-center">

          <h1 className="text-5xl font-bold">
            Homestay Not Found
          </h1>

          <Link
            href="/homestays"
            className="
              inline-block
              mt-10
              bg-green-700
              text-white
              px-8
              py-4
              rounded-xl
            "
          >
            Back
          </Link>

        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="pt-40 pb-20">

        <div className="max-w-7xl mx-auto px-8">

          <img
            src={stay.image_url}
            alt={stay.title}
            className="
              w-full
              h-[500px]
              object-cover
              rounded-3xl
              shadow-xl
            "
          />

          <div className="mt-10 flex justify-between items-start">

            <div>

              <h1 className="text-5xl font-black">
                {stay.title}
              </h1>

              <p className="mt-5 text-2xl">
                📍 {stay.location}
              </p>

              <p className="mt-5 text-4xl font-bold text-green-700">
                ₹{stay.price}/night
              </p>

            </div>

            <button
              onClick={toggleFavorite}
              className="
                text-6xl
                hover:scale-110
                transition
              "
            >
              {favorite ? "❤️" : "🤍"}
            </button>

          </div>

          <div
            className="
              mt-12
              rounded-2xl
              bg-green-50
              dark:bg-neutral-900
              p-8
            "
          >

            <h2 className="text-3xl font-bold">
              Sustainability
            </h2>

            <p className="mt-5 text-xl">
              🌿 Eco Score:
              <span className="font-bold text-green-700">
                {" "}
                {stay.eco_score}/100
              </span>
            </p>

          </div>

          <div
            className="
              mt-10
              grid
              md:grid-cols-2
              gap-6
            "
          >
            <div
              className="
                rounded-2xl
                border
                p-6
                shadow
              "
            >
              <h2 className="text-2xl font-bold mb-5">
                Amenities
              </h2>

              <div className="space-y-3 text-lg">

                <p>
                  {stay.wifi ? "✅" : "❌"} WiFi
                </p>

                <p>
                  {stay.breakfast ? "✅" : "❌"} Breakfast Included
                </p>

                <p>
                  {stay.parking ? "✅" : "❌"} Parking Available
                </p>

                <p>
                  {stay.pet_friendly ? "✅" : "❌"} Pet Friendly
                </p>

              </div>
            </div>

            <div
              className="
                rounded-2xl
                border
                p-6
                shadow
              "
            >
              <h2 className="text-2xl font-bold mb-5">
                Book this Homestay
              </h2>

              <p className="mb-8 text-lg">
                Ready to enjoy your eco-friendly stay?
              </p>

              <Link
                href={`/booking?homestay=${stay.id}`}
                className="
                  inline-block
                  w-full
                  text-center
                  bg-green-700
                  hover:bg-green-800
                  text-white
                  py-4
                  rounded-xl
                  font-bold
                  text-lg
                "
              >
                📅 Book Now
              </Link>
            </div>

          </div>

                    <div
                        className="
                        mt-16
                        rounded-2xl
                        border
                        p-8
                        shadow
                        "
                    >
                        <h2 className="text-3xl font-bold mb-6">
                        ⭐ Reviews
                        </h2>

                        {/* Add Review */}

                        <div className="space-y-4">

                        <select
                            value={rating}
                            onChange={(e) =>
                            setRating(Number(e.target.value))
                            }
                            className="
                            w-full
                            border
                            rounded-xl
                            p-3
                            "
                        >
                            <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                            <option value={4}>⭐⭐⭐⭐ (4)</option>
                            <option value={3}>⭐⭐⭐ (3)</option>
                            <option value={2}>⭐⭐ (2)</option>
                            <option value={1}>⭐ (1)</option>
                        </select>

                        <textarea
                            rows={4}
                            value={reviewText}
                            onChange={(e) =>
                                setReviewText(e.target.value)
                            }
                            placeholder="Write your experience..."
                            className="
                            w-full
                            border
                            rounded-xl
                            p-4
                            "
                        />

                        <button
                            onClick={submitReview}
                            disabled={reviewLoading}
                            className="
                                bg-green-700
                                hover:bg-green-800
                                text-white
                                px-8
                                py-3
                                rounded-xl
                                disabled:opacity-50
                            "
                            >
                            {reviewLoading ? "Submitting..." : "Submit Review"}
                        </button>

                        </div>

                        {/* Review List */}

                        <div className="mt-10 space-y-6">

                        {reviews.length === 0 && (
                            <p className="text-gray-500">
                            No reviews yet.
                            </p>
                        )}

                        {reviews.map((item: any) => (
                            <div
                            key={item.id}
                            className="
                                border
                                rounded-xl
                                p-5
                            "
                            >
                            <div className="flex justify-between">

                                <div>

                                <h3 className="font-bold text-lg">
                                    {item.profiles?.full_name ??
                                    "Anonymous"}
                                </h3>

                                <p>
                                    {"⭐".repeat(item.rating)}
                                </p>

                                </div>

                                <small>
                                {new Date(
                                    item.created_at
                                ).toLocaleDateString()}
                                </small>

                            </div>

                            <p className="mt-4">
                                {item.review}
                            </p>

                            </div>
                        ))}

                        </div>

                    </div>

        </div>

      </main>

      <Footer />
    </>
  );
}