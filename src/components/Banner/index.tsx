import React, { useEffect, useRef, useMemo, useState, useCallback } from "react";
import { usePreviewStore } from "src/store/previewStore";
import { overlayMap } from "@/utils/overlayMap";
import toast from "react-hot-toast";
import { setClickedInsideInspector } from "src/utils/inspectorClickGuard";
import { normalizeValue } from "src/utils/normalizeValue";
import FloatingStyleInspector from "@components/FloatingStyleInspector";
import useEmblaCarousel from "embla-carousel-react";




const Banner = () => {

  // Zustand state for Footer
  const homeBannerOverlayState = usePreviewStore((s) => s.overlayMap);

  const updateHomeBannerComponentProps = usePreviewStore((s) => s.updateComponentProps);

  const homeBannerEditingTarget = usePreviewStore((s) => s.editingTarget);
  const setHomeBannerEditingTarget = usePreviewStore((s) => s.setEditingTarget);

  // This component’s overlay node
  const homeBannerOverlay = homeBannerOverlayState?.["/"]?.banner;



  console.log("homeBannerOverlayState: ", homeBannerOverlayState);
  console.log('updateHomeBannerComponentProps: ', updateHomeBannerComponentProps);
  console.log("homeBannerEditingTarget: ", homeBannerEditingTarget);
  console.log("setHomeBannerEditingTarget: ", setHomeBannerEditingTarget);
  console.log("homebannerOverlay: ", homeBannerOverlay);







  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const slides = [1, 2, 3];

  // keep your layout styles
  const styles = {
    viewport: { overflow: "hidden" },
    container: { display: "flex" },
    slide: { flex: "0 0 100%" },
    dots: { display: "flex", justifyContent: "center", gap: 8, marginTop: 100 },
    dot: {
      width: 12,
      height: 12,
      borderRadius: "50%",
      backgroundColor: "var(--banner-dots-dot-background-color-home-1)",
      border: "none",
      cursor: "pointer",
    },
    dotActive: { backgroundColor: "var(--banner-dots-dot-background-color-home-2)" },
  };

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    const interval = setInterval(() => emblaApi && emblaApi.scrollNext(), 3000);
    return () => clearInterval(interval);
  }, [emblaApi, onSelect]);

  return (
    <section
      className="banner set-bg"
      style={{ backgroundImage: "url('src/origin/base/web/img/banner/banner-1.jpg')" }}
    >
      {/* Design tokens */}
      <style>{`
        :root{
          /* Banner slider alignment */
          --banner-slider-text-align-home-1: center;

          /* Banner text: span */
          --banner-text-span-font-family-home-1: Montserrat, sans-serif;
          --banner-text-span-font-size-home-1: 18px;
          --banner-text-span-color-home-1: #ca1515;
          --banner-text-span-font-weight-home-1: 600;

          /* Banner text: h1 */
          --banner-text-h1-font-family-home-1: "Cookie", cursive;
          --banner-text-h1-font-size-home-1: 80px;
          --banner-text-h1-color-home-1: #111111;
          --banner-text-h1-font-weight-home-1: 400;

          /* Banner text: link */
          --banner-text-link-color-home-1: #111111;
          --banner-text-link-font-weight-home-1: 700;

          /* Dots colors */
          --banner-dots-dot-background-color-home-1: #cfcfcf; /* default */
          --banner-dots-dot-background-color-home-2: #c40000; /* active */
        }
      `}</style>

      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-lg-8 m-auto">
            {/* Slider */}
            <div
              className="banner__slider"
              ref={emblaRef}
              style={{
                ...styles.viewport,
                ["textAlign" as any]: "var(--banner-slider-text-align-home-1)"
              }}
            >
              <div style={styles.container}>
                {slides.map((i) => (
                  <div key={i} className="banner__item" style={styles.slide}>
                    <div className="banner__text">
                      <span
                        style={{
                          fontFamily: "var(--banner-text-span-font-family-home-1)",
                          fontSize: "var(--banner-text-span-font-size-home-1)",
                          color: "var(--banner-text-span-color-home-1)",
                          fontWeight: "var(--banner-text-span-font-weight-home-1)",
                        }}
                      >
                        The Chloe Collection
                      </span>

                      <h1
                        style={{
                          fontFamily: "var(--banner-text-h1-font-family-home-1)",
                          fontSize: "var(--banner-text-h1-font-size-home-1)",
                          color: "var(--banner-text-h1-color-home-1)",
                          fontWeight: "var(--banner-text-h1-font-weight-home-1)",
                        }}
                      >
                        The Project Jacket
                      </h1>

                      <a
                        href="#"
                        style={{
                          color: "var(--banner-text-link-color-home-1)",
                          fontWeight: "var(--banner-text-link-font-weight-home-1)",
                        }}
                      >
                        Shop now
                      </a>
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
