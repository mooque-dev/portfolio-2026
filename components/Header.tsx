"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import ThemeToggle from "./ThemeToggle";
import Magnetic from "./Magnetic";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <nav
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="font-serif text-[15px] font-normal tracking-normal hover:opacity-60 transition-opacity"
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
                  <Magnetic strength={0.28} radius={65} className="inline-flex">
                    <Link
                      href={href}
                      className={`text-[11px] tracking-[0.14em] uppercase transition-colors min-h-[44px] inline-flex items-center ${
                        isActive
                          ? "text-foreground"
                          : "text-muted/70 hover:text-foreground"
                      }`}
                      {...(isActive && { "aria-current": "page" as const })}
                    >
                      {label}
                    </Link>
                  </Magnetic>
                </li>
              );
            })}
          </ul>

          <ThemeToggle />

          {/* Mobile menu — Sheet */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              className="md:hidden flex flex-col justify-center gap-1.5 p-2.5 ml-1 min-w-[44px] min-h-[44px]"
              aria-label="Navigation menu"
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
            </SheetTrigger>

            <SheetContent
              side="right"
              showCloseButton={false}
              className="w-72 bg-background border-border pt-16"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile navigation">
                <ul className="flex flex-col gap-1 px-2" role="list">
                  {navItems.map(({ href, label }) => {
                    const isActive = pathname.startsWith(href);
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          onClick={closeMenu}
                          className={`text-sm tracking-wide uppercase block py-3 px-2 min-h-[44px] flex items-center transition-colors rounded-md ${
                            isActive
                              ? "text-foreground font-medium"
                              : "text-muted hover:text-foreground hover:bg-surface"
                          }`}
                          {...(isActive && { "aria-current": "page" as const })}
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
