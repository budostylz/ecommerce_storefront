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

  /* ========= Footer component tokens ========= */
  "--footer-section-bg-global-0": "#ffffff",
  "--footer-section-padding-top-global-0": "55px",
  "--footer-section-padding-bottom-global-0": "40px",

  "--footer-logo-max-width-global-0": "150px",
  "--footer-logo-margin-bottom-global-0": "15px",

  "--footer-about-text-font-size-global-0": "14px",
  "--footer-about-text-color-global-0": "#666666",
  "--footer-about-text-margin-bottom-global-0": "20px",

  "--footer-payment-icon-gap-global-0": "6px",
  "--footer-payment-icon-margin-bottom-global-0": "10px",

  "--footer-widget-title-font-size-global-0": "16px",
  "--footer-widget-title-color-global-0": "#111111",
  "--footer-widget-title-font-weight-global-0": "600",
  "--footer-widget-title-text-transform-global-0": "uppercase",
  "--footer-widget-title-margin-bottom-global-0": "12px",

  "--footer-link-font-size-global-0": "14px",
  "--footer-link-color-global-0": "#666666",
  "--footer-link-line-height-global-0": "30px",
  "--footer-link-hover-color-global-0": "#ca1515",

  "--footer-newsletter-title-font-size-global-0": "16px",
  "--footer-newsletter-title-color-global-0": "#111111",
  "--footer-newsletter-title-font-weight-global-0": "600",
  "--footer-newsletter-title-text-transform-global-0": "uppercase",
  "--footer-newsletter-title-margin-bottom-global-0": "25px",

  "--footer-newsletter-input-height-global-0": "52px",
  "--footer-newsletter-input-border-color-global-0": "#e1e1e1",
  "--footer-newsletter-input-border-radius-global-0": "50px",
  "--footer-newsletter-input-font-size-global-0": "14px",
  "--footer-newsletter-input-text-color-global-0": "#666666",
  "--footer-newsletter-input-bg-global-0": "#ffffff",
  "--footer-newsletter-input-padding-x-global-0": "30px",
  "--footer-newsletter-input-placeholder-color-global-0": "#666666",

  "--footer-button-font-size-global-0": "14px",
  "--footer-button-text-color-global-0": "#ffffff",
  "--footer-button-bg-global-0": "#ca1515",
  "--footer-button-font-weight-global-0": "600",
  "--footer-button-text-transform-global-0": "uppercase",
  "--footer-button-padding-y-global-0": "12px",
  "--footer-button-padding-x-global-0": "30px",
  "--footer-button-border-radius-global-0": "50px",

  "--footer-social-size-global-0": "40px",
  "--footer-social-bg-global-0": "#e1e1e1",
  "--footer-social-icon-font-size-global-0": "15px",
  "--footer-social-icon-color-global-0": "#111111",
  "--footer-social-gap-global-0": "6px",

  "--footer-copyright-border-color-global-0": "#e1e1e1",
  "--footer-copyright-padding-top-global-0": "18px",
  "--footer-copyright-padding-bottom-global-0": "25px",
  "--footer-copyright-text-align-global-0": "center",
  "--footer-copyright-margin-top-global-0": "35px",
  "--footer-copyright-text-color-global-0": "#666666",
  "--footer-copyright-link-color-global-0": "#5c5c5c",
  "--footer-copyright-link-hover-color-global-0": "#ca1515",
  "--footer-copyright-heart-color-global-0": "#ca1515",


  "--header-bg-global-0": "#ffffff",
  "--header-font-family-global-0": "\"Montserrat\", sans-serif",

  "--header-menu-link-font-family-global-0": "\"Montserrat\", sans-serif",
  "--header-menu-link-font-size-global-0": "15px",
  "--header-menu-link-color-global-0": "#111111",
  "--header-menu-link-font-weight-global-0": "500",
  "--header-menu-text-align-global-0": "left",

  "--header-menu-dropdown-bg-global-0": "#111111",
  "--header-menu-dropdown-link-font-family-global-0": "\"Montserrat\", sans-serif",
  "--header-menu-dropdown-link-font-size-global-0": "14px",
  "--header-menu-dropdown-link-color-global-0": "#ffffff",
  "--header-menu-dropdown-link-font-weight-global-0": "400",
  "--header-menu-dropdown-text-align-global-0": "left",

  "--header-auth-link-font-family-global-0": "\"Montserrat\", sans-serif",
  "--header-auth-link-font-size-global-0": "12px",
  "--header-auth-link-color-global-0": "#666666",
  "--header-auth-link-font-weight-global-0": "400",
  "--header-right-text-align-global-0": "right",

  "--header-widget-icon-font-size-global-0": "18px",
  "--header-widget-icon-color-global-0": "#111111",
  "--header-widget-icon-font-weight-global-0": "400",

  "--header-widget-tip-bg-global-0": "#111111",
  "--header-widget-tip-font-size-global-0": "10px",
  "--header-widget-tip-color-global-0": "#ffffff",
  "--header-widget-tip-font-weight-global-0": "500",
  "--header-widget-tip-text-align-global-0": "center",

  "--canvas-open-font-size-global-0": "22px",
  "--canvas-open-color-global-0": "#222222",
  "--canvas-open-bg-global-0": "transparent",
  "--canvas-open-font-weight-global-0": "400",
  "--canvas-open-text-align-global-0": "center"
  






  

};

/** Apply tokens to :root */
export const applyDesignTokens = (tokens: Record<string, string>) => {
  const root = document.documentElement;
  for (const [k, v] of Object.entries(tokens)) root.style.setProperty(k, v);
};
