// src/components/Contact/index.tsx
import React, { useEffect, useRef, useMemo, useState } from "react";
import { usePreviewStore } from "src/store/previewStore";
import { designTokens, applyDesignTokens } from "@/utils/designTokens";
import { overlayMap } from "@/utils/overlayMap";
import toast from "react-hot-toast";
import { setClickedInsideInspector } from "src/utils/inspectorClickGuard";
import { normalizeValue } from "src/utils/normalizeValue";
import FloatingStyleInspector from "@components/FloatingStyleInspector";


const Contact: React.FC<ContactProps> = (props) => {
  // Zustand state
  const overlayState = usePreviewStore((s) => s.overlayMap);
  const tokensBag = usePreviewStore((s) => s.designTokens);

  const updateComponentProps = usePreviewStore((s) => s.updateComponentProps);
  const updateDesignToken = usePreviewStore((s) => s.updateDesignToken);



  const editingTarget = usePreviewStore((s) => s.editingTarget);
  const setEditingTarget = usePreviewStore((s) => s.setEditingTarget);

  // This component’s overlay node
  const overlay = overlayState?.["/contact"]?.contact;

  console.log('overlayState: ', overlayState);
  console.log('tokensBag: ', tokensBag);
  console.log('updateDesignToken: ', updateDesignToken);
  console.log('editingTarget: ', editingTarget);
  console.log('setEditingTarget: ', setEditingTarget);
  console.log('overlay: ', overlay);

  // Refs for editable text fields
  const contactInfoRef = useRef<HTMLTextAreaElement | null>(null);       // "Contact info" heading
  const sendMessageLabelRef = useRef<HTMLTextAreaElement | null>(null);  // "SEND MESSAGE" label
  const sendMessageButtonRef = useRef<HTMLTextAreaElement | null>(null); // "Send Message" button text
  const addressRef = useRef<HTMLTextAreaElement | null>(null);           // Address text
  const phonesRef = useRef<Array<HTMLTextAreaElement | null>>([]);       // Phone numbers (array)
  const supportEmailRef = useRef<HTMLTextAreaElement | null>(null);      // Support email text

  // Form field placeholders (optional)
  const namePlaceholderRef = useRef<HTMLInputElement | null>(null);     // Name input placeholder
  const emailPlaceholderRef = useRef<HTMLInputElement | null>(null);    // Email input placeholder
  const websitePlaceholderRef = useRef<HTMLInputElement | null>(null);  // Website input placeholder
  const messagePlaceholderRef = useRef<HTMLTextAreaElement | null>(null); // Message textarea placeholder

  // Device detection
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);




  // Merge overlay props (if any) with incoming props; incoming wins
  const {
    address,
    phones,
    supportEmail,
    mapSrc,
    onSubmit,
    isDesignMode, 
  } = {
    address: props.address ?? overlay?.props?.address ?? "66 West Flagler St, Miami, Florida, 33130",
    phones: props.phones ?? overlay?.props?.phones ?? ["125-711-811", "125-668-886"],
    supportEmail: props.supportEmail ?? overlay?.props?.supportEmail ?? "Support.photography@gmail.com",
    mapSrc:
      props.mapSrc ??
      overlay?.props?.mapSrc ??
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3586.547649012345!2d-80.1950148236409!3d25.774265911945164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b69f4d0d69cf%3A0x28a55d3ad739888!2s66%20W%20Flagler%20St%2C%20Miami%2C%20FL%2033130!5e0!3m2!1sen!2sus!4v1691777777777!5m2!1sen!2sus",
    onSubmit: props.onSubmit,
    isDesignMode: props.isDesignMode ?? true,
  };

  const [form, setForm] = useState({ name: "", email: "", website: "", message: "" });

  console.log('isDesignMode: ', isDesignMode);

  // Only apply the tokens that this overlay cares about (values from designTokens)
  const tokensForContact = useMemo(() => {
    const keys = overlay?.tokens ?? [];
    console.log('keys: ', keys);
    const subset: Record<string, string> = {};
     console.log('subset: ', subset);
    keys.forEach((k: string) => {
      if (k in designTokens) subset[k] = (designTokens as any)[k];
    });
    // If overlay is missing (e.g., during dev), just fall back to all tokens
    return Object.keys(subset).length ? subset : designTokens;
  }, [overlay]);

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

  console.log('editingTarget CHECK: ', editingTarget);
  if (editingTarget?.componentKey === "contact") {
    switch (editingTarget.field) {
      case "contactInfo":
        contactInfoRef.current?.focus();
        break;
      case "sendMessageLabel":
        sendMessageLabelRef.current?.focus();
        break;
      case "sendMessageButton":
        sendMessageButtonRef.current?.focus();
        break;
      case "address":
        addressRef.current?.focus();
        break;
      case "phones":
        if (typeof editingTarget.index === "number") {
          phonesRef.current[editingTarget.index]?.focus();
        }
        break;
      case "supportEmail":
        supportEmailRef.current?.focus();
        break;
      case "namePlaceholder":
        namePlaceholderRef.current?.focus();
        break;
      case "emailPlaceholder":
        emailPlaceholderRef.current?.focus();
        break;
      case "websitePlaceholder":
        websitePlaceholderRef.current?.focus();
        break;
      case "messagePlaceholder":
        messagePlaceholderRef.current?.focus();
        break;
      default:
        break;
    }
  }
}, [editingTarget]);

