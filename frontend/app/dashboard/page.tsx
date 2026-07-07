"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

type Booking = {
  id: number;
  status: string;
  guests: number;
  checkin: string;
  checkout: string;
  requests: string;
  homestays: {
    title: string;
    location: string;
    price: number;
    image_url: string;
  }|null;
};

export default function Dashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<any>(null);

  const [bookings, setBookings] = useState<Booking[]>([]);

  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    async function loadDashboard() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setUser(user);

      const { count } = await supabase
        .from("favorites")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", user.id);

      setFavoriteCount(count || 0);

      const { data, error } = await supabase
        .from("bookings")
        .select(`
          id,
          status,
          guests,
          checkin,
          checkout,
          requests,
          created_at,
          homestays(
            title,
            location,
            price,
            image_url
          )
        `
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.log("SUPABASE ERROR:", error);
        alert(JSON.stringify(error, null, 2));
      } else {
        console.log("BOOKINGS:", JSON.stringify(data, null, 2));
        setBookings((data ?? []) as unknown as Booking[]);
      }
            setLoading(false);
    }

    loadDashboard();
  }, [router]);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  async function loadBookings() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("bookings")
      .select(`
        id,
        status,
        guests,
        checkin,
        checkout,
        requests,
        created_at,
        homestays(
          title,
          location,
          price,
          image_url
        )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) {
      setBookings((data as unknown as Booking[]) || []);
    }
  }

  async function cancelBooking(bookingId: number) {
  const confirmDelete = confirm(
    "Are you sure you want to cancel this booking?"
  );

  if (!confirmDelete) return;

  const { error } = await supabase
    .from("bookings")
    .update({
      status: "Cancelled",
    })
    .eq("id", bookingId);

  if (error) {
    console.log("DELETE ERROR:", error);
    alert(error.message);
    return;
  }

  alert("Booking cancelled successfully!");

  await loadBookings();
}

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <h1 className="text-3xl font-bold">Loading Dashboard...</h1>
        </main>
        <Footer />
      </>
    );
  }

  const latestBooking = bookings.length > 0 ? bookings[0] : null; return (
    <>
      <Navbar />

      <main className="min-h-screen pt-36 px-8 pb-20">

        <h1 className="text-5xl font-bold mb-2">
          Dashboard
        </h1>

        <p className="text-lg text-gray-500 dark:text-gray-300 mb-10">
          Manage bookings and track your eco-travel journey.
        </p>

        {/* Profile */}

        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-300 dark:border-neutral-700 p-6 flex items-center gap-5 mb-10">

          <div className="w-20 h-20 rounded-full bg-green-700 flex items-center justify-center text-3xl font-bold text-white">
            {(user?.user_metadata?.full_name || user?.email || "U")
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>

            <h2 className="text-3xl font-bold">
              {user?.user_metadata?.full_name || "Traveller"}
            </h2>

            <p className="text-gray-500">
              {user?.email}
            </p>

          </div>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-gray-300 dark:border-neutral-700 p-6">

            <h3 className="text-xl font-bold">
              Total Bookings
            </h3>

            <p className="text-5xl mt-4 font-black text-green-700">
              {bookings.length}
            </p>

          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-gray-300 dark:border-neutral-700 p-6">

            <h3 className="text-xl font-bold">
              Favourite Places
            </h3>

            <p className="text-5xl mt-4 font-black text-green-700">
              {favoriteCount}
            </p>

          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-gray-300 dark:border-neutral-700 p-6">

            <h3 className="text-xl font-bold">
              Sustainability Score
            </h3>

            <p className="text-5xl mt-4 font-black text-green-700">
              87
            </p>

          </div>

        </div>

        {/* Latest Booking */}

        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-300 dark:border-neutral-700 p-8 mb-10">

          <h2 className="text-3xl font-bold mb-6">
            Latest Booking
          </h2>

          {!latestBooking ? (

            <p>No bookings yet.</p>

          ) : (

            <div className="flex flex-col md:flex-row gap-8">

              <img
                src={latestBooking.homestays?.image_url}
                className="w-full md:w-96 h-60 object-cover rounded-xl"
                alt={latestBooking.homestays?.title}
              />

              <div>

                <h3 className="text-3xl font-bold">
                  {latestBooking.homestays?.title || "Unknown Homestay"}
                </h3>

                <p className="mt-3">
                  📍 {latestBooking.homestays?.location}
                </p>

                <p className="mt-2">
                  ₹{latestBooking.homestays?.price}/night
                </p>

                <p className="mt-4">
                  Check-in: {latestBooking.checkin}
                </p>

                <p>
                  Check-out: {latestBooking.checkout}
                </p>

                <p>
                  Guests: {latestBooking.guests}
                </p>

                <div
                  className={`mt-5 inline-block px-4 py-2 rounded-full font-bold text-white ${
                    latestBooking.status === "Confirmed"
                      ? "bg-green-600"
                      : latestBooking.status === "Cancelled"
                      ? "bg-red-600"
                      : "bg-yellow-500"
                  }`}
                >
                  {latestBooking.status}
                </div>

                <div
                  className={`mt-5 inline-block px-4 py-2 rounded-full font-bold text-white ${
                    latestBooking.status === "Confirmed"
                      ? "bg-green-600"
                      : latestBooking.status === "Cancelled"
                      ? "bg-red-600"
                      : "bg-yellow-500"
                  }`}
                >
                  {latestBooking.status}
                </div>

                <button
                  onClick={() => cancelBooking(latestBooking.id)}
                  className="
                    mt-6
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-semibold
                    transition
                  "
                >
                  Cancel Booking
                </button>

              </div>

            </div>

          )}

        </div>

        {/* Recent Bookings */}

        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-300 dark:border-neutral-700 p-8">

          <h2 className="text-3xl font-bold mb-6">
            Recent Bookings
          </h2>

          {bookings.length === 0 ? (

            <p>No bookings found.</p>

          ) : (

            <div className="space-y-6">

              {bookings.map((booking) => (

                <div
                  key={booking.id}
                  className="flex flex-col md:flex-row gap-6 border rounded-xl p-5"
                >

                  <img
                    src={booking.homestays?.image_url}
                    className="w-full md:w-60 h-40 object-cover rounded-lg"
                    alt={booking.homestays?.title}
                  />

                  <div>

                    <h3 className="text-2xl font-bold">
                      {booking.homestays?.title}
                    </h3>

                    <p className="mt-2">
                      📍 {booking.homestays?.location}
                    </p>

                    <p>
                      Guests: {booking.guests}
                    </p>

                    <p>
                      {booking.checkin} → {booking.checkout}
                    </p>

                    <div
                      className={`mt-3 inline-block px-3 py-1 rounded-full text-white font-semibold ${
                        booking.status === "Confirmed"
                          ? "bg-green-600"
                          : booking.status === "Cancelled"
                          ? "bg-red-600"
                          : "bg-yellow-500"
                      }`}
                    >
                      {booking.status}
                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        <div className="flex justify-center mt-12">

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-xl font-bold"
          >
            Logout
          </button>

        </div>

      </main>

      <Footer />
    </>
  );
}
