// src/hooks/useApplyDesignTokens.ts
import { useEffect, useMemo } from "react";
import { usePreviewStore } from "src/store/previewStore";

type TokenMap = Record<string, string>;

type Options = {
  /** Provide default values when the store only has token *keys*. */
  defaults?: TokenMap;
  /** Override the path (useful for tests/SSR). Defaults to window.location.pathname or "/". */
  path?: string;
};

/** Flattens string|string[]|string[][] into a unique list of token keys */
function flattenTokens(input: unknown): string[] {
  if (!input) return [];
  const arr = (Array.isArray(input) ? input : [input]) as unknown[];
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (Array.isArray(v)) v.forEach(walk);
    else if (typeof v === "string") out.push(v);
  };
  arr.forEach(walk);
  return Array.from(new Set(out));
}

export const useApplyDesignTokens = (opts?: Options) => {
  const overlayMap = usePreviewStore((s) => s.overlayMap);
  const designTokens = usePreviewStore((s) => s.designTokens); // string[] | Record<string,string>

  // Resolve current path safely (SSR friendly)
  const path = useMemo<string>(() => {
    if (opts?.path) return opts.path;
    if (typeof window !== "undefined" && window.location?.pathname) {
      return window.location.pathname as string;
    }
    return "/";
  }, [opts?.path]);

  // Collect active token keys from global + current route sections
  const activeTokenKeys = useMemo(() => {
    const keys: string[] = [];

    // global
    const global = overlayMap?.["global"];
    if (global && typeof global === "object") {
      Object.values(global as Record<string, any>).forEach((comp) => {
        keys.push(...flattenTokens(comp?.tokens));
      });
    }

    // route-specific
    const route = overlayMap?.[path as keyof typeof overlayMap];
    if (route && typeof route === "object") {
      Object.values(route as Record<string, any>).forEach((comp) => {
        keys.push(...flattenTokens(comp?.tokens));
      });
    }

    return Array.from(new Set(keys));
  }, [overlayMap, path]);

  useEffect(() => {
    // Nothing to apply yet
    if (!activeTokenKeys.length) return;

    const root = document.documentElement;

    const isMap =
      designTokens !== null &&
      typeof designTokens === "object" &&
      !Array.isArray(designTokens);

    // Apply only the tokens that are active on this page/context
    activeTokenKeys.forEach((tokenName) => {
      const value = isMap
        ? (designTokens as TokenMap)[tokenName]
        : opts?.defaults?.[tokenName];

      // Only set if we actually have a value (avoid clobbering existing CSS)
      if (typeof value === "string") {
        root.style.setProperty(tokenName, value);
      }
    });
  }, [activeTokenKeys, designTokens, opts?.defaults]);
};
