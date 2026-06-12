export default function Hero() {
  return (
    <section
      className="
      min-h-[85vh]
      flex
      flex-col
      justify-center
      items-center
      text-center
      px-8
      "
    >
      <h1 className="text-7xl font-bold">
        EcoStay Connect 🌿
      </h1>
      <p className="mt-8 text-xl">
        Discover sustainable stays and
        explore eco-tourism powered by AI
      </p>
      <div className="mt-10 flex gap-6">
        <button
          className="
          bg-green-700
          text-white
          px-8
          py-4
          rounded-xl
          "
        >
          Explore Stays
        </button>
        <button
          className="
          border
          px-8
          py-4
          rounded-xl
          "
        >
          Become Host
        </button>
      </div>
    </section>
  );
}