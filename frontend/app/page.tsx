import Navbar from "./components/Navbar";
export default function Home() {
  return (
    <main>
      <Navbar />
      <section className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold">
          EcoStay Connect 🌿
        </h1>
        <p className="mt-4 text-lg">
          Discover sustainable stays powered by AI
        </p>
      </section>
    </main>
  );
}