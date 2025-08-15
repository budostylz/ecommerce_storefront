// src/components/Header.tsx
import React, { useEffect, useRef, useMemo, useState } from "react";
import { usePreviewStore } from "src/store/previewStore";
import { designTokens, applyDesignTokens } from "@/utils/designTokens";
import { overlayMap } from "@/utils/overlayMap";
import toast from "react-hot-toast";
import { setClickedInsideInspector } from "src/utils/inspectorClickGuard";
import { normalizeValue } from "src/utils/normalizeValue";
import FloatingStyleInspector from "@components/FloatingStyleInspector";

const Header: React.FC<HeaderProps> = (props) => {

  // Zustand state for Footer
  const headerOverlayState = usePreviewStore((s) => s.overlayMap);
  const headerTokensBag = usePreviewStore((s) => s.designTokens);

  const updateHeaderComponentProps = usePreviewStore((s) => s.updateComponentProps);
  const updateHeaderDesignToken = usePreviewStore((s) => s.updateDesignToken);

  const headerEditingTarget = usePreviewStore((s) => s.editingTarget);
  const setHeaderEditingTarget = usePreviewStore((s) => s.setEditingTarget);

  // This component’s overlay node
  const headerOverlay = headerOverlayState?.["global"]?.header;

  /*console.log("headerOverlayState: ", headerOverlayState);
  console.log("headerTokensBag: ", headerTokensBag);
  console.log("updateHeaderDesignToken: ", updateHeaderDesignToken);
  console.log("headerEditingTarget: ", headerEditingTarget);
  console.log("setHeaderEditingTarget: ", setHeaderEditingTarget);
  console.log("headerOverlay: ", headerOverlay);*/

  // Click Refs
  const loginClickPosRef = useRef<number | null>(null);
  const registerClickPosRef = useRef<number | null>(null);
  const menuClickPosRefs = useRef<number[]>([]);
  const dropdownClickPosRefs = useRef<number[][]>([]);




   /** Root element ref (used for click-outside) */
  const headerSectionRef = useRef<HTMLElement | null>(null);

  /** Top-level */
  const logoRef = useRef<HTMLInputElement | null>(null); // logo URL

  /** Menu (flat items) */
  const menuLabelRefs = useRef<Array<HTMLTextAreaElement | null>>([]); // "HOME", "WOMEN’S", ...
  const menuHrefRefs  = useRef<Array<HTMLInputElement | null>>([]);     // "/", "#", "./shop.html", ...
  const menuActiveRefs = useRef<Array<HTMLInputElement | null>>([]);    // checkbox per item

  /** Menu dropdowns (nested per parent index) */
  const menuDropdownLabelRefs = useRef<Array<Array<HTMLTextAreaElement | null>>>([]);
  const menuDropdownHrefRefs  = useRef<Array<Array<HTMLInputElement | null>>>([]);

  /** Auth labels */
  const loginLabelRef    = useRef<HTMLTextAreaElement | null>(null);    // "Login"
  const registerLabelRef = useRef<HTMLTextAreaElement | null>(null);    // "Register"

  /** Widgets */
  const showSearchRef    = useRef<HTMLInputElement | null>(null);       // checkbox
  const wishlistCountRef = useRef<HTMLInputElement | null>(null);       // number input
  const cartCountRef     = useRef<HTMLInputElement | null>(null);       // number input

  // Device detection
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  // Merge overlay props (incoming props win over overlay; then fall back to sane defaults)
  const {
    logo,
    menu,
    auth,
    widgets,
    isDesignMode,
  } = {
    logo:
      props.logo ??
      headerOverlay?.props?.logo ??
      "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/ecommerce/fashio/logo.png",

    menu:
      props.menu ??
      headerOverlay?.props?.menu ?? [
        { label: "Home", href: "/" },
        { label: "Women’s", href: "#" },
        { label: "Men’s", href: "#" },
        { label: "Shop", href: "./shop.html", active: true },
        {
          label: "Pages",
          href: "#",
          dropdown: [
            { label: "Product Details", href: "./product-details.html" },
            { label: "Shop Cart", href: "./shop-cart.html" },
            { label: "Checkout", href: "./checkout.html" },
            { label: "Blog Details", href: "./blog-details.html" },
          ],
        },
        { label: "Contact", href: "contact" },
      ],

    auth:
      props.auth ??
      headerOverlay?.props?.auth ?? {
        loginLabel: "Login",
        registerLabel: "Register",
      },

    widgets:
      props.widgets ??
      headerOverlay?.props?.widgets ?? {
        showSearch: true,
        wishlistCount: 2,
        cartCount: 2,
      },

    isDesignMode: props.isDesignMode ?? false,
  } as const;

  /*console.log('isDesignMode: ', isDesignMode);
  console.log('logo: ', logo);
  console.log('menu: ', menu);
  console.log('auth: ', widgets);*/

  // ===== Only apply the tokens that this overlay cares about =====
const tokensForHeader = useMemo(() => {
  const wantedKeys = headerOverlay?.tokens ?? [];
  const bag = headerTokensBag ?? {};
  const subset: Record<string, string> = {};

  wantedKeys.forEach((k: string) => {
    if (k in bag) subset[k] = bag[k] as string;
  });

  // If overlay is missing or empty, fall back to the whole bag
  return Object.keys(subset).length ? subset : (bag as Record<string, string>);
}, [headerOverlay, headerTokensBag]);


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
  if (headerEditingTarget?.componentKey !== "header") return;

  const { field, index, subIndex } = headerEditingTarget as {
    field?: string;
    index?: number;
    subIndex?: number;
  };

  switch (field) {
    case "logo":
      logoRef.current?.focus();
      break;

    case "menu": {
      if (typeof index === "number") {
        if (typeof subIndex === "number") {
          // dropdown item (label)
          const list = menuDropdownLabelRefs.current[index] || [];
          (list[subIndex] ?? null)?.focus?.();
        } else {
          // top-level item (label)
          (menuLabelRefs.current[index] ?? null)?.focus?.();
        }
      }
      break;
    }

    case "auth.login":
    case "auth.loginLabel":
      loginLabelRef.current?.focus();
      break;

    case "auth.register":
    case "auth.registerLabel":
      registerLabelRef.current?.focus();
      break;

    case "widgets.search":
      showSearchRef.current?.focus();
      break;

    case "widgets.wishlist":
    case "widgets.wishlistCount":
      wishlistCountRef.current?.focus();
      break;

    case "widgets.cart":
    case "widgets.cartCount":
      cartCountRef.current?.focus();
      break;

    default:
      break;
  }
}, [headerEditingTarget]);


