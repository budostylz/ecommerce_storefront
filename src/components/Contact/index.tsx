// src/components/Contact/index.tsx
import React, { useState } from "react";

type Props = {
  address?: string;
  phones?: string[];
  supportEmail?: string;
  mapSrc?: string;
  onSubmit?: (data: { name: string; email: string; website: string; message: string }) => void;
};

const Contact: React.FC<Props> = ({
  address = "66 West Flagler St, Miami, Florida, 33130",
  phones = ["125-711-811", "125-668-886"],
  supportEmail = "Support.photography@gmail.com",
  mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3586.547649012345!2d-80.1950148236409!3d25.774265911945164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b69f4d0d69cf%3A0x28a55d3ad739888!2s66%20W%20Flagler%20St%2C%20Miami%2C%20FL%2033130!5e0!3m2!1sen!2sus!4v1691777777777!5m2!1sen!2sus",
  onSubmit,
}) => {

  const [form, setForm] = useState({ name: "", email: "", website: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(form);
    // basic UX: clear after submit
    setForm({ name: "", email: "", website: "", message: "" });
  };

  return (
    <section className="contact spad">
      <div className="container">
        <div className="row">
          {/* Left: Info + Form */}
          <div className="col-lg-6 col-md-6">
            <div className="contact__content">
              <div className="contact__address">
                <h5>Contact info</h5>
                <ul>
                  <li>
                    <h6>
                      <i className="fa fa-map-marker" /> Address
                    </h6>
                    <p>{address}</p>
                  </li>
                  <li>
                    <h6>
                      <i className="fa fa-phone" /> Phone
                    </h6>
                    <p>
                      {phones.map((p, i) => (
                        <span key={i} style={{ marginRight: 12 }}>
                          {p}
                        </span>
                      ))}
                    </p>
                  </li>
                  <li>
                    <h6>
                      <i className="fa fa-headphones" /> Support
                    </h6>
                    <p>{supportEmail}</p>
                  </li>
                </ul>
              </div>

              <div className="contact__form">
                <h5>SEND MESSAGE</h5>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="website"
                    placeholder="Website"
                    value={form.website}
                    onChange={handleChange}
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                  <button type="submit" className="site-btn">
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
                height={780}
                style={{ border: 0, width: "100%" }}
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
