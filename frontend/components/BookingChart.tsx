"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Props = {
  data: {
    day: string;
    bookings: number;
  }[];
};

export default function BookingChart({ data }: Props) {
  return (
    <div
      className="
        bg-white
        dark:bg-neutral-900
        rounded-2xl
        shadow-lg
        p-6
      "
    >
      <h2 className="text-2xl font-bold mb-6">
        📈 Booking Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="bookings"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}