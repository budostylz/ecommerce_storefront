// src/components/Footer.tsx
import React, { useEffect, useRef, useMemo, useState } from "react";
import { usePreviewStore } from "src/store/previewStore";
import { designTokens, applyDesignTokens } from "@/utils/designTokens";
import { overlayMap } from "@/utils/overlayMap";
import toast from "react-hot-toast";
import { setClickedInsideInspector } from "src/utils/inspectorClickGuard";
import { normalizeValue } from "src/utils/normalizeValue";
import FloatingStyleInspector from "@components/FloatingStyleInspector";


const Footer: React.FC<Footerrops> = (props) => {
  const currentYear = new Date().getFullYear();

  // Zustand state for Footer
  const footerOverlayState = usePreviewStore((s) => s.overlayMap);
  const footerTokensBag = usePreviewStore((s) => s.designTokens);

  const updateFooterComponentProps = usePreviewStore((s) => s.updateComponentProps);
  const updateFooterDesignToken = usePreviewStore((s) => s.updateDesignToken);

  const footerEditingTarget = usePreviewStore((s) => s.editingTarget);
  const setFooterEditingTarget = usePreviewStore((s) => s.setEditingTarget);

  // This component’s overlay node
  const footerOverlay = footerOverlayState?.["global"]?.footer;

  console.log("footerOverlayState: ", footerOverlayState);
  console.log("footerTokensBag: ", footerTokensBag);
  console.log("updateFooterDesignToken: ", updateFooterDesignToken);
  console.log("footerEditingTarget: ", footerEditingTarget);
  console.log("setFooterEditingTarget: ", setFooterEditingTarget);
  console.log("footerOverlay: ", footerOverlay);


  // Refs for editable text fields in Footer
const footerSectionRef = useRef<HTMLElement | null>(null);            // Parent Ref (Footer wrapper)
const logoRef = useRef<HTMLInputElement | null>(null);                 // Logo image URL
const aboutTextRef = useRef<HTMLTextAreaElement | null>(null);         // About text

// Quick Links
const quickLinksTitleRef = useRef<HTMLTextAreaElement | null>(null);   // "QUICK LINKS" title
const quickLinksRefs = useRef<Array<HTMLTextAreaElement | null>>([]);  // Quick links array items

// Account Links
const accountTitleRef = useRef<HTMLTextAreaElement | null>(null);      // "ACCOUNT" title
const accountLinksRefs = useRef<Array<HTMLTextAreaElement | null>>([]);// Account links array items

// Newsletter
const newsletterTitleRef = useRef<HTMLTextAreaElement | null>(null);   // "NEWSLETTER" title
const newsletterPlaceholderRef = useRef<HTMLInputElement | null>(null); // Email placeholder
const newsletterButtonRef = useRef<HTMLTextAreaElement | null>(null);  // Subscribe button text

// Social Links
const socialLinksRefs = useRef<Array<HTMLTextAreaElement | null>>([]); // Social links array items

// Payment Buttons
const paymentButtonsRefs = useRef<Array<HTMLInputElement | null>>([]); // Payment button image URLs

// Copyright
const copyrightTextRef = useRef<HTMLTextAreaElement | null>(null);     // Copyright text

// Device detection
const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);


