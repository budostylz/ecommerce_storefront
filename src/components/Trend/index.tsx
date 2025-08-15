import React from "react";

const Trend = () => {
  // layout-only (kept as-is)
  const ratingStyle = { display: "flex", gap: "6px", alignItems: "center" };

  return (
    <section className="trend spad">
      {/* Design Tokens */}
      <style>{`
        :root {
          /* Section title */
          --trend-section-title-h4-font-family-home-1: Montserrat, sans-serif;
          --trend-section-title-h4-font-size-home-1: 20px;
          --trend-section-title-h4-color-home-1: #111111;
          --trend-section-title-h4-font-weight-home-1: 600;
          --trend-section-title-h4-text-align-home-1: left;

          /* Item title */
          --trend-item-h6-font-family-home-1: Montserrat, sans-serif;
          --trend-item-h6-font-size-home-1: 14px;
          --trend-item-h6-color-home-1: #111111;
          --trend-item-h6-font-weight-home-1: 600;
          --trend-item-h6-text-align-home-1: left;

          /* Rating stars */
          --trend-rating-star-color-home-1: #e3c01c;
          --trend-rating-text-align-home-1: left;

          /* Price */
          --trend-price-font-family-home-1: Montserrat, sans-serif;
          --trend-price-font-size-home-1: 14px;
          --trend-price-color-home-1: #111111;
          --trend-price-font-weight-home-1: 600;
          --trend-price-text-align-home-1: left;

          /* Column heading labels */
          --trend-column-heading-font-family-home-1: Montserrat, sans-serif;
          --trend-column-heading-font-size-home-1: 24px;
          --trend-column-heading-color-home-1: #111111;
          --trend-column-heading-font-weight-home-1: 600;
          --trend-column-heading-text-align-home-1: left;

          /* (Optional) card background if needed elsewhere */
          --trend-item-background-color-home-1: transparent;
        }
      `}</style>

      <div className="container">
        <div className="row">
          {/* Hot Trend */}
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="trend__content">
              <div className="section-title">
                <h4
                  style={{
                    fontFamily: "var(--trend-column-heading-font-family-home-1)",
                    fontSize: "var(--trend-column-heading-font-size-home-1)",
                    color: "var(--trend-column-heading-color-home-1)",
                    fontWeight: "var(--trend-column-heading-font-weight-home-1)",
                    ["textAlign" as any]: "var(--trend-column-heading-text-align-home-1)",
                  }}
                >
                  Hot Trend
                </h4>
              </div>

              <div className="trend__item">
                <div className="trend__item__pic">
                  <img src="src/origin/base/web/img/trend/ht-1.jpg" alt="" />
                </div>
                <div className="trend__item__text">
                  <h6
                    style={{
                      fontFamily: "var(--trend-item-h6-font-family-home-1)",
                      fontSize: "var(--trend-item-h6-font-size-home-1)",
                      color: "var(--trend-item-h6-color-home-1)",
                      fontWeight: "var(--trend-item-h6-font-weight-home-1)",
                      ["textAlign" as any]: "var(--trend-item-h6-text-align-home-1)",
                    }}
                  >
                    Chain bucket bag
                  </h6>
                  <div
                    className="rating"
                    style={{ ...ratingStyle, ["textAlign" as any]: "var(--trend-rating-text-align-home-1)" }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa fa-star" style={{ color: "var(--trend-rating-star-color-home-1)" }} />
                    ))}
                  </div>
                  <div
                    className="product__price"
                    style={{
                      fontFamily: "var(--trend-price-font-family-home-1)",
                      fontSize: "var(--trend-price-font-size-home-1)",
                      color: "var(--trend-price-color-home-1)",
                      fontWeight: "var(--trend-price-font-weight-home-1)",
                      ["textAlign" as any]: "var(--trend-price-text-align-home-1)",
                    }}
                  >
                    $ 59.0
                  </div>
                </div>
              </div>

              <div className="trend__item">
                <div className="trend__item__pic">
                  <img src="src/origin/base/web/img/trend/ht-2.jpg" alt="" />
                </div>
                <div className="trend__item__text">
                  <h6
                    style={{
                      fontFamily: "var(--trend-item-h6-font-family-home-1)",
                      fontSize: "var(--trend-item-h6-font-size-home-1)",
                      color: "var(--trend-item-h6-color-home-1)",
                      fontWeight: "var(--trend-item-h6-font-weight-home-1)",
                      ["textAlign" as any]: "var(--trend-item-h6-text-align-home-1)",
                    }}
                  >
                    Pendant earrings
                  </h6>
                  <div className="rating" style={{ ...ratingStyle, ["textAlign" as any]: "var(--trend-rating-text-align-home-1)" }}>
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa fa-star" style={{ color: "var(--trend-rating-star-color-home-1)" }} />
                    ))}
                  </div>
                  <div
                    className="product__price"
                    style={{
                      fontFamily: "var(--trend-price-font-family-home-1)",
                      fontSize: "var(--trend-price-font-size-home-1)",
                      color: "var(--trend-price-color-home-1)",
                      fontWeight: "var(--trend-price-font-weight-home-1)",
                      ["textAlign" as any]: "var(--trend-price-text-align-home-1)",
                    }}
                  >
                    $ 59.0
                  </div>
                </div>
              </div>

              <div className="trend__item">
                <div className="trend__item__pic">
                  <img src="src/origin/base/web/img/trend/ht-3.jpg" alt="" />
                </div>
                <div className="trend__item__text">
                  <h6
                    style={{
                      fontFamily: "var(--trend-item-h6-font-family-home-1)",
                      fontSize: "var(--trend-item-h6-font-size-home-1)",
                      color: "var(--trend-item-h6-color-home-1)",
                      fontWeight: "var(--trend-item-h6-font-weight-home-1)",
                      ["textAlign" as any]: "var(--trend-item-h6-text-align-home-1)",
                    }}
                  >
                    Cotton T-Shirt
                  </h6>
                  <div className="rating" style={{ ...ratingStyle, ["textAlign" as any]: "var(--trend-rating-text-align-home-1)" }}>
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa fa-star" style={{ color: "var(--trend-rating-star-color-home-1)" }} />
                    ))}
                  </div>
                  <div
                    className="product__price"
                    style={{
                      fontFamily: "var(--trend-price-font-family-home-1)",
                      fontSize: "var(--trend-price-font-size-home-1)",
                      color: "var(--trend-price-color-home-1)",
                      fontWeight: "var(--trend-price-font-weight-home-1)",
                      ["textAlign" as any]: "var(--trend-price-text-align-home-1)",
                    }}
                  >
                    $ 59.0
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Best Seller */}
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="trend__content">
              <div className="section-title">
                <h4
                  style={{
                    fontFamily: "var(--trend-column-heading-font-family-home-1)",
                    fontSize: "var(--trend-column-heading-font-size-home-1)",
                    color: "var(--trend-column-heading-color-home-1)",
                    fontWeight: "var(--trend-column-heading-font-weight-home-1)",
                    ["textAlign" as any]: "var(--trend-column-heading-text-align-home-1)",
                  }}
                >
                  Best seller
                </h4>
              </div>

              <div className="trend__item">
                <div className="trend__item__pic">
                  <img src="src/origin/base/web/img/trend/bs-1.jpg" alt="" />
                </div>
                <div className="trend__item__text">
                  <h6
                    style={{
                      fontFamily: "var(--trend-item-h6-font-family-home-1)",
                      fontSize: "var(--trend-item-h6-font-size-home-1)",
                      color: "var(--trend-item-h6-color-home-1)",
                      fontWeight: "var(--trend-item-h6-font-weight-home-1)",
                      ["textAlign" as any]: "var(--trend-item-h6-text-align-home-1)",
                    }}
                  >
                    Cotton T-Shirt
                  </h6>
                  <div className="rating" style={{ ...ratingStyle, ["textAlign" as any]: "var(--trend-rating-text-align-home-1)" }}>
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa fa-star" style={{ color: "var(--trend-rating-star-color-home-1)" }} />
                    ))}
                  </div>
                  <div
                    className="product__price"
                    style={{
                      fontFamily: "var(--trend-price-font-family-home-1)",
                      fontSize: "var(--trend-price-font-size-home-1)",
                      color: "var(--trend-price-color-home-1)",
                      fontWeight: "var(--trend-price-font-weight-home-1)",
                      ["textAlign" as any]: "var(--trend-price-text-align-home-1)",
                    }}
                  >
                    $ 59.0
                  </div>
                </div>
              </div>

              <div className="trend__item">
                <div className="trend__item__pic">
                  <img src="src/origin/base/web/img/trend/bs-2.jpg" alt="" />
                </div>
                <div className="trend__item__text">
                  <h6
                    style={{
                      fontFamily: "var(--trend-item-h6-font-family-home-1)",
                      fontSize: "var(--trend-item-h6-font-size-home-1)",
                      color: "var(--trend-item-h6-color-home-1)",
                      fontWeight: "var(--trend-item-h6-font-weight-home-1)",
                      ["textAlign" as any]: "var(--trend-item-h6-text-align-home-1)",
                    }}
                  >
                    Zip-pockets pebbled tote <br /> briefcase
                  </h6>
                  <div className="rating" style={{ ...ratingStyle, ["textAlign" as any]: "var(--trend-rating-text-align-home-1)" }}>
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa fa-star" style={{ color: "var(--trend-rating-star-color-home-1)" }} />
                    ))}
                  </div>
                  <div
                    className="product__price"
                    style={{
                      fontFamily: "var(--trend-price-font-family-home-1)",
                      fontSize: "var(--trend-price-font-size-home-1)",
                      color: "var(--trend-price-color-home-1)",
                      fontWeight: "var(--trend-price-font-weight-home-1)",
                      ["textAlign" as any]: "var(--trend-price-text-align-home-1)",
                    }}
                  >
                    $ 59.0
                  </div>
                </div>
              </div>

              <div className="trend__item">
                <div className="trend__item__pic">
                  <img src="src/origin/base/web/img/trend/bs-3.jpg" alt="" />
                </div>
                <div className="trend__item__text">
                  <h6
                    style={{
                      fontFamily: "var(--trend-item-h6-font-family-home-1)",
                      fontSize: "var(--trend-item-h6-font-size-home-1)",
                      color: "var(--trend-item-h6-color-home-1)",
                      fontWeight: "var(--trend-item-h6-font-weight-home-1)",
                      ["textAlign" as any]: "var(--trend-item-h6-text-align-home-1)",
                    }}
                  >
                    Round leather bag
                  </h6>
                  <div className="rating" style={{ ...ratingStyle, ["textAlign" as any]: "var(--trend-rating-text-align-home-1)" }}>
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa fa-star" style={{ color: "var(--trend-rating-star-color-home-1)" }} />
                    ))}
                  </div>
                  <div
                    className="product__price"
                    style={{
                      fontFamily: "var(--trend-price-font-family-home-1)",
                      fontSize: "var(--trend-price-font-size-home-1)",
                      color: "var(--trend-price-color-home-1)",
                      fontWeight: "var(--trend-price-font-weight-home-1)",
                      ["textAlign" as any]: "var(--trend-price-text-align-home-1)",
                    }}
                  >
                    $ 59.0
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature */}
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="trend__content">
              <div className="section-title">
                <h4
                  style={{
                    fontFamily: "var(--trend-column-heading-font-family-home-1)",
                    fontSize: "var(--trend-column-heading-font-size-home-1)",
                    color: "var(--trend-column-heading-color-home-1)",
                    fontWeight: "var(--trend-column-heading-font-weight-home-1)",
                    ["textAlign" as any]: "var(--trend-column-heading-text-align-home-1)",
                  }}
                >
                  Feature
                </h4>
              </div>

              <div className="trend__item">
                <div className="trend__item__pic">
                  <img src="src/origin/base/web/img/trend/f-1.jpg" alt="" />
                </div>
                <div className="trend__item__text">
                  <h6
                    style={{
                      fontFamily: "var(--trend-item-h6-font-family-home-1)",
                      fontSize: "var(--trend-item-h6-font-size-home-1)",
                      color: "var(--trend-item-h6-color-home-1)",
                      fontWeight: "var(--trend-item-h6-font-weight-home-1)",
                      ["textAlign" as any]: "var(--trend-item-h6-text-align-home-1)",
                    }}
                  >
                    Bow wrap skirt
                  </h6>
                  <div className="rating" style={{ ...ratingStyle, ["textAlign" as any]: "var(--trend-rating-text-align-home-1)" }}>
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa fa-star" style={{ color: "var(--trend-rating-star-color-home-1)" }} />
                    ))}
                  </div>
                  <div
                    className="product__price"
                    style={{
                      fontFamily: "var(--trend-price-font-family-home-1)",
                      fontSize: "var(--trend-price-font-size-home-1)",
                      color: "var(--trend-price-color-home-1)",
                      fontWeight: "var(--trend-price-font-weight-home-1)",
                      ["textAlign" as any]: "var(--trend-price-text-align-home-1)",
                    }}
                  >
                    $ 59.0
                  </div>
                </div>
              </div>

              <div className="trend__item">
                <div className="trend__item__pic">
                  <img src="src/origin/base/web/img/trend/f-2.jpg" alt="" />
                </div>
                <div className="trend__item__text">
                  <h6
                    style={{
                      fontFamily: "var(--trend-item-h6-font-family-home-1)",
                      fontSize: "var(--trend-item-h6-font-size-home-1)",
                      color: "var(--trend-item-h6-color-home-1)",
                      fontWeight: "var(--trend-item-h6-font-weight-home-1)",
                      ["textAlign" as any]: "var(--trend-item-h6-text-align-home-1)",
                    }}
                  >
                    Metallic earrings
                  </h6>
                  <div className="rating" style={{ ...ratingStyle, ["textAlign" as any]: "var(--trend-rating-text-align-home-1)" }}>
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa fa-star" style={{ color: "var(--trend-rating-star-color-home-1)" }} />
                    ))}
                  </div>
                  <div
                    className="product__price"
                    style={{
                      fontFamily: "var(--trend-price-font-family-home-1)",
                      fontSize: "var(--trend-price-font-size-home-1)",
                      color: "var(--trend-price-color-home-1)",
                      fontWeight: "var(--trend-price-font-weight-home-1)",
                      ["textAlign" as any]: "var(--trend-price-text-align-home-1)",
                    }}
                  >
                    $ 59.0
                  </div>
                </div>
              </div>

              <div className="trend__item">
                <div className="trend__item__pic">
                  <img src="src/origin/base/web/img/trend/f-3.jpg" alt="" />
                </div>
                <div className="trend__item__text">
                  <h6
                    style={{
                      fontFamily: "var(--trend-item-h6-font-family-home-1)",
                      fontSize: "var(--trend-item-h6-font-size-home-1)",
                      color: "var(--trend-item-h6-color-home-1)",
                      fontWeight: "var(--trend-item-h6-font-weight-home-1)",
                      ["textAlign" as any]: "var(--trend-item-h6-text-align-home-1)",
                    }}
                  >
                    Flap cross-body bag
                  </h6>
                  <div className="rating" style={{ ...ratingStyle, ["textAlign" as any]: "var(--trend-rating-text-align-home-1)" }}>
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa fa-star" style={{ color: "var(--trend-rating-star-color-home-1)" }} />
                    ))}
                  </div>
                  <div
                    className="product__price"
                    style={{
                      fontFamily: "var(--trend-price-font-family-home-1)",
                      fontSize: "var(--trend-price-font-size-home-1)",
                      color: "var(--trend-price-color-home-1)",
                      fontWeight: "var(--trend-price-font-weight-home-1)",
                      ["textAlign" as any]: "var(--trend-price-text-align-home-1)",
                    }}
                  >
                    $ 59.0
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Feature */}
        </div>
      </div>
    </section>
  );
};

export default Trend;
