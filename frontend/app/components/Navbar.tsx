export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 shadow-md">
      <h1 className="text-2xl font-bold text-green-700">
        EcoStay Connect
      </h1>
      <div className="flex gap-6">
        <a href="/">Home</a>
        <a href="/homestays">
          Homestays
        </a>
        <a href="/login">
          Login
        </a>
      </div>
    </nav>
  );
}