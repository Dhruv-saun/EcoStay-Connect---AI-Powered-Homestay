"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    {
      name: "Dashboard",
      href: "/admin",
    },
    {
      name: "Users",
      href: "/admin/users",
    },
    {
      name: "Homestays",
      href: "/admin/homestays",
    },
    {
      name: "Bookings",
      href: "/admin/bookings",
    },
    {
      name: "Reviews",
      href: "/admin/reviews",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-green-800 text-white p-6">

      <h1 className="text-3xl font-black mb-10">
        EcoStay Admin
      </h1>

      <nav className="space-y-3">

        {links.map((link) => (

          <Link
            key={link.href}
            href={link.href}
            className={`block rounded-xl px-4 py-3 transition
              ${
                pathname === link.href
                  ? "bg-white text-green-800 font-bold"
                  : "hover:bg-green-700"
              }`}
          >
            {link.name}
          </Link>

        ))}

      </nav>

    </aside>
  );
}