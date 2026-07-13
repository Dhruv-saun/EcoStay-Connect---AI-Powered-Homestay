"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { apiRequest } from "@/lib/api";

export default function AdminHomestays() {
  const [homestays, setHomestays] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [ecoScore, setEcoScore] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadHomestays();
  }, []);

  async function loadHomestays() {
    const { response, data } = await apiRequest("/admin/homestays/");

    if (response.ok) {
      setHomestays(data);
    } else {
      console.log(data);
    }

    setLoading(false);
  }

  async function addHomestay() {
    if (!title || !location || !price || !ecoScore) {
      alert("Please fill all fields.");
      return;
    }

    const { response } = await apiRequest("/admin/homestays/", {
      method: "POST",
      body: JSON.stringify({
        title,
        location,
        price: Number(price),
        eco_score: Number(ecoScore),
        image_url: imageUrl,
      }),
    });

    if (response.ok) {
      resetForm();
      loadHomestays();
    } else {
      alert("Unable to add homestay.");
    }
  }

  async function uploadImage(file: File) {
    try {
      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("homestays")
        .upload(fileName, file);

      if (error) {
        alert(error.message);
        return;
      }

      const { data } = supabase.storage
        .from("homestays")
        .getPublicUrl(fileName);

      setImageUrl(data.publicUrl);
    } finally {
      setUploading(false);
    }
  }

  async function updateHomestay() {
    if (editingId === null) return;

    const { response } = await apiRequest(
      `/admin/homestays/${editingId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          title,
          location,
          price: Number(price),
          eco_score: Number(ecoScore),
          image_url: imageUrl,
        }),
      }
    );

    if (response.ok) {
      resetForm();
      loadHomestays();
    } else {
      alert("Unable to update homestay.");
    }
  }

  async function deleteHomestay(id: number) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this homestay?"
    );

    if (!confirmDelete) return;

    const { response } = await apiRequest(
      `/admin/homestays/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      loadHomestays();
    } else {
      alert("Unable to delete homestay.");
    }
  }

  function startEdit(item: any) {
    setEditingId(item.id);
    setTitle(item.title);
    setLocation(item.location);
    setPrice(String(item.price));
    setEcoScore(String(item.eco_score));
    setImageUrl(item.image_url || "");
  }

  function resetForm() {
    setEditingId(null);
    setTitle("");
    setLocation("");
    setPrice("");
    setEcoScore("");
    setImageUrl("");
  }

  const filteredHomestays = useMemo(() => {
    return homestays.filter((stay) => {
      const q = search.toLowerCase();

      return (
        (stay.title || "").toLowerCase().includes(q) ||
        (stay.location || "").toLowerCase().includes(q) ||
        String(stay.price).includes(q) ||
        String(stay.eco_score).includes(q) ||
        String(stay.id).includes(q)
      );
    });
  }, [homestays, search]);

  if (loading) {
    return (
      <main className="text-center text-2xl pt-20">
        Loading Homestays...
      </main>
    );
  }

  return (
    <>
      <h1 className="text-5xl font-black mb-10">
        🏡 Manage Homestays
      </h1>

      <div className="mb-10 rounded-2xl border shadow p-8 bg-white dark:bg-neutral-900">

        <h2 className="text-3xl font-bold mb-6">
          {editingId ? "✏️ Edit Homestay" : "➕ Add Homestay"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-xl p-3"
          />

          <input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded-xl p-3"
          />

          <input
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded-xl p-3"
          />

          <input
            placeholder="Eco Score"
            type="number"
            value={ecoScore}
            onChange={(e) => setEcoScore(e.target.value)}
            className="border rounded-xl p-3"
          />

          <div className="md:col-span-2 space-y-3">

            <label className="font-semibold">
              Homestay Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.length) {
                  uploadImage(e.target.files[0]);
                }
              }}
              className="border rounded-xl p-3 w-full"
            />

            {uploading && (
              <p className="text-green-700">
                Uploading image...
              </p>
            )}

            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="w-56 rounded-xl border shadow"
              />
            )}

          </div>

        </div>

        <div className="flex gap-4 mt-6">

          {editingId ? (
            <>
              <button
                onClick={updateHomestay}
                className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-bold"
              >
                Update Homestay
              </button>

              <button
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-bold"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              disabled={uploading}
              onClick={addHomestay}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-xl font-bold"
            >
              {uploading ? "Uploading..." : "Add Homestay"}
            </button>
          )}

        </div>

      </div>

      <div className="mb-8">

        <input
          type="text"
          placeholder="Search by title, location, price, eco score or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        />

      </div>

      <div className="mb-5 text-lg font-semibold">
        Total Homestays: {filteredHomestays.length}
      </div>

      <div className="overflow-x-auto rounded-2xl border shadow">

        <table className="w-full">

          <thead className="bg-green-700 text-white">

            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Eco Score</th>
              <th className="p-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredHomestays.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-8 text-gray-500"
                >
                  No homestays found.
                </td>
              </tr>
            ) : (
              filteredHomestays.map((stay) => (
                <tr
                  key={stay.id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-neutral-800"
                >
                  <td className="p-4">{stay.id}</td>

                  <td className="p-4">
                    {stay.image_url ? (
                      <img
                        src={stay.image_url}
                        alt={stay.title}
                        className="w-24 h-16 object-cover rounded-lg border"
                      />
                    ) : (
                      <div className="w-24 h-16 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                        No Image
                      </div>
                    )}
                  </td>

                  <td className="p-4">{stay.title}</td>
                  <td className="p-4">{stay.location}</td>
                  <td className="p-4">₹{stay.price}</td>
                  <td className="p-4">{stay.eco_score}</td>

                  <td className="p-4 text-center">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => startEdit(stay)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteHomestay(stay.id)}
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
    </>
  );
}