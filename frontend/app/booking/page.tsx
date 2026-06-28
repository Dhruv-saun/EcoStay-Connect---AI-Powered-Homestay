"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Booking() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    guests: "",
    checkin: "",
    checkout: "",
    requests: "",
  });

  async function handleBooking() {
    try {
      const response = await fetch(
        "http://localhost:8000/homestays",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            title: `${form.name} Booking`,
            location: `${form.checkin} → ${form.checkout}`,
            price: 2500,
          }),
        }
      );

      if (response.ok) {
        alert(
`Booking confirmed

Check-in: ${form.checkin}

Check-out: ${form.checkout}`
        );
      } else {
        alert("Booking failed");
      }
    } catch {
      alert("Backend not reachable");
    }
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
          <h1
            className="
            text-5xl
            font-black
            mb-8
            "
          >
            Book Your Stay
          </h1>

          <input
            placeholder="Full Name"
            className="
            w-full
            p-4
            rounded-xl
            mb-4

            bg-white
            dark:bg-neutral-950

            border
            border-gray-300
            dark:border-neutral-700

            text-black
            dark:text-white
            "
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            placeholder="Email"
            className="
            w-full
            p-4
            rounded-xl
            mb-4

            bg-white
            dark:bg-neutral-950

            border
            border-gray-300
            dark:border-neutral-700

            text-black
            dark:text-white
            "
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            placeholder="Guests"
            className="
            w-full
            p-4
            rounded-xl
            mb-4

            bg-white
            dark:bg-neutral-950

            border
            border-gray-300
            dark:border-neutral-700

            text-black
            dark:text-white
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
            className="
            w-full
            p-4
            rounded-xl
            mb-4

            bg-white
            dark:bg-neutral-950

            border
            border-gray-300
            dark:border-neutral-700

            text-black
            dark:text-white
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
            className="
            w-full
            p-4
            rounded-xl
            mb-4

            bg-white
            dark:bg-neutral-950

            border
            border-gray-300
            dark:border-neutral-700

            text-black
            dark:text-white
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
            className="
            w-full
            h-32

            p-4

            rounded-xl

            mb-8

            bg-white
            dark:bg-neutral-950

            border
            border-gray-300
            dark:border-neutral-700

            text-black
            dark:text-white
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
            className="
            w-full

            p-4

            rounded-2xl

            bg-green-600
            hover:bg-green-700

            text-white
            font-bold

            duration-300
            "
          >
            Confirm Booking
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}