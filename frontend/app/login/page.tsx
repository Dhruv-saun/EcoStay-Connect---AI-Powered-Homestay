import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function Login() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen p-10">
        <h1 className="text-5xl font-bold">
          Login
        </h1>
        <p className="mt-4">
          Login page placeholder
        </p>
      </main>
      <Footer />
    </>
  );
}