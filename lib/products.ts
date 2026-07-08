import type { Product } from "./types";

/**
 * Static product data standing in for a future CMS/Shopify-style backend.
 * Every page reads through the accessor functions below, never this array
 * directly, so swapping the source later is a data-layer change only.
 */
const PRODUCTS: Product[] = [
  {
    id: "p-01",
    slug: "reformer-set-brown",
    name: "Reformer Set — Brown",
    price: 620,
    category: "sets",
    colors: ["oak"],
    images: [
      { src: "/images/products/reformer-set-brown-front.svg", alt: "Reformer Set in Brown, front view" },
      { src: "/images/products/reformer-set-brown-angle.svg", alt: "Reformer Set in Brown, side angle" },
      { src: "/images/products/reformer-set-brown-detail.svg", alt: "Reformer Set in Brown, fabric detail" },
    ],
    spec: "High-rise, second-skin compression",
    fit: "High rise, bonded seams, made to move through a full reformer range",
    fabric: "Brushed compression knit, four-way stretch, matte finish",
    chapter: "brown",
    isNew: true,
    createdAt: "2026-06-20",
  },
  {
    id: "p-02",
    slug: "reformer-set-sage",
    name: "Reformer Set — Sage",
    price: 620,
    category: "sets",
    colors: ["moss"],
    images: [
      { src: "/images/products/reformer-set-sage-front.svg", alt: "Reformer Set in Sage, front view" },
      { src: "/images/products/reformer-set-sage-angle.svg", alt: "Reformer Set in Sage, side angle" },
      { src: "/images/products/reformer-set-sage-detail.svg", alt: "Reformer Set in Sage, fabric detail" },
    ],
    spec: "Flared leg, buttery-soft compression",
    fit: "Mid rise, flared leg opening, bonded seams",
    fabric: "Brushed compression knit, four-way stretch, matte finish",
    chapter: "sage",
    createdAt: "2026-05-14",
  },
  {
    id: "p-03",
    slug: "reformer-set-cream",
    name: "Reformer Set — Cream",
    price: 620,
    category: "sets",
    colors: ["cream"],
    images: [
      { src: "/images/products/reformer-set-cream-front.svg", alt: "Reformer Set in Cream, front view" },
      { src: "/images/products/reformer-set-cream-angle.svg", alt: "Reformer Set in Cream, side angle" },
      { src: "/images/products/reformer-set-cream-detail.svg", alt: "Reformer Set in Cream, fabric detail" },
    ],
    spec: "High-rise, second-skin compression",
    fit: "High rise, bonded seams, made to move through a full reformer range",
    fabric: "Brushed compression knit, four-way stretch, matte finish",
    chapter: "cream",
    createdAt: "2026-04-02",
  },
  {
    id: "p-04",
    slug: "reformer-bra-navy",
    name: "Reformer Bra Top — Navy",
    price: 280,
    category: "sets",
    colors: ["navy"],
    images: [
      { src: "/images/products/reformer-bra-navy-front.svg", alt: "Reformer Bra Top in Navy, front view" },
      { src: "/images/products/reformer-bra-navy-angle.svg", alt: "Reformer Bra Top in Navy, side angle" },
      { src: "/images/products/reformer-bra-navy-detail.svg", alt: "Reformer Bra Top in Navy, fabric detail" },
    ],
    spec: "Medium support, cross-back straps",
    fit: "Medium support, wide underband, cross-back straps",
    fabric: "Brushed compression knit, four-way stretch, matte finish",
    chapter: "brown",
    createdAt: "2026-03-11",
  },
  {
    id: "p-05",
    slug: "studio-zip-jacket-cream",
    name: "Studio Zip Jacket — Cream",
    price: 540,
    category: "jackets",
    colors: ["cream"],
    images: [
      { src: "/images/products/studio-zip-jacket-cream-front.svg", alt: "Studio Zip Jacket in Cream, front view" },
      { src: "/images/products/studio-zip-jacket-cream-angle.svg", alt: "Studio Zip Jacket in Cream, side angle" },
      { src: "/images/products/studio-zip-jacket-cream-detail.svg", alt: "Studio Zip Jacket in Cream, fabric detail" },
    ],
    spec: "Oversized, cropped, full zip",
    fit: "Oversized, cropped at the hip, dropped shoulder",
    fabric: "Brushed loopback fleece, brass hardware",
    chapter: "cream",
    isNew: true,
    createdAt: "2026-06-28",
  },
  {
    id: "p-06",
    slug: "studio-zip-jacket-brass",
    name: "Studio Zip Jacket — Brass",
    price: 540,
    category: "jackets",
    colors: ["brass"],
    images: [
      { src: "/images/products/studio-zip-jacket-brass-front.svg", alt: "Studio Zip Jacket in Brass, front view" },
      { src: "/images/products/studio-zip-jacket-brass-angle.svg", alt: "Studio Zip Jacket in Brass, side angle" },
      { src: "/images/products/studio-zip-jacket-brass-detail.svg", alt: "Studio Zip Jacket in Brass, fabric detail" },
    ],
    spec: "Oversized, cropped, full zip",
    fit: "Oversized, cropped at the hip, dropped shoulder",
    fabric: "Brushed loopback fleece, brass hardware",
    chapter: "brown",
    createdAt: "2026-02-18",
  },
  {
    id: "p-07",
    slug: "studio-zip-jacket-navy",
    name: "Studio Zip Jacket — Navy",
    price: 540,
    category: "jackets",
    colors: ["navy"],
    images: [
      { src: "/images/products/studio-zip-jacket-navy-front.svg", alt: "Studio Zip Jacket in Navy, front view" },
      { src: "/images/products/studio-zip-jacket-navy-angle.svg", alt: "Studio Zip Jacket in Navy, side angle" },
      { src: "/images/products/studio-zip-jacket-navy-detail.svg", alt: "Studio Zip Jacket in Navy, fabric detail" },
    ],
    spec: "Oversized, cropped, full zip",
    fit: "Oversized, cropped at the hip, dropped shoulder",
    fabric: "Brushed loopback fleece, brass hardware",
    chapter: "sage",
    createdAt: "2026-01-22",
  },
  {
    id: "p-08",
    slug: "wide-leg-denim-oak",
    name: "Wide Leg Denim — Oak Wash",
    price: 460,
    category: "lifestyle",
    colors: ["oak"],
    images: [
      { src: "/images/products/wide-leg-denim-oak-front.svg", alt: "Wide Leg Denim in Oak Wash, front view" },
      { src: "/images/products/wide-leg-denim-oak-angle.svg", alt: "Wide Leg Denim in Oak Wash, side angle" },
      { src: "/images/products/wide-leg-denim-oak-detail.svg", alt: "Wide Leg Denim in Oak Wash, fabric detail" },
    ],
    spec: "High-rise, wide leg, studio to street",
    fit: "High rise, relaxed through the hip, wide leg opening",
    fabric: "Rigid cotton denim, oak-tone rinse",
    chapter: "brown",
    createdAt: "2026-05-30",
  },
  {
    id: "p-09",
    slug: "court-sneaker-cream",
    name: "Court Sneaker — Cream",
    price: 390,
    category: "lifestyle",
    colors: ["cream"],
    images: [
      { src: "/images/products/court-sneaker-cream-front.svg", alt: "Court Sneaker in Cream, front view" },
      { src: "/images/products/court-sneaker-cream-angle.svg", alt: "Court Sneaker in Cream, side angle" },
      { src: "/images/products/court-sneaker-cream-detail.svg", alt: "Court Sneaker in Cream, sole detail" },
    ],
    spec: "Low profile, brass eyelets",
    fit: "True to size, low profile court silhouette",
    fabric: "Full grain leather, brass eyelets, gum sole",
    chapter: "cream",
    createdAt: "2026-04-19",
  },
];

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getFeaturedProducts(limit = 4): Product[] {
  const featured = PRODUCTS.filter((product) => product.isNew);
  const rest = PRODUCTS.filter((product) => !product.isNew);
  return [...featured, ...rest].slice(0, limit);
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return PRODUCTS.filter((product) => product.category === category);
}

export function getCompleteTheLook(product: Product, limit = 3): Product[] {
  return PRODUCTS.filter(
    (candidate) => candidate.chapter === product.chapter && candidate.slug !== product.slug
  ).slice(0, limit);
}
