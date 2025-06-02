import React from "react";

export default function SponsorenPage() {
  const activeSponsors = [
    {
      name: "Mercure Hotel",
      type: "Goud",
      challenges: 5,
      users: 127,
      status: "Actief"
    },
    {
      name: "Albert Heijn",
      type: "Zilver",
      challenges: 3,
      users: 89,
      status: "Actief"
    },
    {
      name: "Van Bastianen",
      type: "Brons",
      challenges: 2,
      users: 45,
      status: "Actief"
    },
    {
      name: "Jumbo",
      type: "Goud",
      challenges: 4,
      users: 156,
      status: "Actief"
    }
  ];

  const inactiveSponsors = [
    {
      name: "Plus Supermarkt",
      type: "Brons",
      lastActive: "2 maanden geleden"
    },
    {
      name: "Lidl",
      type: "Zilver",
      lastActive: "1 maand geleden"
    },
    {
      name: "Action",
      type: "Brons",
      lastActive: "3 maanden geleden"
    }
  ];

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
          <div className="bg-[#44743A] rounded-3xl flex-1 p-6">
            <div className="grid grid-cols-2 gap-6">
              {activeSponsors.map((sponsor, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">{sponsor.name}</span>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      sponsor.type === "Goud" ? "bg-yellow-400 text-black" :
                      sponsor.type === "Zilver" ? "bg-gray-300 text-black" :
                      "bg-amber-700 text-white"
                    }`}>
                      {sponsor.type}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold">{sponsor.challenges}</span>
                      <span className="text-xs">Actieve Challenges</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold">{sponsor.users}</span>
                      <span className="text-xs">Deelnemende Gebruikers</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-sm">{sponsor.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
              <h3 className="text-lg font-semibold mb-4">Inactieve Sponsoren</h3>
              <div className="flex flex-col gap-4">
                {inactiveSponsors.map((sponsor, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium">{sponsor.name}</span>
                      <span className="text-xs text-gray-500">{sponsor.lastActive}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      sponsor.type === "Goud" ? "bg-yellow-400 text-black" :
                      sponsor.type === "Zilver" ? "bg-gray-300 text-black" :
                      "bg-amber-700 text-white"
                    }`}>
                      {sponsor.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 