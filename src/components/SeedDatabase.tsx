"use client";

import { useState } from "react";
import { seedDatabase } from "@/scripts/seedData";

export function SeedDatabase() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [message, setMessage] = useState("");

  const handleSeed = async () => {
    setIsSeeding(true);
    setMessage("");

    try {
      await seedDatabase();
      setMessage("✅ Database successfully seeded with sample data!");
    } catch (error) {
      setMessage("❌ Error seeding database. Check console for details.");
      console.error(error);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-medium text-yellow-800 mb-2">
        🧪 Development Tools
      </h3>
      <p className="text-sm text-yellow-700 mb-3">
        Click the button below to populate your Firestore database with sample
        challenges and AI suggestions.
      </p>
      <button
        onClick={handleSeed}
        disabled={isSeeding}
        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSeeding ? "Seeding Database..." : "Seed Database with Sample Data"}
      </button>
      {message && <p className="mt-2 text-sm font-medium">{message}</p>}
    </div>
  );
}
