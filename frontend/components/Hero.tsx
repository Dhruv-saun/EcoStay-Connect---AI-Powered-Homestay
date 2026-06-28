import Link from "next/link";

export default function Hero() {

return (

  <section
    className="
    relative
    h-[720px]
    bg-cover
    bg-center
    "
    style={{
    backgroundImage:
    "url('/images/hero-bg.jpg')"
    }}
  >

  {/* overlay */}

  <div
    className="
    absolute
    inset-0
    bg-black/30
    "
  />


  {/* content */}

  <div
    className="
    relative
    z-10
    max-w-7xl
    mx-auto
    pt-36
    px-10
    "
  >

  <h1
    className="
    text-7xl
    font-black
    text-white
    leading-tight
    max-w-[700px]
    "
  >
  Stay
  <span className="text-green-500">
    {" "}Green,
  </span>

  <br />

  Stay
  <span className="text-green-500">
    {" "}Peaceful
  </span>

  </h1>


  <p
    className="
    mt-8
    text-2xl
    text-white
    max-w-[650px]
    "
    >
    Discover eco-friendly homestays in
    the most beautiful destinations.
  </p>


  <Link
    href="/homestays"
    className="
    inline-block
    mt-10
    bg-green-600
    hover:bg-green-700
    text-white
    px-10
    py-5
    rounded-2xl
    font-bold
    "
  >
    Explore Homestays 🌿
  </Link>



  {/* SEARCH BAR */}

  <div
    className="
    absolute
    left-1/2
    translate-x-[-50%]
    bottom-[-130px]

    bg-white
    rounded-[28px]

    shadow-2xl

    w-[1200px]

    p-5

    grid
    grid-cols-[2fr_1.5fr_1fr_auto]

    gap-6

    items-center
    "
  >

  <div className="border-r pr-5">

  <p className="text-xl font-semibold">
    📍 Where do you want to go?
  </p>

  <input
    placeholder="Search destinations"
    className="
    mt-2
    w-full
    outline-none
  "
  />

  </div>



  <div className="border-r pr-5">

  <p className="text-xl font-semibold">
    📅 Check In – Check Out
  </p>

  <input
    type="date"
    className="
    mt-2
    w-full
    outline-none
    "
  />

  </div>



  <div>

  <p className="text-xl font-semibold">
    👤 Guests
  </p>

  <select
    className="
    mt-2
    outline-none
    w-full
    "
  >

  <option>
    1 Guest
  </option>

  <option>
    2 Guests
  </option>

  <option>
    3 Guests
  </option>

  <option>
    4 Guests
  </option>

  </select>

  </div>



  <button
    className="
    bg-green-600
    hover:bg-green-700
    text-white
    px-10
    py-5
    rounded-2xl
    font-bold
    "
  >

    🔍 Search

  </button>

  </div>

  </div>

</section>

);

}