// Merge overlay props (if any) with incoming props; incoming wins
const {
  logo,
  aboutText,
  quickLinksTitle,
  quickLinks,
  accountTitle,
  accountLinks,
  newsletterTitle,
  newsletterPlaceholder,
  newsletterButton,
  socialLinks,
  paymentButtons,
  copyrightText,
  onSubscribe,
  isDesignMode,
} = {
  logo:
    props.logo ??
    footerOverlay?.props?.logo ??
    "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/ecommerce/fashio/logo.png",

  aboutText:
    props.aboutText ??
    footerOverlay?.props?.aboutText ??
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt cilisis.",

  quickLinksTitle:
    props.quickLinksTitle ??
    footerOverlay?.props?.quickLinksTitle ??
    "QUICK LINKS",

  quickLinks:
    props.quickLinks ??
    footerOverlay?.props?.quickLinks ??
    ["About", "Blogs", "Contact", "FAQ"],

  accountTitle:
    props.accountTitle ??
    footerOverlay?.props?.accountTitle ??
    "ACCOUNT",

  accountLinks:
    props.accountLinks ??
    footerOverlay?.props?.accountLinks ??
    ["My Account", "Orders Tracking", "Checkout", "Wishlist"],

  newsletterTitle:
    props.newsletterTitle ??
    footerOverlay?.props?.newsletterTitle ??
    "NEWSLETTER",

  newsletterPlaceholder:
    props.newsletterPlaceholder ??
    footerOverlay?.props?.newsletterPlaceholder ??
    "Email",

  newsletterButton:
    props.newsletterButton ??
    footerOverlay?.props?.newsletterButton ??
    "Subscribe",

  socialLinks:
    props.socialLinks ??
    footerOverlay?.props?.socialLinks ?? [
      { icon: "fa fa-facebook", href: "#" },
      { icon: "fa fa-twitter", href: "#" },
      { icon: "fa fa-youtube-play", href: "#" },
      { icon: "fa fa-instagram", href: "#" },
      { icon: "fa fa-pinterest", href: "#" },
    ],

  // list of image srcs for the payment badges
  paymentButtons:
    props.paymentButtons ??
    footerOverlay?.props?.paymentButtons ?? [
      "/origin/base/web/img/payment/payment-1.png",
      "/origin/base/web/img/payment/payment-2.png",
      "/origin/base/web/img/payment/payment-3.png",
      "/origin/base/web/img/payment/payment-4.png",
      "/origin/base/web/img/payment/payment-5.png",
    ],

  copyrightText:
    props.copyrightText ??
    footerOverlay?.props?.copyrightText ??
    `© ${new Date().getFullYear()} Crafted with passion <span aria-hidden="true">⚡️</span> on <a href="https://budoboost.com" target="_blank" rel="noopener noreferrer">BudoBoost</a> — Empowering creators to launch beautiful sites in minutes.`,

  onSubscribe: props.onSubscribe, // optional handler for newsletter submit
  isDesignMode: props.isDesignMode ?? true,
} as const;
console.log('isDesignMode: ', isDesignMode);


// Only apply the tokens that this overlay cares about (values from designTokens)
const tokensForFooter = useMemo(() => {
  const keys = footerOverlay?.tokens ?? [];
  const subset: Record<string, string> = {};
  keys.forEach((k: string) => {
    if (k in designTokens) subset[k] = (designTokens as any)[k];
  });
  // If overlay is missing (e.g., during dev), just fall back to all tokens
  return Object.keys(subset).length ? subset : designTokens;
}, [footerOverlay, designTokens]);



  useEffect(() => {
    const checkDevice = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isTablet = w <= 1024 && w > 640;
      const isMobile = w <= 640;
      const isLandscape = w > h;
      setIsMobileOrTablet(isMobile || isTablet || isLandscape);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    window.addEventListener("orientationchange", checkDevice);
    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("orientationchange", checkDevice);
    };
  }, []);

  useEffect(() => {
  console.log('footerEditingTarget CHECK: ', footerEditingTarget);
  if (footerEditingTarget?.componentKey === "footer") {
    switch (footerEditingTarget.field) {
      case "logo":
        logoRef.current?.focus();
        break;
      case "aboutText":
        aboutTextRef.current?.focus();
        break;
      case "quickLinksTitle":
        quickLinksTitleRef.current?.focus();
        break;
      case "quickLinks":
        if (typeof footerEditingTarget.index === "number") {
          quickLinksRef.current[footerEditingTarget.index]?.focus();
        }
        break;
      case "accountTitle":
        accountTitleRef.current?.focus();
        break;
      case "accountLinks":
        if (typeof footerEditingTarget.index === "number") {
          accountLinksRefs.current[footerEditingTarget.index]?.focus();
        }
        break;
      case "newsletterTitle":
        newsletterTitleRef.current?.focus();
        break;
      case "newsletterPlaceholder":
        newsletterPlaceholderRef.current?.focus();
        break;
      case "newsletterButton":
        newsletterButtonRef.current?.focus();
        break;
      case "socialLinks":
        if (typeof footerEditingTarget.index === "number") {
          socialLinksRef.current[footerEditingTarget.index]?.focus();
        }
        break;
      case "paymentButtons":
        if (typeof footerEditingTarget.index === "number") {
          paymentButtonsRef.current[footerEditingTarget.index]?.focus();
        }
        break;
      case "copyrightText":
        copyrightTextRef.current?.focus();
        break;
      default:
        break;
    }
  }
}, [footerEditingTarget]);

