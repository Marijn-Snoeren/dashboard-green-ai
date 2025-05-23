import React from "react";

export default function FeedbackPage() {
  return (
    <div className="flex min-h-screen bg-[#F6F6F6] min-w-[1200px]">
      <main className="flex-1 p-12">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-black text-3xl font-bold">Feedback</h1>
          <div className="flex items-center gap-2 text-black">
            <span>Welkom, Marijn</span>
            <span className="w-8 h-8 rounded-full bg-gray-300 inline-block" />
          </div>
        </div>
        <h2 className="text-xl font-medium mb-4">Gebruikersfeedback</h2>
        <div className="flex gap-8">
          {/* Feedback lijst */}
          <div className="bg-[#44743A] rounded-3xl flex-1 p-6">
            <div className="bg-white rounded-2xl p-4 mb-4 flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-[#44743A] inline-block" />
              <span className="font-semibold">Lars Vermeulen</span>
              <span className="ml-auto text-gray-500">15 Mei, 2025</span>
              <span className="bg-green-500 text-white rounded-full px-3 py-1 text-xs">Positief</span>
            </div>
            <div className="bg-white rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-4 mb-2">
                <span className="w-8 h-8 rounded-full bg-[#44743A] inline-block" />
                <span className="font-semibold">Lars Vermeulen</span>
                <span className="ml-auto text-gray-500">15 Mei, 2025</span>
                <span className="bg-green-500 text-white rounded-full px-3 py-1 text-xs">Positief</span>
              </div>
              <div className="text-black text-sm">
                Bericht<br />
                <span className="text-xs">Proident exercitation ad et nostrud tempor qui non dolore est velit. ...</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 mb-4 flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-[#44743A] inline-block" />
              <span className="font-semibold">Lars Vermeulen</span>
              <span className="ml-auto text-gray-500">15 Mei, 2025</span>
              <span className="bg-red-500 text-white rounded-full px-3 py-1 text-xs">Negatief</span>
            </div>
            <div className="bg-white rounded-2xl p-4 mb-4 flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-[#44743A] inline-block" />
              <span className="font-semibold">Lars Vermeulen</span>
              <span className="ml-auto text-gray-500">15 Mei, 2025</span>
              <span className="bg-yellow-500 text-white rounded-full px-3 py-1 text-xs">Neutraal</span>
            </div>
            <div className="bg-white rounded-2xl p-4 mb-4 flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-[#44743A] inline-block" />
              <span className="font-semibold">Lars Vermeulen</span>
              <span className="ml-auto text-gray-500">15 Mei, 2025</span>
              <span className="bg-yellow-500 text-white rounded-full px-3 py-1 text-xs">Neutraal</span>
            </div>
          </div>
          {/* Feedback stats */}
          <div className="flex flex-col gap-6 w-[340px]">
            <div className="bg-white rounded-2xl p-6 flex items-center gap-6">
              <div>
                <span className="font-semibold">Positieve Feedback</span><br />
                <span className="text-xs">Hoeveelheid positieve feedback van gebruikers deze week.</span>
              </div>
              <div className="ml-auto flex items-center justify-center">
                <span className="w-20 h-20 rounded-full border-8 border-green-700 flex items-center justify-center text-3xl font-bold text-green-700">88</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 flex items-center gap-6">
              <div>
                <span className="font-semibold">Neutrale</span><br />
                <span className="text-xs">Hoeveelheid neutrale feedback van gebruikers deze week.</span>
              </div>
              <div className="ml-auto flex items-center justify-center">
                <span className="w-20 h-20 rounded-full border-8 border-yellow-500 flex items-center justify-center text-3xl font-bold text-yellow-500">47</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 flex items-center gap-6">
              <div>
                <span className="font-semibold">Negatieve Feedback</span><br />
                <span className="text-xs">Hoeveelheid negatieve feedback van gebruikers deze week.</span>
              </div>
              <div className="ml-auto flex items-center justify-center">
                <span className="w-20 h-20 rounded-full border-8 border-red-700 flex items-center justify-center text-3xl font-bold text-red-700">23</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 