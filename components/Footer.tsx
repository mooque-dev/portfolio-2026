import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-32" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="flex flex-col sm:flex-row gap-8 text-sm">
          <nav aria-label="Footer">
            <ul className="flex flex-col gap-2" role="list">
              <li>
                <Link href="/work" className="hover:opacity-70 transition-opacity min-h-[44px] inline-flex items-center">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:opacity-70 transition-opacity min-h-[44px] inline-flex items-center">
                  About
                </Link>
              </li>
              <li>
                <Link href="/writing" className="hover:opacity-70 transition-opacity min-h-[44px] inline-flex items-center">
                  Writing
                </Link>
              </li>
              <li>
                <Link href="/resume" className="hover:opacity-70 transition-opacity min-h-[44px] inline-flex items-center">
                  Resume
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex flex-col gap-2 text-muted">
            <a
              href="https://www.linkedin.com/in/mooque/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors min-h-[44px] inline-flex items-center"
            >
              LinkedIn
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            <a
              href="mailto:ncsstyco@gmail.com"
              className="hover:text-foreground transition-colors min-h-[44px] inline-flex items-center"
            >
              Email
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-8 flex items-center justify-between">
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} Allen Kang
        </p>
        <Link
          href="/gateway"
          className="text-xs text-muted/50 hover:text-muted transition-colors tracking-wide"
        >
          Elsewhere ↗
        </Link>
      </div>
    </footer>
  );
}
