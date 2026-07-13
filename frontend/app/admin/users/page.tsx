"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
//import AdminSidebar from "@/components/AdminSidebar";
import { apiRequest } from "@/lib/api";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const { response, data } = await apiRequest("/admin/users/");

    if (response.ok) {
      setUsers(data);
    } else {
      console.log(data);
    }

    setLoading(false);
  }

  async function deleteUser(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    const { response } = await apiRequest(`/admin/users/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      loadUsers();
    } else {
      alert("Unable to delete user.");
    }
  }

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const q = search.toLowerCase();

      return (
        (user.full_name || "").toLowerCase().includes(q) ||
        (user.email || "").toLowerCase().includes(q) ||
        (user.city || "").toLowerCase().includes(q) ||
        String(user.id).toLowerCase().includes(q)
      );
    });
  }, [users, search]);

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="pt-24 flex min-h-screen">

          <main className="flex-1 flex items-center justify-center">
            <h1 className="text-2xl font-bold">
              Loading Users...
            </h1>
          </main>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="pt-24 flex min-h-screen">

        <main className="flex-1 p-10">

          <h1 className="text-5xl font-black mb-8">
            👤 Manage Users
          </h1>

          <div className="mb-8">

            <input
              type="text"
              placeholder="Search by name, email, city or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-xl p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />

          </div>

          <div className="mb-5 text-lg font-semibold">
            Total Users: {filteredUsers.length}
          </div>

          <div className="overflow-x-auto rounded-2xl border shadow">

            <table className="w-full">

              <thead className="bg-green-700 text-white">

                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">City</th>
                  <th className="p-4">Action</th>
                </tr>

              </thead>

              <tbody>

                {filteredUsers.length === 0 ? (

                  <tr>
                    <td
                      colSpan={6}
                      className="text-center p-8 text-gray-500"
                    >
                      No users found.
                    </td>
                  </tr>

                ) : (

                  filteredUsers.map((user) => (

                    <tr
                      key={user.id}
                      className="border-b text-center hover:bg-gray-50"
                    >

                      <td className="p-4 break-all">
                        {user.id}
                      </td>

                      <td className="p-4">
                        {user.full_name || "-"}
                      </td>

                      <td className="p-4">
                        {user.email || "-"}
                      </td>

                      <td className="p-4">
                        {user.phone || "-"}
                      </td>

                      <td className="p-4">
                        {user.city || "-"}
                      </td>

                      <td className="p-4">

                        <button
                          onClick={() => deleteUser(user.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </main>

      </div>

      <Footer />
    </>
  );
}