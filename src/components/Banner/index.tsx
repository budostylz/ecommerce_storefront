import React, { useEffect, useRef, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { usePreviewStore } from "src/store/previewStore";
import { setClickedInsideInspector } from "src/utils/inspectorClickGuard";

type Align = "left" | "center" | "right";
const toAlign = (v: unknown): Align =>
  v === "left" || v === "center" || v === "right" ? v : "center";

type BannerSlide = { title: string; subtitle: string; linkText: string };

export type BannerProps = {
  slides?: BannerSlide[];
  backgroundImage?: string;
  loop?: boolean;
  align?: Align;
  autoplayMs?: number;
  isDesignMode?: boolean;
};

const Banner: React.FC<BannerProps> = (props) => {
  // overlay node
  const overlay = usePreviewStore((s) => s.overlayMap)?.["/"]?.banner;

  // store fns/state for editing
  const updateBannerComponentProps = usePreviewStore((s) => s.updateComponentProps);
  const bannerEditingTarget = usePreviewStore((s) => s.editingTarget);
  const setBannerEditingTarget = usePreviewStore((s) => s.setEditingTarget);

  // refs
  const bannerSectionRef = useRef<HTMLElement | null>(null);
  const bannerSlideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const bannerLinkRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const subtitleRefs = useRef<Array<HTMLTextAreaElement | null>>([]);
  const subtitleClickPosRefs = useRef<number[]>([]);

  const titleRefs = useRef<Array<HTMLTextAreaElement | null>>([]);
  const titleClickPosRefs = useRef<number[]>([]);

  const linkTextRefs = useRef<Array<HTMLTextAreaElement | null>>([]);
  const linkTextClickPosRefs = useRef<number[]>([]);

  // refs


  // merge props (incoming > overlay > defaults)
  const {
    slides,
    backgroundImage,
    loop,
    align,
    autoplayMs,
    isDesignMode,
  } = {
    slides:
      props.slides ??
      overlay?.props?.slides ?? [
        { title: "The Project Jacket", subtitle: "The Chloe Collection", linkText: "Shop Now" },
        { title: "The Project Jacket", subtitle: "The Chloe Collection", linkText: "Shop Now" },
        { title: "The Project Jacket", subtitle: "The Chloe Collection", linkText: "Shop Now" },
      ],
    backgroundImage:
      props.backgroundImage ??
      overlay?.props?.backgroundImage ??
      "src/origin/base/web/img/banner/banner-1.jpg",
    loop: props.loop ?? overlay?.props?.loop ?? true,
    align: toAlign(props.align ?? overlay?.props?.align ?? "center"),
    autoplayMs: props.autoplayMs ?? overlay?.props?.autoplayMs ?? 3000,
    isDesignMode: props.isDesignMode ?? false,
  } as const;



  /* Slider Logic */


  // Embla align mapping
  const emblaAlign: "start" | "center" | "end" =
    align === "left" ? "start" : align === "right" ? "end" : "center";

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop, align: emblaAlign });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // layout styles (non-token)
  const styles = {
    viewport: { overflow: "hidden" as const },
    container: { display: "flex" as const },
    slide: { flex: "0 0 100%" as const },
    dots: { display: "flex", justifyContent: "center", gap: 8, marginTop: 100 } as const,
    dot: {
      width: 12,
      height: 12,
      borderRadius: "50%",
      backgroundColor: "var(--banner-dots-dot-background-color-home-1)",
      border: "none",
      cursor: "pointer",
    } as const,
    dotActive: { backgroundColor: "var(--banner-dots-dot-background-color-home-2)" } as const,
  };

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // selection + (auto)play; autoslide disabled in design mode
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();

    if (isDesignMode) return; // disable auto slide during design

    const id = window.setInterval(() => emblaApi?.scrollNext(), autoplayMs);
    return () => window.clearInterval(id);
  }, [emblaApi, onSelect, autoplayMs, isDesignMode]);

  return (
    <section
      ref={bannerSectionRef as any}
      className="banner set-bg"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      {/* Design tokens */}
      <style>{`
        :root{
          --banner-slider-text-align-home-1: ${align};

          --banner-text-span-font-family-home-1: Montserrat, sans-serif;
          --banner-text-span-font-size-home-1: 18px;
          --banner-text-span-color-home-1: #ca1515;
          --banner-text-span-font-weight-home-1: 600;

          --banner-text-h1-font-family-home-1: "Cookie", cursive;
          --banner-text-h1-font-size-home-1: 80px;
          --banner-text-h1-color-home-1: #111111;
          --banner-text-h1-font-weight-home-1: 400;

          --banner-text-link-color-home-1: #111111;
          --banner-text-link-font-weight-home-1: 700;

          --banner-dots-dot-background-color-home-1: #cfcfcf;
          --banner-dots-dot-background-color-home-2: #c40000;
        }
      `}</style>

      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-lg-8 m-auto">
            {/* Slider */}
            <div
              className="banner__slider"
              ref={emblaRef}
              style={{ ...styles.viewport, ["textAlign" as any]: "var(--banner-slider-text-align-home-1)" }}
            >
              <div style={styles.container}>
                {slides.map((slide, idx) => (
                  <div
                    key={idx}
                    className="banner__item"
                    style={styles.slide}
                    ref={(el) => {
                      if (el) bannerSlideRefs.current[idx] = el;
                    }}
                  >
                    <div className="banner__text">
                      {/* Subtitle: editable textarea in design mode */}
                      {isDesignMode &&
                        bannerEditingTarget?.componentKey === "banner" &&
                        bannerEditingTarget.field === "subtitle" &&
                        bannerEditingTarget.index === idx ? (
                        <textarea
                          ref={(el) => {
                            subtitleRefs.current[idx] = el;
                            const pos = subtitleClickPosRefs.current[idx];
                            if (el && typeof pos === "number") {
                              el.selectionStart = el.selectionEnd = pos;
                              subtitleClickPosRefs.current[idx] = undefined as any;
                            }
                          }}
                          value={slide.subtitle}
                          onChange={(e) => {
                            const nextSlides: BannerSlide[] = slides.map((s, i) =>
                              i === idx
                                ? { title: s.title, subtitle: e.target.value, linkText: s.linkText }
                                : s
                            );
                            updateBannerComponentProps("/", "banner", { slides: nextSlides });
                          }}
                          onClick={(e) => {
                            setClickedInsideInspector();
                            e.stopPropagation();
                          }}
                          style={{
                            width: "100%",
                            fontFamily: "var(--banner-text-span-font-family-home-1)",
                            fontSize: "var(--banner-text-span-font-size-home-1)",
                            fontWeight: "var(--banner-text-span-font-weight-home-1)",
                            color: "var(--banner-text-span-color-home-1)",
                            background: "transparent",
                            border: "none",
                            outline: "none",
                            resize: "none",
                            whiteSpace: "pre-wrap",
                            ["textAlign" as any]: "var(--banner-slider-text-align-home-1)",
                          }}
                        />
                      ) : (
                        <span
                          style={{
                            fontFamily: "var(--banner-text-span-font-family-home-1)",
                            fontSize: "var(--banner-text-span-font-size-home-1)",
                            color: "var(--banner-text-span-color-home-1)",
                            fontWeight: "var(--banner-text-span-font-weight-home-1)",
                          }}
                          onMouseDown={(e) => {
                            if (!isDesignMode) return;
                            const anyDoc = document as any;
                            const r =
                              anyDoc.caretRangeFromPoint?.(e.clientX, e.clientY) ||
                              (() => {
                                const p = anyDoc.caretPositionFromPoint?.(e.clientX, e.clientY);
                                return p ? { startOffset: p.offset } : null;
                              })();
                            if (r && typeof r.startOffset === "number") {
                              subtitleClickPosRefs.current[idx] = r.startOffset;
                            }
                          }}
                          onClick={(e) => {
                            if (!isDesignMode) return;
                            e.preventDefault();
                            e.stopPropagation();
                            setClickedInsideInspector();
                            setBannerEditingTarget({
                              route: "/",
                              componentKey: "banner",
                              field: "subtitle",
                              index: idx,
                            });
                          }}
                        >
                          {slide.subtitle}
                        </span>
                      )}

                      {isDesignMode &&
                        bannerEditingTarget?.componentKey === "banner" &&
                        bannerEditingTarget.field === "title" &&
                        bannerEditingTarget.index === idx ? (
                        <textarea
                          ref={(el) => {
                            titleRefs.current[idx] = el;
                            const pos = titleClickPosRefs.current[idx];
                            if (el && typeof pos === "number") {
                              el.selectionStart = el.selectionEnd = pos;
                              titleClickPosRefs.current[idx] = undefined as any;
                            }
                          }}
                          value={slide.title}
                          onChange={(e) => {
                            const nextSlides: BannerSlide[] = slides.map((s, i) =>
                              i === idx ? { title: e.target.value, subtitle: s.subtitle, linkText: s.linkText } : s
                            );
                            updateBannerComponentProps("/", "banner", { slides: nextSlides });
                          }}
                          onClick={(e) => {
                            setClickedInsideInspector();
                            e.stopPropagation();
                          }}
                          style={{
                            width: "100%",
                            fontFamily: "var(--banner-text-h1-font-family-home-1)",
                            fontSize: "var(--banner-text-h1-font-size-home-1)",
                            fontWeight: "var(--banner-text-h1-font-weight-home-1)",
                            color: "var(--banner-text-h1-color-home-1)",
                            background: "transparent",
                            border: "none",
                            outline: "none",
                            resize: "none",
                            whiteSpace: "pre-wrap",
                            ["textAlign" as any]: "var(--banner-slider-text-align-home-1)",
                          }}
                        />
                      ) : (
                        <h1
                          style={{
                            fontFamily: "var(--banner-text-h1-font-family-home-1)",
                            fontSize: "var(--banner-text-h1-font-size-home-1)",
                            color: "var(--banner-text-h1-color-home-1)",
                            fontWeight: "var(--banner-text-h1-font-weight-home-1)",
                          }}
                          onMouseDown={(e) => {
                            if (!isDesignMode) return;
                            const anyDoc = document as any;
                            const r =
                              anyDoc.caretRangeFromPoint?.(e.clientX, e.clientY) ||
                              (() => {
                                const p = anyDoc.caretPositionFromPoint?.(e.clientX, e.clientY);
                                return p ? { startOffset: p.offset } : null;
                              })();
                            if (r && typeof r.startOffset === "number") {
                              titleClickPosRefs.current[idx] = r.startOffset;
                            }
                          }}
                          onClick={(e) => {
                            if (!isDesignMode) return;
                            e.preventDefault();
                            e.stopPropagation();
                            setClickedInsideInspector();
                            setBannerEditingTarget({
                              route: "/",
                              componentKey: "banner",
                              field: "title",
                              index: idx,
                            });
                          }}
                        >
                          {slide.title}
                        </h1>
                      )}


                      {isDesignMode &&
                        bannerEditingTarget?.componentKey === "banner" &&
                        bannerEditingTarget.field === "linkText" &&
                        bannerEditingTarget.index === idx ? (
                        <textarea
                          ref={(el) => {
                            linkTextRefs.current[idx] = el;
                            const pos = linkTextClickPosRefs.current[idx];
                            if (el && typeof pos === "number") {
                              el.selectionStart = el.selectionEnd = pos;
                              linkTextClickPosRefs.current[idx] = undefined as any;
                            }
                          }}
                          value={slide.linkText}
                          onChange={(e) => {
                            const nextSlides = slides.map((s, i) =>
                              i === idx ? { ...s, linkText: e.target.value } : s
                            );
                            updateBannerComponentProps("/", "banner", { slides: nextSlides });
                          }}
                          onClick={(e) => {
                            setClickedInsideInspector();
                            e.stopPropagation();
                          }}
                          style={{
                            width: "max-content",
                            fontFamily: "var(--banner-text-link-font-family-home-1, inherit)",
                            fontSize: "var(--banner-text-link-font-size-home-1, inherit)",
                            fontWeight: "var(--banner-text-link-font-weight-home-1)",
                            color: "var(--banner-text-link-color-home-1)",
                            background: "transparent",
                            border: "none",
                            outline: "none",
                            resize: "none",
                            whiteSpace: "pre-wrap",
                          }}
                        />
                      ) : (
                        <a
                          href="#"
                          ref={(el) => { bannerLinkRefs.current[idx] = el; }}
                          style={{
                            color: "var(--banner-text-link-color-home-1)",
                            fontWeight: "var(--banner-text-link-font-weight-home-1)",
                          }}
                          onMouseDown={(e) => {
                            if (!isDesignMode) return;
                            const anyDoc = document as any;
                            const r =
                              anyDoc.caretRangeFromPoint?.(e.clientX, e.clientY) ||
                              (() => {
                                const p = anyDoc.caretPositionFromPoint?.(e.clientX, e.clientY);
                                return p ? { startOffset: p.offset } : null;
                              })();
                            if (r && typeof r.startOffset === "number") {
                              linkTextClickPosRefs.current[idx] = r.startOffset;
                            }
                          }}
                          onClick={(e) => {
                            if (!isDesignMode) return;           // live site: allow navigation
                            e.preventDefault();                  // design mode: block redirect
                            e.stopPropagation();                 // don’t bubble to carousel/others
                            setClickedInsideInspector();
                            setBannerEditingTarget({
                              route: "/",
                              componentKey: "banner",
                              field: "linkText",
                              index: idx,
                            });
                          }}
                        >
                          {slide.linkText}
                        </a>
                      )}

                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div style={styles.dots}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  style={{
                    ...styles.dot,
                    ...(index === selectedIndex ? styles.dotActive : null),
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
