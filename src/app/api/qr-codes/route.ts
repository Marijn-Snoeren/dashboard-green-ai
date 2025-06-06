import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

// Static QR codes that are always available
const STATIC_QR_CODES = [
  {
    id: "1",
    code: "GREENAI_SEED_001",
    name: "Wilde bloemen mix",
    description: "Prachtige mix van wilde bloemen voor natuurlijke vergroening",
    points: 50,
    type: "static" as const,
  },
  {
    id: "2",
    code: "GREENAI_SEED_002",
    name: "Bijenvriendelijke planten",
    description: "Speciale selectie om bijen en vlinders aan te trekken",
    points: 75,
    type: "static" as const,
  },
  {
    id: "3",
    code: "GREENAI_SEED_003",
    name: "Schaduw tolerante planten",
    description: "Ideaal voor plekken met weinig zonlicht",
    points: 60,
    type: "static" as const,
  },
  {
    id: "4",
    code: "GREENAI_SEED_004",
    name: "Zonnebloemen",
    description: "Vrolijke zonnebloemen die iedereen blij maken",
    points: 40,
    type: "static" as const,
  },
];

interface Challenge {
  id: string;
  title: string;
  description: string;
  status: string;
  points?: number;
  createdAt: any;
  updatedAt?: any;
}

interface QRCode {
  id: string;
  code: string;
  name: string;
  description: string;
  points: number;
  type: "static" | "dynamic";
  challengeIds: string[];
}

// Extract plant name from challenge description based on keywords
function extractPlantName(description: string, title: string): string {
  const normalizedDesc = description.toLowerCase().replace(/\s+/g, "");

  // Check for specific plant keywords in order of priority
  if (
    normalizedDesc.includes("wildebloemen") ||
    normalizedDesc.includes("wildebloem")
  ) {
    return "Wilde bloemen mix";
  }
  if (
    normalizedDesc.includes("zonnebloemen") ||
    normalizedDesc.includes("zonnebloem")
  ) {
    return "Zonnebloemen";
  }
  if (
    normalizedDesc.includes("klaprozen") ||
    normalizedDesc.includes("klaproos")
  ) {
    return "Klaprozen";
  }
  if (
    normalizedDesc.includes("korenbloemen") ||
    normalizedDesc.includes("korenbloem")
  ) {
    return "Korenbloemen";
  }
  if (normalizedDesc.includes("lavendel")) {
    return "Lavendel starter pack";
  }
  if (normalizedDesc.includes("bijenvriendelijk")) {
    return "Bijenvriendelijke planten";
  }
  if (normalizedDesc.includes("schaduw")) {
    return "Schaduw tolerante planten";
  }
  if (normalizedDesc.includes("boom") || normalizedDesc.includes("bomen")) {
    return "Boom plantactie";
  }

  // Additional plant types
  if (normalizedDesc.includes("wildebertram")) {
    return "Wildebertram";
  }
  if (normalizedDesc.includes("vlinderstruik")) {
    return "Vlinderstruik";
  }
  if (normalizedDesc.includes("cosmea") || normalizedDesc.includes("cosmos")) {
    return "Cosmea";
  }
  if (normalizedDesc.includes("tagetes")) {
    return "Tagetes";
  }
  if (
    normalizedDesc.includes("afrikaantje") ||
    normalizedDesc.includes("afrikaantjes")
  ) {
    return "Afrikaantjes";
  }
  if (normalizedDesc.includes("zinnia") || normalizedDesc.includes("zinnias")) {
    return "Zinnia";
  }
  if (normalizedDesc.includes("calendula")) {
    return "Calendula";
  }
  if (
    normalizedDesc.includes("goudsbloem") ||
    normalizedDesc.includes("goudsbloemen")
  ) {
    return "Goudsbloemen";
  }
  if (
    normalizedDesc.includes("rudbeckia") ||
    normalizedDesc.includes("rudbeckias")
  ) {
    return "Rudbeckia";
  }
  if (
    normalizedDesc.includes("echinacea") ||
    normalizedDesc.includes("echinaceas")
  ) {
    return "Echinacea";
  }
  if (
    normalizedDesc.includes("vergeetmijniet") ||
    normalizedDesc.includes("vergeet-mij-niet")
  ) {
    return "Vergeet-mij-niet";
  }
  if (
    normalizedDesc.includes("viooltje") ||
    normalizedDesc.includes("viooltjes")
  ) {
    return "Viooltjes";
  }
  if (
    normalizedDesc.includes("petunia") ||
    normalizedDesc.includes("petunias")
  ) {
    return "Petunia";
  }
  if (normalizedDesc.includes("dahlia") || normalizedDesc.includes("dahlias")) {
    return "Dahlia";
  }
  if (normalizedDesc.includes("tulp") || normalizedDesc.includes("tulpen")) {
    return "Tulpen";
  }
  if (
    normalizedDesc.includes("narcis") ||
    normalizedDesc.includes("narcissen")
  ) {
    return "Narcissen";
  }
  if (
    normalizedDesc.includes("krokus") ||
    normalizedDesc.includes("krokussen")
  ) {
    return "Krokussen";
  }
  if (
    normalizedDesc.includes("hyacint") ||
    normalizedDesc.includes("hyacinten")
  ) {
    return "Hyacinten";
  }
  if (normalizedDesc.includes("basilicum")) {
    return "Basilicum";
  }
  if (normalizedDesc.includes("peterselie")) {
    return "Peterselie";
  }
  if (normalizedDesc.includes("dille")) {
    return "Dille";
  }
  if (normalizedDesc.includes("bieslook")) {
    return "Bieslook";
  }
  if (
    normalizedDesc.includes("kruidenmix") ||
    normalizedDesc.includes("kruiden")
  ) {
    return "Kruiden mix";
  }

  // If no match found, use the challenge title
  return title;
}

