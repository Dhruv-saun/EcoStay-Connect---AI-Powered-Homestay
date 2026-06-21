"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function Login() {
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
          max-w-[500px]
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
          <h1
            className="
            text-4xl
            font-bold
            mb-6
            "
          >
            Login
          </h1>
          <input
            type="email"
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
            type="password"
            placeholder="Password"
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
            mb-6
            "
          />
          <button
            onClick={() =>
              alert(
                "Authentication will connect in Week 4"
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
            Login
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}