useEffect(() => {
  if (!isDesignMode || !footerEditingTarget) return;
  if (footerEditingTarget.componentKey !== "footer") return;

  const field = footerEditingTarget.field; // e.g., "logo", "aboutText", "quickLinksTitle"
  const page = "global"; // Footer lives under overlayMap["global"]

  const prefix = `--footer-${field}-`;
  const suffix = `global-1`; // Matches your overlayMap token naming scheme

  const filteredKeys = (overlayMap[page]?.footer?.tokens || []).filter(
    (key: string) => key.startsWith(prefix) && key.endsWith(suffix)
  );

  filteredKeys.forEach((key: string) => {
    const value = designTokens[key];
    if (value !== undefined) {
      document.documentElement.style.setProperty(key, value);
    }
  });
}, [designTokens, footerEditingTarget, isDesignMode]);

useEffect(() => {
  applyDesignTokens(tokensForFooter);
}, [tokensForFooter]);

useEffect(() => {
  if (!isDesignMode) return;

  const onGlobalPointerDown = (e: MouseEvent) => {
    const root = footerSectionRef.current;
    const target = e.target as Node | null;

    // Ignore if we don’t have a section yet
    if (!root || !target) return;

    // If the click is inside the Footer section, do nothing
    if (root.contains(target)) return;

    // Respect inspector click guard
    // if (wasClickInsideInspector()) return;

    // Otherwise: exit edit mode for Footer
    setFooterEditingTarget(null);
  };

  // Capture phase so we run before other handlers stopPropagation
  document.addEventListener("pointerdown", onGlobalPointerDown, true);
  return () => {
    document.removeEventListener("pointerdown", onGlobalPointerDown, true);
  };
}, [isDesignMode, setFooterEditingTarget]);

useEffect(() => {
  if (!isDesignMode) return;
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") setFooterEditingTarget(null);
  };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, [isDesignMode, setFooterEditingTarget]);

// Newsletter form state
const [newsletterForm, setNewsletterForm] = useState({ email: "" });

// Change handler
const handleNewsletterChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => setNewsletterForm((f) => ({ ...f, [e.target.name]: e.target.value }));

// Submit handler
const handleNewsletterSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  onSubscribe?.(newsletterForm);
  setNewsletterForm({ email: "" });
};

// Suffix for design tokens naming
const FOOTER_SUFFIX = "global-1";

