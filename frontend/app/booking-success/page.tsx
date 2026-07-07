"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function BookingSuccessContent() {
  const searchParams = useSearchParams();

  const title = searchParams.get("title");
  const location = searchParams.get("location");
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  const guests = searchParams.get("guests");

  return (
    <main className="min-h-screen pt-36 pb-20 px-6 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-3xl shadow-xl p-10 text-center">

        <div className="text-7xl mb-6">
          ✅
        </div>

        <h1 className="text-5xl font-black text-green-700 mb-3">
          Booking Confirmed!
        </h1>

        <p className="text-gray-500 mb-10">
          Thank you for choosing EcoStay.
          Your booking has been successfully confirmed.
        </p>

        <div className="border rounded-2xl p-8 text-left space-y-5">

          <div>
            <h2 className="text-3xl font-bold">
              {title}
            </h2>

            <p className="text-gray-500">
              📍 {location}
            </p>
          </div>

          <hr />

          <div className="flex justify-between">
            <span className="font-semibold">
              Check-in
            </span>

            <span>{checkin}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">
              Check-out
            </span>

            <span>{checkout}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">
              Guests
            </span>

            <span>{guests}</span>
          </div>

        </div>

        <div className="flex gap-5 justify-center mt-10">

          <Link
            href="/dashboard"
            className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-xl font-semibold"
          >
            Dashboard
          </Link>

          <Link
            href="/homestays"
            className="border px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-neutral-800"
          >
            Explore More
          </Link>

        </div>

      </div>
    </main>
  );
}

export default function BookingSuccess() {
  return (
    <>
      <Navbar />

      <Suspense
        fallback={
          <main className="min-h-screen flex items-center justify-center">
            <h1 className="text-2xl font-bold">
              Loading...
            </h1>
          </main>
        }
      >
        <BookingSuccessContent />
      </Suspense>

      <Footer />
    </>
  );
}