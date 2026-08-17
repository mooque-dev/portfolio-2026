import { describe, it, expect } from "vitest";
import { rateLimit, clientKey } from "@/lib/ratelimit";

// Each test uses a random key so the shared in-memory map can't leak state
// between cases.
const k = (p: string) => `${p}:${Math.random()}`;

describe("rateLimit", () => {
  it("allows up to `max` hits, then blocks", () => {
    const key = k("allow");
    for (let i = 0; i < 6; i++) {
      expect(rateLimit(key, 6, 60_000)).toBe(true);
    }
    expect(rateLimit(key, 6, 60_000)).toBe(false);
  });

  it("respects a custom max", () => {
    const key = k("max2");
    expect(rateLimit(key, 2, 60_000)).toBe(true);
    expect(rateLimit(key, 2, 60_000)).toBe(true);
    expect(rateLimit(key, 2, 60_000)).toBe(false);
  });

  it("tracks keys independently", () => {
    const a = k("a");
    const b = k("b");
    for (let i = 0; i < 6; i++) rateLimit(a, 6, 60_000);
    expect(rateLimit(a, 6, 60_000)).toBe(false); // a is spent
    expect(rateLimit(b, 6, 60_000)).toBe(true); // b is fresh
  });

  it("frees capacity once hits fall outside the window", () => {
    const key = k("window");
    for (let i = 0; i < 6; i++) rateLimit(key, 6, 60_000);
    expect(rateLimit(key, 6, 60_000)).toBe(false);
    // A zero-length window means every earlier hit is already expired.
    expect(rateLimit(key, 6, 0)).toBe(true);
  });
});

describe("clientKey", () => {
  it("uses the first IP in x-forwarded-for", () => {
    const req = new Request("http://x/api", {
      headers: { "x-forwarded-for": "1.2.3.4, 5.6.7.8" },
    });
    expect(clientKey(req, "responses")).toBe("responses:1.2.3.4");
  });

  it("falls back to x-real-ip", () => {
    const req = new Request("http://x/api", {
      headers: { "x-real-ip": "9.9.9.9" },
    });
    expect(clientKey(req, "questions")).toBe("questions:9.9.9.9");
  });

  it("falls back to anon when no IP headers are present", () => {
    const req = new Request("http://x/api");
    expect(clientKey(req, "questions")).toBe("questions:anon");
  });

  it("namespaces by scope", () => {
    const req = new Request("http://x/api", {
      headers: { "x-forwarded-for": "1.1.1.1" },
    });
    expect(clientKey(req, "a")).not.toBe(clientKey(req, "b"));
  });
});
