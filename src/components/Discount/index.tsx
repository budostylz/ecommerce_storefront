import React from "react";

const Discount = () => {
  return (
    <section className="discount">
      {/* Design Tokens */}
      <style>{`
        :root {
          /* Discount title span */
          --discount-title-span-font-family-home-1: Montserrat, sans-serif;
          --discount-title-span-font-size-home-1: 16px;
          --discount-title-span-color-home-1: #ca1515;
          --discount-title-span-font-weight-home-1: 600;
          --discount-title-span-text-align-home-1: left;

          /* Discount title h2 */
          --discount-title-h2-font-family-home-1: "Cookie", cursive;
          --discount-title-h2-font-size-home-1: 50px;
          --discount-title-h2-color-home-1: #111111;
          --discount-title-h2-font-weight-home-1: 400;
          --discount-title-h2-text-align-home-1: left;

          /* Discount title h5 */
          --discount-title-h5-font-family-home-1: Montserrat, sans-serif;
          --discount-title-h5-font-size-home-1: 20px;
          --discount-title-h5-color-home-1: #111111;
          --discount-title-h5-font-weight-home-1: 500;
          --discount-title-h5-text-align-home-1: left;

          /* Discount title h5 span (Sale) */
          --discount-title-h5-span-color-home-1: #ca1515;
          --discount-title-h5-span-font-weight-home-1: 600;

          /* Countdown number */
          --discount-countdown-span-font-family-home-1: Montserrat, sans-serif;
          --discount-countdown-span-font-size-home-1: 30px;
          --discount-countdown-span-color-home-1: #111111;
          --discount-countdown-span-font-weight-home-1: 700;
          --discount-countdown-span-text-align-home-1: center;

          /* Countdown label */
          --discount-countdown-p-font-family-home-1: Montserrat, sans-serif;
          --discount-countdown-p-font-size-home-1: 14px;
          --discount-countdown-p-color-home-1: #888888;
          --discount-countdown-p-font-weight-home-1: 400;
          --discount-countdown-p-text-align-home-1: center;

          /* Link */
          --discount-link-font-family-home-1: Montserrat, sans-serif;
          --discount-link-font-size-home-1: 14px;
          --discount-link-color-home-1: #ffffff;
          --discount-link-font-weight-home-1: 700;
          --discount-link-background-color-home-1: #ca1515;
          --discount-link-text-align-home-1: center;
        }
      `}</style>

      <div className="container">
        <div className="row">
          {/* Image Side */}
          <div className="col-lg-6 p-0">
            <div className="discount__pic">
              <img src="src/origin/base/web/img/discount.jpg" alt="" />
            </div>
          </div>

          {/* Text Side */}
          <div className="col-lg-6 p-0">
            <div className="discount__text">
              <div className="discount__text__title">
                <span
                  style={{
                    fontFamily:
                      "var(--discount-title-span-font-family-home-1)",
                    fontSize:
                      "var(--discount-title-span-font-size-home-1)",
                    color: "var(--discount-title-span-color-home-1)",
                    fontWeight:
                      "var(--discount-title-span-font-weight-home-1)",
                   ["textAlign" as any]:
                      "var(--discount-title-span-text-align-home-1)",
                  }}
                >
                  Discount
                </span>

                <h2
                  style={{
                    fontFamily:
                      "var(--discount-title-h2-font-family-home-1)",
                    fontSize:
                      "var(--discount-title-h2-font-size-home-1)",
                    color: "var(--discount-title-h2-color-home-1)",
                    fontWeight:
                      "var(--discount-title-h2-font-weight-home-1)",
                    ["textAlign" as any]:
                      "var(--discount-title-h2-text-align-home-1)",
                  }}
                >
                  Summer 2019
                </h2>

                <h5
                  style={{
                    fontFamily:
                      "var(--discount-title-h5-font-family-home-1)",
                    fontSize:
                      "var(--discount-title-h5-font-size-home-1)",
                    color: "var(--discount-title-h5-color-home-1)",
                    fontWeight:
                      "var(--discount-title-h5-font-weight-home-1)",
                    ["textAlign" as any]:
                      "var(--discount-title-h5-text-align-home-1)",
                  }}
                >
                  <span
                    style={{
                      color: "var(--discount-title-h5-span-color-home-1)",
                      fontWeight:
                        "var(--discount-title-h5-span-font-weight-home-1)",
                    }}
                  >
                    Sale
                  </span>{" "}
                  50%
                </h5>
              </div>

              <div className="discount__countdown" id="countdown-time">
                {[
                  { num: "22", label: "Days" },
                  { num: "18", label: "Hour" },
                  { num: "46", label: "Min" },
                  { num: "05", label: "Sec" },
                ].map((item, i) => (
                  <div className="countdown__item" key={i}>
                    <span
                      style={{
                        fontFamily:
                          "var(--discount-countdown-span-font-family-home-1)",
                        fontSize:
                          "var(--discount-countdown-span-font-size-home-1)",
                        color:
                          "var(--discount-countdown-span-color-home-1)",
                        fontWeight:
                          "var(--discount-countdown-span-font-weight-home-1)",
                        ["textAlign" as any]:
                          "var(--discount-countdown-span-text-align-home-1)",
                      }}
                    >
                      {item.num}
                    </span>
                    <p
                      style={{
                        fontFamily:
                          "var(--discount-countdown-p-font-family-home-1)",
                        fontSize:
                          "var(--discount-countdown-p-font-size-home-1)",
                        color:
                          "var(--discount-countdown-p-color-home-1)",
                        fontWeight:
                          "var(--discount-countdown-p-font-weight-home-1)",
                        ["textAlign" as any]:
                          "var(--discount-countdown-p-text-align-home-1)",
                      }}
                    >
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href="#"
                style={{
                  fontFamily: "var(--discount-link-font-family-home-1)",
                  fontSize: "var(--discount-link-font-size-home-1)",
                  color: "var(--discount-link-color-home-1)",
                  fontWeight: "var(--discount-link-font-weight-home-1)",
                  backgroundColor:
                    "var(--discount-link-background-color-home-1)",
                  ["textAlign" as any]: "var(--discount-link-text-align-home-1)",
                }}
              >
                Shop now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discount;
