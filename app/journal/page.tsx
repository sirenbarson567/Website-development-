import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllArticles } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal — Studio 14",
  description: "Lifestyle and studio stories from Studio 14.",
};

export default function JournalPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-10">
      <div className="max-w-2xl">
        <h1 className="font-serif text-4xl text-navy sm:text-5xl">Journal</h1>
        <p className="mt-4 text-navy/70">
          Notes on the studio, the fabric, and the philosophy behind the line. Editorial, not a
          product push.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link key={article.id} href={`/journal/${article.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src={article.image.src}
                alt={article.image.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex items-center gap-3 text-xs text-navy/50">
              <span className="uppercase tracking-wider text-brass">{article.category}</span>
              <span>
                {new Date(article.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <h2 className="mt-1 font-serif text-xl text-navy group-hover:underline">
              {article.title}
            </h2>
            <p className="mt-1 text-sm text-navy/60">{article.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
