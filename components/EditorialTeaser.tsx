import Image from "next/image";
import Link from "next/link";
import { getFeaturedArticles } from "@/lib/journal";

export function EditorialTeaser() {
  const articles = getFeaturedArticles(3);

  return (
    <section className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-10">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-serif text-3xl text-navy sm:text-4xl">From the Journal</h2>
        <Link
          href="/journal"
          className="whitespace-nowrap text-sm text-navy underline underline-offset-4 hover:text-brass"
        >
          Read more
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {articles.map((article) => (
          <Link key={article.id} href={`/journal/${article.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src={article.image.src}
                alt={article.image.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="mt-3 text-xs uppercase tracking-wider text-brass">{article.category}</p>
            <h3 className="mt-1 font-serif text-lg text-navy group-hover:underline">
              {article.title}
            </h3>
            <p className="mt-1 text-sm text-navy/60">{article.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
