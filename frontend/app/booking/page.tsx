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
        w-[500px]
        p-8
        rounded-xl
        shadow-lg
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
          placeholder="Your Name"
        />
        <input
          className="
          w-full
          border
          p-3
          rounded
          mb-4
          "
          placeholder="Check In Date"
        />
        <input
          className="
          w-full
          border
          p-3
          rounded
          mb-6
          "
          placeholder="Check Out Date"
        />
        <button
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