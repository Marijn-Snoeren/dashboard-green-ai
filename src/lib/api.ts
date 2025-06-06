const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://0.0.0.0:8000";

export interface GeneratedChallenge {
  title: string;
  description: string;
  category?: string;
}

interface ApiResponse {
  message: string;
  data: string;
  error?: string;
}

// New interface for the create endpoint response
interface CreateApiResponse {
  message: string;
  data: Array<[{ message: string; data: string }, number]>; // Array of [challenge_response, score]
  error?: string;
}

// Mock challenges for when Gemini API fails
const MOCK_CHALLENGES = [
  {
    title: "Plant een Eik",
    description:
      "Plant een eikenboom in je wijk voor meer biodiversiteit en CO2 opname.",
    category: "groen",
  },
  {
    title: "Afval Opruimen",
    description: "Ruim zwerfafval op in een straal van 100 meter rond je huis.",
    category: "afval",
  },
  {
    title: "Bijen Vriendelijk",
    description: "Zaai wilde bloemen om bijen en vlinders aan te trekken.",
    category: "biodiversiteit",
  },
  {
    title: "Water Besparen",
    description:
      "Installeer een regenton om regenwater op te vangen voor je tuin.",
    category: "water",
  },
  {
    title: "Fiets Challenge",
    description:
      "Gebruik een week lang alleen de fiets voor korte ritten onder 5km.",
    category: "mobiliteit",
  },
];

function getRandomMockChallenge(): GeneratedChallenge {
  const index = Math.floor(Math.random() * MOCK_CHALLENGES.length);
  return { ...MOCK_CHALLENGES[index] };
}

function getMultipleMockChallenges(count: number): GeneratedChallenge[] {
  const challenges = [];
  const used = new Set();

  for (let i = 0; i < Math.min(count, MOCK_CHALLENGES.length); i++) {
    let index;
    do {
      index = Math.floor(Math.random() * MOCK_CHALLENGES.length);
    } while (used.has(index));

    used.add(index);
    challenges.push({ ...MOCK_CHALLENGES[index] });
  }

  return challenges;
}

function parseGeminiResponse(text: string): GeneratedChallenge {
  console.log("Parsing Gemini response:", text);

  // First try the expected format: "Titel: <titel>\nUitdaging: <uitdaging>"
  const lines = text.split("\n").filter((line) => line.trim());
  let title = "";
  let description = "";

  for (const line of lines) {
    if (line.toLowerCase().startsWith("titel:")) {
      title = line.replace(/^titel:\s*/i, "").trim();
    } else if (line.toLowerCase().startsWith("uitdaging:")) {
      description = line.replace(/^uitdaging:\s*/i, "").trim();
    }
  }

  // If that doesn't work, try to parse multiple options format
  if (!title && !description) {
    // Look for pattern like "Titel: ..." followed by "Uitdaging: ..."
    const titleMatch = text.match(/Titel:\s*([^\n]+)/i);
    const challengeMatch = text.match(/Uitdaging:\s*([^\n]+)/i);

    if (titleMatch && challengeMatch) {
      title = titleMatch[1].trim();
      description = challengeMatch[1].trim();
    } else {
      // Try to extract the first complete challenge option
      const optionMatch = text.match(
        /\*\*Optie\s+\d+[^*]*\*\*\s*\n\s*Titel:\s*([^\n]+)\s*\n\s*Uitdaging:\s*([^\n]+)/i
      );
      if (optionMatch) {
        title = optionMatch[1].trim();
        description = optionMatch[2].trim();
      } else {
        // Last resort: look for any title/challenge pattern
        const anyTitleMatch = text.match(/(?:Titel|Title):\s*([^\n]+)/i);
        const anyUitdagingMatch = text.match(
          /(?:Uitdaging|Challenge):\s*([^\n]+)/i
        );

        if (anyTitleMatch) title = anyTitleMatch[1].trim();
        if (anyUitdagingMatch) description = anyUitdagingMatch[1].trim();
      }
    }
  }

  // Clean up the extracted text
  if (title) {
    title = title.replace(/[*"]/g, "").trim();
  }
  if (description) {
    description = description.replace(/[*"]/g, "").trim();
  }

  // Fallback: if parsing fails, use the whole text as description
  if (!title && !description) {
    // Try to extract a meaningful first sentence as title
    const sentences = text.split(/[.!?]/);
    const firstSentence = sentences[0]?.trim();

    if (firstSentence && firstSentence.length < 100) {
      title = firstSentence;
      description = text.trim();
    } else {
      title = "AI Generated Challenge";
      description = text.trim();
    }
  } else if (!title) {
    title =
      description.length > 50
        ? description.substring(0, 50) + "..."
        : description;
  } else if (!description) {
    description = title;
  }

  return {
    title,
    description,
    category: "ai-generated",
  };
}

export async function generateChallenge(
  location?: string,
  information?: string
): Promise<GeneratedChallenge> {
  const params = new URLSearchParams();
  if (location) params.append("location", location);
  if (information) params.append("information", information);

  const response = await fetch(`${API_BASE_URL}/GenerateChallenge?${params}`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: Failed to generate challenge`);
  }

  const apiResponse: ApiResponse = await response.json();

  if (apiResponse.error) {
    // If Gemini fails, return a mock challenge with a note
    if (apiResponse.error.includes("Gemini failed")) {
      console.warn("Gemini API failed, using mock challenge");
      const mockChallenge = getRandomMockChallenge();
      return {
        ...mockChallenge,
        title: `${mockChallenge.title} (Demo)`,
        description: `${mockChallenge.description} [Note: Using demo data because Gemini API is unavailable]`,
      };
    }
    throw new Error(apiResponse.error);
  }

  if (!apiResponse.data) {
    throw new Error("No data received from Python API");
  }

  return parseGeminiResponse(apiResponse.data);
}

export async function createChallenges(
  count: number = 1
): Promise<GeneratedChallenge[]> {
  const response = await fetch(`${API_BASE_URL}/create?count=${count}`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: Failed to create challenges`);
  }

  const apiResponse: CreateApiResponse = await response.json();

  if (apiResponse.error) {
    // If Gemini fails, return mock challenges
    if (apiResponse.error.includes("Gemini failed")) {
      console.warn("Gemini API failed, using mock challenges");
      return getMultipleMockChallenges(count).map((challenge) => ({
        ...challenge,
        title: `${challenge.title} (Demo)`,
        description: `${challenge.description} [Note: Using demo data because Gemini API is unavailable]`,
      }));
    }
    throw new Error(apiResponse.error);
  }

  if (!apiResponse.data || !Array.isArray(apiResponse.data)) {
    throw new Error("Invalid data format received from Python API");
  }

  // Parse each challenge from the array
  // Format: [[{message, data}, improvement_score], ...]
  const challenges: GeneratedChallenge[] = [];

  for (const item of apiResponse.data) {
    if (Array.isArray(item) && item.length >= 1) {
      const challengeData = item[0]; // First element is the challenge response
      const score = item[1]; // Second element is the improvement score

      if (challengeData && challengeData.data) {
        try {
          const parsed = parseGeminiResponse(challengeData.data);
          // Add the score as additional metadata if needed
          challenges.push({
            ...parsed,
            // You can add score to the description or as metadata
            // For now, let's add it to the description
            description: `${
              parsed.description
            } (Improvement Score: ${score.toFixed(2)})`,
          });
        } catch (error) {
          console.warn("Failed to parse challenge:", challengeData, error);
        }
      }
    }
  }

  if (challenges.length === 0) {
    console.warn("No valid challenges parsed, using mock data");
    return getMultipleMockChallenges(count);
  }

  return challenges;
}