// Generate QR code identifier from plant name
function generateQRCodeIdentifier(plantName: string): string {
  return plantName
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .toUpperCase();
}

// Group challenges by plant type and create shared QR codes
function generateGroupedQRCodes(challenges: Challenge[]): QRCode[] {
  const plantGroups = new Map<string, Challenge[]>();

  // Group challenges by plant type
  challenges.forEach((challenge) => {
    const plantName = extractPlantName(challenge.description, challenge.title);
    if (!plantGroups.has(plantName)) {
      plantGroups.set(plantName, []);
    }
    plantGroups.get(plantName)!.push(challenge);
  });

  // Create QR codes for each plant group
  const qrCodes: QRCode[] = [];
  let qrIdCounter = 1;

  plantGroups.forEach((challengesInGroup, plantName) => {
    const qrIdentifier = generateQRCodeIdentifier(plantName);
    const challengeIds = challengesInGroup.map((c) => c.id);

    // Calculate average points or use 50 as default
    const avgPoints =
      challengesInGroup.reduce((sum, c) => sum + (c.points || 50), 0) /
      challengesInGroup.length;

    // Create description mentioning how many challenges use this QR
    const description =
      challengesInGroup.length === 1
        ? challengesInGroup[0].description
        : `Gebruikt voor ${
            challengesInGroup.length
          } challenges: ${challengesInGroup.map((c) => c.title).join(", ")}`;

    qrCodes.push({
      id: `grouped_${qrIdCounter++}`,
      code: `GREENAI_SEED_${qrIdentifier}`,
      name: plantName,
      description: description,
      points: Math.round(avgPoints),
      type: "dynamic",
      challengeIds: challengeIds,
    });
  });

  return qrCodes;
}

// Fetch custom static QR codes from Firestore
async function getCustomStaticQRCodes(): Promise<QRCode[]> {
  try {
    const qrCodesRef = collection(db, "static-qr-codes");
    const snapshot = await getDocs(qrCodesRef);

    const customQRCodes: QRCode[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      customQRCodes.push({
        id: doc.id,
        code: data.code,
        name: data.name,
        description: data.description,
        points: data.points || 50,
        type: "static",
        challengeIds: [],
      });
    });

    return customQRCodes;
  } catch (error) {
    console.error("Error fetching custom static QR codes:", error);
    return [];
  }
}

