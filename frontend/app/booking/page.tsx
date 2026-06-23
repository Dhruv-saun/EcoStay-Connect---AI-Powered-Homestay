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
        flex
        justify-center
        items-center
        "
      >

        <div
          className="
          w-[500px]
          p-8
          rounded-xl
          shadow-lg
          border
          border-gray-300
          dark:border-gray-700
          bg-white
          dark:bg-neutral-900
          "
        >

          <h1 className="text-4xl font-bold mb-6">
            Book Your Stay
          </h1>

          <input
            placeholder="Full Name"
            className="w-full border p-3 rounded mb-4"
            onChange={(e)=>
              setForm({...form,name:e.target.value})
            }
          />

          <input
            placeholder="Email"
            className="w-full border p-3 rounded mb-4"
            onChange={(e)=>
              setForm({...form,email:e.target.value})
            }
          />

          <input
            placeholder="Number of Guests"
            className="w-full border p-3 rounded mb-4"
            onChange={(e)=>
              setForm({...form,guests:e.target.value})
            }
          />

          <input
            type="date"
            className="w-full border p-3 rounded mb-4"
            onChange={(e)=>
              setForm({...form,checkin:e.target.value})
            }
          />

          <input
            type="date"
            className="w-full border p-3 rounded mb-4"
            onChange={(e)=>
              setForm({...form,checkout:e.target.value})
            }
          />

          <textarea
            placeholder="Special Requests"
            className="
            w-full
            border
            p-3
            rounded
            mb-6
            h-28
            "
            onChange={(e)=>
              setForm({...form,requests:e.target.value})
            }
          />

          <button
            onClick={handleBooking}
            className="
            bg-green-700
            text-white
            w-full
            p-3
            rounded
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