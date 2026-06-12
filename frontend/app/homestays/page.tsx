const stays = [
  {
    id: 1,
    name: "Mountain View Cottage",
    location: "Mussoorie",
    price: "₹2500/night"
  },
  {
    id: 2,
    name: "Eco Forest Retreat",
    location: "Rishikesh",
    price: "₹3200/night"
  },
  {
    id: 3,
    name: "Lake Side Stay",
    location: "Nainital",
    price: "₹2800/night"
  }
];
export default function Homestays() {
  return (
    <main className="p-10">
      <h1 className="text-5xl font-bold mb-8">
        Available Homestays
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {stays.map((stay) => (
          <div
            key={stay.id}
            className="p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold">
              {stay.name}
            </h2>
            <p>
              {stay.location}
            </p>
            <p className="mt-2 font-semibold">
              {stay.price}
            </p>
            <button
              className="mt-4 bg-green-700 text-white px-5 py-2 rounded"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}