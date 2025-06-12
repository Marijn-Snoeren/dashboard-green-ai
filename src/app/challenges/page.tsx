"use client";

import React, { useState, useEffect } from "react";
import { useChallenges, useAIChallenges } from "@/hooks/useChallenges";
import { createChallenges, GeneratedChallenge } from "@/lib/api";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface QRCode {
  id: string;
  code: string;
  name: string;
  description: string;
  points: number;
  type: "static" | "dynamic";
  challengeIds: string[];
}

interface QRCodeData {
  qrCodes: QRCode[];
  metadata: {
    total: number;
    static: number;
    dynamic: number;
    activeChallenges: number;
  };
}

interface QRAPIResponse {
  success: boolean;
  data: QRCodeData;
  error?: string;
}

interface NewQRCodeForm {
  name: string;
  description: string;
  points: number;
}

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

  // QR Code states
  const [qrData, setQRData] = useState<QRCodeData | null>(null);
  const [qrLoading, setQRLoading] = useState(false);
  const [qrError, setQRError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showStaticQRs, setShowStaticQRs] = useState(false);

  // Create QR Code modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [newQRForm, setNewQRForm] = useState<NewQRCodeForm>({
    name: "",
    description: "",
    points: 50,
  });

  // Delete challenge states
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );

  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [reloadLoading, setReloadLoading] = useState(false);
  const [reloadError, setReloadError] = useState<string | null>(null);

  const validateChallenge = (
    challenge: any
  ): challenge is GeneratedChallenge => {
    return (
      challenge &&
      typeof challenge.title === "string" &&
      challenge.title.trim() !== "" &&
      typeof challenge.description === "string" &&
      challenge.description.trim() !== ""
    );
  };

  // QR Code functions
  const fetchQRCodes = async () => {
    setQRLoading(true);
    setQRError(null);
    try {
      const response = await fetch("/api/qr-codes");
      const result: QRAPIResponse = await response.json();

      if (result.success) {
        setQRData(result.data);
      } else {
        setQRError(result.error || "Failed to fetch QR codes");
        // Still show data if available (fallback scenario)
        if (result.data) {
          setQRData(result.data);
        }
      }
    } catch (err) {
      setQRError("Network error: Failed to fetch QR codes");
      console.error("QR codes fetch error:", err);
    } finally {
      setQRLoading(false);
    }
  };

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Delete challenge function
  const handleDeleteChallenge = async (challengeId: string) => {
    setDeleteLoading(challengeId);
    try {
      await deleteDoc(doc(db, "challenges", challengeId));
      // Refresh QR codes after deleting challenge
      fetchQRCodes();
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting challenge:", error);
    } finally {
      setDeleteLoading(null);
    }
  };

  // Create new static QR code
  const handleCreateQRCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newQRForm.name.trim() || !newQRForm.description.trim()) {
      setCreateError("Naam en beschrijving zijn verplicht");
      return;
    }

    setCreateLoading(true);
    setCreateError(null);

    try {
      const response = await fetch("/api/qr-codes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQRForm),
      });

      const result = await response.json();

      if (result.success) {
        // Reset form and close modal
        setNewQRForm({ name: "", description: "", points: 50 });
        setShowCreateModal(false);

        // Refresh QR codes list
        await fetchQRCodes();

        // Show static QR codes section to see the new one
        setShowStaticQRs(true);
      } else {
        setCreateError(result.error || "Fout bij aanmaken QR code");
      }
    } catch (error) {
      console.error("Error creating QR code:", error);
      setCreateError("Netwerk fout bij aanmaken QR code");
    } finally {
      setCreateLoading(false);
    }
  };

  // Load QR codes when page loads
  useEffect(() => {
    fetchQRCodes();
  }, []);

  // Helper function to find QR code for a challenge
  const findQRCodeForChallenge = (challengeId: string): QRCode | null => {
    return (
      qrData?.qrCodes.find((qr) => qr.challengeIds.includes(challengeId)) ||
      null
    );
  };

  // Get static QR codes
  const staticQRCodes =
    qrData?.qrCodes.filter((qr) => qr.type === "static") || [];

  const handleAcceptChallenge = async (aiChallenge: any) => {
    setActionLoading(`accept-${aiChallenge.id}`);
    try {
      await acceptChallenge(aiChallenge);
      // Refresh QR codes after accepting challenge
      fetchQRCodes();
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

  const handleReloadChallenges = async () => {
    setReloadLoading(true);
    setReloadError(null);

    try {
      // Generate 3 new challenges
      const newChallenges = await createChallenges(3);

      if (Array.isArray(newChallenges)) {
        const validChallenges = newChallenges.filter(validateChallenge);

        // Add each valid challenge to Firestore
        for (const challenge of validChallenges) {
          await addDoc(collection(db, "ai-challenges"), {
            title: challenge.title.trim(),
            description: challenge.description.trim(),
            category: challenge.category?.trim() || "ai-generated",
            createdAt: serverTimestamp(),
          });
        }

        if (validChallenges.length === 0) {
          setReloadError("Geen geldige challenges gegenereerd");
        }

        // Refresh QR codes after generating new challenges
        fetchQRCodes();
      } else {
        setReloadError("Ongeldige response van de API");
      }
    } catch (error) {
      console.error("Error reloading challenges:", error);
      if (error instanceof Error) {
        if (error.message.includes("Gemini failed")) {
          setReloadError("AI service tijdelijk niet beschikbaar");
        } else if (error.message.includes("HTTP")) {
          setReloadError("Netwerk fout bij het laden van nieuwe challenges");
        } else {
          setReloadError("Fout bij het genereren van nieuwe challenges");
        }
      } else {
        setReloadError("Onbekende fout opgetreden");
      }
    } finally {
      setReloadLoading(false);
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
          <div>
            <h1 className="text-black text-3xl font-bold">Challenges</h1>
            <p className="text-gray-600 mt-1">
              Beheer challenges en bekijk bijbehorende QR codes voor testen
            </p>
          </div>
          <div className="flex items-center gap-2 text-black">
            <span>Welkom, Marijn</span>
            <span className="w-8 h-8 rounded-full bg-gray-300 inline-block" />
          </div>
        </div>

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

        {reloadError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {reloadError}
          </div>
        )}

        {qrError && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-4">
            <div className="flex">
              <span className="text-lg mr-2">⚠️</span>
              <div>
                <strong>QR Codes:</strong> {qrError}
                <p className="text-xs mt-1">
                  QR codes kunnen niet worden geladen. Challenge functionaliteit
                  werkt nog steeds.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* QR Statistics */}
        {qrData && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 shadow border-l-4 border-l-[#44743A]">
              <div className="text-2xl font-bold text-[#44743A]">
                {qrData.metadata.total}
              </div>
              <div className="text-sm text-gray-600">Totaal QR codes</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow border-l-4 border-l-blue-500">
              <div className="text-2xl font-bold text-blue-600">
                {qrData.metadata.static}
              </div>
              <div className="text-sm text-gray-600">Statische codes</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow border-l-4 border-l-purple-500">
              <div className="text-2xl font-bold text-purple-600">
                {qrData.metadata.dynamic}
              </div>
              <div className="text-sm text-gray-600">AI challenges</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow border-l-4 border-l-green-500">
              <div className="text-2xl font-bold text-green-600">
                {challenges.length}
              </div>
              <div className="text-sm text-gray-600">Actieve challenges</div>
            </div>
          </div>
        )}

        <div className="flex gap-8">
          {/* Actieve Challenges */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">
                Actieve Challenges ({challenges.length})
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowStaticQRs(!showStaticQRs)}
                  className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:bg-blue-50 px-3 py-2 rounded transition-colors"
                >
                  📱 Statische QR codes ({staticQRCodes.length})
                </button>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center gap-1 text-black text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded transition-colors"
                >
                  Create New
                  <span className="text-lg leading-none">+</span>
                </button>
              </div>
            </div>

            {/* Static QR Codes Section */}
            {showStaticQRs && staticQRCodes.length > 0 && (
              <div className="bg-blue-50 rounded-2xl p-6 mb-6 border border-blue-200">
                <h3 className="text-lg font-medium text-blue-900 mb-4">
                  Statische QR Codes (algemeen gebruik)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {staticQRCodes.map((qr) => (
                    <div
                      key={qr.id}
                      className="bg-white rounded-lg p-4 border border-blue-200"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {qr.name}
                          </h4>
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                            Statisch
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-[#44743A]">
                            {qr.points}
                          </div>
                          <div className="text-xs text-gray-500">punten</div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        {qr.description}
                      </p>
                      <div className="bg-gray-50 rounded-md p-2">
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-xs text-gray-700 flex-1 pr-2">
                            {qr.code}
                          </span>
                          <button
                            onClick={() => copyToClipboard(qr.code)}
                            className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                              copiedCode === qr.code
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                          >
                            {copiedCode === qr.code ? "✓" : "📋"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                  const qrCode = findQRCodeForChallenge(challenge.id);

                  return (
                    <div
                      key={challenge.id}
                      className={`rounded-2xl p-6 min-h-[160px] flex flex-col gap-2 transition-all hover:shadow-lg relative ${
                        isGreen
                          ? "bg-[#44743A] text-white"
                          : "bg-white text-black border border-gray-200"
                      }`}
                    >
                      {/* Delete button */}
                      <button
                        onClick={() => setShowDeleteConfirm(challenge.id)}
                        className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-xs hover:scale-110 transition-all ${
                          isGreen
                            ? "bg-white/20 text-white hover:bg-red-500"
                            : "bg-gray-100 text-gray-600 hover:bg-red-500 hover:text-white"
                        }`}
                        title="Challenge verwijderen"
                      >
                        ✕
                      </button>

                      <span className="text-lg font-semibold pr-8">
                        {challenge.title}
                      </span>
                      <span className="text-sm mb-2">
                        {challenge.description}
                      </span>

                      {/* QR Code section */}
                      {qrCode && (
                        <div
                          className={`mt-auto pt-3 border-t ${
                            isGreen ? "border-white/20" : "border-gray-200"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-1">
                              <span className="text-xs">📱</span>
                              <span className="text-xs font-medium">
                                {qrCode.name}
                              </span>
                              {qrCode.challengeIds.length > 1 && (
                                <span
                                  className={`text-xs px-1 rounded ${
                                    isGreen ? "bg-white/20" : "bg-gray-200"
                                  }`}
                                >
                                  Gedeeld met {qrCode.challengeIds.length - 1}{" "}
                                  andere
                                  {qrCode.challengeIds.length > 2 ? "s" : ""}
                                </span>
                              )}
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                isGreen
                                  ? "bg-white/20 text-white"
                                  : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              QR Code
                            </span>
                          </div>
                          <div
                            className={`rounded-md p-2 ${
                              isGreen ? "bg-white/10" : "bg-gray-50"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span
                                className={`font-mono text-xs flex-1 pr-2 ${
                                  isGreen ? "text-white/90" : "text-gray-700"
                                }`}
                              >
                                {qrCode.code}
                              </span>
                              <button
                                onClick={() => copyToClipboard(qrCode.code)}
                                className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                                  copiedCode === qrCode.code
                                    ? isGreen
                                      ? "bg-green-500 text-white"
                                      : "bg-green-100 text-green-800"
                                    : isGreen
                                    ? "bg-white/20 text-white hover:bg-white/30"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                              >
                                {copiedCode === qrCode.code ? "✓" : "📋"}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Original stats */}
                      <div className="flex justify-between items-end mt-auto">
                        <div>
                          <span className="text-5xl font-bold leading-none">
                            {challenge.completionCount}
                          </span>
                          <div className="text-xs mt-1">
                            Aantal keren voltooid
                          </div>
                        </div>
                        <div className="text-xs text-right">
                          Status:{" "}
                          {challenge.status === "active"
                            ? "Actief"
                            : "Inactief"}
                          {qrCode && (
                            <div className="mt-1">
                              <strong>{qrCode.points}</strong> punten
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* AI Challenges */}
          <div className="w-[340px] bg-white rounded-2xl p-6 shadow flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-black">
                AI Challenges ({aiChallenges.length})
              </h2>
              <button
                onClick={handleReloadChallenges}
                disabled={reloadLoading}
                className="flex items-center gap-1 bg-[#44743A] text-white px-3 py-2 rounded-md hover:bg-[#3a6330] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                title="Genereer nieuwe AI challenges"
              >
                {reloadLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b border-white"></div>
                    <span>...</span>
                  </>
                ) : (
                  <>
                    <span>🔄</span>
                    <span>Reload</span>
                  </>
                )}
              </button>
            </div>

            {aiChallenges.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Geen AI suggestions beschikbaar.
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Klik op "Reload" om nieuwe challenges te genereren.
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

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(2px)",
            }}
          >
            <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4 shadow-2xl border border-gray-200">
              <div className="text-center">
                <div className="text-red-500 text-4xl mb-4">⚠️</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Challenge verwijderen?
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Deze actie kan niet ongedaan worden gemaakt. De challenge
                  wordt permanent verwijderd.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Annuleren
                  </button>
                  <button
                    onClick={() => handleDeleteChallenge(showDeleteConfirm)}
                    disabled={deleteLoading === showDeleteConfirm}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    {deleteLoading === showDeleteConfirm ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b border-white mr-2"></div>
                        Verwijderen...
                      </>
                    ) : (
                      "Verwijderen"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create QR Code Modal */}
        {showCreateModal && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(2px)",
            }}
          >
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-2xl border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Nieuwe Statische QR Code
                </h3>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setCreateError(null);
                    setNewQRForm({ name: "", description: "", points: 50 });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {createError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-sm">
                  {createError}
                </div>
              )}

              <form onSubmit={handleCreateQRCode} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    QR Code Naam *
                  </label>
                  <input
                    type="text"
                    value={newQRForm.name}
                    onChange={(e) =>
                      setNewQRForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#44743A] focus:border-transparent"
                    placeholder="bijv. Roze Petunias"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Beschrijving *
                  </label>
                  <textarea
                    value={newQRForm.description}
                    onChange={(e) =>
                      setNewQRForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#44743A] focus:border-transparent"
                    rows={3}
                    placeholder="Beschrijf wat deze QR code vertegenwoordigt..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Punten
                  </label>
                  <input
                    type="number"
                    value={newQRForm.points}
                    onChange={(e) =>
                      setNewQRForm((prev) => ({
                        ...prev,
                        points: parseInt(e.target.value) || 50,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#44743A] focus:border-transparent"
                    min="1"
                    max="1000"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setCreateError(null);
                      setNewQRForm({ name: "", description: "", points: 50 });
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    disabled={createLoading}
                    className="flex-1 px-4 py-2 bg-[#44743A] text-white rounded-md hover:bg-[#3a6330] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    {createLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b border-white mr-2"></div>
                        Aanmaken...
                      </>
                    ) : (
                      "QR Code Aanmaken"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
