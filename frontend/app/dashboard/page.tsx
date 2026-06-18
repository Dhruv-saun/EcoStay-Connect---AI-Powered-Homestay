import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <main
        className="
        min-h-screen
        p-10
        "
      >
        <h1
          className="
          text-5xl
          font-bold
          mb-8
          "
        >
          Dashboard
        </h1>

        <p
          className="
          text-lg
          mb-10
          "
        >
          Manage bookings, track stays, and view your travel activity.
        </p>

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-10
          mt-10
          "
        >
          <div 
           className="
            p-6
            rounded-xl
            shadow-lg
            border
            border-gray-300
            dark:border-gray-700
            bg-white
            dark:bg-neutral-900
            text-black
            dark:text-white
            "
          >
            <h2 className="text-2xl font-bold">
              Upcoming Trips
            </h2>

            <p className="mt-3">
              2 stays booked
            </p>
          </div>

          <div className="
            p-6
            rounded-xl
            shadow-lg
            border
            border-gray-300
            dark:border-gray-700
            bg-white
            dark:bg-neutral-900
            text-black
            dark:text-white
            ">
            <h2 className="text-2xl font-bold">
              Favourite Places
            </h2>

            <p className="mt-3">
              5 saved locations
            </p>
          </div>

          <div className="
            p-6
            rounded-xl
            shadow-lg
            border
            border-gray-300
            dark:border-gray-700
            bg-white
            dark:bg-neutral-900
            text-black
            dark:text-white
            ">
            <h2 className="text-2xl font-bold">
              Eco Score
            </h2>

            <p className="mt-3">
              87 / 100
            </p>
          </div>
        </div>

        <div
          className="
            p-6
            rounded-xl
            shadow-lg
            border
            border-gray-300
            dark:border-gray-700
            bg-white
            dark:bg-neutral-900
            text-black
            dark:text-white
            "
        >
          <h2 className="text-3xl font-bold">
            Recent Activity
          </h2>

          <ul className="mt-5 space-y-3">
            <li>
              • Booked Mountain Stay
            </li>

            <li>
              • Viewed Forest Retreat
            </li>

            <li>
              • Updated Profile
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </>
  );
}