useEffect(() => {
  if (!isDesignMode || !editingTarget) return;
  if (editingTarget.componentKey !== "contact") return;

  const field = editingTarget.field; // e.g., "contactInfo", "address", "phones"
  const page = "/contact"; // Contact lives under overlayMap["/contact"]

  const prefix = `--contact-${field}-`;
  const suffix = `contact-1`; // Matches your overlayMap token naming scheme

  const filteredKeys = (overlayMap[page]?.contact?.tokens || []).filter(
    (key: string) => key.startsWith(prefix) && key.endsWith(suffix)
  );

  filteredKeys.forEach((key: string) => {
    const value = designTokens[key];
    if (value !== undefined) {
      document.documentElement.style.setProperty(key, value);
    }
  });
}, [designTokens, editingTarget, isDesignMode]);


  useEffect(() => {
    applyDesignTokens(tokensForContact);
  }, [tokensForContact]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(form);
    setForm({ name: "", email: "", website: "", message: "" });
  };

const CONTACT_SUFFIX = "contact-1";

const handleStyleChange = (updates: StyleUpdates) => {
  if (!editingTarget || editingTarget.componentKey !== "contact") return;

  const { field } = editingTarget;

  console.log('Checking Field: ', field);

  // Helpers
  const setToken = (token: string, val: string) => {
    updateDesignToken(token, normalizeValue(token, val));
  };

  const mapCommon = (prefix: string) => {
    // Common text props for headings/labels
    if (updates.fontFamily) setToken(`--${prefix}-font-family-${CONTACT_SUFFIX}`, updates.fontFamily);
    if (updates.fontSize)   setToken(`--${prefix}-font-size-${CONTACT_SUFFIX}`, updates.fontSize);
    if (updates.fontWeight) setToken(`--${prefix}-font-weight-${CONTACT_SUFFIX}`, String(updates.fontWeight));
    if (updates.textTransform) setToken(`--${prefix}-text-transform-${CONTACT_SUFFIX}`, updates.textTransform);
    if (updates.textAlign)  setToken(`--${prefix}-text-align-${CONTACT_SUFFIX}`, updates.textAlign);
    if (updates.lineHeight) setToken(`--${prefix}-line-height-${CONTACT_SUFFIX}`, String(updates.lineHeight));
    if (updates.textColor)  setToken(`--${prefix}-color-${CONTACT_SUFFIX}`, updates.textColor);
  };

  switch (field) {
    /** Left column heading: "Contact info" */
    case "contactInfo": {
      mapCommon("contact-heading");
      break;
    }

    /** Form title: "SEND MESSAGE" */
    case "sendMessageLabel": {
      mapCommon("contact-form-heading");
      break;
    }

    /** Button: "Send Message" — special token mapping */
    case "sendMessageButton": {
      if (updates.fontSize)      setToken(`--contact-button-font-size-${CONTACT_SUFFIX}`, updates.fontSize);
      if (updates.textTransform) setToken(`--contact-button-text-transform-${CONTACT_SUFFIX}`, updates.textTransform);
      if (updates.fontWeight)    setToken(`--contact-button-font-weight-${CONTACT_SUFFIX}`, String(updates.fontWeight));
      if (updates.textColor)     setToken(`--contact-button-text-color-${CONTACT_SUFFIX}`, updates.textColor);
      if (updates.backgroundColor) setToken(`--contact-button-bg-${CONTACT_SUFFIX}`, updates.backgroundColor);
      if (updates.borderRadius)  setToken(`--contact-button-border-radius-${CONTACT_SUFFIX}`, updates.borderRadius);

      // padding -> split into Y / X
      if (updates.padding) {
        // Accept "12px 30px" or "12px 30px 12px 30px"
        const parts = updates.padding.trim().split(/\s+/);
        // CSS rules: 1->all, 2->Y/X, 3->T/X/B, 4->T/R/B/L; we only care Y & X
        let py = parts[0];
        let px = parts[0];
        if (parts.length === 2) {
          py = parts[0];
          px = parts[1];
        } else if (parts.length === 3) {
          py = parts[0];
          px = parts[1];
        } else if (parts.length >= 4) {
          py = parts[0]; // top
          px = parts[1]; // right
        }
        setToken(`--contact-button-padding-y-${CONTACT_SUFFIX}`, py);
        setToken(`--contact-button-padding-x-${CONTACT_SUFFIX}`, px);
      }
      break;
    }

    /** Address / Phones / Support email — share the same "info text" token family */
    case "address":
    case "phones":
    case "supportEmail": {
      if (updates.fontSize)  setToken(`--contact-info-text-font-size-${CONTACT_SUFFIX}`, updates.fontSize);
      if (updates.textColor) setToken(`--contact-info-text-color-${CONTACT_SUFFIX}`, updates.textColor);
      // (Optional) allow icon/spacing tweaks if your inspector ever exposes them:
      // if (updates.iconSize) setToken(`--contact-info-icon-size-${CONTACT_SUFFIX}`, updates.iconSize);
      // if (updates.gap) setToken(`--contact-info-item-gap-${CONTACT_SUFFIX}`, updates.gap);
      break;
    }

    /** Optional: labels like "Address", "Phone", "Support" map to the "title" token family */
    case "addressLabel":
    case "phoneLabel":
    case "supportLabel": {
      if (updates.fontSize)   setToken(`--contact-info-title-font-size-${CONTACT_SUFFIX}`, updates.fontSize);
      if (updates.fontWeight) setToken(`--contact-info-title-font-weight-${CONTACT_SUFFIX}`, String(updates.fontWeight));
      if (updates.textColor)  setToken(`--contact-info-title-color-${CONTACT_SUFFIX}`, updates.textColor);
      break;
    }

    default:
      // No-op for fields that are content-only (e.g., placeholders) or not style-driven
      break;
  }
};

