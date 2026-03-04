"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/writing", label: "Writing" },
  { href: "/resume", label: "Resume" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <nav
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="font-serif text-xl tracking-tight font-semibold hover:opacity-70 transition-opacity"
          aria-label="Allen Kang — Home"
        >
          Allen Kang
        </Link>

        <div className="flex items-center gap-2">
          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8 mr-4" role="list">
            {navItems.map(({ href, label }) => {
              const isActive = pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`text-sm tracking-wide uppercase transition-colors min-h-[44px] inline-flex items-center ${
                      isActive
                        ? "text-foreground font-medium"
                        : "text-muted hover:text-foreground"
                    }`}
                    {...(isActive && { "aria-current": "page" as const })}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center gap-1.5 p-2.5 ml-1 min-w-[44px] min-h-[44px]"
            aria-label="Navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`block w-5 h-px bg-foreground transition-transform duration-200 ${
                menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-foreground transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-foreground transition-transform duration-200 ${
                menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm"
          role="region"
          aria-label="Mobile navigation"
        >
          <ul className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1" role="list">
            {navItems.map(({ href, label }) => {
              const isActive = pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={closeMenu}
                    className={`text-sm tracking-wide uppercase block py-3 min-h-[44px] flex items-center transition-colors ${
                      isActive
                        ? "text-foreground font-medium"
                        : "text-muted hover:text-foreground"
                    }`}
                    {...(isActive && { "aria-current": "page" as const })}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
