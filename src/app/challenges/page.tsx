"use client";

import React, { useState } from "react";
import { useChallenges, useAIChallenges } from "@/hooks/useChallenges";
import { SeedDatabase } from "@/components/SeedDatabase";

export default function ChallengesPage() {
  const {
    challenges,
    loading: challengesLoading,
    error: challengesError,
  } = useChallenges();
  const {
    aiChallenges,
    loading: aiLoading,
    error: aiError,
    acceptChallenge,
    denyChallenge,
  } = useAIChallenges();

  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const handleAcceptChallenge = async (aiChallenge: any) => {
    setActionLoading(`accept-${aiChallenge.id}`);
    try {
      await acceptChallenge(aiChallenge);
    } catch (error) {
      console.error("Error accepting challenge:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDenyChallenge = async (aiChallengeId: string) => {
    setActionLoading(`deny-${aiChallengeId}`);
    try {
      await denyChallenge(aiChallengeId);
    } catch (error) {
      console.error("Error denying challenge:", error);
    } finally {
      setActionLoading(null);
    }
  };

  if (challengesLoading || aiLoading) {
    return (
      <div className="flex min-h-screen bg-[#F6F6F6] min-w-[1200px]">
        <main className="flex-1 p-12">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#44743A] mx-auto"></div>
              <p className="mt-4 text-gray-600">Challenges laden...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F6F6F6] min-w-[1200px]">
      <main className="flex-1 p-12">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-black text-3xl font-bold">Challenges</h1>
          <div className="flex items-center gap-2 text-black">
            <span>Welkom, Marijn</span>
            <span className="w-8 h-8 rounded-full bg-gray-300 inline-block" />
          </div>
        </div>

        <SeedDatabase />

        {challengesError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error loading challenges: {challengesError}
          </div>
        )}

        {aiError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error loading AI challenges: {aiError}
          </div>
        )}

        <div className="flex gap-8">
          {/* Actieve Challenges */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">
                Actieve Challenges ({challenges.length})
              </h2>
              <button className="flex items-center gap-1 text-black text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded transition-colors">
                Create New
                <span className="text-lg leading-none">+</span>
              </button>
            </div>

            {challenges.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center">
                <p className="text-gray-500">
                  Geen actieve challenges gevonden.
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Accepteer AI suggestions om challenges toe te voegen.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                {challenges.map((challenge, i) => {
                  const isGreen = i % 3 === 0;
                  return (
                    <div
                      key={challenge.id}
                      className={`rounded-2xl p-6 min-h-[160px] flex flex-col gap-2 transition-all hover:shadow-lg ${
                        isGreen
                          ? "bg-[#44743A] text-white"
                          : "bg-white text-black border border-gray-200"
                      }`}
                    >
                      <span className="text-lg font-semibold">
                        {challenge.title}
                      </span>
                      <span className="text-sm mb-2">
                        {challenge.description}
                      </span>
                      <span className="text-5xl font-bold leading-none">
                        {challenge.completionCount}
                      </span>
                      <span className="text-xs mt-2">
                        Status:{" "}
                        {challenge.status === "active" ? "Actief" : "Inactief"}
                        <br />
                        Aantal keren voltooid
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* AI Challenges */}
          <div className="w-[340px] bg-white rounded-2xl p-6 shadow flex flex-col gap-6">
            <h2 className="text-xl font-medium text-black mb-2">
              AI Challenges ({aiChallenges.length})
            </h2>

            {aiChallenges.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Geen AI suggestions beschikbaar.
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Nieuwe suggestions worden automatisch gegenereerd.
                </p>
              </div>
            ) : (
              aiChallenges.map((aiChallenge) => (
                <div
                  key={aiChallenge.id}
                  className="rounded-2xl p-4 bg-[#44743A] text-white flex flex-col gap-2 transition-all hover:bg-[#3a6330]"
                >
                  <span className="text-lg font-semibold">
                    {aiChallenge.title}
                  </span>
                  <span className="text-sm mb-2">
                    {aiChallenge.description}
                  </span>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleAcceptChallenge(aiChallenge)}
                      disabled={actionLoading === `accept-${aiChallenge.id}`}
                      className="flex items-center gap-1 text-xs border border-white text-white rounded px-3 py-1 hover:bg-white hover:text-[#44743A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {actionLoading === `accept-${aiChallenge.id}` ? (
                        <>
                          <div className="animate-spin rounded-full h-3 w-3 border-b border-current"></div>
                          <span>Accepteren...</span>
                        </>
                      ) : (
                        <span>Accepteer</span>
                      )}
                    </button>
                    <button
                      onClick={() => handleDenyChallenge(aiChallenge.id)}
                      disabled={actionLoading === `deny-${aiChallenge.id}`}
                      className="flex items-center gap-1 text-xs border border-white text-white rounded px-3 py-1 hover:bg-red-500 hover:border-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {actionLoading === `deny-${aiChallenge.id}` ? (
                        <>
                          <div className="animate-spin rounded-full h-3 w-3 border-b border-current"></div>
                          <span>Afkeuren...</span>
                        </>
                      ) : (
                        <span>Afkeuren</span>
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
