import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function Register() {
  return (
    <>
      <Navbar />
      <main
        className="
        min-h-screen
        flex
        flex-col
        justify-center
        items-center
        p-10
        "
      >
        <h1 className="text-5xl font-bold">
          Register
        </h1>
        <p className="mt-4 text-lg">
          Create your EcoStay account and begin exploring sustainable stays.
        </p>
      </main>
      <Footer />
    </>
  );
}