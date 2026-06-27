// Best-effort in-memory rate limiter. Serverless instances are ephemeral, so
// this deters casual spam/abuse rather than guaranteeing a hard global cap.
// For a portfolio's public write endpoints that's the right trade-off.
const hits = new Map<string, number[]>();

export function rateLimit(key: string, max = 6, windowMs = 60_000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}

export function clientKey(request: Request, scope: string): string {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anon";
  return `${scope}:${ip}`;
}
