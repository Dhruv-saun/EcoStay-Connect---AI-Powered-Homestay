export default function Footer() {
return (

  <footer
    className="
    relative
    mt-24
    h-[450px]
    overflow-hidden
    "
  >

  <div
    className="
    absolute
    inset-0
    "
    style={{
    backgroundImage:
    "url('/images/footer-bg.jpg')",
    backgroundSize:
    "cover",
    backgroundPosition:
    "center"
    }}
  />

  <div
    className="
    absolute
    inset-0
    bg-black/70
    "
  />

  <div
    className="
    relative
    z-10
    h-full
    flex
    flex-col
    justify-center
    items-center
    text-white
    text-center
    px-8
    "
  >

  <h2
    className="
    text-5xl
    font-black
    "
  >
    EcoStay Connect 🌿
  </h2>

  <p
    className="
    mt-6
    max-w-2xl
    text-xl
    text-gray-200
    "
  >
    Stay close to nature and discover eco-friendly escapes.
  </p>

  <div
    className="
    flex
    gap-10
    mt-10
    text-lg
    "
  >
  <a href="/">Home</a>

  <a href="/homestays">
    Homestays
  </a>

  <a href="/booking">
    Booking
  </a>

  </div>

    <p
      className="
      mt-10
      text-gray-400
      "
    >
    © 2026 EcoStay Connect
    </p>

  </div>

  </footer>

);
}