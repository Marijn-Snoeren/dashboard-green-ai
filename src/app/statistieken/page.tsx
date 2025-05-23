import React from "react";

export default function StatistiekenPage() {
  return (
    <div className="flex min-h-screen bg-[#F6F6F6] min-w-[1200px]">
      <main className="flex-1 p-12">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-black text-3xl font-bold">Statistieken</h1>
          <div className="flex items-center gap-2 text-black">
            <span>Welkom, Marijn</span>
            <span className="w-8 h-8 rounded-full bg-gray-300 inline-block" />
          </div>
        </div>
        <div className="text-black">
          <h2 className="text-xl font-medium mb-4">Berkel Enschot</h2>
          <div className="bg-[#44743A] rounded-3xl p-8 w-full flex flex-col gap-8">
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 flex flex-col items-start">
                <span className="text-lg font-semibold">Actieve Gebruikers</span>
                <span className="text-5xl font-bold">74</span>
                <span className="text-xs">Aantal actieve gebruikers deze week</span>
              </div>
              <div className="bg-white rounded-2xl p-6 flex flex-col items-start">
                <span className="text-lg font-semibold">Nieuwe Gebruikers</span>
                <span className="text-5xl font-bold">32</span>
                <span className="text-xs">Aantal nieuwe gebruikers deze week</span>
              </div>
              <div className="bg-white rounded-2xl p-6 flex flex-col items-start">
                <span className="text-lg font-semibold">Voltooide Challenges</span>
                <span className="text-5xl font-bold">95</span>
                <span className="text-xs">Aantal voltooide challenges deze week</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 flex flex-col gap-4">
                <span className="text-lg font-semibold">Favoriete Challenges</span>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#44743A] text-white rounded-2xl p-4 flex flex-col items-start">
                    <span>Wandelen Maar</span>
                    <span className="text-3xl font-bold">56</span>
                    <span className="text-xs">Aantal keer voltooid</span>
                  </div>
                  <div className="bg-[#44743A] text-white rounded-2xl p-4 flex flex-col items-start">
                    <span>Afvalheld</span>
                    <span className="text-3xl font-bold">74</span>
                    <span className="text-xs">Aantal keer voltooid</span>
                  </div>
                  <div className="bg-[#44743A] text-white rounded-2xl p-4 flex flex-col items-start">
                    <span>Stoep Veger</span>
                    <span className="text-3xl font-bold">53</span>
                    <span className="text-xs">Aantal keer voltooid</span>
                  </div>
                  <div className="bg-[#44743A] text-white rounded-2xl p-4 flex flex-col items-start">
                    <span>Plastic Skip</span>
                    <span className="text-3xl font-bold">45</span>
                    <span className="text-xs">Aantal keer voltooid</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 flex flex-col gap-4">
                <span className="text-lg font-semibold">Minst Favoriete Challenges</span>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#44743A] text-white rounded-2xl p-4 flex flex-col items-start">
                    <span>Stekjes Deel</span>
                    <span className="text-3xl font-bold">12</span>
                    <span className="text-xs">Aantal keer voltooid</span>
                  </div>
                  <div className="bg-[#44743A] text-white rounded-2xl p-4 flex flex-col items-start">
                    <span>Bespaar Water</span>
                    <span className="text-3xl font-bold">14</span>
                    <span className="text-xs">Aantal keer voltooid</span>
                  </div>
                  <div className="bg-[#44743A] text-white rounded-2xl p-4 flex flex-col items-start">
                    <span>Douche Tekort</span>
                    <span className="text-3xl font-bold">7</span>
                    <span className="text-xs">Aantal keer voltooid</span>
                  </div>
                  <div className="bg-[#44743A] text-white rounded-2xl p-4 flex flex-col items-start">
                    <span>Draag Groener</span>
                    <span className="text-3xl font-bold">4</span>
                    <span className="text-xs">Aantal keer voltooid</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 