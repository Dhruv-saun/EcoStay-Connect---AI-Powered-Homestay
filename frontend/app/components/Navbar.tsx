import Link from "next/link";
export default function Navbar() {
  return (
    <nav
      className="
      flex
      justify-between
      items-center
      p-6
      shadow-md
      "
    >
      <Link
        href="/"
        className="text-2xl font-bold text-green-700"
      >
        EcoStay Connect
      </Link>
      <div className="flex gap-8 items-center">
        <Link href="/">
          Home
        </Link>
        <Link href="/homestays">
          Homestays
        </Link>
        <Link href="/dashboard">
          Dashboard
        </Link>
        <Link href="/login">
          Login
        </Link>
        <Link href="/register">
          Register
        </Link>
      </div>
    </nav>
  );
}