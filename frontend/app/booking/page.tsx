"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

function BookingContent() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const homestayId = Number(searchParams.get("homestay"));

  const [loading, setLoading] = useState(true);
  
  const [homestay, setHomestay] = useState<any>(null);

  const [bookingLoading, setBookingLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    guests: "",
    checkin: "",
    checkout: "",
    requests: "",
  });

  useEffect(() => {
  async function loadPage() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.user_metadata?.full_name || "",
        email: user.email || "",
      }));
    }

    if (homestayId) {
      const { data } = await supabase
        .from("homestays")
        .select("*")
        .eq("id", homestayId)
        .single();

      setHomestay(data);
    }

    setLoading(false);
  }

  loadPage();
}, [homestayId]);

  async function handleBooking() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first.");
      return;
    }

    if (!homestayId) {
      alert("Invalid homestay selected.");
      return;
    }

    if (
      !form.guests ||
      !form.checkin ||
      !form.checkout
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setBookingLoading(true);

    const { error } = await supabase
      .from("bookings")
      .insert([
        {
          user_id: user.id,
          name: form.name,
          email: form.email,
          guests: Number(form.guests),
          checkin: form.checkin,
          checkout: form.checkout,
          requests: form.requests,
          homestay_id: homestayId,
        },
      ]);

    setBookingLoading(false);

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    router.push(
      `/booking-success?title=${encodeURIComponent(
        homestay.title
      )}&location=${encodeURIComponent(
        homestay.location
      )}&checkin=${form.checkin}&checkout=${form.checkout}&guests=${form.guests}`
    );
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <h1 className="text-2xl font-bold">Loading...</h1>
         </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main
        className="
          min-h-screen
          pt-36
          px-6
          flex
          justify-center
          items-center
          bg-background
          text-foreground
        "
      >
        <div
          className="
            w-full
            max-w-[550px]
            p-10
            rounded-[32px]
            shadow-2xl
            bg-white
            dark:bg-neutral-900
            border
            border-gray-300
            dark:border-neutral-700
          "
        >
          <h1 className="text-5xl font-black mb-8">
            Book Your Stay
          </h1>

          {homestay && (
            <div className="mb-8 p-5 rounded-xl bg-green-50 dark:bg-neutral-800">

              <img
                src={homestay.image_url}
                alt={homestay.title}
                className="w-full h-52 object-cover rounded-xl mb-4"
              />

              <h2 className="text-2xl font-bold">
                {homestay.title}
              </h2>

              <p className="text-gray-500">
                📍 {homestay.location}
              </p>

              <p className="text-xl font-bold text-green-700 mt-2">
                ₹{homestay.price}/night
              </p>

            </div>
          )}

          <input
            value={form.name}
            disabled
            className="
              w-full
              p-4
              rounded-xl
              mb-4
              bg-gray-100
              dark:bg-neutral-800
              border
            "
          />

          <input
            value={form.email}
            disabled
            className="
              w-full
              p-4
              rounded-xl
              mb-4
              bg-gray-100
              dark:bg-neutral-800
              border
            "
          />

          <input
            type="number"
            placeholder="Guests"
            value={form.guests}
            className="
              w-full
              p-4
              rounded-xl
              mb-4
              border
            "
            onChange={(e) =>
              setForm({
                ...form,
                guests: e.target.value,
              })
            }
          />

          <label className="block mb-2">
            Check-in
          </label>

          <input
            type="date"
            value={form.checkin}
            className="
              w-full
              p-4
              rounded-xl
              mb-4
              border
            "
            onChange={(e) =>
              setForm({
                ...form,
                checkin: e.target.value,
              })
            }
          />

          <label className="block mb-2">
            Check-out
          </label>

          <input
            type="date"
            value={form.checkout}
            className="
              w-full
              p-4
              rounded-xl
              mb-4
              border
            "
            onChange={(e) =>
              setForm({
                ...form,
                checkout: e.target.value,
              })
            }
          />

          <textarea
            placeholder="Special Requests"
            value={form.requests}
            className="
              w-full
              h-32
              p-4
              rounded-xl
              mb-8
              border
            "
            onChange={(e) =>
              setForm({
                ...form,
                requests: e.target.value,
              })
            }
          />

          <button
            onClick={handleBooking}
            disabled={bookingLoading}
            className="
              w-full
              p-4
              rounded-2xl
              bg-green-600
              hover:bg-green-700
              disabled:bg-gray-400
              text-white
              font-bold
              transition
            "
          >
            {bookingLoading
              ? "Booking..."
              : "Confirm Booking"}
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function Booking() {
  return (
    <Suspense
      fallback={
        <>
          <Navbar />
          <main className="min-h-screen flex items-center justify-center">
            <h1 className="text-2xl font-bold">Loading...</h1>
          </main>
          <Footer />
        </>
      }
    >
      <BookingContent />
    </Suspense>
  );
}