"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Booking() {
  return (
    <>
      <Navbar />

      <main
        className="
        min-h-screen
        flex
        justify-center
        items-center
        p-10
        "
      >
        <div
          className="
          w-full
          max-w-[550px]
          p-8
          rounded-xl
          shadow-xl
          border
          border-gray-300
          dark:border-gray-500
          bg-white
          dark:bg-neutral-900
          text-black
          dark:text-white
          "
        >

          <h1 className="text-4xl font-bold mb-6">
            Book Your Stay
          </h1>

          <input
            placeholder="Full Name"
            className="
            w-full
            p-3
            rounded
            border
            border-gray-300
            dark:border-gray-500
            bg-white
            dark:bg-neutral-800
            text-black
            dark:text-white
            mb-4
            "
          />

          <input
            placeholder="Email"
            className="
            w-full
            p-3
            rounded
            border
            border-gray-300
            dark:border-gray-500
            bg-white
            dark:bg-neutral-800
            text-black
            dark:text-white
            mb-4
            "
          />

          <input
            placeholder="Number of Guests"
            className="
            w-full
            p-3
            rounded
            border
            border-gray-300
            dark:border-gray-500
            bg-white
            dark:bg-neutral-800
            text-black
            dark:text-white
            mb-4
            "
          />
          <input
            type="date"
            className="
            w-full
            p-3
            rounded
            border
            border-gray-300
            dark:border-gray-500
            bg-white
            dark:bg-neutral-800
            text-black
            dark:text-white
            mb-4
            "
          />
          <input
            type="date"
            className="
            w-full
            p-3
            rounded
            border
            border-gray-300
            dark:border-gray-500
            bg-white
            dark:bg-neutral-800
            text-black
            dark:text-white
            mb-4
            "
          />
          <textarea
            placeholder="Special Requests"
            className="
            w-full
            h-28
            p-3
            rounded
            border
            border-gray-300
            dark:border-gray-500
            bg-white
            dark:bg-neutral-800
            text-black
            dark:text-white
            mb-6
            "
          />
          <button
            onClick={() =>
              alert(
                "Booking system will connect in Week 4"
              )
            }
            className="
            bg-green-700
            hover:bg-green-800
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