useEffect(() => {
  if (!isDesignMode || !headerEditingTarget) return;
  if (headerEditingTarget.componentKey !== "header") return;

  // Token domain comes from the first segment (e.g., "auth.loginLabel" -> "auth").
  // Map dotted or plural fields to the header token namespaces.
  const rawField = (headerEditingTarget.field || "").toLowerCase();
  const baseField = rawField.split(".")[0]; // e.g., "widgets.cartCount" -> "widgets"

  const DOMAIN_ALIAS: Record<string, string> = {
    widgets: "widget", // tokens use --header-widget-*
    widget: "widget",
    menu: "menu",
    auth: "auth",
    dropdown: "dropdown",
    logo: "logo",
    section: "section",
    mobile: "mobile-button", // if you ever target the canvas button as "mobile"
    button: "mobile-button",
  };

  const domain = DOMAIN_ALIAS[baseField] ?? baseField;

  const page = "global";        // Header lives under overlayMap["global"]
  const suffix = "global-0";    // Header token suffix (per your naming)
  const prefix = `--header-${domain}-`;

  const candidateKeys = (overlayMap[page]?.header?.tokens || []).filter(
    (key: string) => key.startsWith(prefix) && key.endsWith(suffix)
  );

  candidateKeys.forEach((key: string) => {
    const value = (designTokens as any)[key];
    if (value !== undefined) {
      document.documentElement.style.setProperty(key, value);
    }
  });
}, [designTokens, headerEditingTarget, isDesignMode]);

// 1) Apply header tokens
useEffect(() => {
  applyDesignTokens(tokensForHeader);
}, [tokensForHeader]);

// 2) Click-away to exit edit mode for Header
useEffect(() => {
  if (!isDesignMode) return;

  const onGlobalPointerDown = (e: MouseEvent) => {
    const root = headerSectionRef.current;
    const target = e.target as Node | null;

    if (!root || !target) return;          // no section yet
    if (root.contains(target)) return;     // click inside header -> ignore

    // Respect inspector click guard if you enable it:
    // if (wasClickInsideInspector()) return;

    setHeaderEditingTarget(null);          // click outside -> exit edit mode
  };

  // Use capture phase so we run before other handlers stopPropagation
  document.addEventListener("pointerdown", onGlobalPointerDown, true);
  return () => {
    document.removeEventListener("pointerdown", onGlobalPointerDown, true);
  };
}, [isDesignMode, setHeaderEditingTarget]);


