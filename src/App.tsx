import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useApplyDesignTokens } from "src/hooks/useApplyDesignTokens";
import { usePreviewStore } from "src/store/previewStore";

import Home from "./pages/Home";
import Contact from "./pages/Contact";

function App() {
  // Apply CSS custom properties from Zustand on every change
  useApplyDesignTokens();

  const overlayMap = usePreviewStore((s) => s.overlayMap);
  const isDesignMode = usePreviewStore((s) => s.isDesignMode);

  // Expose overlayMap for design tooling / inspector
  useEffect(() => {
    (window as any).__overlayMap = overlayMap;
  }, [overlayMap]);

  // Optional: global click tracer only in design mode
  useEffect(() => {
    if (!isDesignMode) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const path = getPathFromBody(target, document.body);
      const text = (target.textContent ?? "").trim().slice(0, 100);

      // eslint-disable-next-line no-console
      console.log("🖱️ Global click:", {
        tag: target.tagName,
        text,
        path,
        id: target.id || "(no id)",
        class: target.className || "(no class)",
      });

      // Tiny visual cue (commented out for prod)
      // const bubble = document.createElement("div");
      // bubble.textContent = "🖱️";
      // Object.assign(bubble.style, {
      //   position: "fixed",
      //   bottom: "10px",
      //   left: "10px",
      //   backgroundColor: "black",
      //   color: "white",
      //   padding: "6px 10px",
      //   zIndex: "99999",
      //   borderRadius: "6px",
      //   fontSize: "0.85rem",
      //   fontFamily: "monospace",
      //   boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
      // } as CSSStyleDeclaration);
      // document.body.appendChild(bubble);
      // setTimeout(() => bubble.remove(), 800);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [isDesignMode]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#111",
            color: "#fff",
            fontSize: "14px",
            borderRadius: "8px",
            padding: "12px 16px",
          },
        }}
      />
    </>
  );
}

export default App;

// Build a CSS path to the clicked element (for debugging / selection)
function getPathFromBody(el: HTMLElement, body: HTMLElement): string {
  const segments: string[] = [];
  let current: HTMLElement | null = el;

  while (current && current !== body) {
    const parent = current.parentElement;
    if (!parent) break;
    const index = Array.from(parent.children).indexOf(current) + 1;
    segments.unshift(`${current.tagName.toLowerCase()}:nth-child(${index})`);
    current = parent;
  }

  return segments.length ? `body > ${segments.join(" > ")}` : "body";
}
