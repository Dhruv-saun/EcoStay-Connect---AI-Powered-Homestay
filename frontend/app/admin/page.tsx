"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

type Homestay = {
  id: number;
  title: string;
  location: string;
  price: number;
  image_url: string;
};

export default function AdminPage() {
  const [loading, setLoading] = useState(true);

  const [homestays, setHomestays] = useState<Homestay[]>([]);

  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    image_url: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function loadData() {

      // Check logged-in user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      // Check admin permission
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (!profile?.is_admin) {
        alert("Access Denied. Admins only.");
        router.push("/");
        return;
      }

      // Load admin data
      await loadHomestays();
      await loadAnalytics();
      await loadPopularStay();
      await loadBookingTrend();

    }

    loadData();
  }, [router]);

  const [stats, setStats] = useState({
    users: 0,
    homestays: 0,
    bookings: 0,
    reviews: 0,
    favorites: 0,
  });

  const [popularStay, setPopularStay] = useState<any>(null);
  
  const [bookingTrend , setBookingTrend] = useState<any[]>([]);

  async function loadAnalytics() {

      const { count: homestays } = await supabase
        .from("homestays")
        .select("*", { count: "exact", head: true });

      const { count: bookings } = await supabase
        .from("bookings")
        .select("*", { count: "exact", head: true });

      const { count: reviews } = await supabase
        .from("reviews")
        .select("*", { count: "exact", head: true });

      const { count: favorites } = await supabase
        .from("favorites")
        .select("*", { count: "exact", head: true });

      const { count: users } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      setStats({
        users: users || 0,
        homestays: homestays || 0,
        bookings: bookings || 0,
        reviews: reviews || 0,
        favorites: favorites || 0,
      });

    }
  
  async function loadPopularStay() {
    const { data, error } = await supabase
      .from("bookings")
      .select(`
        homestay_id,
        homestays(
          title,
          image_url,
          location
        )
      `);

    if (error || !data) return;

    const counts: any = {};

    data.forEach((booking: any) => {
      const id = booking.homestay_id;

      if (!counts[id]) {
        counts[id] = {
          count: 1,
          stay: booking.homestays,
        };
      } else {
        counts[id].count++;
      }
    });

    const sorted = Object.values(counts).sort(
      (a: any, b: any) => b.count - a.count
    );

    if (sorted.length > 0) {
      setPopularStay(sorted[0]);
    }
  }

  async function loadBookingTrend() {
    const { data, error } = await supabase
      .from("bookings")
      .select("created_at");

    if (error || !data) return;

    const counts: Record<string, number> = {};

    data.forEach((booking: any) => {
      const date = new Date(booking.created_at)
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        });

      counts[date] = (counts[date] || 0) + 1;
    });

    const chartData = Object.entries(counts).map(
      ([date, bookings]) => ({
        date,
        bookings,
      })
    );

    setBookingTrend(chartData);
  }

  async function loadHomestays() {
    const { data, error } = await supabase
      .from("homestays")
      .select("*")
      .order("id");

    if (!error && data) {
      setHomestays(data);
    }

    setLoading(false);
  }

  function editStay(stay: Homestay) {
    setEditingId(stay.id);

    setForm({
      title: stay.title,
      location: stay.location,
      price: String(stay.price),
      image_url: stay.image_url,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function resetForm() {
    setEditingId(null);

    setForm({
      title: "",
      location: "",
      price: "",
      image_url: "",
    });
  }
    async function saveHomestay() {
    if (
      !form.title ||
      !form.location ||
      !form.price ||
      !form.image_url
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (editingId === null) {
      // Add new homestay
      const { error } = await supabase
        .from("homestays")
        .insert({
          title: form.title,
          location: form.location,
          price: Number(form.price),
          image_url: form.image_url,
        });

      if (error) {
        alert(error.message);
        return;
      }

      alert("Homestay added successfully!");
    } else {
      // Update existing homestay
      const { error } = await supabase
        .from("homestays")
        .update({
          title: form.title,
          location: form.location,
          price: Number(form.price),
          image_url: form.image_url,
        })
        .eq("id", editingId);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Homestay updated successfully!");
    }

    resetForm();
    loadHomestays();
  }

  async function deleteStay(id: number) {
    const confirmDelete = confirm(
      "Delete this homestay?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("homestays")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Homestay deleted successfully!");

    loadHomestays();
  }
    return (
    <>
      <Navbar />

      <main className="pt-40 px-8 pb-20 min-h-screen">

        <h1 className="text-5xl font-bold mb-10">
          Admin Panel
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">

          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-500">👥 Users</p>
            <h2 className="text-4xl font-bold text-green-700">
              {stats.users}
            </h2>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-500">🏠 Homestays</p>
            <h2 className="text-4xl font-bold text-green-700">
              {stats.homestays}
            </h2>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-500">📅 Bookings</p>
            <h2 className="text-4xl font-bold text-green-700">
              {stats.bookings}
            </h2>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-500">⭐ Reviews</p>
            <h2 className="text-4xl font-bold text-green-700">
              {stats.reviews}
            </h2>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-500">❤️ Favorites</p>
            <h2 className="text-4xl font-bold text-green-700">
              {stats.favorites}
            </h2>
          </div>

        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8 mb-10">

          <h2 className="text-3xl font-bold mb-6">
            🔥 Most Popular Homestay
          </h2>

          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8 mb-10">

          <h2 className="text-3xl font-bold mb-6">
            📈 Booking Trend
          </h2>

          <ResponsiveContainer width="100%" height={350}>

            <BarChart data={bookingTrend}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="bookings"
                fill="#16a34a"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

          {!popularStay ? (

            <p>No bookings yet.</p>

          ) : (

            <div className="flex gap-6 items-center">

              <img
                src={popularStay.stay.image_url}
                className="w-52 h-36 object-cover rounded-xl"
              />

              <div>

                <h3 className="text-2xl font-bold">
                  {popularStay.stay.title}
                </h3>

                <p>
                  📍 {popularStay.stay.location}
                </p>

                <p className="text-green-700 font-bold mt-2">
                  {popularStay.count} bookings
                </p>

              </div>

            </div>

          )}

        </div>

        {/* Form */}

        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-300 dark:border-neutral-700 p-8 mb-12">

          <h2 className="text-3xl font-bold mb-8">
            {editingId ? "Edit Homestay" : "Add New Homestay"}
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              className="p-4 rounded-xl border dark:bg-neutral-800"
            />

            <input
              placeholder="Location"
              value={form.location}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: e.target.value,
                })
              }
              className="p-4 rounded-xl border dark:bg-neutral-800"
            />

            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value,
                })
              }
              className="p-4 rounded-xl border dark:bg-neutral-800"
            />

            <input
              placeholder="/images/mountain.jpg"
              value={form.image_url}
              onChange={(e) =>
                setForm({
                  ...form,
                  image_url: e.target.value,
                })
              }
              className="p-4 rounded-xl border dark:bg-neutral-800"
            />

          </div>

          <div className="flex gap-4 mt-8">

            <button
              onClick={saveHomestay}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-bold"
            >
              {editingId ? "Update Homestay" : "Add Homestay"}
            </button>

            {editingId && (
              <button
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 rounded-xl font-bold"
              >
                Cancel
              </button>
            )}

          </div>

        </div>

        {/* Table */}

        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-300 dark:border-neutral-700 overflow-hidden">

          <table className="w-full">

            <thead className="bg-green-700 text-white">

              <tr>

                <th className="p-5 text-left">Image</th>

                <th className="p-5 text-left">Title</th>

                <th className="p-5 text-left">Location</th>

                <th className="p-5 text-left">Price</th>

                <th className="p-5 text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    Loading...
                  </td>
                </tr>

              ) : homestays.length === 0 ? (

                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    No homestays found.
                  </td>
                </tr>

              ) : (

                homestays.map((stay) => (

                  <tr
                    key={stay.id}
                    className="border-b dark:border-neutral-700"
                  >

                    <td className="p-4">

                      <img
                        src={stay.image_url}
                        alt={stay.title}
                        className="w-28 h-20 rounded-lg object-cover"
                      />

                    </td>

                    <td className="p-4 font-semibold">
                      {stay.title}
                    </td>

                    <td className="p-4">
                      {stay.location}
                    </td>

                    <td className="p-4">
                      ₹{stay.price}
                    </td>

                    <td className="p-4">

                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() => editStay(stay)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteStay(stay.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </main>

      <Footer />
    </>
  );
}