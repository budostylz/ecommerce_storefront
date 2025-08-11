import { useEffect } from "react";
import { usePreviewStore } from "src/store/previewStore";

export const useApplyDesignTokens = () => {
  const designTokens = usePreviewStore((s) => s.designTokens);

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(designTokens).forEach(([token, value]) => {
      root.style.setProperty(token, value);
    });
  }, [designTokens]);
};