const handleHeaderStyleChange = (updates: StyleUpdates) => {
  if (!headerEditingTarget || headerEditingTarget.componentKey !== "header") return;

  const { field } = headerEditingTarget;

  const setToken = (token: string, val: string | number) => {
    updateHeaderDesignToken(token, normalizeValue(token, String(val)));
  };

  // generic text family: font, size, weight, transform, align, line-height, color
  const mapCommon = (prefix: string) => {
    if (updates.fontFamily)    setToken(`--${prefix}-font-family-${HEADER_SUFFIX}`, updates.fontFamily);
    if (updates.fontSize)      setToken(`--${prefix}-font-size-${HEADER_SUFFIX}`, updates.fontSize);
    if (updates.fontWeight)    setToken(`--${prefix}-font-weight-${HEADER_SUFFIX}`, updates.fontWeight);
    if (updates.textTransform) setToken(`--${prefix}-text-transform-${HEADER_SUFFIX}`, updates.textTransform);
    if (updates.textAlign)     setToken(`--${prefix}-text-align-${HEADER_SUFFIX}`, updates.textAlign);
    if (updates.lineHeight)    setToken(`--${prefix}-line-height-${HEADER_SUFFIX}`, updates.lineHeight);
    if (updates.textColor)     setToken(`--${prefix}-color-${HEADER_SUFFIX}`, updates.textColor);
  };

  switch (field) {
    /** Whole header section container */
    case "section": {
      if (updates.backgroundColor) setToken(`--header-section-bg-${HEADER_SUFFIX}`, updates.backgroundColor);
      break;
    }

    /** Logo image block */
    case "logo": {
      if (updates.maxHeight) setToken(`--header-logo-max-height-${HEADER_SUFFIX}`, updates.maxHeight);
      break;
    }

    /** Menu wrapper (e.g., center/left/right alignment) */
    case "menuWrap": {
      if (updates.textAlign) setToken(`--header-menu-text-align-${HEADER_SUFFIX}`, updates.textAlign);
      break;
    }

    /** Top-level menu links */
    case "menuItem": {
      mapCommon("header-menu-item");
      break;
    }

    /** Dropdown container + items */
    case "dropdown": {
      if (updates.backgroundColor) setToken(`--header-dropdown-bg-${HEADER_SUFFIX}`, updates.backgroundColor);
      mapCommon("header-dropdown-item");
      break;
    }

    /** Auth links (Login / Register) */
    case "authLink": {
      mapCommon("header-auth");
      break;
    }

    /** Header right-side icons (search, heart, bag) */
    case "widgetIcon": {
      // treat like text, but the tokens are named for icons
      if (updates.fontSize)   setToken(`--header-widget-icon-font-size-${HEADER_SUFFIX}`, updates.fontSize);
      if (updates.fontWeight) setToken(`--header-widget-icon-font-weight-${HEADER_SUFFIX}`, updates.fontWeight);
      if (updates.textColor)  setToken(`--header-widget-icon-color-${HEADER_SUFFIX}`, updates.textColor);
      // (bg not typically applied on the icon itself in this template)
      break;
    }

    /** Mobile hamburger button */
    case "mobileButton": {
      if (updates.fontSize)       setToken(`--header-mobile-button-font-size-${HEADER_SUFFIX}`, updates.fontSize);
      if (updates.textColor)      setToken(`--header-mobile-button-color-${HEADER_SUFFIX}`, updates.textColor);
      if (updates.backgroundColor)setToken(`--header-mobile-button-bg-${HEADER_SUFFIX}`, updates.backgroundColor);
      if (updates.fontWeight)     setToken(`--header-mobile-button-font-weight-${HEADER_SUFFIX}`, updates.fontWeight);
      if (updates.textAlign)      setToken(`--header-mobile-button-text-align-${HEADER_SUFFIX}`, updates.textAlign);
      break;
    }

    default:
      break;
  }
};

