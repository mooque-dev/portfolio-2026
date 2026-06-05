import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pt-40 pb-24 md:pt-48 md:pb-32 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="font-serif text-6xl md:text-8xl font-bold tracking-tight">
          404
        </h1>
        <p className="mt-6 text-lg text-muted">
          This page doesn&apos;t exist. It may have been moved or removed.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 text-sm underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
