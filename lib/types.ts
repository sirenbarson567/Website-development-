export type ProductCategory = "sets" | "jackets" | "lifestyle";

export type BrandColor = "oak" | "moss" | "cream" | "navy" | "brass";

export const BRAND_COLOR_HEX: Record<BrandColor, string> = {
  oak: "#8B6F47",
  moss: "#4A5D3A",
  cream: "#F0E9DD",
  navy: "#1B2A41",
  brass: "#B08D57",
};

export const BRAND_COLOR_LABEL: Record<BrandColor, string> = {
  oak: "Brown",
  moss: "Sage",
  cream: "Cream",
  navy: "Navy",
  brass: "Brass",
};

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: ProductCategory;
  colors: BrandColor[];
  /** [front, second angle, detail] */
  images: ProductImage[];
  /** one line spec shown on the product card, e.g. "High-rise, flared leg" */
  spec: string;
  fit: string;
  fabric: string;
  /** ties a product to a hero chapter / color family for "complete the look" */
  chapter: "brown" | "sage" | "cream";
  isNew?: boolean;
  createdAt: string;
}

export interface StudioHours {
  day: string;
  time: string;
}

export interface Studio {
  id: string;
  slug: string;
  name: string;
  address: string;
  hours: StudioHours[];
  mapEmbedUrl: string;
  image: ProductImage;
  retailImage: ProductImage;
  description: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: ProductImage;
  body: string[];
  pullQuote?: string;
}
