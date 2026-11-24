import type { Metadata } from "next";
import sites from "@/lib/siteVersions.json";
import { changelog } from "@/lib/changelog";

// Allen's own record of every version of the site he has sent out: the main
// site, then each tailored page with its dated versions. Not linked from
// anywhere and kept out of search. The page list is exported from the
// "Tailored sites" view of his applications tracker (lib/siteVersions.json);
// refresh that file whenever a page is added or changes.
export const metadata: Metadata = {
  title: { absolute: "Site versions" },
  robots: { index: false, follow: false },
};

type Site = {
  slug: string;
  company: string;
  variant?: string;
  status?: string;
  url: string;
  resume?: string;
  visual?: string;
  made?: string;
  versions?: { date: string; note: string }[];
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Tracker dates read "Oct 20" (this year) or "Oct 2026"; turn either into a sortable number.
const when = (d?: string) => {
  const m = d?.match(/^([A-Z][a-z]{2}) (\d{1,4})$/);
  if (!m) return 0;
  const month = MONTHS.indexOf(m[1]);
  const n = Number(m[2]);
  return n > 31 ? month * 100 : month * 100 + n;
};
const lastChange = (s: Site) => (s.versions?.length ? s.versions[s.versions.length - 1].date : s.made);
const path = (url: string) => url.replace(/^https?:\/\/[^/]+/, "") || "/";

const linkClass = "underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors";

export default function SiteVersionsPage() {
  const list = [...(sites as Site[])].sort((a, b) => when(lastChange(b)) - when(lastChange(a)));
  const live = list.filter((s) => (s.status ?? "Live") === "Live").length;
  const logged = list.reduce((n, s) => n + (s.versions?.length ?? 0), 0);
  const latest = changelog[0];

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em]">Site versions</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          Every version of the site I&rsquo;ve sent out. Not linked from anywhere and hidden from search, so it&rsquo;s
          for me. {live} pages live, {logged} versions logged.
        </p>

        <h2 className="mt-14 text-[15px] font-semibold">Main site</h2>
        <ul className="m-0 mt-3 list-none border-t border-border p-0">
          <li className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border py-3.5">
            <a href="https://mooque-dev.github.io/" className={`font-medium ${linkClass}`}>
              mooque-dev.github.io
            </a>
            <span className="text-[14px] text-muted">The one to send</span>
          </li>
          <li className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border py-3.5">
            <a href="https://allenkang.com/" className={`font-medium ${linkClass}`}>
              allenkang.com
            </a>
            <span className="text-[14px] text-muted">Same version, updated on every publish</span>
          </li>
          {latest && (
            <li className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border py-3.5">
              <span>
                Last change: <span className="font-medium">{latest.title}</span>
              </span>
              <a href="https://allenkang.com/changelog" className={`text-[14px] ${linkClass}`}>
                {latest.date} · changelog
              </a>
            </li>
          )}
        </ul>

        <h2 className="mt-14 text-[15px] font-semibold">Tailored pages, most recently changed first</h2>
        <ul className="m-0 mt-3 list-none border-t border-border p-0">
          {list.map((s) => (
            <li key={s.slug} className="border-b border-border py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <p className="m-0 font-semibold">
                  {s.company}
                  {s.variant && <span className="font-normal text-muted"> · {s.variant}</span>}
                  {s.status && s.status !== "Live" && (
                    <span className="ml-2 rounded-full border border-border px-2 py-0.5 text-[12px] font-medium text-muted">{s.status}</span>
                  )}
                </p>
                <p className="m-0 flex flex-wrap gap-x-4 text-[14px]">
                  <a href={path(s.url)} className={linkClass}>
                    {path(s.url)}
                  </a>
                  {s.resume && (
                    <a href={path(s.resume)} className={linkClass}>
                      Résumé
                    </a>
                  )}
                </p>
              </div>
              {s.visual && <p className="m-0 mt-1 text-[14px] text-muted">{s.visual}</p>}
              {s.versions && s.versions.length > 0 ? (
                <details className="mt-2 text-[14px]">
                  <summary className="cursor-pointer text-muted hover:text-foreground">
                    {s.versions.length} {s.versions.length === 1 ? "version" : "versions"} · last changed {lastChange(s)}
                    {s.made && <> · made {s.made}</>}
                  </summary>
                  <ol className="m-0 mt-2 list-none space-y-1.5 p-0">
                    {[...s.versions].reverse().map((v, i) => (
                      <li key={i} className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3">
                        <span className="tabular-nums text-muted">{v.date}</span>
                        <span>{v.note}</span>
                      </li>
                    ))}
                  </ol>
                </details>
              ) : (
                <p className="m-0 mt-2 text-[14px] text-muted">No versions logged{s.made && <> · made {s.made}</>}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
