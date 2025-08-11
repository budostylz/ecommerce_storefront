type OverlayMap = Record<string, Record<string, { tokens?: string[] }>>;
type DesignTokens = Record<string, string>;

export function validateTokens(overlayMap: OverlayMap, designTokens: DesignTokens) {
  const errors: string[] = [];
  const unusedTokens: string[] = [];

  const usedTokens = new Set<string>();

  for (const page in overlayMap) {
    for (const componentId in overlayMap[page]) {
      const component = overlayMap[page][componentId];
      const tokenList = component.tokens || [];

      tokenList.forEach((token) => {
        usedTokens.add(token);
        if (!(token in designTokens)) {
          errors.push(`❌ Missing token: "${token}" in designTokens for ${page} → ${componentId}`);
        }
      });
    }
  }

  // Optional: detect unused design tokens
  for (const token in designTokens) {
    if (!usedTokens.has(token)) {
      unusedTokens.push(`⚠️ Unused token: "${token}"`);
    }
  }

  return { errors, unusedTokens };
}
