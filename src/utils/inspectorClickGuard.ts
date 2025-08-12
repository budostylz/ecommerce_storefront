// src/utils/inspectorClickGuard.ts
let clickedInsideInspector = false;

export const setClickedInsideInspector = () => {
  clickedInsideInspector = true;
};

export const wasClickedInsideInspector = () => {
  const value = clickedInsideInspector;
  clickedInsideInspector = false; // auto-reset after read
  return value;
};
