import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedStays from "./components/FeaturedStays";
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedStays />
    </main>
  );
}