import type { Metadata } from "next";
import Link from "next/link";
import OrchidLibrary from "@/components/OrchidLibrary";

// A work-in-progress recreation of the Orchid library: one set of components
// in four skins. Unlisted while Allen fills in the details.
export const metadata: Metadata = {
  title: "Orchid library, recreated",
  description: "One set of components, skinned for Keela, Raisely and Aplos, plus a neutral white-label version.",
  robots: { index: false, follow: false },
};

export default function OrchidLibraryPage() {
  return (
    <article className="mx-auto w-full max-w-[1320px] px-6 pt-32 pb-24 md:pt-40 md:pb-32">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight" style={{ textWrap: "balance" }}>One library, four skins</h1>
      <p className="mt-5 max-w-[62ch] text-lg text-muted">
        A recreation of <Link href="/work/orchid-design-system" className="underline underline-offset-4">Orchid</Link>, in progress. The same components serve three products that look nothing alike, plus a white-label version with no brand at all. Switch the skin and watch what changes, and what doesn&rsquo;t.
      </p>
      <p className="mt-3 max-w-[62ch] text-sm text-muted">
        Draft. The colours and corners are read from each company&rsquo;s public website as a starting point. No company marks.
      </p>
      <div className="mt-10">
        <OrchidLibrary />
      </div>
    </article>
  );
}
