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
      <Footer />
    </main>
  );
}