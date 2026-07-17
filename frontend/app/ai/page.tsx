"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api";

export default function AITravelPlanner() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generatePlan() {
    if (!prompt.trim()) {
      alert("Please enter your travel details.");
      return;
    }

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const { response: apiResponse, data } = await apiRequest(
        "/ai/travel-planner",
        {
          method: "POST",
          body: JSON.stringify({
            prompt,
          }),
        }
      );

      if (apiResponse.ok) {
        setResponse(data.response);
      } else {
        setError(data.detail || "Something went wrong.");
      }
    } catch {
      setError("Unable to connect to AI service.");
    }

    setLoading(false);
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">

      <h1 className="text-5xl font-black text-green-700 mb-4">
        🌿 EcoStay AI Travel Planner
      </h1>

      <p className="text-gray-600 mb-8">
        Describe your trip and let Gemini create a personalized eco-friendly travel plan.
      </p>

      <textarea
        rows={8}
        placeholder="Example: I want to visit Manali for 3 days with a budget of ₹10,000..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full border rounded-2xl p-5 text-lg shadow"
      />

      <button
        onClick={generatePlan}
        disabled={loading}
        className="mt-6 bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white px-8 py-4 rounded-xl font-bold text-lg"
      >
        {loading ? "Generating..." : "Generate Travel Plan"}
      </button>

      {loading && (
        <div className="mt-10 border rounded-2xl p-6 bg-yellow-50">
          <h2 className="font-bold text-xl">
            🤖 EcoStay AI is thinking...
          </h2>

          <p className="mt-2 text-gray-600">
            Generating your personalised eco-friendly travel plan...
          </p>
        </div>
      )}

      {error && (
        <div className="mt-10 border border-red-300 bg-red-50 rounded-2xl p-6 text-red-700">
          {error}
        </div>
      )}

      {response && (
        <div className="mt-10 border rounded-2xl p-8 shadow bg-white">
          <h2 className="text-3xl font-bold text-green-700 mb-5">
            🌍 Your AI Travel Plan
          </h2>

          <div className="whitespace-pre-wrap leading-8 text-gray-800">
            {response}
          </div>
        </div>
      )}

    </main>
  );
}