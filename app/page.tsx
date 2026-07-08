import { ScrollScrubHero } from "@/components/ScrollScrubHero";
import { BrandStrip } from "@/components/BrandStrip";
import { FeaturedCollectionGrid } from "@/components/FeaturedCollectionGrid";
import { PhilosophyBlock } from "@/components/PhilosophyBlock";
import { StudioLocatorTeaser } from "@/components/StudioLocatorTeaser";
import { EditorialTeaser } from "@/components/EditorialTeaser";
import { HOME_HERO_CHAPTERS } from "@/lib/hero-chapters";

export default function HomePage() {
  return (
    <>
      <ScrollScrubHero mode="chapters" chapters={HOME_HERO_CHAPTERS} />
      <BrandStrip />
      <FeaturedCollectionGrid />
      <PhilosophyBlock />
      <StudioLocatorTeaser />
      <EditorialTeaser />
    </>
  );
}
