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

  // Zustand state
  const overlayState = usePreviewStore((s) => s.overlayMap);
  const tokensBag = usePreviewStore((s) => s.designTokens);

  const updateComponentProps = usePreviewStore((s) => s.updateComponentProps);
  const updateDesignToken = usePreviewStore((s) => s.updateDesignToken);

  const editingTarget = usePreviewStore((s) => s.editingTarget);
  const setEditingTarget = usePreviewStore((s) => s.setEditingTarget);

  // This component’s overlay node
  const overlay = overlayState?.["global"]?.footer;

  console.log('overlayState-footer: ', overlayState);
  console.log('tokensBag-footer: ', tokensBag);
  console.log('updateDesignToken-footer: ', updateDesignToken);
  console.log('editingTarget-footer: ', editingTarget);
  console.log('setEditingTarget-footer: ', setEditingTarget);
  console.log('overlay-footer: ', overlay);

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
      overlay?.props?.logo ??
      "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/ecommerce/fashio/logo.png",

    aboutText:
      props.aboutText ??
      overlay?.props?.aboutText ??
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt cilisis.",

    quickLinksTitle:
      props.quickLinksTitle ??
      overlay?.props?.quickLinksTitle ??
      "QUICK LINKS",

    quickLinks:
      props.quickLinks ??
      overlay?.props?.quickLinks ??
      ["About", "Blogs", "Contact", "FAQ"],

    accountTitle:
      props.accountTitle ??
      overlay?.props?.accountTitle ??
      "ACCOUNT",

    accountLinks:
      props.accountLinks ??
      overlay?.props?.accountLinks ??
      ["My Account", "Orders Tracking", "Checkout", "Wishlist"],

    newsletterTitle:
      props.newsletterTitle ??
      overlay?.props?.newsletterTitle ??
      "NEWSLETTER",

    newsletterPlaceholder:
      props.newsletterPlaceholder ??
      overlay?.props?.newsletterPlaceholder ??
      "Email",

    newsletterButton:
      props.newsletterButton ??
      overlay?.props?.newsletterButton ??
      "Subscribe",

    socialLinks:
      props.socialLinks ??
      overlay?.props?.socialLinks ?? [
        { icon: "fa fa-facebook", href: "#" },
        { icon: "fa fa-twitter", href: "#" },
        { icon: "fa fa-youtube-play", href: "#" },
        { icon: "fa fa-instagram", href: "#" },
        { icon: "fa fa-pinterest", href: "#" },
      ],

    // list of image srcs for the payment badges
    paymentButtons:
      props.paymentButtons ??
      overlay?.props?.paymentButtons ?? [
        "/origin/base/web/img/payment/payment-1.png",
        "/origin/base/web/img/payment/payment-2.png",
        "/origin/base/web/img/payment/payment-3.png",
        "/origin/base/web/img/payment/payment-4.png",
        "/origin/base/web/img/payment/payment-5.png",
      ],

    copyrightText:
      props.copyrightText ??
      overlay?.props?.copyrightText ??
      `© ${new Date().getFullYear()} Crafted with passion <span aria-hidden="true">⚡️</span> on <a href="https://budoboost.com" target="_blank" rel="noopener noreferrer">BudoBoost</a> — Empowering creators to launch beautiful sites in minutes.`,

    onSubscribe: props.onSubscribe, // optional handler for newsletter submit
    isDesignMode: props.isDesignMode ?? true,
  } as const;
    
  console.log('isDesignMode: ', isDesignMode);


  




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
                    src="https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/ecommerce/fashio/logo.png"
                    alt="Logo"
                    style={{
                      // keep original look; token can shrink/grow if you set it
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt cilisis.
              </p>

              <div className="footer__payment">
                {[1, 2, 3, 4, 5].map((num) => (
                  <a
                    href="#"
                    key={num}
                    style={{
                      marginRight: "var(--footer-payment-gap-global-1, 6px)",
                      marginBottom: "var(--footer-payment-gap-global-1, 10px)",
                      display: "inline-block",
                    }}
                  >
                    <img
                      src={`/origin/base/web/img/payment/payment-${num}.png`}
                      alt={`Payment ${num}`}
                      style={{ height: "var(--footer-payment-icon-height-global-1, auto)" }}
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
                Quick links
              </h6>
              <ul>
                {["About", "Blogs", "Contact", "FAQ"].map((t) => (
                  <li key={t}>
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
                Account
              </h6>
              <ul>
                {["My Account", "Orders Tracking", "Checkout", "Wishlist"].map((t) => (
                  <li key={t}>
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

          {/* Newsletter */}
          <div className="col-lg-4 col-md-8 col-sm-8">
            <div className="footer__newslatter">
              <h6
                style={{
                  color: "var(--footer-heading-color-global-1, #111111)",
                  fontWeight: "var(--footer-heading-font-weight-global-1, 600)",
                  textTransform: "var(--footer-heading-text-transform-global-1, uppercase)",
                  marginBottom: "var(--footer-newsletter-heading-margin-bottom-global-1, 25px)",
                  fontSize: "var(--footer-heading-font-size-global-1, 16px)",
                }}
              >
                NEWSLETTER
              </h6>
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
                <button
                  type="submit"
                  className="site-btn"
                  // let `.site-btn` do the heavy lifting; tokens are optional overrides
                  style={{
                    background: "var(--footer-button-bg-global-1, #ca1515)",
                    color: "var(--footer-button-text-color-global-1, #ffffff)",
                    fontSize: "var(--footer-button-font-size-global-1, 14px)",
                    fontWeight: "var(--footer-button-font-weight-global-1, 600)",
                    textTransform: "var(--footer-button-text-transform-global-1, uppercase)",
                    padding: "var(--footer-button-padding-y-global-1, 12px) var(--footer-button-padding-x-global-1, 30px)",
                    borderRadius: "var(--footer-button-border-radius-global-1, 50px)",
                    position: "var(--footer-button-position-global-1, absolute)",
                    right: "var(--footer-button-right-global-1, 4px)",
                    top: "var(--footer-button-top-global-1, 4px)",
                  }}
                >
                  Subscribe
                </button>
              </form>

              <div className="footer__social">
                {["facebook", "twitter", "youtube-play", "instagram", "pinterest"].map((icon) => (
                  <a
                    key={icon}
                    href="#"
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
                    <i className={`fa fa-${icon}`} />
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