// Generate a unique QR code for new static codes
function generateUniqueStaticCode(
  existingCodes: string[],
  name: string
): string {
  // Try to create a code based on the name first
  const baseName = name
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .toUpperCase();

  let candidate = `GREENAI_SEED_${baseName}`;

  // If it conflicts, add a number
  let counter = 1;
  while (existingCodes.includes(candidate)) {
    counter++;
    candidate = `GREENAI_SEED_${baseName}_${counter}`;
  }

  return candidate;
}

export async function GET() {
  try {
    // Fetch active challenges from Firestore
    const challengesRef = collection(db, "challenges");
    const activeQuery = query(challengesRef, where("status", "==", "active"));
    const snapshot = await getDocs(activeQuery);

    const challenges: Challenge[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      challenges.push({
        id: doc.id,
        title: data.title || "",
        description: data.description || "",
        status: data.status || "active",
        points: data.points || 50,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      });
    });

    // Generate grouped QR codes based on plant types
    const dynamicQRCodes = generateGroupedQRCodes(challenges);

    // Get custom static QR codes from Firestore
    const customStaticQRCodes = await getCustomStaticQRCodes();

    // Convert default static QR codes to match new format
    const defaultStaticQRCodes: QRCode[] = STATIC_QR_CODES.map((qr) => ({
      ...qr,
      challengeIds: [], // Static codes don't belong to specific challenges
    }));

    // Combine all QR codes
    const allStaticQRCodes = [...defaultStaticQRCodes, ...customStaticQRCodes];
    const allQRCodes = [...allStaticQRCodes, ...dynamicQRCodes];

    // Return response with metadata
    return NextResponse.json({
      success: true,
      data: {
        qrCodes: allQRCodes,
        metadata: {
          total: allQRCodes.length,
          static: allStaticQRCodes.length,
          dynamic: dynamicQRCodes.length,
          activeChallenges: challenges.length,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching QR codes:", error);

    // Return static codes as fallback
    const staticQRCodes: QRCode[] = STATIC_QR_CODES.map((qr) => ({
      ...qr,
      challengeIds: [],
    }));

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch challenges from Firestore",
        data: {
          qrCodes: staticQRCodes,
          metadata: {
            total: staticQRCodes.length,
            static: staticQRCodes.length,
            dynamic: 0,
            activeChallenges: 0,
          },
        },
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, points } = body;

    // Validation
    if (!name || !description) {
      return NextResponse.json(
        { success: false, error: "Naam en beschrijving zijn verplicht" },
        { status: 400 }
      );
    }

    if (typeof points !== "number" || points < 1 || points > 1000) {
      return NextResponse.json(
        { success: false, error: "Punten moeten tussen 1 en 1000 zijn" },
        { status: 400 }
      );
    }

    // Get existing QR codes to avoid duplicates
    const existingCodes: string[] = [];

    // Add default static codes
    STATIC_QR_CODES.forEach((qr) => existingCodes.push(qr.code));

    // Add custom static codes
    const customQRCodes = await getCustomStaticQRCodes();
    customQRCodes.forEach((qr) => existingCodes.push(qr.code));

    // Generate unique code
    const newCode = generateUniqueStaticCode(existingCodes, name);

    // Save to Firestore
    const qrCodesRef = collection(db, "static-qr-codes");
    const docRef = await addDoc(qrCodesRef, {
      code: newCode,
      name: name.trim(),
      description: description.trim(),
      points: points,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      data: {
        id: docRef.id,
        code: newCode,
        name: name.trim(),
        description: description.trim(),
        points: points,
      },
    });
  } catch (error) {
    console.error("Error creating QR code:", error);
    return NextResponse.json(
      { success: false, error: "Fout bij aanmaken QR code" },
      { status: 500 }
    );
  }
}
