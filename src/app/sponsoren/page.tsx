import React from "react";

export default function SponsorenPage() {
  return (
    <div className="flex min-h-screen bg-[#F6F6F6] min-w-[1200px]">
      <main className="flex-1 p-12">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-black text-3xl font-bold">Sponsoren</h1>
          <div className="flex items-center gap-2 text-black">
            <span>Welkom, Marijn</span>
            <span className="w-8 h-8 rounded-full bg-gray-300 inline-block" />
          </div>
        </div>
        <h2 className="text-xl font-medium mb-4">Actieve Sponsoren</h2>
        <div className="flex gap-8">
          {/* Actieve sponsoren blok */}
          <div className="bg-[#44743A] rounded-3xl flex-1 min-h-[500px]" />
          {/* Rechterkolom */}
          <div className="flex flex-col gap-6 w-[340px]">
            <div className="bg-white rounded-2xl p-6 flex items-center justify-between">
              <span>Sponsor Toevoegen</span>
              <span className="bg-[#44743A] text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl">+</span>
            </div>
            <div className="bg-white rounded-2xl p-6 flex items-center justify-between">
              <span>Sponsor Challenge Toevoegen</span>
              <span className="bg-[#44743A] text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl">+</span>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <span>Inactieve Sponsoren</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 