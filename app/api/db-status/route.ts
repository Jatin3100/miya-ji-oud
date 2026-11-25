import { NextResponse } from "next/server";
import { getDatabaseStatus } from "@/lib/db";
import { isMongoConfigured } from "@/lib/mongodb";

export async function GET() {
  try {
    const status = await getDatabaseStatus();

    return NextResponse.json(
      {
        success: true,
        database: status.provider,
        mongodbConfigured: status.isConfigured,
        connected: status.connected,
        statistics: status.counts,
        message:
          status.provider === "mongodb"
            ? "Connected to MongoDB! Data is permanently stored and synchronized in the cloud."
            : "Currently running on local JSON storage (data/store.json). To activate MongoDB, set MONGODB_URI in .env.local or Vercel.",
        instructions: {
          step1: "Create a free MongoDB Atlas cluster at mongodb.com",
          step2: "Copy your connection string: mongodb+srv://<user>:<password>@cluster0.xxx.mongodb.net/miya_ji_oud?retryWrites=true&w=majority",
          step3: "Add MONGODB_URI to your .env.local file (and in Vercel Project Settings > Environment Variables)",
          step4: "Restart dev server or redeploy. Your catalog will be auto-migrated into MongoDB automatically!",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        fallback: "local_json",
      },
      { status: 500 }
    );
  }
}
