"use client";

import React, { useState } from "react";

export default function FeedbackPage() {
  const [expandedMessages, setExpandedMessages] = useState<number[]>([]);

  const toggleMessage = (index: number) => {
    setExpandedMessages(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const feedbackItems = [
    {
      name: "Lars Vermeulen",
      date: "15 Mei, 2025",
      type: "Positief",
      message: "Occaecat aliquip esse fugiat cillum sunt. Enim quis officia labore veniam do ex ut irure. Officia aute velit ex voluptate nulla. Cupidatat exercitation ad velit proident excepteur irure magna sint ad eiusmod esse. Id id sint in. Nulla exercitation consequat magna nisi et duis mollit irure minim adipisicing ipsum. Consectetur amet ex veniam dolore excepteur pariatur cillum est amet irure occaecat voluptate cillum."
    },
    {
      name: "Lars Vermeulen",
      date: "15 Mei, 2025",
      type: "Positief",
      message: "Occaecat aliquip esse fugiat cillum sunt. Enim quis officia labore veniam do ex ut irure. Officia aute velit ex voluptate nulla. Cupidatat exercitation ad velit proident excepteur irure magna sint ad eiusmod esse. Id id sint in. Nulla exercitation consequat magna nisi et duis mollit irure minim adipisicing ipsum. Consectetur amet ex veniam dolore excepteur pariatur cillum est amet irure occaecat voluptate cillum."
    },
    {
      name: "Lars Vermeulen",
      date: "15 Mei, 2025",
      type: "Negatief",
      message: "Occaecat aliquip esse fugiat cillum sunt. Enim quis officia labore veniam do ex ut irure. Officia aute velit ex voluptate nulla. Cupidatat exercitation ad velit proident excepteur irure magna sint ad eiusmod esse. Id id sint in. Nulla exercitation consequat magna nisi et duis mollit irure minim adipisicing ipsum. Consectetur amet ex veniam dolore excepteur pariatur cillum est amet irure occaecat voluptate cillum."
    },
    {
      name: "Lars Vermeulen",
      date: "15 Mei, 2025",
      type: "Neutraal",
      message: "Occaecat aliquip esse fugiat cillum sunt. Enim quis officia labore veniam do ex ut irure. Officia aute velit ex voluptate nulla. Cupidatat exercitation ad velit proident excepteur irure magna sint ad eiusmod esse. Id id sint in. Nulla exercitation consequat magna nisi et duis mollit irure minim adipisicing ipsum. Consectetur amet ex veniam dolore excepteur pariatur cillum est amet irure occaecat voluptate cillum."
    },
    {
      name: "Lars Vermeulen",
      date: "15 Mei, 2025",
      type: "Neutraal",
      message: "Occaecat aliquip esse fugiat cillum sunt. Enim quis officia labore veniam do ex ut irure. Officia aute velit ex voluptate nulla. Cupidatat exercitation ad velit proident excepteur irure magna sint ad eiusmod esse. Id id sint in. Nulla exercitation consequat magna nisi et duis mollit irure minim adipisicing ipsum. Consectetur amet ex veniam dolore excepteur pariatur cillum est amet irure occaecat voluptate cillum."
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Positief":
        return "bg-green-500";
      case "Negatief":
        return "bg-red-500";
      case "Neutraal":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

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
            {feedbackItems.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-4 mb-4"
                onClick={() => toggleMessage(index)}
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#44743A] inline-block" />
                  <span className="font-semibold">{item.name}</span>
                  <span className="ml-auto">{item.date}</span>
                  <span className={`${getTypeColor(item.type)} text-white rounded-full px-3 py-1 text-xs`}>
                    {item.type}
                  </span>
                </div>
                {expandedMessages.includes(index) && (
                  <div className="mt-2">
                    <span className="text-xs">{item.message}</span>
                  </div>
                )}
              </div>
            ))}
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