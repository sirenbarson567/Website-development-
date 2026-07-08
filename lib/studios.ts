import type { Studio } from "./types";

const STUDIOS: Studio[] = [
  {
    id: "s-01",
    slug: "city-walk",
    name: "Studio 14 — City Walk",
    address: "Studio 14, City Walk, Al Wasl, Dubai, UAE",
    hours: [
      { day: "Monday — Friday", time: "6:00am – 9:00pm" },
      { day: "Saturday", time: "7:00am – 8:00pm" },
      { day: "Sunday", time: "8:00am – 6:00pm" },
    ],
    mapEmbedUrl:
      "https://maps.google.com/maps?q=" +
      encodeURIComponent("City Walk, Al Wasl, Dubai, UAE") +
      "&output=embed",
    image: {
      src: "/images/studios/city-walk-studio.svg",
      alt: "Studio 14 reformer studio floor at City Walk, Dubai",
    },
    retailImage: {
      src: "/images/studios/city-walk-retail.svg",
      alt: "Studio 14 retail corner: oak fixtures, moss wall, brass lighting, arched mirror",
    },
    description:
      "Our flagship reformer studio and the home of the retail line. The boutique corner sits just off the studio floor, so you shop the same racks you train next to.",
  },
];

export function getAllStudios(): Studio[] {
  return STUDIOS;
}

export function getStudioBySlug(slug: string): Studio | undefined {
  return STUDIOS.find((studio) => studio.slug === slug);
}
