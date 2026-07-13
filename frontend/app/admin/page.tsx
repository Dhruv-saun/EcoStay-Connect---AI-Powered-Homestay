"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const { response, data } = await apiRequest("/admin/analytics/");

    if (response.ok) {
      setStats(data);
    } else {
      console.log(data);
    }
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h1 className="text-3xl font-bold">Loading Dashboard...</h1>
      </div>
    );
  }

  const cards = [
    {
      title: "Users",
      value: stats.users,
      color: "bg-blue-500",
    },
    {
      title: "Homestays",
      value: stats.homestays,
      color: "bg-green-500",
    },
    {
      title: "Bookings",
      value: stats.bookings,
      color: "bg-purple-500",
    },
    {
      title: "Reviews",
      value: stats.reviews,
      color: "bg-yellow-500",
    },
    {
      title: "Confirmed",
      value: stats.confirmed,
      color: "bg-emerald-600",
    },
    {
      title: "Pending",
      value: stats.pending,
      color: "bg-orange-500",
    },
    {
      title: "Cancelled",
      value: stats.cancelled,
      color: "bg-red-500",
    },
  ];

  const bookingData = [
    {
      name: "Confirmed",
      value: stats.confirmed,
    },
    {
      name: "Pending",
      value: stats.pending,
    },
    {
      name: "Cancelled",
      value: stats.cancelled,
    },
  ];

  const overallData = [
    {
      name: "Users",
      value: stats.users,
    },
    {
      name: "Homestays",
      value: stats.homestays,
    },
    {
      name: "Bookings",
      value: stats.bookings,
    },
    {
      name: "Reviews",
      value: stats.reviews,
    },
  ];

  const COLORS = [
    "#16a34a",
    "#f59e0b",
    "#dc2626",
  ];

  return (
    <>
      <h1 className="text-5xl font-black mb-10">
        📊 Admin Dashboard
      </h1>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`${card.color} rounded-2xl text-white p-8 shadow-xl`}
          >
            <h2 className="text-xl font-semibold">
              {card.title}
            </h2>

            <p className="text-5xl font-black mt-4">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-10">

        {/* Pie Chart */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-5">
            Booking Status
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={bookingData}
                dataKey="value"
                outerRadius={120}
                label
              >
                {bookingData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-5">
            Overall Platform Data
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={overallData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#16a34a"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </>
  );
}