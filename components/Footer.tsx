import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";

const SITEMAP: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: "Shop",
    links: [
      { href: "/collection", label: "All Collection" },
      { href: "/collection?category=sets", label: "Reformer Sets" },
      { href: "/collection?category=jackets", label: "Zip Jackets" },
      { href: "/collection?category=lifestyle", label: "Lifestyle" },
    ],
  },
  {
    heading: "Studio 14",
    links: [
      { href: "/studios", label: "Studios" },
      { href: "/journal", label: "Journal" },
      { href: "/about", label: "About" },
    ],
  },
  {
    heading: "Follow",
    links: [
      { href: "https://instagram.com", label: "Instagram" },
      { href: "https://tiktok.com", label: "TikTok" },
      { href: "mailto:hello@studio14.com", label: "hello@studio14.com" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy text-cream">
      <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <p className="font-serif text-xl">Studio 14</p>
            <p className="mt-2 text-sm text-cream/70">Power in your nature.</p>
          </div>

          {SITEMAP.map((section) => (
            <div key={section.heading}>
              <h3 className="text-sm font-medium uppercase tracking-wide text-brass">
                {section.heading}
              </h3>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-cream/80 hover:text-cream">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-cream/15 pt-8">
          <h3 className="text-sm font-medium uppercase tracking-wide text-brass">Newsletter</h3>
          <p className="mt-2 max-w-sm text-sm text-cream/70">
            Studio updates, new drops, and journal entries, roughly twice a month.
          </p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </div>

        <p className="mt-12 text-xs text-cream/50">
          © {new Date().getFullYear()} Studio 14. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
