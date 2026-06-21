import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <section
        className="
        p-10
        grid
        md:grid-cols-2
        gap-8
        "
      >
        <Card
          title="Mountain Stay"
          location="Mussoorie"
          price="₹2500/night"
        />
        <Card
          title="Forest Retreat"
          location="Rishikesh"
          price="₹3200/night"
        />
      </section>
      <section
        className="
        p-10
        grid
        md:grid-cols-3
        gap-6
        "
      >
        <div
          className="
          p-8
          rounded-xl
          shadow-lg
          border
          border-gray-300
          dark:border-gray-400
          bg-white
          dark:bg-neutral-900
          text-black
          dark:text-white
          "
        >
          <h2 className="text-2xl font-bold">
            🌿 Sustainable Stays
          </h2>
          <p className="mt-4">
            Discover eco-friendly homestays and travel responsibly.
          </p>
        </div>
        <div
          className="
          p-8
          rounded-xl
          shadow-lg
          border
          border-gray-300
          dark:border-gray-400
          bg-white
          dark:bg-neutral-900
          text-black
          dark:text-white"
        >
          <h2 className="text-2xl font-bold">
            🧭 Personalized Experience
          </h2>
          <p className="mt-4">
            Future AI recommendations tailored for your travel style.
          </p>
        </div>
        <div
          className="
          p-8
          rounded-xl
          shadow-lg
          border
          border-gray-300
          dark:border-gray-400
          bg-white
          dark:bg-neutral-900
          text-black
          dark:text-white"
        >
          <h2 className="text-2xl font-bold">
            ⚡ Easy Booking
          </h2>
          <p className="mt-4">
            Simple booking experience with quick stay confirmation.
          </p>
        </div>
      </section>
      <section
        className="
        text-center
        p-16
        bg-white
        dark:bg-black
        text-black
        dark:text-white
        "
      >
        <h2
          className="
          text-4xl
          font-bold
          mb-6
          "
        >
          Ready to plan your eco journey?
        </h2>
        <a
          href="/homestays"
          className="
          inline-block
          bg-green-700
          text-white
          px-8
          py-4
          rounded-xl
          "
        >
          Explore Homestays
        </a>
      </section>
      <Footer />
    </main>
  );
}