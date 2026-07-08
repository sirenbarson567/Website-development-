import { BRAND_COLOR_HEX, BRAND_COLOR_LABEL, type BrandColor } from "@/lib/types";

interface ColorSwatchProps {
  color: BrandColor;
  selected?: boolean;
  size?: "sm" | "md";
  onClick?: () => void;
}

const SIZE_CLASSES: Record<NonNullable<ColorSwatchProps["size"]>, string> = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
};

export function ColorSwatch({ color, selected = false, size = "sm", onClick }: ColorSwatchProps) {
  const dot = (
    <span
      aria-hidden="true"
      className={`inline-block rounded-full border ${
        color === "cream" ? "border-navy/30" : "border-transparent"
      } ${SIZE_CLASSES[size]}`}
      style={{ backgroundColor: BRAND_COLOR_HEX[color] }}
    />
  );

  if (!onClick) {
    return (
      <span className="inline-flex items-center gap-1.5" title={BRAND_COLOR_LABEL[color]}>
        {dot}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      title={BRAND_COLOR_LABEL[color]}
      className={`inline-flex items-center justify-center rounded-full p-0.5 ring-offset-2 transition-shadow ${
        selected ? "ring-2 ring-navy" : "ring-1 ring-navy/15 hover:ring-navy/40"
      }`}
    >
      {dot}
      <span className="sr-only">{BRAND_COLOR_LABEL[color]}</span>
    </button>
  );
}
