import { describe, it, expect, vi } from "vitest";

// Force the "no DB configured" branch so the handler's validation and
// rate-limiting are exercised without touching a real Supabase project.
vi.mock("@/lib/supabase", () => ({ isSupabaseConfigured: false, supabase: null }));

import { GET, POST } from "@/app/api/responses/route";
import { NextRequest } from "next/server";

const post = (body: string, ip: string) =>
  new NextRequest("http://localhost/api/responses", {
    method: "POST",
    body,
    headers: { "x-forwarded-for": ip, "content-type": "application/json" },
  });

const get = (qs: string, ip = "10.0.0.1") =>
  new NextRequest(`http://localhost/api/responses?${qs}`, {
    headers: { "x-forwarded-for": ip },
  });

describe("POST /api/responses", () => {
  it("400 on invalid JSON", async () => {
    const res = await POST(post("{ not json", "1.0.0.1"));
    expect(res.status).toBe(400);
  });

  it("400 when answer is missing", async () => {
    const res = await POST(post(JSON.stringify({ questionId: "q1" }), "1.0.0.2"));
    expect(res.status).toBe(400);
  });

  it("400 when answer is only whitespace", async () => {
    const res = await POST(
      post(JSON.stringify({ questionId: "q1", answer: "   " }), "1.0.0.3")
    );
    expect(res.status).toBe(400);
  });

  it("200 with offline flag on a valid response when DB is unconfigured", async () => {
    const res = await POST(
      post(JSON.stringify({ questionId: "q1", answer: "great work" }), "1.0.0.4")
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, offline: true });
  });

  it("429 once one IP exceeds the rate limit", async () => {
    const ip = "1.0.0.99";
    let last: Response | undefined;
    for (let i = 0; i < 7; i++) {
      last = await POST(post(JSON.stringify({ questionId: "q", answer: "a" }), ip));
    }
    expect(last!.status).toBe(429);
  });
});

describe("GET /api/responses", () => {
  it("400 without a questionId", async () => {
    const res = await GET(get(""));
    expect(res.status).toBe(400);
  });

  it("returns an empty list when DB is unconfigured", async () => {
    const res = await GET(get("questionId=q1"));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ responses: [] });
  });

  it("returns count 0 when DB is unconfigured and count=true", async () => {
    const res = await GET(get("questionId=q1&count=true"));
    expect(await res.json()).toEqual({ count: 0 });
  });
});