const getToken = (key: string, index?: number) => {
  const suffix = index !== undefined ? `contact-${index}` : "contact-1";
  return `--contact-${key}-${suffix}`;
};


const allowedFields = [
  "contactInfo",
  "sendMessageLabel",
  "sendMessageButton",
  "address",
  "phones",
  "supportEmail",
  "namePlaceholder",
  "emailPlaceholder",
  "websitePlaceholder",
  "messagePlaceholder"
];

const showInspector =
  isDesignMode &&
  editingTarget?.componentKey === "contact" &&
  allowedFields.includes(editingTarget.field);

  return (
    <section
      id={overlay?.id ?? "component-contact"}
      className="contact spad"
      style={{
        background: "var(--contact-section-bg-contact-1)",
        paddingTop: "var(--contact-section-padding-top-contact-1)",
        paddingBottom: "var(--contact-section-padding-bottom-contact-1)",
      }}
    >
      <div className="container">
        {/* 🔥 Removed the custom gap that conflicted with Bootstrap rows */}
        <div className="row">
          {/* Left: Info + Form */}
          <div className="col-lg-6 col-md-6">
            <div className="contact__content">
              <div className="contact__address">
               {/* Contact Info heading (editable) */}
                  {isDesignMode &&
                  editingTarget?.componentKey === "contact" &&
                  editingTarget.field === "contactInfo" ? (
                    <textarea
                      ref={contactInfoRef}
                      value={overlay?.props?.contactInfo ?? "Contact info"}
                       onChange={(e) => {
                          updateComponentProps("/contact", "contact", {
                            contactInfo: e.target.value,
                          });
                        }}
                      onClick={(e) => {
                        setClickedInsideInspector();
                        e.stopPropagation();
                      }}
                      style={{
                        width: "100%",
                        fontFamily: "var(--contact-heading-font-family-contact-1)",
                        fontSize: "var(--contact-heading-font-size-contact-1)",
                        fontWeight: "var(--contact-heading-font-weight-contact-1)",
                        textTransform: "var(--contact-heading-text-transform-contact-1)",
                        color: "var(--contact-heading-color-contact-1)",
                        marginBottom: "var(--contact-heading-margin-bottom-contact-1)",
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        resize: "none",
                        whiteSpace: "pre-wrap",
                      }}
                    />
                  ) : (
                    <h5
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isDesignMode) {
                          setEditingTarget({
                            route: "/contact",
                            componentKey: "contact",
                            field: "contactInfo",
                          });
                        }
                      }}
                      style={{
                        fontFamily: "var(--contact-heading-font-family-contact-1)",
                        fontSize: "var(--contact-heading-font-size-contact-1)",
                        fontWeight: "var(--contact-heading-font-weight-contact-1)",
                        textTransform: "var(--contact-heading-text-transform-contact-1)",
                        color: "var(--contact-heading-color-contact-1)",
                        marginBottom: "var(--contact-heading-margin-bottom-contact-1)",
                      }}
                    >
                      {overlay?.props?.contactInfo ?? "Contact info"}
                    </h5>
                  )}

                <ul style={{ marginBottom: "var(--contact-info-item-gap-contact-1)" }}>
                  <li style={{ marginBottom: "var(--contact-info-item-gap-contact-1)" }}>
                    <h6
                      style={{
                        fontSize: "var(--contact-info-title-font-size-contact-1)",
                        fontWeight: "var(--contact-info-title-font-weight-contact-1)",
                        color: "var(--contact-info-title-color-contact-1)",
                        marginBottom: "10px",
                      }}
                    >
                      <i
                        className="fa fa-map-marker"
                        style={{
                          fontSize: "var(--contact-info-icon-size-contact-1)",
                          color: "var(--contact-info-icon-color-contact-1)",
                          marginRight: 5,
                        }}
                      />{" "}
                      Address
                    </h6>
                    <p
                      style={{
                        fontSize: "var(--contact-info-text-font-size-contact-1)",
                        color: "var(--contact-info-text-color-contact-1)",
                        marginBottom: 0,
                      }}
                    >
                      {address}
                    </p>
                  </li>

                  <li style={{ marginBottom: "var(--contact-info-item-gap-contact-1)" }}>
                    <h6
                      style={{
                        fontSize: "var(--contact-info-title-font-size-contact-1)",
                        fontWeight: "var(--contact-info-title-font-weight-contact-1)",
                        color: "var(--contact-info-title-color-contact-1)",
                        marginBottom: "10px",
                      }}
                    >
                      <i
                        className="fa fa-phone"
                        style={{
                          fontSize: "var(--contact-info-icon-size-contact-1)",
                          color: "var(--contact-info-icon-color-contact-1)",
                          marginRight: 5,
                        }}
                      />{" "}
                      Phone
                    </h6>
                    <p
                      style={{
                        fontSize: "var(--contact-info-text-font-size-contact-1)",
                        color: "var(--contact-info-text-color-contact-1)",
                        marginBottom: 0,
                      }}
                    >
                      {phones.map((p, i) => (
                        <span
                          key={i}
                          style={{ marginRight: "var(--contact-info-chip-gap-contact-1)" }}
                        >
                          {p}
                        </span>
                      ))}
                    </p>
                  </li>

                  <li style={{ marginBottom: "var(--contact-info-item-gap-contact-1)" }}>
                    <h6
                      style={{
                        fontSize: "var(--contact-info-title-font-size-contact-1)",
                        fontWeight: "var(--contact-info-title-font-weight-contact-1)",
                        color: "var(--contact-info-title-color-contact-1)",
                        marginBottom: "10px",
                      }}
                    >
                      <i
                        className="fa fa-headphones"
                        style={{
                          fontSize: "var(--contact-info-icon-size-contact-1)",
                          color: "var(--contact-info-icon-color-contact-1)",
                          marginRight: 5,
                        }}
                      />{" "}
                      Support
                    </h6>
                    <p
                      style={{
                        fontSize: "var(--contact-info-text-font-size-contact-1)",
                        color: "var(--contact-info-text-color-contact-1)",
                        marginBottom: 0,
                      }}
                    >
                      {supportEmail}
                    </p>
                  </li>
                </ul>
              </div>

              <div className="contact__form">
                <h5
                  style={{
                    fontFamily: "var(--contact-form-heading-font-family-contact-1)",
                    fontSize: "var(--contact-form-heading-font-size-contact-1)",
                    fontWeight: "var(--contact-form-heading-font-weight-contact-1)",
                    textTransform: "var(--contact-form-heading-text-transform-contact-1)",
                    color: "var(--contact-form-heading-color-contact-1)",
                    marginBottom: "35px",
                  }}
                >
                  SEND MESSAGE
                </h5>

                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={{
                      height: "var(--contact-form-field-height-contact-1)",
                      fontSize: "var(--contact-form-field-font-size-contact-1)",
                      color: "var(--contact-form-field-text-color-contact-1)",
                      background: "var(--contact-form-field-bg-contact-1)",
                      border: "1px solid var(--contact-form-field-border-color-contact-1)",
                      borderRadius: "var(--contact-form-field-border-radius-contact-1)",
                      paddingLeft: "var(--contact-form-field-padding-x-contact-1)",
                      marginBottom: "var(--contact-form-field-margin-bottom-contact-1)",
                    }}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={{
                      height: "var(--contact-form-field-height-contact-1)",
                      fontSize: "var(--contact-form-field-font-size-contact-1)",
                      color: "var(--contact-form-field-text-color-contact-1)",
                      background: "var(--contact-form-field-bg-contact-1)",
                      border: "1px solid var(--contact-form-field-border-color-contact-1)",
                      borderRadius: "var(--contact-form-field-border-radius-contact-1)",
                      paddingLeft: "var(--contact-form-field-padding-x-contact-1)",
                      marginBottom: "var(--contact-form-field-margin-bottom-contact-1)",
                    }}
                  />
                  <input
                    type="text"
                    name="website"
                    placeholder="Website"
                    value={form.website}
                    onChange={handleChange}
                    style={{
                      height: "var(--contact-form-field-height-contact-1)",
                      fontSize: "var(--contact-form-field-font-size-contact-1)",
                      color: "var(--contact-form-field-text-color-contact-1)",
                      background: "var(--contact-form-field-bg-contact-1)",
                      border: "1px solid var(--contact-form-field-border-color-contact-1)",
                      borderRadius: "var(--contact-form-field-border-radius-contact-1)",
                      paddingLeft: "var(--contact-form-field-padding-x-contact-1)",
                      marginBottom: "var(--contact-form-field-margin-bottom-contact-1)",
                    }}
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    style={{
                      height: "var(--contact-form-textarea-height-contact-1)",
                      fontSize: "var(--contact-form-field-font-size-contact-1)",
                      color: "var(--contact-form-field-text-color-contact-1)",
                      background: "var(--contact-form-field-bg-contact-1)",
                      border: "1px solid var(--contact-form-field-border-color-contact-1)",
                      borderRadius: "var(--contact-form-field-border-radius-contact-1)",
                      paddingLeft: "var(--contact-form-field-padding-x-contact-1)",
                      marginBottom: "14px",
                      resize: "none",
                    }}
                  />
                  <button
                    type="submit"
                    className="site-btn"
                    style={{
                      fontSize: "var(--contact-button-font-size-contact-1)",
                      textTransform: "var(--contact-button-text-transform-contact-1)",
                      fontWeight: "var(--contact-button-font-weight-contact-1)",
                      color: "var(--contact-button-text-color-contact-1)",
                      background: "var(--contact-button-bg-contact-1)",
                      padding:
                        "var(--contact-button-padding-y-contact-1) var(--contact-button-padding-x-contact-1)",
                      borderRadius: "var(--contact-button-border-radius-contact-1)",
                    }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right: Map */}
          <div className="col-lg-6 col-md-6">
            <div className="contact__map">
              <iframe
                src={mapSrc}
                style={{
                  height: "var(--contact-map-height-contact-1)",
                  borderWidth: "var(--contact-map-border-width-contact-1)",
                  width: "var(--contact-map-width-contact-1)",
                }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Location map"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
