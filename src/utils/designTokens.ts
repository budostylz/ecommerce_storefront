// src/utils/designTokens.ts

/**
 * Design Tokens for BudoApps components
 * Naming: --{component-name}-{area}-{style-prop}-{page}-{index}
 */

export const designTokens: Record<string, string> = {
  /* ========= Contact component tokens ========= */
  "--contact-section-bg-contact-1": "#ffffff",
  "--contact-section-padding-top-contact-1": "80px",
  "--contact-section-padding-bottom-contact-1": "80px",

  /* Headings */
  "--contact-heading-font-family-contact-1": "\"Montserrat\", sans-serif",
  "--contact-heading-font-size-contact-1": "20px",
  "--contact-heading-font-weight-contact-1": "600",
  "--contact-heading-text-transform-contact-1": "uppercase",
  "--contact-heading-color-contact-1": "#111111",
  "--contact-heading-margin-bottom-contact-1": "20px",

  /* Address/info */
  "--contact-info-item-gap-contact-1": "20px",
  "--contact-info-title-font-size-contact-1": "16px",
  "--contact-info-title-font-weight-contact-1": "600",
  "--contact-info-title-color-contact-1": "#111111",
  "--contact-info-text-font-size-contact-1": "15px",
  "--contact-info-text-color-contact-1": "#444444",
  "--contact-info-icon-size-contact-1": "16px",
  "--contact-info-icon-color-contact-1": "#ca1515",
  "--contact-info-chip-gap-contact-1": "25px",

  /* Form */
  "--contact-form-heading-font-family-contact-1": "\"Montserrat\", sans-serif",
  "--contact-form-heading-font-size-contact-1": "20px",
  "--contact-form-heading-font-weight-contact-1": "600",
  "--contact-form-heading-text-transform-contact-1": "uppercase",
  "--contact-form-heading-color-contact-1": "#111111",
  "--contact-form-field-height-contact-1": "50px",
  "--contact-form-field-font-size-contact-1": "14px",
  "--contact-form-field-text-color-contact-1": "#444444",
  "--contact-form-field-bg-contact-1": "#ffffff",
  "--contact-form-field-border-color-contact-1": "#e1e1e1",
  "--contact-form-field-border-radius-contact-1": "10px",
  "--contact-form-field-padding-x-contact-1": "20px",
  "--contact-form-field-margin-bottom-contact-1": "20px",
  "--contact-form-textarea-height-contact-1": "130px",
  "--contact-form-placeholder-color-contact-1": "#444444",

  /* Button */
  "--contact-button-font-size-contact-1": "14px",
  "--contact-button-text-transform-contact-1": "uppercase",
  "--contact-button-font-weight-contact-1": "600",
  "--contact-button-text-color-contact-1": "#ffffff",
  "--contact-button-bg-contact-1": "#ca1515",
  "--contact-button-padding-y-contact-1": "12px",
  "--contact-button-padding-x-contact-1": "30px",
  "--contact-button-border-radius-contact-1": "50px",

  /* Map */
  "--contact-map-height-contact-1": "780px",
  "--contact-map-border-width-contact-1": "0px",
  "--contact-map-width-contact-1": "100%",

  /* Mobile */
  "--contact-heading-font-size-mobile-contact-1": "18px",
  "--contact-section-padding-top-mobile-contact-1": "80px",
  "--contact-section-padding-bottom-mobile-contact-1": "80px",
  "--contact-form-field-margin-bottom-mobile-contact-1": "20px",
  "--contact-map-height-mobile-contact-1": "780px",
};

/** Apply tokens to :root */
export const applyDesignTokens = (tokens: Record<string, string>) => {
  const root = document.documentElement;
  for (const [k, v] of Object.entries(tokens)) root.style.setProperty(k, v);
};
