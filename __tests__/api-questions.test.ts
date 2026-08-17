import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/supabase", () => ({ isSupabaseConfigured: false, supabase: null }));

import { POST } from "@/app/api/questions-for-allen/route";
import { NextRequest } from "next/server";

const post = (body: string, ip: string) =>
  new NextRequest("http://localhost/api/questions-for-allen", {
    method: "POST",
    body,
    headers: { "x-forwarded-for": ip, "content-type": "application/json" },
  });

describe("POST /api/questions-for-allen", () => {
  it("400 on invalid JSON", async () => {
    const res = await POST(post("not json at all", "2.0.0.1"));
    expect(res.status).toBe(400);
  });

  it("400 when question is missing", async () => {
    const res = await POST(post(JSON.stringify({ contact: "x@y.com" }), "2.0.0.2"));
    expect(res.status).toBe(400);
  });

  it("400 when question is only whitespace", async () => {
    const res = await POST(post(JSON.stringify({ question: "   " }), "2.0.0.3"));
    expect(res.status).toBe(400);
  });

  it("200 with offline flag on a valid question when DB is unconfigured", async () => {
    const res = await POST(
      post(JSON.stringify({ question: "How do you approach systems work?" }), "2.0.0.4")
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, offline: true });
  });

  it("429 once one IP exceeds the rate limit", async () => {
    const ip = "2.0.0.99";
    let last: Response | undefined;
    for (let i = 0; i < 7; i++) {
      last = await POST(post(JSON.stringify({ question: "q" }), ip));
    }
    expect(last!.status).toBe(429);
  });
});
