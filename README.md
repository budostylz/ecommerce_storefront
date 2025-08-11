## Template
[Template](https://colorlib.com/wp/template/ashion/)

## Recommended structure (Firestore)
/users/{uid}
/projects/{projectId}
/projects/{projectId}/pages/{pageId}
/projects/{projectId}/components/{componentId}
/projects/{projectId}/designTokens/{tokenSetId}
/projects/{projectId}/overlayMap/{overlayId}
/projects/{projectId}/versions/{versionId}
/projects/{projectId}/deployments/{deploymentId}

/templates/{templateId}
/templates/{templateId}/pages/{pageId}
/templates/{templateId}/designTokens/{tokenSetId}
/templates/{templateId}/overlayMap/{overlayId}

// /projects/{projectId}/pages/{pageId}
{
  projectId,           // stable
  uid,                 // owner
  templateId,          // which template
  pageType,            // 'home' | 'shop' | 'product' | ...
  updatedAt,
  // template-specific fields live here:
  custom: { ... },     // freeform per template/schema version
  schema: {            // reference to schema
    templateId,
    version: 'v1.3.0'
  }
}


## Assets
https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/ecommerce/fashio/logo.png


1. Fashion E-commerce (already in progress)

Focus: Apparel, accessories, and lifestyle brands.

Key features: Product grid, category filtering, Instagram/social integration, lookbook.

2. Restaurant / Food Ordering

Focus: Restaurants, cafes, catering services.

Key features: Menu showcase, online ordering, reservations, Google Maps, gallery.

3. Portfolio / Creative Agency

Focus: Designers, photographers, artists, agencies.

Key features: Masonry gallery, project detail pages, service listings, contact form.

4. Corporate / SaaS Landing Page

Focus: Tech companies, startups, professional services.

Key features: Hero with call-to-action, feature grid, testimonials, pricing plans.

5. Fitness / Wellness Studio

Focus: Gyms, yoga studios, personal trainers.

Key features: Class schedule, trainer profiles, membership pricing, booking form.

6. Event / Conference

Focus: Events, conferences, workshops.

Key features: Agenda, speaker bios, ticket sales, location map.

7. Blog / Content Publication

Focus: News sites, personal blogs, niche content hubs.

Key features: Category archives, single post templates, social share integration.


Template picks (Colorlib → BudoBoost)
Fashion E-commerce – Ashion (you’re on it)

Pages: Home, Shop, Product, Cart, Checkout, Contact

Reuse: Header, Footer, ProductCard, ProductGrid, Filters, Breadcrumb

Restaurant / Food Ordering – Foodee (or Restaurantly)

Features: Menu sections, chef/team, gallery, reservation form, map

JS swaps: Lightbox → react-image-lightbox, carousel → Keen Slider

Portfolio / Creative Agency – Mona (or Karma)

Features: Masonry/Isotope grid, project details, services, CTA blocks

Reuse: CardGrid, Testimonial, Pricing, ContactForm

Corporate / SaaS Landing – SaaS (or Startup)

Features: Hero w/ CTA, feature grid, integrations, pricing, FAQ

Reuse: PricingTable, FeatureList, Newsletter, Stats

Fitness / Wellness Studio – Gym (or Yogalife)

Features: Class schedule, trainers, membership pricing, timetable

JS swaps: Timetable → simple state filters, carousel → Keen Slider

Event / Conference – Evento (or Conference)

Features: Agenda/schedule, speakers, tickets/pricing, venue map

Reuse: ScheduleList, SpeakerCard, TicketPricing, Countdown (→ react-countdown)

Blog / Publication – News (or Miniblog)

Features: Category list, article grid, single post, sidebar widgets

Note: Even if we de-emphasize blog, this doubles as a content marketing template