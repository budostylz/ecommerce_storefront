// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

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
