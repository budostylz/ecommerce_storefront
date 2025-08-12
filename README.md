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


## AI CI/CD Pipeline

Milestone 1 – Editable Text + Tokens (Baseline)
Scope (per page/component): Header, Footer, Home Hero, Contact
Deliverables

Overlay map fields fully wired to state (Zustand): updateComponentProps, setEditingTarget.

Tokenized styles (per-field) with consistent suffixes (e.g., --contact-heading-font-size-contact-1).

useApplyDesignTokens active and scoped to component tokens.

Click-to-edit UX with refs + focus management.

Acceptance Criteria

Clicking text enters edit mode; typing updates overlayMap and persists via store.

Tokens change immediately (live CSS vars).

No full-page navigations from mobile menus while editing.

Core Tasks

Normalize token helpers: getToken(key, index?) and CONTACT_SUFFIX.

Finish editable blocks for Contact (address/phone/support + labels, SEND MESSAGE).

Ensure setEditingTarget(null) on escape/blur/outside click.

QA Checklist

Desktop & mobile editing flows.

Persist & reload state across sessions.

No console errors; strict TS passes.

Artifacts

Updated overlayMap & designTokens.

Component examples with comments.

“Editable Field Map” table in docs.

Milestone 2 – Style Inspector + Rules Engine
Scope: Global inspector component + adapters per component type
Deliverables

FloatingStyleInspector fully wired with handleStyleChange maps per field.

Normalization helpers finalized (normalizeValue for units, font, padding).

Field → token maps documented (title, label, text, button).

Mobile/desktop token variants handled (e.g., --*-mobile-*).

Acceptance Criteria

Changing inspector controls updates tokens instantly.

Only allowed tokens for the active field are mutated.

Inspector closes on outside click and ESC; does not steal scroll.

Core Tasks

Implement clickedInside guard + global click listener to exit edit mode.

Add per-field token switches (e.g., button padding Y/X split).

Add form placeholder style mapping (if needed).

QA Checklist

Inspector for Contact + at least one other component.

Token updates no-op when field doesn’t declare that token.

Consistent suffixing across pages.

Artifacts

“Style Token Contract” doc (prefixes, suffixes, per-field mappings).

Inspector API reference & examples.

Milestone 3 – Data/Logic Integration + CI/CD Hooks
Scope: State sync, content APIs, preview + pipeline
Deliverables

Optional Firestore (or API) sync layer for overlayMap/designTokens.

Import/export snapshots (JSON) for environments (dev → stage → prod).

Git CI: schema validation, token linter, snapshot tests.

AI CI/CD glue: template registration, field autodiscovery, codegen hooks.

Acceptance Criteria

“Save to Remote” and “Load from Remote” round-trips work.

Pipeline runs: validate schema → generate typed stores → deploy preview.

Canary deploy with feature flag for inspector.

Core Tasks

Add syncOverlay({ overlayMap, designTokens }) + loadOverlay().

JSON schemas + Zod validators; snapshot diffs in PR checks.

CLI or script to register new components/fields to AI pipeline.

QA Checklist

Offline → online sync conflict strategy (last-write-wins or merge).

Rollback from snapshot.

Pipeline green on a cold repo clone.

Artifacts

/docs/pipeline.md with steps & commands.

/scripts/overlay-sync.ts (or equivalent).

JSON schema & linter rules.

Bonus: Doc Snippets to Include
Naming Convention: --<component>-<field>-<prop>-<page-suffix>

Editable Target Shape: { route, componentKey, field, index? }

Store APIs: updateComponentProps, updateDesignToken, setEditingTarget, getComponentTokens

Exit Edit Mode: Global click listener + ESC handler + setEditingTarget(null)

