import { MongoClient, Db } from "mongodb";

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 10000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient> | null = null;
let lastMongoError: string | null = null;

export function getLastMongoError(): string | null {
  return lastMongoError;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

/**
 * Sanitizes and extracts the MongoDB URI from environment variables.
 */
function getSanitizedUri(): string | null {
  let uri = process.env.MONGODB_URI;
  if (!uri) return null;
  uri = uri.trim().replace(/^["']|["']$/g, "");
  if (!uri || uri.includes("<password>")) return null;
  return uri;
}

/**
 * Checks whether MONGODB_URI is provided in environment variables.
 */
export function isMongoConfigured(): boolean {
  return Boolean(getSanitizedUri());
}

/**
 * Returns a cached MongoClient promise, safe across Next.js HMR reloads and serverless retries.
 */
export async function getMongoClient(): Promise<MongoClient | null> {
  const uri = getSanitizedUri();
  if (!uri) {
    lastMongoError = "MONGODB_URI is missing or contains placeholder <password>";
    return null;
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect().catch((err) => {
        global._mongoClientPromise = undefined;
        lastMongoError = err?.message || String(err);
        throw err;
      });
    }
    try {
      return await global._mongoClientPromise;
    } catch (err: any) {
      global._mongoClientPromise = undefined;
      lastMongoError = err?.message || String(err);
      return null;
    }
  } else {
    if (!clientPromise) {
      client = new MongoClient(uri, options);
      clientPromise = client.connect().catch((err) => {
        clientPromise = null;
        lastMongoError = err?.message || String(err);
        throw err;
      });
    }
    try {
      return await clientPromise;
    } catch (err: any) {
      clientPromise = null;
      lastMongoError = err?.message || String(err);
      return null;
    }
  }
}

/**
 * Returns the MongoDB Database instance.
 * Defaults to "miya_ji_oud" or whatever is specified in MONGODB_DB.
 */
export async function getDatabase(dbName?: string): Promise<Db | null> {
  try {
    const client = await getMongoClient();
    if (!client) return null;
    const targetDb = dbName || process.env.MONGODB_DB || "miya_ji_oud";
    lastMongoError = null;
    return client.db(targetDb);
  } catch (err: any) {
    lastMongoError = err?.message || String(err);
    console.warn("MongoDB connection failed, falling back to local store:", lastMongoError);
    return null;
  }
}
