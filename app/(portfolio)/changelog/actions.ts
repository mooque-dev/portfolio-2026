"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { CHANGELOG_COOKIE, changelogKey, isChangelogKey } from "@/lib/changelogGate";
import { rateLimit } from "@/lib/ratelimit";

export async function unlockChangelog(
  _prev: { error?: string },
  form: FormData,
): Promise<{ error?: string }> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (!rateLimit(`changelog:${ip}`, 8)) return { error: "Too many tries. Wait a minute and try again." };

  const key = changelogKey(String(form.get("password") ?? ""));
  if (!isChangelogKey(key)) return { error: "That password isn't right." };

  (await cookies()).set(CHANGELOG_COOKIE, key, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/changelog",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/changelog");
}
