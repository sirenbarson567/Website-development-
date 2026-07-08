"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useBag } from "@/lib/bag-context";

const LINKS = [
  { href: "/collection", label: "Collection" },
  { href: "/studios", label: "Studios" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { count } = useBag();
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolledPastHero(true);
      return;
    }

    setScrolledPastHero(false);
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolledPastHero(window.scrollY > window.innerHeight * 0.8);
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const solid = scrolledPastHero;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-navy/10 bg-cream/95 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className={`font-serif text-lg tracking-wide transition-colors ${
            solid ? "text-navy" : "text-cream"
          }`}
        >
          Studio 14
        </Link>

        <ul className="hidden items-center gap-8 sm:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm tracking-wide transition-colors hover:opacity-70 ${
                  solid ? "text-navy" : "text-cream"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/collection"
          aria-label={`Bag, ${count} item${count === 1 ? "" : "s"}`}
          className={`flex items-center gap-1.5 text-sm transition-colors hover:opacity-70 ${
            solid ? "text-navy" : "text-cream"
          }`}
        >
          Bag
          <span
            className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs ${
              solid ? "bg-navy text-cream" : "bg-cream text-navy"
            }`}
          >
            {count}
          </span>
        </Link>
      </nav>
    </header>
  );
}