const handleStyleChange = (updates: StyleUpdates) => {
  if (!footerEditingTarget || footerEditingTarget.componentKey !== "footer") return;

  const { field } = footerEditingTarget;

  const setToken = (token: string, val: string) => {
    updateDesignToken(token, normalizeValue(token, val));
  };

  // generic text family: font, size, weight, transform, align, line-height, color
  const mapCommon = (prefix: string) => {
    if (updates.fontFamily)   setToken(`--${prefix}-font-family-${GLOBAL_SUFFIX}`, updates.fontFamily);
    if (updates.fontSize)     setToken(`--${prefix}-font-size-${GLOBAL_SUFFIX}`, updates.fontSize);
    if (updates.fontWeight)   setToken(`--${prefix}-font-weight-${GLOBAL_SUFFIX}`, String(updates.fontWeight));
    if (updates.textTransform)setToken(`--${prefix}-text-transform-${GLOBAL_SUFFIX}`, updates.textTransform);
    if (updates.textAlign)    setToken(`--${prefix}-text-align-${GLOBAL_SUFFIX}`, updates.textAlign);
    if (updates.lineHeight)   setToken(`--${prefix}-line-height-${GLOBAL_SUFFIX}`, String(updates.lineHeight));
    if (updates.textColor)    setToken(`--${prefix}-color-${GLOBAL_SUFFIX}`, updates.textColor);
  };

  switch (field) {
    /** Whole footer section container */
    case "section": {
      if (updates.backgroundColor) setToken(`--footer-section-bg-${GLOBAL_SUFFIX}`, updates.backgroundColor);
      if (updates.paddingTop)      setToken(`--footer-padding-top-${GLOBAL_SUFFIX}`, updates.paddingTop);
      if (updates.paddingBottom)   setToken(`--footer-padding-bottom-${GLOBAL_SUFFIX}`, updates.paddingBottom);
      break;
    }

    /** Logo block */
    case "logo": {
      if (updates.maxWidth) setToken(`--footer-logo-max-width-${GLOBAL_SUFFIX}`, updates.maxWidth);
      break;
    }

    /** About paragraph text */
    case "aboutText": {
      mapCommon("footer-about-text");
      break;
    }

    /** Column headings: Quick Links / Account / Newsletter */
    case "quickLinksTitle":
    case "accountTitle":
    case "newsletterTitle": {
      mapCommon("footer-widget-title");
      break;
    }

    /** Link lists (Quick Links, Account) */
    case "quickLinks":
    case "accountLinks": {
      if (updates.fontSize)  setToken(`--footer-link-font-size-${GLOBAL_SUFFIX}`, updates.fontSize);
      if (updates.textColor) setToken(`--footer-link-color-${GLOBAL_SUFFIX}`, updates.textColor);
      if (updates.hoverColor)setToken(`--footer-link-hover-color-${GLOBAL_SUFFIX}`, updates.hoverColor);
      if (updates.gap)       setToken(`--footer-link-gap-${GLOBAL_SUFFIX}`, updates.gap);
      break;
    }

    /** Newsletter input */
    case "newsletterInput": {
      if (updates.height)        setToken(`--footer-newsletter-input-height-${GLOBAL_SUFFIX}`, updates.height);
      if (updates.fontSize)      setToken(`--footer-newsletter-input-font-size-${GLOBAL_SUFFIX}`, updates.fontSize);
      if (updates.textColor)     setToken(`--footer-newsletter-input-text-color-${GLOBAL_SUFFIX}`, updates.textColor);
      if (updates.backgroundColor) setToken(`--footer-newsletter-input-bg-${GLOBAL_SUFFIX}`, updates.backgroundColor);
      if (updates.borderColor)   setToken(`--footer-newsletter-input-border-color-${GLOBAL_SUFFIX}`, updates.borderColor);
      if (updates.borderRadius)  setToken(`--footer-newsletter-input-border-radius-${GLOBAL_SUFFIX}`, updates.borderRadius);
      if (updates.paddingX)      setToken(`--footer-newsletter-input-padding-x-${GLOBAL_SUFFIX}`, updates.paddingX);
      break;
    }

    /** Newsletter button */
    case "newsletterButton": {
      if (updates.fontSize)      setToken(`--footer-newsletter-button-font-size-${GLOBAL_SUFFIX}`, updates.fontSize);
      if (updates.textTransform) setToken(`--footer-newsletter-button-text-transform-${GLOBAL_SUFFIX}`, updates.textTransform);
      if (updates.fontWeight)    setToken(`--footer-newsletter-button-font-weight-${GLOBAL_SUFFIX}`, String(updates.fontWeight));
      if (updates.textColor)     setToken(`--footer-newsletter-button-text-color-${GLOBAL_SUFFIX}`, updates.textColor);
      if (updates.backgroundColor) setToken(`--footer-newsletter-button-bg-${GLOBAL_SUFFIX}`, updates.backgroundColor);
      if (updates.borderRadius)  setToken(`--footer-newsletter-button-border-radius-${GLOBAL_SUFFIX}`, updates.borderRadius);
      if (updates.padding) {
        const parts = updates.padding.trim().split(/\s+/);
        let py = parts[0], px = parts[0];
        if (parts.length === 2)      { py = parts[0]; px = parts[1]; }
        else if (parts.length === 3) { py = parts[0]; px = parts[1]; }
        else if (parts.length >= 4)  { py = parts[0]; px = parts[1]; }
        setToken(`--footer-newsletter-button-padding-y-${GLOBAL_SUFFIX}`, py);
        setToken(`--footer-newsletter-button-padding-x-${GLOBAL_SUFFIX}`, px);
      }
      break;
    }

    /** Social icons row */
    case "socialLinks": {
      if (updates.iconSize)      setToken(`--footer-social-icon-size-${GLOBAL_SUFFIX}`, updates.iconSize);
      if (updates.iconColor)     setToken(`--footer-social-icon-color-${GLOBAL_SUFFIX}`, updates.iconColor);
      if (updates.backgroundColor) setToken(`--footer-social-bg-${GLOBAL_SUFFIX}`, updates.backgroundColor);
      if (updates.gap)           setToken(`--footer-social-gap-${GLOBAL_SUFFIX}`, updates.gap);
      break;
    }

    /** Payment badges row */
    case "paymentButtons": {
      if (updates.iconHeight) setToken(`--footer-payment-icon-height-${GLOBAL_SUFFIX}`, updates.iconHeight);
      if (updates.gap)        setToken(`--footer-payment-gap-${GLOBAL_SUFFIX}`, updates.gap);
      break;
    }

    /** Copyright line */
    case "copyrightText": {
      mapCommon("footer-copyright-text"); // will set text color / font props if provided
      if (updates.linkColor) setToken(`--footer-copyright-link-color-${GLOBAL_SUFFIX}`, updates.linkColor);
      break;
    }

    default:
      break;
  }
};

