import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
const stays = [
  {
    id: 1,
    title: "Mountain View Cottage",
    location: "Mussoorie",
    price: "₹2500/night",
  },
  {
    id: 2,
    title: "Forest Eco Retreat",
    location: "Rishikesh",
    price: "₹3200/night",
  },
  {
    id: 3,
    title: "Lake Side Homestay",
    location: "Nainital",
    price: "₹2800/night",
  },
];
export default function Homestays() {
  return (
    <>
      <Navbar />
      <main className="p-10">
        <h1
          className="
          text-5xl
          font-bold
          mb-10
          "
        >
          Explore Homestays
        </h1>
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
          "
        >
          {stays.map((stay) => (
            <div
              key={stay.id}
              className="
              rounded-xl
              overflow-hidden
              shadow-xl
              border
              border-gray-300
              dark:border-gray-500
              bg-white
              dark:bg-neutral-900
              text-black
              dark:text-white
              transition
              "
            >
              <div
                className="
                h-52
                bg-green-200
                dark:bg-green-900
                border-b
                border-gray-300
                dark:border-gray-500
                flex
                items-center
                justify-center
                text-6xl
                "
              >
                🌿
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold">
                  {stay.title}
                </h2>
                <p className="mt-2">
                  📍 {stay.location}
                </p>
                <p
                  className="
                  mt-2
                  font-semibold
                  text-green-700
                  dark:text-green-400
                  "
                >
                  {stay.price}
                </p>
                <Link
                  href="/booking"
                  className="
                  mt-6
                  inline-block
                  bg-green-700
                  hover:bg-green-800
                  text-white
                  px-5
                  py-2
                  rounded-lg
                  "
                >
                  Book Stay
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}