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
    <main className="p-10">
      <h1 className="text-5xl font-bold mb-10">
        Explore Homestays
      </h1>
      <div className="grid grid-cols-3 gap-8">
        {stays.map((stay) => (
          <div
            key={stay.id}
            className="
            rounded-xl
            overflow-hidden
            shadow-lg
            "
          >
            <div
              className="
              h-52
              bg-green-200
              flex
              items-center
              justify-center
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
              <p className="mt-2 font-semibold">

                {stay.price}
              </p>
                <Link
                  href="/booking"
                  className="
                  mt-6
                  bg-green-700
                  text-white
                  px-5
                  py-2
                  rounded-lg
                  inline-block
                  "
                  >

                  Book Stay

                </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}