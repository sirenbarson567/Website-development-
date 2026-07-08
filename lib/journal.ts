import type { Article } from "./types";

const ARTICLES: Article[] = [
  {
    id: "j-01",
    slug: "power-in-your-nature",
    title: "Power in Your Nature",
    date: "2026-06-15",
    category: "Philosophy",
    excerpt: "What we mean when we say power in your nature, and why it shaped everything from our fabric to our fixtures.",
    image: { src: "/images/journal/power-in-your-nature.svg", alt: "Moss wall and arched mirror inside the Studio 14 retail corner" },
    body: [
      "Power in your nature is not a slogan we picked off a mood board. It came out of watching hundreds of reformer sessions on the studio floor, watching bodies find a kind of strength that has nothing to do with force.",
      "The reformer teaches control before it teaches intensity. You learn to move from a stable center, to let the spring do only the work the spring should do, and to trust the shape your own body already knows how to make.",
      "We wanted the clothes to carry that same instruction. Nothing overbuilt, nothing that fights you mid-movement. Just enough structure to hold you, and enough softness to disappear once you start.",
      "Oak, moss, brass, cream, navy. Every color in the line comes from the studio itself, because the studio is where the philosophy actually lives, not on a hangtag.",
    ],
    pullQuote: "The reformer teaches control before it teaches intensity.",
  },
  {
    id: "j-02",
    slug: "shop-where-you-train",
    title: "Shop Where You Train",
    date: "2026-05-22",
    category: "Studio",
    excerpt: "Why our only retail corner sits inside the studio, and what that changes about how the line gets designed.",
    image: { src: "/images/journal/shop-where-you-train.svg", alt: "Oak wood retail fixtures inside the Studio 14 boutique corner" },
    body: [
      "There is no showroom. There is no separate storefront on a different street. The rail of Reformer Sets sits along the same oak wall you pass on your way to class.",
      "That proximity keeps us honest. If a legging rides down mid-teaser or a jacket won't layer over a grip sock, we hear about it that afternoon, not in a quarterly return report.",
      "The retail corner was built with the same materials as the studio: oak fixtures, a moss accent wall, brass picture lighting, one arched mirror angled to catch the whole rail at once.",
    ],
  },
  {
    id: "j-03",
    slug: "fabric-notes-the-compression-knit",
    title: "Fabric Notes: The Compression Knit",
    date: "2026-04-30",
    category: "Product",
    excerpt: "A close look at the brushed compression knit behind every Reformer Set, and why we chose matte over shine.",
    image: { src: "/images/journal/fabric-notes.svg", alt: "Detail shot of brushed compression knit fabric" },
    body: [
      "Most technical knits are built for output, for a run or a lift. Reformer work asks for something different: quiet, controlled range through the hip and shoulder, held at a hundred small angles instead of one big one.",
      "The four-way stretch compression knit we landed on holds its shape through a full class without needing a second layer underneath. We chose a matte finish over the shinier compression fabrics on the market, on purpose, because the studio's brass lighting reflects hard, and we did not want the clothes competing with the room.",
    ],
    pullQuote: "We did not want the clothes competing with the room.",
  },
];

export function getAllArticles(): Article[] {
  return ARTICLES;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

export function getFeaturedArticles(limit = 3): Article[] {
  return ARTICLES.slice(0, limit);
}
