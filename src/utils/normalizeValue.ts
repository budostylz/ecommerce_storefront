// utils/normalizeValue.ts
export const normalizeValue = (key: string, val: string): string => {
  switch (key) {
    case "fontWeight":
      return val.toLowerCase() === "bold" ? "700" : "400";
    case "fontSize":
      return /^\d+$/.test(val) ? `${val}px` : val;
    case "lineHeight":
      return /^\d+(\.\d+)?$/.test(val) ? val : "1.5";
    default:
      return val;
  }
};
