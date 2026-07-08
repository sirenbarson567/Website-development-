import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/lib/journal";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: `${article.title} — Studio 14 Journal`,
    description: article.excerpt,
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const midpoint = Math.ceil(article.body.length / 2);
  const firstHalf = article.body.slice(0, midpoint);
  const secondHalf = article.body.slice(midpoint);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-10">
      <div className="flex items-center gap-3 text-xs text-navy/50">
        <span className="uppercase tracking-wider text-brass">{article.category}</span>
        <span>
          {new Date(article.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-navy sm:text-5xl">
        {article.title}
      </h1>

      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-sm">
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          sizes="(min-width: 1024px) 768px, 100vw"
          priority
          className="object-cover"
        />
      </div>

      <div className="mt-10 space-y-6 font-serif text-lg leading-relaxed text-navy/85">
        {firstHalf.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        {article.pullQuote && (
          <blockquote className="border-l-2 border-brass py-1 pl-6 font-serif text-2xl italic leading-snug text-navy">
            &ldquo;{article.pullQuote}&rdquo;
          </blockquote>
        )}

        {secondHalf.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
