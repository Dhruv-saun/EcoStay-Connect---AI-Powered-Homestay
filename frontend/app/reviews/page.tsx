"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

type Homestay = {
  id: number;
  title: string;
};

type Review = {
  id: number;
  rating: number;
  review: string;
  created_at: string;
  profiles: {
    full_name: string;
  } | null;
  homestays: {
    title: string;
  } | null;
};

export default function ReviewsPage() {
  const [homestays, setHomestays] = useState<Homestay[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedStay, setSelectedStay] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: stayData } = await supabase
      .from("homestays")
      .select("id,title")
      .order("title");

    if (stayData) {
      setHomestays(stayData);
    }

    const { data: reviewData } = await supabase
      .from("reviews")
      .select(`
        id,
        rating,
        review,
        created_at,
        profiles(full_name),
        homestays(title)
      `)
      .order("created_at", { ascending: false });

    if (reviewData) {
      setReviews(reviewData as any);
    }

    setLoading(false);
  }

  async function submitReview() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first.");
      return;
    }

    if (!selectedStay) {
      alert("Select a homestay.");
      return;
    }

    if (review.trim() === "") {
      alert("Write a review.");
      return;
    }

    const { error } = await supabase
      .from("reviews")
      .insert({
        user_id: user.id,
        homestay_id: Number(selectedStay),
        rating,
        review,
      });

    if (error) {
      console.log(error);
      alert(JSON.stringify(error, null, 2));
      return;
    }

    alert("Review submitted!");

    setSelectedStay("");
    setRating(5);
    setReview("");

    loadData();
  }
    return (
    <>
      <Navbar />

      <main className="min-h-screen pt-40 px-8 pb-20">

        <h1 className="text-5xl font-bold mb-10">
          Reviews & Ratings
        </h1>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8 border border-gray-300 dark:border-neutral-700 mb-12">

          <h2 className="text-3xl font-bold mb-6">
            Write a Review
          </h2>

          <select
            value={selectedStay}
            onChange={(e) => setSelectedStay(e.target.value)}
            className="w-full p-4 rounded-xl border mb-5 dark:bg-neutral-800"
          >
            <option value="">Select Homestay</option>

            {homestays.map((stay) => (
              <option key={stay.id} value={stay.id}>
                {stay.title}
              </option>
            ))}
          </select>

          <div className="mb-5">

            <label className="font-semibold">
              Rating
            </label>

            <select
              value={rating}
              onChange={(e) =>
                setRating(Number(e.target.value))
              }
              className="w-full mt-2 p-4 rounded-xl border dark:bg-neutral-800"
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
              <option value={4}>⭐⭐⭐⭐ (4)</option>
              <option value={3}>⭐⭐⭐ (3)</option>
              <option value={2}>⭐⭐ (2)</option>
              <option value={1}>⭐ (1)</option>
            </select>

          </div>

          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your experience..."
            className="w-full h-36 p-4 rounded-xl border dark:bg-neutral-800"
          />

          <button
            onClick={submitReview}
            className="mt-6 bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-bold"
          >
            Submit Review
          </button>

        </div>

        <h2 className="text-4xl font-bold mb-8">
          Recent Reviews
        </h2>

        {loading ? (

          <p>Loading...</p>

        ) : reviews.length === 0 ? (

          <p>No reviews yet.</p>

        ) : (

          <div className="space-y-8">

            {reviews.map((item) => (

              <div
                key={item.id}
                className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-300 dark:border-neutral-700 p-8"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <h3 className="text-2xl font-bold">
                      {item.homestays?.title}
                    </h3>

                    <p className="text-gray-500">
                      {item.profiles?.full_name || "Traveller"}
                    </p>

                  </div>

                  <div className="text-2xl">
                    {"⭐".repeat(item.rating)}
                  </div>

                </div>

                <p className="mt-6 text-lg">
                  {item.review}
                </p>

                <p className="mt-5 text-sm text-gray-500">
                  {new Date(item.created_at).toLocaleDateString()}
                </p>

              </div>

            ))}

          </div>

        )}

      </main>

      <Footer />
    </>
  );
}