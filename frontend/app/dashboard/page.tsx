import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function Dashboard() {
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
          Dashboard
        </h1>
        <p className="mt-4 text-lg">
          Manage bookings, track stays, and view your travel activity.
        </p>
      </main>
      <Footer />
    </>
  );
}