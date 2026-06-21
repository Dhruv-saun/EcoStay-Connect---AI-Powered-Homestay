import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
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
            Welcome Back
          </h1>
          <p className="mb-8">
            Login to continue your eco journey
          </p>
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
            mb-6
            "
          />
          <button
            className="
            w-full
            bg-green-700
            text-white
            p-3
            rounded-lg
            "
          >
            Login
          </button>
          <div
            className="
            mt-6
            text-center
            "
          >
            <Link
              href="/register"
              className="
              text-green-700
              "
            >
              Create Account
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}