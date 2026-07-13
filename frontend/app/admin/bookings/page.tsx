"use client";

import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "@/lib/api";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    const { response, data } = await apiRequest("/admin/bookings/");

    if (response.ok) {
      setBookings(data);
    } else {
      console.log(data);
    }

    setLoading(false);
  }

  async function deleteBooking(id: number) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) return;

    const { response } = await apiRequest(`/admin/bookings/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      loadBookings();
    } else {
      alert("Unable to delete booking.");
    }
  }

  async function updateBooking(id: number, status: string) {
    const { response } = await apiRequest(`/admin/bookings/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        status,
      }),
    });

    if (response.ok) {
      alert("Booking updated successfully!");
      loadBookings();
    } else {
      alert("Unable to update booking.");
    }
  }

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const q = search.toLowerCase();

      const matchesSearch =
        String(booking.id).includes(q) ||
        String(booking.homestay_id).includes(q) ||
        (booking.name || "").toLowerCase().includes(q) ||
        (booking.email || "").toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "All" || booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  if (loading) {
    return (
      <main className="text-center text-2xl pt-20">
        Loading Bookings...
      </main>
    );
  }

  return (
    <main>

      <h1 className="text-5xl font-black mb-8">
        📅 Manage Bookings
      </h1>

      <div className="grid md:grid-cols-2 gap-4 mb-8">

        <input
          type="text"
          placeholder="Search by Booking ID, Homestay ID, Guest or Email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-xl p-4 shadow-sm focus:ring-2 focus:ring-green-600"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-xl p-4 shadow-sm"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

      </div>

      <div className="mb-5 text-lg font-semibold">
        Total Bookings: {filteredBookings.length}
      </div>

      <div className="overflow-x-auto rounded-2xl border shadow">

        <table className="w-full">

          <thead className="bg-green-700 text-white">

            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Guest</th>
              <th className="p-4">Email</th>
              <th className="p-4">Homestay</th>
              <th className="p-4">Guests</th>
              <th className="p-4">Check In</th>
              <th className="p-4">Check Out</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredBookings.length === 0 ? (

              <tr>
                <td
                  colSpan={9}
                  className="text-center p-8 text-gray-500"
                >
                  No bookings found.
                </td>
              </tr>

            ) : (

              filteredBookings.map((booking) => (

                <tr
                  key={booking.id}
                  className="border-b text-center hover:bg-gray-50 dark:hover:bg-neutral-900"
                >

                  <td className="p-4">{booking.id}</td>

                  <td className="p-4">{booking.name}</td>

                  <td className="p-4">{booking.email}</td>

                  <td className="p-4">
                    #{booking.homestay_id}
                  </td>

                  <td className="p-4">
                    {booking.guests}
                  </td>

                  <td className="p-4">
                    {booking.checkin}
                  </td>

                  <td className="p-4">
                    {booking.checkout}
                  </td>

                  <td className="p-4">

                    <select
                      value={booking.status}
                      onChange={(e) => {
                        const updated = [...bookings];
                        const current = updated.find(
                          (b) => b.id === booking.id
                        );

                        if (current) {
                          current.status = e.target.value;
                          setBookings(updated);
                        }
                      }}
                      className="border rounded-lg p-2"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() =>
                          updateBooking(
                            booking.id,
                            booking.status
                          )
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                      >
                        Save
                      </button>

                      <button
                        onClick={() =>
                          deleteBooking(booking.id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </main>
  );
}