// Token helper (footer/global)
const getFooterToken = (key: string, index?: number) => {
  const suffix = index !== undefined ? `global-${index}` : "global-1";
  return `--footer-${key}-${suffix}`;
};

// Which fields can open the style/content inspector for Footer
const footerAllowedFields = [
  "section",            // whole footer container
  "logo",
  "aboutText",
  "quickLinksTitle",
  "quickLinks",
  "accountTitle",
  "accountLinks",
  "newsletterTitle",
  "newsletterInput",
  "newsletterButton",
  "socialLinks",
  "paymentButtons",
  "copyrightText",
] as const;

// Show inspector when in design mode and a valid footer field is targeted
const showFooterInspector =
  isDesignMode &&
  footerEditingTarget?.componentKey === "footer" &&
  footerAllowedFields.includes(footerEditingTarget.field as typeof footerAllowedFields[number]);

  console.log('footerOverlay?.props: ', footerOverlay?.props);
  console.log('footerOverlay?.props?.logo: ', footerOverlay?.props?.logo);
  console.log('footerOverlay?.props?.aboutText: ', footerOverlay?.props?.aboutText);
  console.log('footerOverlay?.props?.paymentIcons: ', footerOverlay?.props?.paymentIcons);
  console.log('footerOverlay?.props?.quickLinksTitle: ', footerOverlay?.props?.quickLinksTitle);
  console.log('footerOverlay?.props?.quickLinks: ', footerOverlay?.props?.quickLinks);
  console.log('footerOverlay?.props?.accountTitle: ', footerOverlay?.props?.accountTitle);
  console.log('footerOverlay?.props?.accountLinks: ', footerOverlay?.props?.accountLinks);
  console.log('footerOverlay?.props?.newsletterTitle: ', footerOverlay?.props?.newsletterTitle);
  console.log('footerOverlay?.props?.newsletterButton: ', footerOverlay?.props?.newsletterButton);
  console.log('footerOverlay?.props?.socialLinks: ', footerOverlay?.props?.socialLinks);



  //////////////////////

  // 1) stable default once
    const DEFAULT_ACCOUNT_LINKS = useMemo(
      () => ["My Account", "Orders Tracking", "Checkout", "Wishlist"],
      []
    );

    // 2) local draft for snappy typing
    const accountLinksFromStore =
      footerOverlay?.props?.accountLinks ?? DEFAULT_ACCOUNT_LINKS;

    const [accountLinksDraft, setAccountLinksDraft] = React.useState(accountLinksFromStore);

    // keep draft in sync when opening editor or store changes externally
    useEffect(() => {
      setAccountLinksDraft(accountLinksFromStore);
    }, [accountLinksFromStore, footerEditingTarget]);

    // 3) tiny debounce so we don’t slam the store on each key
    const debouncedCommitRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const commitAccountLinks = (next: string[]) => {
      if (debouncedCommitRef.current) clearTimeout(debouncedCommitRef.current);
      debouncedCommitRef.current = setTimeout(() => {
        updateFooterComponentProps("global", "footer", { accountLinks: next });
      }, 150);
    };


    useEffect(() => {
      if (
        isDesignMode &&
        footerEditingTarget?.componentKey === "footer" &&
        footerEditingTarget.field === "accountLinks" &&
        typeof footerEditingTarget.index === "number"
      ) {
        accountLinksRefs.current[footerEditingTarget.index]?.focus();
      }
    }, [isDesignMode, footerEditingTarget]);


  return (
    <footer
      className="footer"
      // Only add vars with fallbacks; if tokens are unset, you get the stock CSS.
      style={{
        background: "var(--footer-bg-global-1, initial)",
        paddingTop: "var(--footer-padding-top-global-1, initial)",
        paddingBottom: "var(--footer-padding-bottom-global-1, initial)",
        color: "var(--footer-text-color-global-1, inherit)",
      }}
    >
      <div className="container">
        <div className="row">
          {/* About */}
          <div className="col-lg-4 col-md-6 col-sm-7">
            <div className="footer__about">
              <div className="footer__logo">
               <a href="/">
                  <img
                    src={footerOverlay?.props?.logo ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/ecommerce/fashio/logo.png"}
                    alt="Logo"
                    style={{
                      // keep original look; allow token-driven tweaks
                      maxWidth: "var(--footer-logo-max-width-global-1, 150px)",
                      height: "auto",
                      display: "block",
                      marginBottom: "var(--footer-logo-margin-bottom-global-1, 15px)",
                    }}
                  />
                </a>
              </div>

                <p
                  style={{
                    fontSize: "var(--footer-about-font-size-global-1, 14px)",
                    color: "var(--footer-about-text-color-global-1, #666666)",
                    lineHeight: "var(--footer-about-line-height-global-1, 24px)",
                    marginBottom: "var(--footer-about-margin-bottom-global-1, 20px)",
                  }}
                >
                  {footerOverlay?.props?.aboutText ??
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt cilisis."}
                </p>


               <div className="footer__payment">
                {(footerOverlay?.props?.paymentIcons ?? [
                  { src: "/origin/base/web/img/payment/payment-1.png", alt: "Payment 1" },
                  { src: "/origin/base/web/img/payment/payment-2.png", alt: "Payment 2" },
                  { src: "/origin/base/web/img/payment/payment-3.png", alt: "Payment 3" },
                  { src: "/origin/base/web/img/payment/payment-4.png", alt: "Payment 4" },
                  { src: "/origin/base/web/img/payment/payment-5.png", alt: "Payment 5" },
                ]).map((icon, index) => (
                  <a
                    href="#"
                    key={index}
                    style={{
                      marginRight: "var(--footer-payment-gap-global-1, 6px)",
                      marginBottom: "var(--footer-payment-gap-global-1, 10px)",
                      display: "inline-block",
                    }}
                  >
                    <img
                      src={icon.src}
                      alt={icon.alt}
                      style={{
                        display: "block", // avoids baseline gaps
                        height: "auto",   // let the image keep its native height
                        width: "auto",    // let the image keep its native width
                      }}
                    />
                  </a>
                ))}
              </div>



            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-3 col-sm-5">
            <div className="footer__widget">
            <h6
                style={{
                  color: "var(--footer-heading-color-global-1, #111111)",
                  fontWeight: "var(--footer-heading-font-weight-global-1, 600)",
                  textTransform: "var(--footer-heading-text-transform-global-1, uppercase)",
                  marginBottom: "var(--footer-heading-margin-bottom-global-1, 12px)",
                  fontSize: "var(--footer-heading-font-size-global-1, 16px)",
                }}
              >
                {footerOverlay?.props?.quickLinksTitle ?? "Quick links"}
              </h6>

              <ul>
                {(footerOverlay?.props?.quickLinks ?? ["About", "Blogs", "Contact", "FAQ"]).map((t, i) => (
                  <li key={`${i}-${t}`}>
                    <a
                      href="#"
                      style={{
                        fontSize: "var(--footer-link-font-size-global-1, 14px)",
                        color: "var(--footer-link-color-global-1, #666666)",
                        lineHeight: "var(--footer-link-line-height-global-1, 30px)",
                      }}
                    >
                      {t}
                    </a>
                  </li>
                ))}
              </ul>

            </div>
          </div>

          {/* Account */}
          <div className="col-lg-2 col-md-3 col-sm-4">
            <div className="footer__widget">
              <h6
                style={{
                  color: "var(--footer-heading-color-global-1, #111111)",
                  fontWeight: "var(--footer-heading-font-weight-global-1, 600)",
                  textTransform: "var(--footer-heading-text-transform-global-1, uppercase)",
                  marginBottom: "var(--footer-heading-margin-bottom-global-1, 12px)",
                  fontSize: "var(--footer-heading-font-size-global-1, 16px)",
                }}
              >
                {footerOverlay?.props?.accountTitle ?? "ACCOUNT"}
              </h6>

<ul>
  {accountLinksDraft.map((text, i) =>
    isDesignMode &&
    footerEditingTarget?.componentKey === "footer" &&
    footerEditingTarget.field === "accountLinks" &&
    footerEditingTarget.index === i ? (
      <li key={`acc-${i}`}>
        <textarea
          ref={(el) => (accountLinksRefs.current[i] = el)}
          value={text}
          onChange={(e) => {
            const next = [...accountLinksDraft];
            next[i] = e.target.value;
            setAccountLinksDraft(next);          // local, instant
            commitAccountLinks(next);            // debounced global update
          }}
          onClick={(e) => {
            setClickedInsideInspector();
            e.stopPropagation();
          }}
          style={{
            width: "100%",
            fontSize: "var(--footer-link-font-size-global-1, 14px)",
            color: "var(--footer-link-color-global-1, #666666)",
            lineHeight: "var(--footer-link-line-height-global-1, 30px)",
            background: "transparent",
            border: "none",
            outline: "none",
            resize: "none",
            whiteSpace: "pre-wrap",
          }}
        />
      </li>
    ) : (
      <li key={`acc-${i}`}>
        <a
          href="#"
          onClick={(e) => {
            if (isDesignMode) {
              e.preventDefault();
              e.stopPropagation();
              setFooterEditingTarget({
                route: "global",
                componentKey: "footer",
                field: "accountLinks",
                index: i,
              });
            }
          }}
          style={{
            fontSize: "var(--footer-link-font-size-global-1, 14px)",
            color: "var(--footer-link-color-global-1, #666666)",
            lineHeight: "var(--footer-link-line-height-global-1, 30px)",
            cursor: isDesignMode ? "text" : "pointer",
          }}
        >
          {accountLinksFromStore[i] ?? DEFAULT_ACCOUNT_LINKS[i]}
        </a>
      </li>
    )
  )}
</ul>


            </div>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4 col-md-8 col-sm-8">
            <div className="footer__newslatter">
            {isDesignMode &&
              footerEditingTarget?.componentKey === "footer" &&
              footerEditingTarget.field === "newsletterTitle" ? (
                <textarea
                  ref={newsletterTitleRef}
                  value={footerOverlay?.props?.newsletterTitle ?? "NEWSLETTER"}
                  onChange={(e) => {
                    updateFooterComponentProps("global", "footer", {
                      newsletterTitle: e.target.value,
                    });
                  }}
                  onClick={(e) => {
                    setClickedInsideInspector();
                    e.stopPropagation();
                  }}
                  style={{
                    width: "100%",
                    color: "var(--footer-heading-color-global-1, #111111)",
                    fontWeight: "var(--footer-heading-font-weight-global-1, 600)",
                    textTransform: "var(--footer-heading-text-transform-global-1, uppercase)",
                    marginBottom: "var(--footer-newsletter-heading-margin-bottom-global-1, 25px)",
                    fontSize: "var(--footer-heading-font-size-global-1, 16px)",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    resize: "none",
                    whiteSpace: "pre-wrap",
                  }}
                />
              ) : (
                <h6
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isDesignMode) {
                      setFooterEditingTarget({
                        route: "global",
                        componentKey: "footer",
                        field: "newsletterTitle",
                      });
                    }
                  }}
                  style={{
                    color: "var(--footer-heading-color-global-1, #111111)",
                    fontWeight: "var(--footer-heading-font-weight-global-1, 600)",
                    textTransform: "var(--footer-heading-text-transform-global-1, uppercase)",
                    marginBottom: "var(--footer-newsletter-heading-margin-bottom-global-1, 25px)",
                    fontSize: "var(--footer-heading-font-size-global-1, 16px)",
                    cursor: isDesignMode ? "text" : "default",
                  }}
                >
                  {footerOverlay?.props?.newsletterTitle ?? "NEWSLETTER"}
                </h6>
              )}


              <form action="#" style={{ position: "relative", marginBottom: "var(--footer-newsletter-form-margin-bottom-global-1, 30px)" }}>
                <input
                  type="text"
                  placeholder="Email"
                  // keep defaults; tokens simply mirror the stock CSS
                  style={{
                    height: "var(--footer-input-height-global-1, 52px)",
                    width: "100%",
                    border: "1px solid var(--footer-input-border-color-global-1, #e1e1e1)",
                    borderRadius: "var(--footer-input-border-radius-global-1, 50px)",
                    paddingLeft: "var(--footer-input-padding-x-global-1, 30px)",
                    fontSize: "var(--footer-input-font-size-global-1, 14px)",
                    color: "var(--footer-input-text-color-global-1, #666666)",
                    background: "var(--footer-input-bg-global-1, #fff)",
                  }}
                />
                {isDesignMode &&
                    footerEditingTarget?.componentKey === "footer" &&
                    footerEditingTarget.field === "newsletterButton" ? (
                      <textarea
                        ref={newsletterButtonRef}
                        value={footerOverlay?.props?.newsletterButton ?? "Subscribe"}
                        onChange={(e) => {
                          updateFooterComponentProps("global", "footer", { newsletterButton: e.target.value });
                        }}
                        onClick={(e) => {
                          setClickedInsideInspector();
                          e.stopPropagation();
                        }}
                        style={{
                          width: "100%",
                          fontSize: "var(--footer-button-font-size-global-1)",
                          textTransform: "var(--footer-button-text-transform-global-1)",
                          fontWeight: "var(--footer-button-font-weight-global-1)",
                          color: "var(--footer-button-text-color-global-1)",
                          background: "var(--footer-button-bg-global-1)",
                          padding:
                            "var(--footer-button-padding-y-global-1) var(--footer-button-padding-x-global-1)",
                          borderRadius: "var(--footer-button-border-radius-global-1)",
                          border: "none",
                          outline: "none",
                          resize: "none",
                          whiteSpace: "pre-wrap",
                          textAlign: "center",
                        }}
                      />
                  ) : (
                      <div
                        type="submit"
                        className="site-btn"
                        onClick={(e) => {
                          if (isDesignMode) {
                            e.preventDefault();
                            e.stopPropagation();
                            setFooterEditingTarget({
                              route: "global",
                              componentKey: "footer",
                              field: "newsletterButton",
                            });
                          }
                        }}
                        style={{
                          background: "var(--footer-button-bg-global-1, #ca1515)",
                          color: "var(--footer-button-text-color-global-1, #ffffff)",
                          fontSize: "var(--footer-button-font-size-global-1, 14px)",
                          fontWeight: "var(--footer-button-font-weight-global-1, 600)",
                          textTransform: "var(--footer-button-text-transform-global-1, uppercase)",
                          padding:
                            "var(--footer-button-padding-y-global-1, 12px) var(--footer-button-padding-x-global-1, 30px)",
                          borderRadius: "var(--footer-button-border-radius-global-1, 50px)",
                          position: "var(--footer-button-position-global-1, absolute)",
                          right: "var(--footer-button-right-global-1, 4px)",
                          top: "var(--footer-button-top-global-1, 4px)",
                          cursor: isDesignMode ? "text" : "pointer",
                          textAlign: "center",
                        }}
                      >
                        {footerOverlay?.props?.newsletterButton ?? "Subscribe"}
                      </div>
                  )}


              </form>

              <div className="footer__social">
                {(footerOverlay?.props?.socialLinks ?? [
                  { icon: "fa fa-facebook", href: "#" },
                  { icon: "fa fa-twitter", href: "#" },
                  { icon: "fa fa-youtube-play", href: "#" },
                  { icon: "fa fa-instagram", href: "#" },
                  { icon: "fa fa-pinterest", href: "#" }
                ]).map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    style={{
                      height: "var(--footer-social-size-global-1, 40px)",
                      width: "var(--footer-social-size-global-1, 40px)",
                      background: "var(--footer-social-bg-global-1, #e1e1e1)",
                      color: "var(--footer-social-icon-color-global-1, #111111)",
                      lineHeight: "var(--footer-social-size-global-1, 40px)",
                      borderRadius: "var(--footer-social-border-radius-global-1, 50%)",
                      marginRight: "var(--footer-social-gap-global-1, 6px)",
                      marginBottom: "var(--footer-social-row-gap-global-1, 5px)",
                      fontSize: "var(--footer-social-icon-size-global-1, 15px)",
                      textAlign: "center",
                      display: "inline-block",
                    }}
                  >
                    <i className={social.icon} />
                  </a>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="row">
          <div className="col-lg-12">
            <div
              className="footer__copyright__text"
              style={{
                borderTop: "1px solid var(--footer-copyright-border-color-global-1, #e1e1e1)",
                padding: "var(--footer-copyright-padding-top-global-1, 18px) 0 var(--footer-copyright-padding-bottom-global-1, 25px)",
                marginTop: "var(--footer-copyright-margin-top-global-1, 35px)",
                color: "var(--footer-copyright-text-color-global-1, #5C5C5C)",
                fontSize: "var(--footer-copyright-font-size-global-1, 14px)",
                textAlign: "center",
              }}
            >
            <p style={{ marginBottom: 0 }}>
              © {currentYear} Crafted with passion 🚀 on&nbsp;
              <a
                href="https://budoboost.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--footer-copyright-link-color-global-1, #5C5C5C)" }}
              >
                BudoBoost
              </a>
              &nbsp;— Empowering creators to launch beautiful sites in minutes.
            </p>


            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
