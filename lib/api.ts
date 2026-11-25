/**
 * Helper to get the correct Base URL in both client and server environments:
 * - On the client (browser), it returns an empty string "" so relative paths (/api/...) are used automatically.
 * - On Vercel, it uses process.env.NEXT_PUBLIC_SITE_URL or process.env.VERCEL_URL.
 * - On local development, it defaults to http://localhost:3000.
 */
export function getBaseUrl(): string {
  // Client-side: always use relative paths
  if (typeof window !== "undefined") {
    return "";
  }

  // User-defined custom domain (e.g., https://miyajioud.com)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  // Vercel auto-injected deployment URL (e.g., https://your-project.vercel.app)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Local development fallback
  return "http://localhost:3000";
}