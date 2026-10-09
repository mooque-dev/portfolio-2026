import { createHash, scryptSync, timingSafeEqual } from "node:crypto";

// The changelog is private. This repo is public, so the password itself is
// never stored: only a SHA-256 of its scrypt key. The key doubles as the
// cookie value, so a valid cookie can't be made without the password.
const SALT = "allenkang.com/changelog";
const CHECK = Buffer.from("e05236e29e3426391380233031fa33b9300476eefa48b2ea2f80c030b26d15da", "hex");

export const CHANGELOG_COOKIE = "changelog_key";

export function changelogKey(password: string): string {
  return scryptSync(password, SALT, 32).toString("hex");
}

export function isChangelogKey(key: string | undefined): boolean {
  if (!key) return false;
  return timingSafeEqual(createHash("sha256").update(key).digest(), CHECK);
}