// Token helper (header/global)
// Suffix for design tokens naming (Header)
const HEADER_SUFFIX = "global-0";
const getHeaderToken = (key: string, index?: number) => {
  const suffix = index !== undefined ? `global-${index}` : "global-0";
  return `--header-${key}-${suffix}`;
};

// Which fields can open the style/content inspector for Header
const headerAllowedFields = [
  "section",      // whole header container
  "logo",         // logo image
  "menuWrap",     // nav wrapper (alignment)
  "menuItem",     // top-level menu link styles
  "dropdown",     // dropdown bg + items
  "authLink",     // Login / Register
  "widgetIcon",   // search / heart / bag icons
  "mobileButton", // hamburger button
] as const;

// Show inspector when in design mode and a valid header field is targeted
const showHeaderInspector =
  isDesignMode &&
  headerEditingTarget?.componentKey === "header" &&
  headerAllowedFields.includes(
    headerEditingTarget.field as (typeof headerAllowedFields)[number]
  );













  // Design-token backed styles (only: font family, size, color, bg, weight, align)
  const baseFont = "var(--header-font-family-global-0, Montserrat, sans-serif)";

  const headerStyle = {
    backgroundColor: "var(--header-section-bg-global-0, #ffffff)",
  };

  const menuWrapStyle = { textAlign: "center" };


  const menuLinkStyle = {
    fontFamily: baseFont,
    fontSize: "var(--header-menu-item-font-size-global-0, 15px)",
    fontWeight: "var(--header-menu-item-font-weight-global-0, 500)",
    color: "var(--header-menu-item-color-global-0, #111111)",
    textTransform: "uppercase",
    backgroundColor: "transparent",
  };

  const dropdownStyle = {
    backgroundColor: "var(--header-dropdown-bg-global-0, #111111)",
  };

  const dropdownLinkStyle = {
    fontFamily: baseFont,
    fontSize: "var(--header-dropdown-item-font-size-global-0, 14px)",
    fontWeight: "var(--header-dropdown-item-font-weight-global-0, 400)",
    color: "var(--header-dropdown-item-color-global-0, #ffffff)",
    textAlign: "var(--header-dropdown-text-align-global-0, left)",
    backgroundColor: "transparent",
  };

  const authLinkStyle = {
    fontFamily: baseFont,
    fontSize: "var(--header-auth-font-size-global-0, 12px)",
    fontWeight: "var(--header-auth-font-weight-global-0, 400)",
    color: "var(--header-auth-color-global-0, #666666)",
    backgroundColor: "transparent",
  };

  const widgetLinkStyle = {
    fontFamily: baseFont,
    fontSize: "var(--header-widget-icon-font-size-global-0, 18px)",
    fontWeight: "var(--header-widget-icon-font-weight-global-0, 400)",
    color: "var(--header-widget-icon-color-global-0, #111111)",
    backgroundColor: "transparent",
  };

  const menuListCenterStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  gap: "var(--header-menu-gap-global-0, 40px)",
  margin: 0,
  paddingLeft: 0,
};

  // Search overlay state (matches original template behavior/classes)
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header ref={headerSectionRef} className="header" style={headerStyle}>
      <div className="container-fluid">
        <div className="row align-items-center">
          {/* Logo */}
          <div className="col-xl-3 col-lg-2">
            <div
              className="header__logo"
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <a href="/" style={{ display: "inline-flex", alignItems: "center" }}>
                <img
                  src="https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/ecommerce/fashio/logo.png"
                  alt="Logo"
                  style={{
                    maxHeight: "var(--header-logo-max-height-global-0, 70px)",
                    width: "auto",
                    display: "block",
                  }}
                />
              </a>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="col-xl-6 col-lg-7">
          <nav className="header__menu" style={menuWrapStyle}>
                  <ul>
                    {menu.map((item, idx) => (
                      <li key={`menu-${idx}`} className={item.active ? "active" : undefined}>
                        {isDesignMode &&
                        headerEditingTarget?.componentKey === "header" &&
                        headerEditingTarget.field === "menu" &&
                        headerEditingTarget.index === idx &&
                        headerEditingTarget.subIndex === undefined ? (
                          <textarea
                            ref={(el) => {
                              menuLabelRefs.current[idx] = el;
                              const pos = menuClickPosRefs.current[idx];
                              if (el && typeof pos === "number") {
                                el.selectionStart = el.selectionEnd = pos;
                                menuClickPosRefs.current[idx] = undefined as any;
                              }
                            }}
                            value={item.label}
                            onChange={(e) => {
                              const next = [...menu];
                              next[idx] = { ...next[idx], label: e.target.value };
                              updateHeaderComponentProps("global", "header", { menu: next });
                            }}
                            onClick={(e) => {
                              setClickedInsideInspector();
                              e.stopPropagation();
                            }}
                          />
                        ) : (
                          <a
                            href={item.href}
                            onMouseDown={(e) => {
                              if (!isDesignMode) return;
                              const r = (document as any).caretRangeFromPoint?.(e.clientX, e.clientY);
                              if (r && typeof r.startOffset === "number") {
                                menuClickPosRefs.current[idx] = r.startOffset;
                              }
                            }}
                            onClick={(e) => {
                              if (!isDesignMode) return;
                              e.preventDefault();
                              e.stopPropagation();
                              setHeaderEditingTarget({
                                route: "global",
                                componentKey: "header",
                                field: "menu",
                                index: idx,
                              });
                            }}
                          >
                            {item.label}
                          </a>
                        )}

                        {Array.isArray(item.dropdown) && item.dropdown.length > 0 && (
                          <ul className="dropdown">
                            {item.dropdown.map((dd, j) => (
                              <li key={`menu-${idx}-dd-${j}`}>
                                {isDesignMode &&
                                headerEditingTarget?.componentKey === "header" &&
                                headerEditingTarget.field === "menu" &&
                                headerEditingTarget.index === idx &&
                                headerEditingTarget.subIndex === j ? (
                                  <textarea
                                    ref={(el) => {
                                      if (!menuDropdownLabelRefs.current[idx]) {
                                        menuDropdownLabelRefs.current[idx] = [];
                                      }
                                      menuDropdownLabelRefs.current[idx][j] = el;
                                      const pos = dropdownClickPosRefs.current[idx]?.[j];
                                      if (el && typeof pos === "number") {
                                        el.selectionStart = el.selectionEnd = pos;
                                        if (!dropdownClickPosRefs.current[idx]) {
                                          dropdownClickPosRefs.current[idx] = [];
                                        }
                                        dropdownClickPosRefs.current[idx][j] = undefined as any;
                                      }
                                    }}
                                    value={dd.label}
                                    onChange={(e) => {
                                      const next = [...menu];
                                      const ddArr = (next[idx].dropdown ?? []).slice();
                                      ddArr[j] = { ...ddArr[j], label: e.target.value };
                                      next[idx] = { ...next[idx], dropdown: ddArr };
                                      updateHeaderComponentProps("global", "header", { menu: next });
                                    }}
                                    onClick={(e) => {
                                      setClickedInsideInspector();
                                      e.stopPropagation();
                                    }}
                                  />
                                ) : (
                                  <a
                                    href={dd.href}
                                    onMouseDown={(e) => {
                                      if (!isDesignMode) return;
                                      const r = (document as any).caretRangeFromPoint?.(e.clientX, e.clientY);
                                      if (r && typeof r.startOffset === "number") {
                                        if (!dropdownClickPosRefs.current[idx]) {
                                          dropdownClickPosRefs.current[idx] = [];
                                        }
                                        dropdownClickPosRefs.current[idx][j] = r.startOffset;
                                      }
                                    }}
                                    onClick={(e) => {
                                      if (!isDesignMode) return;
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setHeaderEditingTarget({
                                        route: "global",
                                        componentKey: "header",
                                        field: "menu",
                                        index: idx,
                                        subIndex: j,
                                      });
                                    }}
                                  >
                                    {dd.label}
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>


          </div>

          {/* Right Side */}
          <div className="col-lg-3">
            <div
              className="header__right"
              style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}
            >
             <div className="header__right__auth">
               
              {/* Login (editable) */}
              {isDesignMode &&
              headerEditingTarget?.componentKey === "header" &&
              headerEditingTarget.field === "auth.loginLabel" ? (
                <textarea
                  ref={(el) => {
                    loginLabelRef.current = el;
                    if (el && loginClickPosRef.current !== null) {
                      el.selectionStart = el.selectionEnd = loginClickPosRef.current;
                      loginClickPosRef.current = null;
                    }
                  }}
                  value={auth?.loginLabel ?? "Login"}
                  onChange={(e) => {
                    // merge back into overlay props
                    updateHeaderComponentProps("global", "header", {
                      auth: { ...(auth || {}), loginLabel: e.target.value },
                    });
                  }}
                  onClick={(e) => {
                    setClickedInsideInspector();
                    e.stopPropagation();
                  }}
                  style={{
                    width: "100%",
                    fontFamily: "var(--header-font-family-global-0, Montserrat, sans-serif)",
                    fontSize: "var(--header-auth-font-size-global-0, 12px)",
                    fontWeight: "var(--header-auth-font-weight-global-0, 400)",
                    color: "var(--header-auth-color-global-0, #666666)",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    resize: "none",
                    whiteSpace: "pre-wrap",
                  }}
                />
              ) : (
                <a
                  href="#"
                  style={authLinkStyle}
                  onMouseDown={(e) => {
                    if (!isDesignMode) return;
                    const r = (document as any).caretRangeFromPoint?.(e.clientX, e.clientY);
                    if (r && typeof r.startOffset === "number") {
                      loginClickPosRef.current = r.startOffset;
                    }
                  }}
                  onClick={(e) => {
                    if (!isDesignMode) return;
                    e.preventDefault();
                    e.stopPropagation();
                    setHeaderEditingTarget({
                      route: "global",
                      componentKey: "header",
                      field: "auth.loginLabel",
                    });
                  }}
                >
                  {auth?.loginLabel ?? "Login"}
                </a>
              )}



                {/* Register (editable) */}
                {isDesignMode &&
                headerEditingTarget?.componentKey === "header" &&
                headerEditingTarget.field === "auth.registerLabel" ? (
                  <textarea
                    ref={(el) => {
                      registerLabelRef.current = el;
                      if (el && registerClickPosRef.current !== null) {
                        el.selectionStart = el.selectionEnd = registerClickPosRef.current;
                        registerClickPosRef.current = null;
                      }
                    }}
                    value={auth?.registerLabel ?? "Register"}
                    onChange={(e) => {
                      updateHeaderComponentProps("global", "header", {
                        auth: { ...(auth || {}), registerLabel: e.target.value },
                      });
                    }}
                    onClick={(e) => {
                      setClickedInsideInspector();
                      e.stopPropagation();
                    }}
                    style={{
                      width: "100%",
                      fontFamily: "var(--header-font-family-global-0, Montserrat, sans-serif)",
                      fontSize: "var(--header-auth-font-size-global-0, 12px)",
                      fontWeight: "var(--header-auth-font-weight-global-0, 400)",
                      color: "var(--header-auth-color-global-0, #666666)",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      resize: "none",
                      whiteSpace: "pre-wrap",
                    }}
                  />
                ) : (
                  <a
                    href="#"
                    style={authLinkStyle}
                    onMouseDown={(e) => {
                      if (!isDesignMode) return;
                      const r = (document as any).caretRangeFromPoint?.(e.clientX, e.clientY);
                      if (r && typeof r.startOffset === "number") {
                        registerClickPosRef.current = r.startOffset;
                      }
                    }}
                    onClick={(e) => {
                      if (!isDesignMode) return;
                      e.preventDefault();
                      e.stopPropagation();
                      setHeaderEditingTarget({
                        route: "global",
                        componentKey: "header",
                        field: "auth.registerLabel",
                      });
                    }}
                  >
                    {auth?.registerLabel ?? "Register"}
                  </a>
                )}

            </div>

              <ul className="header__right__widget">
                <li>
                  <span
                    className="icon_search search-switch"
                    onClick={() => setSearchOpen(true)}
                  ></span>
                </li>
                <li>
                  <a href="#" style={widgetLinkStyle}>
                    <span className="icon_heart_alt"></span>
                    <div className="tip">2</div>
                  </a>
                </li>
                <li>
                  <a href="#" style={widgetLinkStyle}>
                    <span className="icon_bag_alt"></span>
                    <div className="tip">2</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="canvas__open">
          <i className="fa fa-bars"></i>
        </div>
      </div>

      {/* Search Overlay (original classes; no extra styling beyond show/hide) */}
      <div className="search-model" style={{ display: searchOpen ? "block" : "none" }}>
        <div className="d-flex align-items-center justify-content-center" style={{ height: "100%" }}>
          <div className="search-close-switch" onClick={() => setSearchOpen(false)}>+</div>
          <form className="search-model-form">
            <input type="text" id="search-input" placeholder="Search here....." />
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
