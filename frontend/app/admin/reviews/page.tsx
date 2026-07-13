"use client";

import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "@/lib/api";

export default function AdminReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    const { response, data } = await apiRequest("/admin/reviews/");

    if (response.ok) {
      setReviews(data);
    } else {
      console.log(data);
    }

    setLoading(false);
  }

  async function deleteReview(id: number) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) return;

    const { response } = await apiRequest(
      `/admin/reviews/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      loadReviews();
    } else {
      alert("Unable to delete review.");
    }
  }

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const q = search.toLowerCase();

      const matchesSearch =
        String(review.id).includes(q) ||
        String(review.user_id).toLowerCase().includes(q) ||
        String(review.homestay_id).includes(q) ||
        (review.review || "").toLowerCase().includes(q);

      const matchesRating =
        ratingFilter === "All" ||
        String(review.rating) === ratingFilter;

      return matchesSearch && matchesRating;
    });
  }, [reviews, search, ratingFilter]);

  if (loading) {
    return (
      <main className="text-center text-2xl pt-20">
        Loading Reviews...
      </main>
    );
  }

  return (
    <main>

      <h1 className="text-5xl font-black mb-8">
        ⭐ Manage Reviews
      </h1>

      <div className="grid md:grid-cols-2 gap-4 mb-8">

        <input
          type="text"
          placeholder="Search by Review ID, User ID, Homestay ID or Comment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-xl p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="border rounded-xl p-4 shadow-sm"
        >
          <option value="All">All Ratings</option>
          <option value="5">⭐⭐⭐⭐⭐ (5)</option>
          <option value="4">⭐⭐⭐⭐ (4)</option>
          <option value="3">⭐⭐⭐ (3)</option>
          <option value="2">⭐⭐ (2)</option>
          <option value="1">⭐ (1)</option>
        </select>

      </div>

      <div className="mb-5 text-lg font-semibold">
        Total Reviews: {filteredReviews.length}
      </div>

      <div className="overflow-x-auto rounded-2xl border shadow">

        <table className="w-full">

          <thead className="bg-green-700 text-white">

            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">User ID</th>
              <th className="p-4">Homestay</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Comment</th>
              <th className="p-4">Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredReviews.length === 0 ? (

              <tr>
                <td
                  colSpan={6}
                  className="text-center p-8 text-gray-500"
                >
                  No reviews found.
                </td>
              </tr>

            ) : (

              filteredReviews.map((review) => (

                <tr
                  key={review.id}
                  className="border-b text-center hover:bg-gray-50 dark:hover:bg-neutral-900"
                >

                  <td className="p-4">
                    {review.id}
                  </td>

                  <td className="p-4 break-all">
                    {review.user_id}
                  </td>

                  <td className="p-4">
                    #{review.homestay_id}
                  </td>

                  <td className="p-4">
                    ⭐ {review.rating}
                  </td>

                  <td className="p-4 max-w-sm break-words">
                    {review.review}
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() => deleteReview(review.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </main>
  );
}