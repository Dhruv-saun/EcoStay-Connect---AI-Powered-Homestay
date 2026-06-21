import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
export default function Register() {
  return (
    <>
      <Navbar />
      <main
        className="
        min-h-screen
        flex
        justify-center
        items-center
        p-8
        "
      >
        <div
          className="
          w-full
          max-w-md
          rounded-xl
          shadow-lg
          border
          border-gray-300
          dark:border-gray-700
          bg-white
          dark:bg-neutral-900
          p-8
          "
        >
          <h1
            className="
            text-4xl
            font-bold
            mb-2
            "
          >
            Create Account
          </h1>
          <p className="mb-8">
            Join EcoStay Connect
          </p>
          <input
            type="text"
            placeholder="Full Name"
            className="
            w-full
            border
            rounded-lg
            p-3
            mb-4
            "
          />
          <input
            type="email"
            placeholder="Email"
            className="
            w-full
            border
            rounded-lg
            p-3
            mb-4
            "
          />
          <input
            type="password"
            placeholder="Password"
            className="
            w-full
            border
            rounded-lg
            p-3
            mb-4
            "
          />
          <select
            className="
            w-full
            border
            rounded-lg
            p-3
            mb-6
            "
          >
          <option>
            Register As
          </option>
          <option>
            Traveler / Guest
          </option>
          <option>
            Host
          </option>
          </select>
          <button
            className="
            w-full
            bg-green-700
            text-white
            p-3
            rounded-lg
            "
          >
            Register
          </button>
          <div
            className="
            mt-6
            text-center
            "
          >
            <Link
              href="/login"
              className="
              text-green-700
              "
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}