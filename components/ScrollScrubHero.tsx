"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./ScrollScrubHero.module.css";

export interface HeroChapter {
  id: string;
  name: string;
  price: string;
  image: string;
  /** lighter asset swapped in on mobile; falls back to `image` */
  mobileImage?: string;
}

interface ChaptersModeProps {
  mode: "chapters";
  chapters: HeroChapter[];
  frames?: never;
}

interface SequenceModeProps {
  mode: "sequence";
  frames: string[];
  chapters?: never;
}

type ScrollScrubHeroProps = (ChaptersModeProps | SequenceModeProps) & {
  /** scroll distance the section pins for, in vh units */
  scrollDistanceVh?: number;
  className?: string;
};

const NAVY = "#1B2A41";
const MAX_DPR = 2;
const DESKTOP_BLEND_WINDOW = 0.08;
const MOBILE_BLEND_WINDOW = 0.04;
const DESKTOP_MAX_SCALE = 1.08;
const MOBILE_MAX_SCALE = 1.03;
const MOBILE_BREAKPOINT_PX = 768;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX}px)`);
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

/** Preloads a set of image URLs as plain Image() objects, reporting progress. */
function useImagePreloader(urls: string[]) {
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);
  const imagesRef = useRef<Map<string, HTMLImageElement>>(new Map());

  useEffect(() => {
    if (urls.length === 0) {
      setReady(true);
      return;
    }

    let cancelled = false;
    let loadedCount = 0;
    setLoaded(0);
    setReady(false);
    imagesRef.current = new Map();

    urls.forEach((url) => {
      const img = new window.Image();
      const onSettle = () => {
        if (cancelled) return;
        loadedCount += 1;
        imagesRef.current.set(url, img);
        setLoaded(loadedCount);
        if (loadedCount === urls.length) setReady(true);
      };
      img.onload = onSettle;
      img.onerror = onSettle;
      img.src = url;
    });

    return () => {
      cancelled = true;
    };
  }, [urls]);

  return {
    progress: urls.length === 0 ? 1 : loaded / urls.length,
    ready,
    getImage: useCallback((url: string) => imagesRef.current.get(url), []),
  };
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  image: HTMLImageElement,
  alpha: number,
  scale: number
) {
  if (!image.naturalWidth || !image.naturalHeight || alpha <= 0) return;

  const canvasRatio = canvasWidth / canvasHeight;
  const imageRatio = image.naturalWidth / image.naturalHeight;

  let drawWidth: number;
  let drawHeight: number;

  if (imageRatio > canvasRatio) {
    drawHeight = canvasHeight * scale;
    drawWidth = drawHeight * imageRatio;
  } else {
    drawWidth = canvasWidth * scale;
    drawHeight = drawWidth / imageRatio;
  }

  const x = (canvasWidth - drawWidth) / 2;
  const y = (canvasHeight - drawHeight) / 2;

  ctx.globalAlpha = alpha;
  ctx.drawImage(image, x, y, drawWidth, drawHeight);
  ctx.globalAlpha = 1;
}

export function ScrollScrubHero(props: ScrollScrubHeroProps) {
  const { scrollDistanceVh = 300, className } = props;
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  const effectiveChapters = useMemo(() => {
    if (props.mode !== "chapters") return [];
    return props.chapters;
  }, [props]);

  const effectiveFrames = useMemo(() => {
    if (props.mode !== "sequence") return [];
    return isMobile ? props.frames.filter((_, i) => i % 3 === 0) : props.frames;
  }, [props, isMobile]);

  const imageUrls = useMemo(() => {
    if (props.mode === "chapters") {
      return effectiveChapters.map((chapter) =>
        isMobile && chapter.mobileImage ? chapter.mobileImage : chapter.image
      );
    }
    return effectiveFrames;
  }, [props.mode, effectiveChapters, effectiveFrames, isMobile]);

  const { progress: loadProgress, ready, getImage } = useImagePreloader(
    reducedMotion ? [] : imageUrls
  );

  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const dotFillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lastFrameIndexRef = useRef(-1);
  const lastChapterIndexRef = useRef(-1);

  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const blendWindow = isMobile ? MOBILE_BLEND_WINDOW : DESKTOP_BLEND_WINDOW;
  const maxScale = isMobile ? MOBILE_MAX_SCALE : DESKTOP_MAX_SCALE;

  const draw = useCallback(
    (progress: number, forceRedraw: boolean) => {
      const canvas = canvasRef.current;
      if (!canvas || !ready) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      if (props.mode === "sequence") {
        const frameIndex = Math.floor(progress * (effectiveFrames.length - 1));
        if (!forceRedraw && frameIndex === lastFrameIndexRef.current) return;
        lastFrameIndexRef.current = frameIndex;

        ctx.fillStyle = NAVY;
        ctx.fillRect(0, 0, width, height);

        const url = effectiveFrames[frameIndex];
        const image = url ? getImage(url) : undefined;
        if (image) drawCover(ctx, width, height, image, 1, 1);
        return;
      }

      const chapterCount = effectiveChapters.length;
      if (chapterCount === 0) return;

      const scaledProgress = progress * chapterCount;
      const chapterIndex = clamp(Math.floor(scaledProgress), 0, chapterCount - 1);
      const localProgress = clamp(scaledProgress - chapterIndex, 0, 1);

      const blendStart = 1 - blendWindow;
      const isBlending = localProgress > blendStart && chapterIndex < chapterCount - 1;
      const blendFactor = isBlending
        ? clamp((localProgress - blendStart) / blendWindow, 0, 1)
        : 0;

      if (chapterIndex !== lastChapterIndexRef.current) {
        lastChapterIndexRef.current = chapterIndex;
        setActiveChapterIndex(chapterIndex);
      }
      if (labelRef.current) {
        labelRef.current.classList.toggle(styles.labelVisible, !isBlending);
      }
      dotFillRefs.current.forEach((dot, i) => {
        if (!dot) return;
        const fill = i < chapterIndex ? 1 : i > chapterIndex ? 0 : localProgress;
        dot.style.height = `${fill * 100}%`;
      });

      ctx.fillStyle = NAVY;
      ctx.fillRect(0, 0, width, height);

      const currentChapter = effectiveChapters[chapterIndex];
      const currentUrl =
        isMobile && currentChapter.mobileImage ? currentChapter.mobileImage : currentChapter.image;
      const currentImage = getImage(currentUrl);
      const currentScale = 1 + (maxScale - 1) * localProgress;
      if (currentImage) drawCover(ctx, width, height, currentImage, 1, currentScale);

      if (isBlending) {
        const nextChapter = effectiveChapters[chapterIndex + 1];
        const nextUrl =
          isMobile && nextChapter.mobileImage ? nextChapter.mobileImage : nextChapter.image;
        const nextImage = getImage(nextUrl);
        const nextScale = 1 + (maxScale - 1) * blendFactor * blendWindow;
        if (nextImage) drawCover(ctx, width, height, nextImage, blendFactor, nextScale);
      }
    },
    [props.mode, effectiveFrames, effectiveChapters, ready, getImage, isMobile, blendWindow, maxScale]
  );

  const progressRef = useRef(0);

  useEffect(() => {
    if (reducedMotion) return;

    let rafId = 0;
    let ticking = false;

    function computeProgress() {
      ticking = false;
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;
      progressRef.current = progress;
      draw(progress, false);
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(computeProgress);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    computeProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [draw, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    const sticky = canvas?.parentElement;
    if (!canvas || !sticky) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const rect = sticky.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      lastFrameIndexRef.current = -1;
      draw(progressRef.current, true);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(sticky);
    return () => observer.disconnect();
  }, [draw, reducedMotion, ready]);

  if (reducedMotion) {
    return <ReducedMotionHero {...props} />;
  }

  const activeChapter = effectiveChapters[activeChapterIndex];

  return (
    <section
      ref={wrapperRef}
      className={`${styles.wrapper} ${className ?? ""}`}
      style={{ height: `calc(100vh + ${scrollDistanceVh}vh)` }}
      aria-label={
        props.mode === "chapters" ? "Outfit showcase, scroll to change looks" : "Product showcase"
      }
    >
      <div className={styles.sticky}>
        <canvas ref={canvasRef} className={styles.canvas} />

        {!ready && (
          <div className={styles.loadingBar}>
            <div
              className={styles.loadingBarFill}
              style={{ width: `${Math.round(loadProgress * 100)}%` }}
            />
          </div>
        )}

        {props.mode === "chapters" && activeChapter && (
          <div ref={labelRef} className={styles.label}>
            <p className={`${styles.labelName} font-serif`}>{activeChapter.name}</p>
            <p className={styles.labelPrice}>{activeChapter.price}</p>
          </div>
        )}

        {props.mode === "chapters" && effectiveChapters.length > 1 && (
          <div className={styles.dots} aria-hidden="true">
            {effectiveChapters.map((chapter, i) => (
              <span key={chapter.id} className={styles.dot}>
                <span
                  ref={(el) => {
                    dotFillRefs.current[i] = el;
                  }}
                  className={styles.dotFill}
                />
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ReducedMotionHero(props: ScrollScrubHeroProps) {
  const chapters =
    props.mode === "chapters"
      ? props.chapters
      : props.frames.length > 0
        ? [{ id: "sequence", name: "", price: "", image: props.frames[Math.floor(props.frames.length / 2)] }]
        : [];

  return (
    <section className={styles.reducedMotionSection}>
      {chapters.map((chapter) => (
        <div key={chapter.id} className={styles.reducedMotionChapter}>
          <Image
            src={chapter.image}
            alt={chapter.name || "Studio 14"}
            fill
            sizes="100vw"
            className={styles.reducedMotionImage}
          />
          <div className={styles.reducedMotionOverlay} />
          {chapter.name && (
            <div className={`${styles.reducedMotionLabel} ${styles.reducedMotionLabelVisible}`}>
              <p className="font-serif text-xl">{chapter.name}</p>
              <p className="mt-1 text-sm text-cream/75">{chapter.price}</p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
