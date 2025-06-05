"use client";

import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Challenge, AIChallenge } from "@/types/challenge";

export function useChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "challenges"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const challengesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        })) as Challenge[];

        setChallenges(challengesData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { challenges, loading, error };
}

export function useAIChallenges() {
  const [aiChallenges, setAIChallenges] = useState<AIChallenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, "ai-challenges"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const aiChallengesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        })) as AIChallenge[];

        setAIChallenges(aiChallengesData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const acceptChallenge = async (aiChallenge: AIChallenge) => {
    try {
      // Add to active challenges
      await addDoc(collection(db, "challenges"), {
        title: aiChallenge.title,
        description: aiChallenge.description,
        completionCount: 0,
        status: "active",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // Remove from AI suggestions
      await deleteDoc(doc(db, "ai-challenges", aiChallenge.id));
    } catch (err) {
      throw new Error("Failed to accept challenge");
    }
  };

  const denyChallenge = async (aiChallengeId: string) => {
    try {
      await deleteDoc(doc(db, "ai-challenges", aiChallengeId));
    } catch (err) {
      throw new Error("Failed to deny challenge");
    }
  };

  return {
    aiChallenges,
    loading,
    error,
    acceptChallenge,
    denyChallenge,
  };
}
