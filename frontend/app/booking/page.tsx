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
      "
    >
      <div
        className="
        w-full
        max-w-[550px]
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
          className="
          w-full
          border
          p-3
          rounded
          mb-4
          "
          placeholder="Full Name"
        />
        <input
          className="
          w-full
          border
          p-3
          rounded
          mb-4
          "
          placeholder="Email"
        />
        <input
          className="
          w-full
          border
          p-3
          rounded
          mb-4
          "
          placeholder="Number of Guests"
        />
        <input
          type="date"
          className="
          w-full
          border
          p-3
          rounded
          mb-4
          "
        />
        <input
          type="date"
          className="
          w-full
          border
          p-3
          rounded
          mb-4
          "
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
        />
        <button
        onClick={() =>
        alert(
          "Booking system will connect in Week 4"
        )
        }
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