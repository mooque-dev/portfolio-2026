import { Lock } from "lucide-react";
import { LOCKED_CASES } from "@/lib/locked";

// A small lock after a link to a password-protected case study, with the
// words for screen readers, so the password screen is never a surprise.
export default function LockedNote({ href, className = "" }: { href: string; className?: string }) {
  if (!LOCKED_CASES.has(href)) return null;
  return (
    <span className={`inline-flex items-center gap-1 text-muted ${className}`}>
      <Lock aria-hidden strokeWidth={2.25} className="h-[0.85em] w-[0.85em]" />
      <span className="text-[0.85em]">Password</span>
    </span>
  );
}
