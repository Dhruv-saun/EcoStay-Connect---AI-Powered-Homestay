import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import FeaturedStays from "./components/FeaturedStays";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>

      <Navbar />

      <Hero />

      <SearchBar />

      <FeaturedStays />

      <Footer />

    </main>
  );
}