// e.g. src/utils/overlayMap.ts (excerpt)
export const overlayMap = {
  global: {
    footer: {
      component: "footer",
      props: {
        logo: "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/ecommerce/fashio/logo.png",
        aboutText:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt cilisis.",
        quickLinksTitle: "Quick Links",
        quickLinks: ["About", "Blogs", "Contact", "FAQ"],
        accountTitle: "Account",
        accountLinks: ["My Account", "Orders Tracking", "Checkout", "Wishlist"],
        newsletterTitle: "Newsletter",
        newsletterPlaceholder: "Email",
        newsletterButton: "Subscribe",
        socialLinks: [
          { icon: "fa fa-facebook", href: "#" },
          { icon: "fa fa-twitter", href: "#" },
          { icon: "fa fa-youtube-play", href: "#" },
          { icon: "fa fa-instagram", href: "#" },
          { icon: "fa fa-pinterest", href: "#" }
        ],
        paymentIcons: [
          { src: "src/origin/base/web/img/payment/payment-1.png", alt: "Payment 1" },
          { src: "src/origin/base/web/img/payment/payment-2.png", alt: "Payment 2" },
          { src: "src/origin/base/web/img/payment/payment-3.png", alt: "Payment 3" },
          { src: "src/origin/base/web/img/payment/payment-4.png", alt: "Payment 4" },
          { src: "src/origin/base/web/img/payment/payment-5.png", alt: "Payment 5" }
        ],
        copyrightText: `© ${new Date().getFullYear()} Crafted with passion 🚀 on <a href="https://budoboost.com" target="_blank" rel="noopener noreferrer">BudoBoost</a> — Empowering creators to launch beautiful sites in minutes.`
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
    },
    header: {
      component: "Header",
      props: {
        logo: "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/ecommerce/fashio/logo.png",
        menu: [
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
              { label: "Blog Details", href: "./blog-details.html" }
            ]
          },
          { label: "Blog", href: "blog" },
          { label: "Contact", href: "contact" }
        ],
        auth: { loginLabel: "Login", registerLabel: "Register" },
        widgets: {
          showSearch: true,
          wishlistCount: 2,
          cartCount: 2
        }
      },
      tokens: [
        // section
        "--header-section-bg-global-0",

        // shared font family
        "--header-font-family-global-0",

        // menu
        "--header-menu-text-align-global-0",
        "--header-menu-item-font-size-global-0",
        "--header-menu-item-font-weight-global-0",
        "--header-menu-item-color-global-0",

        // dropdown
        "--header-dropdown-bg-global-0",
        "--header-dropdown-text-align-global-0",
        "--header-dropdown-item-font-size-global-0",
        "--header-dropdown-item-font-weight-global-0",
        "--header-dropdown-item-color-global-0",

        // auth links
        "--header-auth-font-size-global-0",
        "--header-auth-font-weight-global-0",
        "--header-auth-color-global-0",

        // right-side widgets (icons)
        "--header-widget-icon-font-size-global-0",
        "--header-widget-icon-font-weight-global-0",
        "--header-widget-icon-color-global-0",

        // logo
        "--header-logo-max-height-global-0"
      ]
    },
  },
  "/": {
    banner: {
      id: "component-banner",
      component: "Banner",
      position: {
        x: 0,
        y: "auto",
        width: "100%",
        zIndex: 1
      },
      props: {
        slides: [
          { title: "The Project Jacket", subtitle: "The Chloe Collection", linkText: "Shop Now" },
          { title: "The Project Jacket", subtitle: "The Chloe Collection", linkText: "Shop Now" },
          { title: "The Project Jacket", subtitle: "The Chloe Collection", linkText: "Shop Now" }
        ],
        backgroundImage: "src/origin/base/web/img/banner/banner-1.jpg",
        loop: true,
        align: "center",
        autoplayMs: 3000
      },
      tokens: [
        /* Slider alignment */
        "--banner-slider-text-align-home-1",

        /* Span (subtitle) */
        "--banner-text-span-font-family-home-1",
        "--banner-text-span-font-size-home-1",
        "--banner-text-span-color-home-1",
        "--banner-text-span-font-weight-home-1",

        /* H1 (title) */
        "--banner-text-h1-font-family-home-1",
        "--banner-text-h1-font-size-home-1",
        "--banner-text-h1-color-home-1",
        "--banner-text-h1-font-weight-home-1",

        /* Link */
        "--banner-text-link-color-home-1",
        "--banner-text-link-font-weight-home-1",

        /* Dots */
        "--banner-dots-dot-background-color-home-1",
        "--banner-dots-dot-background-color-home-2"
      ],
      editable: true
    },
    categories: {
      id: "component-categories",
      component: "Categories",
      position: {
        x: 0,
        y: "auto",
        width: "100%",
        zIndex: 1
      },
      props: {
        largeCategory: {
          title: "Women’s fashion",
          description:
            "Sitamet, consectetur adipiscing elit, sed do eiusmod tempor incidid-unt labore edolore magna aliquapendisse ultrices gravida.",
          linkLabel: "Shop now",
          backgroundImage: "src/origin/base/web/img/categories/category-1.jpg"
        },
        smallCategories: [
          { title: "Men’s fashion", items: "358 items", img: "src/origin/base/web/img/categories/category-2.jpg" },
          { title: "Kid’s fashion", items: "273 items", img: "src/origin/base/web/img/categories/category-3.jpg" },
          { title: "Cosmetics", items: "159 items", img: "src/origin/base/web/img/categories/category-4.jpg" },
          { title: "Accessories", items: "792 items", img: "src/origin/base/web/img/categories/category-5.jpg" }
        ]
      },
      tokens: [
        /* Large Category - Title */
        "--categories-large-title-font-family-home-1",
        "--categories-large-title-font-size-home-1",
        "--categories-large-title-font-weight-home-1",
        "--categories-large-title-color-home-1",
        "--categories-large-title-text-align-home-1",

        /* Large Category - Paragraph */
        "--categories-large-text-font-family-home-1",
        "--categories-large-text-font-size-home-1",
        "--categories-large-text-font-weight-home-1",
        "--categories-large-text-color-home-1",
        "--categories-large-text-line-height-home-1",
        "--categories-large-text-text-align-home-1",

        /* Large Category - Link */
        "--categories-large-link-font-family-home-1",
        "--categories-large-link-font-size-home-1",
        "--categories-large-link-font-weight-home-1",
        "--categories-large-link-color-home-1",
        "--categories-large-link-text-decoration-home-1",

        /* Large Category - Padding */
        "--categories-large-padding-left-home-1",
        "--categories-large-padding-top-home-1",

        /* Small Category - Title */
        "--categories-small-title-font-family-home-1",
        "--categories-small-title-font-size-home-1",
        "--categories-small-title-font-weight-home-1",
        "--categories-small-title-color-home-1",
        "--categories-small-title-text-align-home-1",

        /* Small Category - Paragraph */
        "--categories-small-text-font-family-home-1",
        "--categories-small-text-font-size-home-1",
        "--categories-small-text-font-weight-home-1",
        "--categories-small-text-color-home-1",
        "--categories-small-text-text-align-home-1",

        /* Small Category - Link */
        "--categories-small-link-font-family-home-1",
        "--categories-small-link-font-size-home-1",
        "--categories-small-link-font-weight-home-1",
        "--categories-small-link-color-home-1",
        "--categories-small-link-text-decoration-home-1"
      ],
      editable: true
    },
    discount: {
      id: "component-discount",
      component: "Discount",
      position: { x: 0, y: "auto", width: "100%", zIndex: 1 },
      props: {
        title: {
          span: "Discount",
          h2: "Summer 2019",
          h5: { prefix: "Sale", suffix: "50%" }
        },
        countdown: [
          { num: "22", label: "Days" },
          { num: "18", label: "Hour" },
          { num: "46", label: "Min" },
          { num: "05", label: "Sec" }
        ],
        image: "src/origin/base/web/img/discount.jpg",
        linkLabel: "Shop now"
      },
      tokens: [
        "--discount-title-span-font-family-home-1",
        "--discount-title-span-font-size-home-1",
        "--discount-title-span-color-home-1",
        "--discount-title-span-font-weight-home-1",
        "--discount-title-span-text-align-home-1",
        "--discount-title-h2-font-family-home-1",
        "--discount-title-h2-font-size-home-1",
        "--discount-title-h2-color-home-1",
        "--discount-title-h2-font-weight-home-1",
        "--discount-title-h2-text-align-home-1",
        "--discount-title-h5-font-family-home-1",
        "--discount-title-h5-font-size-home-1",
        "--discount-title-h5-color-home-1",
        "--discount-title-h5-font-weight-home-1",
        "--discount-title-h5-text-align-home-1",
        "--discount-title-h5-span-color-home-1",
        "--discount-title-h5-span-font-weight-home-1",
        "--discount-countdown-span-font-family-home-1",
        "--discount-countdown-span-font-size-home-1",
        "--discount-countdown-span-color-home-1",
        "--discount-countdown-span-font-weight-home-1",
        "--discount-countdown-span-text-align-home-1",
        "--discount-countdown-p-font-family-home-1",
        "--discount-countdown-p-font-size-home-1",
        "--discount-countdown-p-color-home-1",
        "--discount-countdown-p-font-weight-home-1",
        "--discount-countdown-p-text-align-home-1",
        "--discount-link-font-family-home-1",
        "--discount-link-font-size-home-1",
        "--discount-link-color-home-1",
        "--discount-link-font-weight-home-1",
        "--discount-link-background-color-home-1",
        "--discount-link-text-align-home-1"
      ],
      editable: true
    },
    product: {
      id: "component-product",
      component: "Product",
      position: { x: 0, y: "auto", width: "100%", zIndex: 1 },
      props: {
        sectionTitle: "New product",
        filters: [
          { label: "All", filter: "*", active: true },
          { label: "Women’s", filter: ".women" },
          { label: "Men’s", filter: ".men" },
          { label: "Kid’s", filter: ".kid" },
          { label: "Accessories", filter: ".accessories" },
          { label: "Cosmetics", filter: ".cosmetic" }
        ],
        items: [
          { img: "src/origin/base/web/img/product/product-1.jpg", label: "New", title: "Buttons tweed blazer", price: "$ 59.0", oldPrice: null, category: "women", stars: 5 },
          { img: "src/origin/base/web/img/product/product-2.jpg", label: null, title: "Flowy striped skirt", price: "$ 49.0", oldPrice: null, category: "men", stars: 5 },
          { img: "src/origin/base/web/img/product/product-3.jpg", label: "out of stock", title: "Cotton T-Shirt", price: "$ 59.0", oldPrice: null, category: "accessories", stars: 5 },
          { img: "src/origin/base/web/img/product/product-4.jpg", label: null, title: "Slim striped pocket shirt", price: "$ 59.0", oldPrice: null, category: "cosmetic", stars: 5 },
          { img: "src/origin/base/web/img/product/product-5.jpg", label: null, title: "Fit micro corduroy shirt", price: "$ 59.0", oldPrice: null, category: "kid", stars: 5 },
          { img: "src/origin/base/web/img/product/product-6.jpg", label: "Sale", title: "Tropical Kimono", price: "$ 49.0", oldPrice: "$ 59.0", category: "women men kid accessories cosmetic", stars: 5 },
          { img: "src/origin/base/web/img/product/product-7.jpg", label: null, title: "Contrasting sunglasses", price: "$ 59.0", oldPrice: null, category: "women men kid accessories cosmetic", stars: 5 },
          { img: "src/origin/base/web/img/product/product-8.jpg", label: "Sale", title: "Water resistant backpack", price: "$ 49.0", oldPrice: "$ 59.0", category: "women men kid accessories cosmetic", stars: 5 }
        ]
      },
      tokens: [
        "--product-section-title-h4-font-family-home-1",
        "--product-section-title-h4-font-size-home-1",
        "--product-section-title-h4-color-home-1",
        "--product-section-title-h4-font-weight-home-1",
        "--product-section-title-h4-text-align-home-1",
        "--product-filter-li-font-family-home-1",
        "--product-filter-li-font-size-home-1",
        "--product-filter-li-color-home-1",
        "--product-filter-li-font-weight-home-1",
        "--product-item-text-text-align-home-1",
        "--product-item-title-font-family-home-1",
        "--product-item-title-font-size-home-1",
        "--product-item-title-color-home-1",
        "--product-item-title-font-weight-home-1",
        "--product-item-rating-color-home-1",
        "--product-item-price-color-home-1",
        "--product-item-price-font-weight-home-1",
        "--product-item-oldprice-color-home-1",
        "--product-label-new-background-color-home-1",
        "--product-label-sale-background-color-home-1",
        "--product-label-stockout-background-color-home-1",
        "--product-label-text-color-home-1",
        "--product-label-font-weight-home-1"
      ],
      editable: true
    },
    services: {
      id: "component-services",
      component: "Services",
      position: { x: 0, y: "auto", width: "100%", zIndex: 1 },
      props: {
        items: [
          { icon: "fa-car", title: "Free Shipping", text: "For all oder over $99" },
          { icon: "fa-money", title: "Money Back Guarantee", text: "If good have Problems" },
          { icon: "fa-support", title: "Online Support 24/7", text: "Dedicated support" },
          { icon: "fa-headphones", title: "Payment Secure", text: "100% secure payment" },
        ]
      },
      tokens: [
        "--services-item-icon-color-home-1",
        "--services-item-icon-text-align-home-1",
        "--services-item-h6-font-family-home-1",
        "--services-item-h6-font-size-home-1",
        "--services-item-h6-color-home-1",
        "--services-item-h6-font-weight-home-1",
        "--services-item-h6-text-align-home-1",
        "--services-item-p-font-family-home-1",
        "--services-item-p-font-size-home-1",
        "--services-item-p-color-home-1",
        "--services-item-p-font-weight-home-1",
        "--services-item-p-text-align-home-1",
      ],
      editable: true
    },
    trend: {
      id: "component-trend",
      component: "Trend",
      position: { x: 0, y: "auto", width: "100%", zIndex: 1 },
      props: {
        columns: [
          {
            heading: "Hot Trend",
            items: [
              { img: "src/origin/base/web/img/trend/ht-1.jpg", title: "Chain bucket bag", price: "$ 59.0", stars: 5 },
              { img: "src/origin/base/web/img/trend/ht-2.jpg", title: "Pendant earrings", price: "$ 59.0", stars: 5 },
              { img: "src/origin/base/web/img/trend/ht-3.jpg", title: "Cotton T-Shirt", price: "$ 59.0", stars: 5 }
            ]
          },
          {
            heading: "Best seller",
            items: [
              { img: "src/origin/base/web/img/trend/bs-1.jpg", title: "Cotton T-Shirt", price: "$ 59.0", stars: 5 },
              { img: "src/origin/base/web/img/trend/bs-2.jpg", title: "Zip-pockets pebbled tote briefcase", price: "$ 59.0", stars: 5 },
              { img: "src/origin/base/web/img/trend/bs-3.jpg", title: "Round leather bag", price: "$ 59.0", stars: 5 }
            ]
          },
          {
            heading: "Feature",
            items: [
              { img: "src/origin/base/web/img/trend/f-1.jpg", title: "Bow wrap skirt", price: "$ 59.0", stars: 5 },
              { img: "src/origin/base/web/img/trend/f-2.jpg", title: "Metallic earrings", price: "$ 59.0", stars: 5 },
              { img: "src/origin/base/web/img/trend/f-3.jpg", title: "Flap cross-body bag", price: "$ 59.0", stars: 5 }
            ]
          }
        ]
      },
      tokens: [
        "--trend-section-title-h4-font-family-home-1",
        "--trend-section-title-h4-font-size-home-1",
        "--trend-section-title-h4-color-home-1",
        "--trend-section-title-h4-font-weight-home-1",
        "--trend-section-title-h4-text-align-home-1",
        "--trend-item-h6-font-family-home-1",
        "--trend-item-h6-font-size-home-1",
        "--trend-item-h6-color-home-1",
        "--trend-item-h6-font-weight-home-1",
        "--trend-item-h6-text-align-home-1",
        "--trend-rating-star-color-home-1",
        "--trend-rating-text-align-home-1",
        "--trend-price-font-family-home-1",
        "--trend-price-font-size-home-1",
        "--trend-price-color-home-1",
        "--trend-price-font-weight-home-1",
        "--trend-price-text-align-home-1",
        "--trend-column-heading-font-family-home-1",
        "--trend-column-heading-font-size-home-1",
        "--trend-column-heading-color-home-1",
        "--trend-column-heading-font-weight-home-1",
        "--trend-column-heading-text-align-home-1",
        "--trend-item-background-color-home-1"
      ],
      editable: true
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
        contactInfo: 'Contact info',
        sendMessageLabel: 'SEND MESSAGE',
        sendMessageButton: 'Send Message Button',
        addressLabel: 'Address',
        address: '66 West Flagler St, Miami, Florida, 33130',
        phoneLabel: 'Phone',
        phones: ['125-711-811', '125-668-886'],
        supportLabel: 'Support',
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
