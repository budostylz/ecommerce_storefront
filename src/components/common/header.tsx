// src/components/Header.tsx
import React, { useEffect, useRef, useMemo, useState } from "react";
import { usePreviewStore } from "src/store/previewStore";
import { designTokens, applyDesignTokens } from "@/utils/designTokens";
import { overlayMap } from "@/utils/overlayMap";
import toast from "react-hot-toast";
import { setClickedInsideInspector } from "src/utils/inspectorClickGuard";
import { normalizeValue } from "src/utils/normalizeValue";
import FloatingStyleInspector from "@components/FloatingStyleInspector";

const Header = () => {

  // Zustand state for Footer
  const headerOverlayState = usePreviewStore((s) => s.overlayMap);
  const headerTokensBag = usePreviewStore((s) => s.designTokens);

  const updateHeaderComponentProps = usePreviewStore((s) => s.updateComponentProps);
  const updateHeaderDesignToken = usePreviewStore((s) => s.updateDesignToken);

  const headerEditingTarget = usePreviewStore((s) => s.editingTarget);
  const setHeaderEditingTarget = usePreviewStore((s) => s.setEditingTarget);

  // This component’s overlay node
  const headerOverlay = headerOverlayState?.["global"]?.header;

  console.log("headerOverlayState: ", headerOverlayState);
  console.log("headerTokensBag: ", headerTokensBag);
  console.log("updateHeaderDesignToken: ", updateHeaderDesignToken);
  console.log("headerEditingTarget: ", headerEditingTarget);
  console.log("setHeaderEditingTarget: ", setHeaderEditingTarget);
  console.log("headerOverlay: ", headerOverlay);

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

  // Search overlay state (matches original template behavior/classes)
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="header" style={headerStyle}>
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
                <li>
                  <a href="/" style={menuLinkStyle}>Home</a>
                </li>
                <li>
                  <a href="#" style={menuLinkStyle}>Women’s</a>
                </li>
                <li>
                  <a href="#" style={menuLinkStyle}>Men’s</a>
                </li>
                <li className="active">
                  <a href="./shop.html" style={menuLinkStyle}>Shop</a>
                </li>
                <li>
                  <a href="#" style={menuLinkStyle}>Pages</a>
                  <ul className="dropdown" style={dropdownStyle}>
                    <li><a href="./product-details.html" style={dropdownLinkStyle}>Product Details</a></li>
                    <li><a href="./shop-cart.html" style={dropdownLinkStyle}>Shop Cart</a></li>
                    <li><a href="./checkout.html" style={dropdownLinkStyle}>Checkout</a></li>
                    <li><a href="./blog-details.html" style={dropdownLinkStyle}>Blog Details</a></li>
                  </ul>
                </li>
                <li>
                  <a href="contact" style={menuLinkStyle}>Contact</a>
                </li>
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
                <a href="#" style={authLinkStyle}>Login</a>
                <a href="#" style={authLinkStyle}>Register</a>
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
