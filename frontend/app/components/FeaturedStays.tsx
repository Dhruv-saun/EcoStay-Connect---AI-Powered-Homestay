const stays = [
  {
    name: "Mountain Escape",
    place: "Mussoorie"
  },
  {
    name: "Forest Cabin",
    place: "Rishikesh"
  },
  {
    name: "Lake View Stay",
    place: "Nainital"
  }
];
export default function FeaturedStays() {
  return (
    <section className="p-16">
      <h2 className="text-5xl font-bold mb-10">
        Featured Stays
      </h2>
      <div className="grid grid-cols-3 gap-8">
        {stays.map((stay, index) => (
          <div
            key={index}
            className="p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold">
              {stay.name}
            </h3>
            <p className="mt-2">
              {stay.place}
            </p>
            <button
              className="
              mt-6
              bg-green-700
              text-white
              px-5
              py-2
              rounded
              "
            >
              View Stay
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}