import React from "react";

const Services = () => {
  return (
    <section className="services spad">
      {/* Design Tokens */}
      <style>{`
        :root {
          /* Icon */
          --services-item-icon-color-home-1: #ca1515;
          --services-item-icon-text-align-home-1: center;

          /* Heading */
          --services-item-h6-font-family-home-1: Montserrat, sans-serif;
          --services-item-h6-font-size-home-1: 16px;
          --services-item-h6-color-home-1: #111111;
          --services-item-h6-font-weight-home-1: 600;
          --services-item-h6-text-align-home-1: center;

          /* Paragraph */
          --services-item-p-font-family-home-1: Montserrat, sans-serif;
          --services-item-p-font-size-home-1: 14px;
          --services-item-p-color-home-1: #888888;
          --services-item-p-font-weight-home-1: 400;
          --services-item-p-text-align-home-1: center;
        }
      `}</style>

      <div className="container">
        <div className="row">
          {[
            { icon: "fa-car", title: "Free Shipping", text: "For all oder over $99" },
            { icon: "fa-money", title: "Money Back Guarantee", text: "If good have Problems" },
            { icon: "fa-support", title: "Online Support 24/7", text: "Dedicated support" },
            { icon: "fa-headphones", title: "Payment Secure", text: "100% secure payment" },
          ].map((service, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6">
              <div className="services__item">
                <i
                  className={`fa ${service.icon}`}
                  style={{
                    color: "var(--services-item-icon-color-home-1)",
                    ["textAlign" as any]: "var(--services-item-icon-text-align-home-1)",
                  }}
                ></i>
                <h6
                  style={{
                    fontFamily: "var(--services-item-h6-font-family-home-1)",
                    fontSize: "var(--services-item-h6-font-size-home-1)",
                    color: "var(--services-item-h6-color-home-1)",
                    fontWeight: "var(--services-item-h6-font-weight-home-1)",
                    ["textAlign" as any]: "var(--services-item-h6-text-align-home-1)",
                  }}
                >
                  {service.title}
                </h6>
                <p
                  style={{
                    fontFamily: "var(--services-item-p-font-family-home-1)",
                    fontSize: "var(--services-item-p-font-size-home-1)",
                    color: "var(--services-item-p-color-home-1)",
                    fontWeight: "var(--services-item-p-font-weight-home-1)",
                    ["textAlign" as any]: "var(--services-item-p-text-align-home-1)",
                  }}
                >
                  {service.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
