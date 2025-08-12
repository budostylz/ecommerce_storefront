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
  } = {
    address: props.address ?? overlay?.props?.address ?? "66 West Flagler St, Miami, Florida, 33130",
    phones: props.phones ?? overlay?.props?.phones ?? ["125-711-811", "125-668-886"],
    supportEmail: props.supportEmail ?? overlay?.props?.supportEmail ?? "Support.photography@gmail.com",
    mapSrc:
      props.mapSrc ??
      overlay?.props?.mapSrc ??
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3586.547649012345!2d-80.1950148236409!3d25.774265911945164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b69f4d0d69cf%3A0x28a55d3ad739888!2s66%20W%20Flagler%20St%2C%20Miami%2C%20FL%2033130!5e0!3m2!1sen!2sus!4v1691777777777!5m2!1sen!2sus",
    onSubmit: props.onSubmit,
  };

  const [form, setForm] = useState({ name: "", email: "", website: "", message: "" });


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
                <h5
                  style={{
                    fontFamily: "var(--contact-heading-font-family-contact-1)",
                    fontSize: "var(--contact-heading-font-size-contact-1)",
                    fontWeight: "var(--contact-heading-font-weight-contact-1)",
                    textTransform: "var(--contact-heading-text-transform-contact-1)",
                    color: "var(--contact-heading-color-contact-1)",
                    marginBottom: "var(--contact-heading-margin-bottom-contact-1)",
                  }}
                >
                  Contact info
                </h5>
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
