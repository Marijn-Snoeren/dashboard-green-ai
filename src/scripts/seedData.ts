import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Sample active challenges
const sampleChallenges = [
  {
    title: "Bespaar Water",
    description: "Zet de kraan uit tijdens het tandenpoetsen.",
    completionCount: 10,
    status: "active",
  },
  {
    title: "Stoep Veger",
    description: "Houd jouw straat schoon en bladvrij.",
    completionCount: 27,
    status: "active",
  },
  {
    title: "Douche Tekort",
    description: "Douche maximaal 5 minuten per dag, een week lang.",
    completionCount: 27,
    status: "active",
  },
  {
    title: "Draag Groener",
    description: "Trek drie dagen op rij tweedehands of duurzame kleding aan.",
    completionCount: 10,
    status: "active",
  },
];

// Sample AI challenge suggestions
const sampleAIChallenges = [
  {
    title: "Restafval Reducer",
    description:
      "Jouw wijk produceert 12% meer restafval dan gemiddeld. Daag jezelf uit om deze week afval beter te scheiden.",
    category: "afval",
  },
  {
    title: "Stille Straat Loop",
    description:
      "In de Pastoorstraat is deze maand nauwelijks bewogen. Ga vandaag 1 km wandelen in je straat.",
    category: "mobiliteit",
  },
  {
    title: "Laag Licht Verbruik",
    description:
      "In jouw buurt relatief veel energieverbruik na 22:00. Probeer vanavond alle lampen uit te doen vóór je naar bed gaat.",
    category: "energie",
  },
  {
    title: "Buurboom Bonus",
    description:
      "Er zijn nog 4 dode/gedroogde boomspiegels open in jouw wijk. Kies er één en maak hem groen!",
    category: "groen",
  },
  {
    title: "Recycle Reminder",
    description:
      "Vorige maand werd plastic in jouw wijk 30% minder gescheiden. Zet vandaag je plasticzak buiten of help je buren herinneren.",
    category: "afval",
  },
];

export async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // Add sample challenges
    console.log("📝 Adding sample challenges...");
    for (const challenge of sampleChallenges) {
      await addDoc(collection(db, "challenges"), {
        ...challenge,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    // Add sample AI challenges
    console.log("🤖 Adding AI challenge suggestions...");
    for (const aiChallenge of sampleAIChallenges) {
      await addDoc(collection(db, "ai-challenges"), {
        ...aiChallenge,
        createdAt: serverTimestamp(),
      });
    }

    console.log("✅ Database seeding completed successfully!");
    console.log(`   • ${sampleChallenges.length} active challenges added`);
    console.log(
      `   • ${sampleAIChallenges.length} AI challenge suggestions added`
    );
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Only run seeding if this file is executed directly
if (typeof window === "undefined" && require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
