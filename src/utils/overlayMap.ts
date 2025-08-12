// e.g. src/utils/overlayMap.ts (excerpt)
export const overlayMap = {
  global: {
    "footer": {
      component: "footer",
      props: {
        aboutText:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt cilisis.",
        quickLinks: ["About", "Blogs", "Contact", "FAQ"],
        accountLinks: ["My Account", "Orders Tracking", "Checkout", "Wishlist"],
        newsletterTitle: "NEWSLETTER",
        newsletterPlaceholder: "Email",
        newsletterButton: "Subscribe",
        socialLinks: [
          { icon: "fa fa-facebook", href: "#" },
          { icon: "fa fa-twitter", href: "#" },
          { icon: "fa fa-youtube-play", href: "#" },
          { icon: "fa fa-instagram", href: "#" },
          { icon: "fa fa-pinterest", href: "#" }
        ],
        copyrightText: `© ${new Date().getFullYear()} Crafted with passion <i class="fa fa-heart" aria-hidden="true"></i> on <a href="https://budoboost.com" target="_blank" rel="noopener noreferrer">BudoBoost</a> — Empowering creators to launch beautiful sites in minutes.`
      },
      tokens: [
        "--footer-section-bg-global-0",
        "--footer-section-padding-top-global-0",
        "--footer-section-padding-bottom-global-0",

        "--footer-logo-max-width-global-0",
        "--footer-logo-margin-bottom-global-0",

        "--footer-about-text-font-size-global-0",
        "--footer-about-text-color-global-0",
        "--footer-about-text-margin-bottom-global-0",

        "--footer-payment-icon-gap-global-0",
        "--footer-payment-icon-margin-bottom-global-0",

        "--footer-widget-title-font-size-global-0",
        "--footer-widget-title-color-global-0",
        "--footer-widget-title-font-weight-global-0",
        "--footer-widget-title-text-transform-global-0",
        "--footer-widget-title-margin-bottom-global-0",

        "--footer-link-font-size-global-0",
        "--footer-link-color-global-0",
        "--footer-link-line-height-global-0",
        "--footer-link-hover-color-global-0",

        "--footer-newsletter-title-font-size-global-0",
        "--footer-newsletter-title-color-global-0",
        "--footer-newsletter-title-font-weight-global-0",
        "--footer-newsletter-title-text-transform-global-0",
        "--footer-newsletter-title-margin-bottom-global-0",

        "--footer-newsletter-input-height-global-0",
        "--footer-newsletter-input-border-color-global-0",
        "--footer-newsletter-input-border-radius-global-0",
        "--footer-newsletter-input-font-size-global-0",
        "--footer-newsletter-input-text-color-global-0",
        "--footer-newsletter-input-bg-global-0",
        "--footer-newsletter-input-padding-x-global-0",
        "--footer-newsletter-input-placeholder-color-global-0",

        "--footer-button-font-size-global-0",
        "--footer-button-text-color-global-0",
        "--footer-button-bg-global-0",
        "--footer-button-font-weight-global-0",
        "--footer-button-text-transform-global-0",
        "--footer-button-padding-y-global-0",
        "--footer-button-padding-x-global-0",
        "--footer-button-border-radius-global-0",

        "--footer-social-size-global-0",
        "--footer-social-bg-global-0",
        "--footer-social-icon-font-size-global-0",
        "--footer-social-icon-color-global-0",
        "--footer-social-gap-global-0",

        "--footer-copyright-border-color-global-0",
        "--footer-copyright-padding-top-global-0",
        "--footer-copyright-padding-bottom-global-0",
        "--footer-copyright-text-align-global-0",
        "--footer-copyright-margin-top-global-0",
        "--footer-copyright-text-color-global-0",
        "--footer-copyright-link-color-global-0",
        "--footer-copyright-link-hover-color-global-0",
        "--footer-copyright-heart-color-global-0"
      ]
    }
  },
'/contact': {
    contact: {
      id: 'component-contact',
      component: 'Contact',
      position: {
        x: 0,
        y: 'auto',
        width: '100%',
        zIndex: 1
      },
      props: {
        contactInfo:'Contact info',
        sendMessageLabel:'SEND MESSAGE',
        sendMessageButton:'Send Message Button',
        addressLabel: 'Address',
        address: '66 West Flagler St, Miami, Florida, 33130',
        phoneLabel:'Phone',
        phones: ['125-711-811', '125-668-886'],
        supportLabel:'Support',
        supportEmail: 'Support.photography@gmail.com',
        mapSrc:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3586.547649012345!2d-80.1950148236409!3d25.774265911945164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b69f4d0d69cf%3A0x28a55d3ad739888!2s66%20W%20Flagler%20St%2C%20Miami%2C%20FL%2033130!5e0!3m2!1sen!2sus!4v1691777777777!5m2!1sen!2sus'
      },
      tokens: [
        /* ===== Section ===== */
        '--contact-section-bg-contact-1',
        '--contact-section-padding-top-contact-1',
        '--contact-section-padding-bottom-contact-1',

        /* ===== Headings ===== */
        '--contact-heading-font-family-contact-1',
        '--contact-heading-font-size-contact-1',
        '--contact-heading-font-weight-contact-1',
        '--contact-heading-text-transform-contact-1',
        '--contact-heading-color-contact-1',
        '--contact-heading-margin-bottom-contact-1',

        /* ===== Address / Info ===== */
        '--contact-info-item-gap-contact-1',
        '--contact-info-title-font-size-contact-1',
        '--contact-info-title-font-weight-contact-1',
        '--contact-info-title-color-contact-1',
        '--contact-info-text-font-size-contact-1',
        '--contact-info-text-color-contact-1',
        '--contact-info-icon-size-contact-1',
        '--contact-info-icon-color-contact-1',
        '--contact-info-chip-gap-contact-1',

        /* ===== Form ===== */
        '--contact-form-heading-font-family-contact-1',
        '--contact-form-heading-font-size-contact-1',
        '--contact-form-heading-font-weight-contact-1',
        '--contact-form-heading-text-transform-contact-1',
        '--contact-form-heading-color-contact-1',
        '--contact-form-field-height-contact-1',
        '--contact-form-field-font-size-contact-1',
        '--contact-form-field-text-color-contact-1',
        '--contact-form-field-bg-contact-1',
        '--contact-form-field-border-color-contact-1',
        '--contact-form-field-border-radius-contact-1',
        '--contact-form-field-padding-x-contact-1',
        '--contact-form-field-margin-bottom-contact-1',
        '--contact-form-textarea-height-contact-1',
        '--contact-form-placeholder-color-contact-1',

        /* ===== Button ===== */
        '--contact-button-font-size-contact-1',
        '--contact-button-text-transform-contact-1',
        '--contact-button-font-weight-contact-1',
        '--contact-button-text-color-contact-1',
        '--contact-button-bg-contact-1',
        '--contact-button-padding-y-contact-1',
        '--contact-button-padding-x-contact-1',
        '--contact-button-border-radius-contact-1',

        /* ===== Map ===== */
        '--contact-map-height-contact-1',
        '--contact-map-border-width-contact-1',
        '--contact-map-width-contact-1',

        /* ===== Mobile ===== */
        '--contact-heading-font-size-mobile-contact-1',
        '--contact-section-padding-top-mobile-contact-1',
        '--contact-section-padding-bottom-mobile-contact-1',
        '--contact-form-field-margin-bottom-mobile-contact-1',
        '--contact-map-height-mobile-contact-1'
      ],
      editable: true
    }
  }
};
