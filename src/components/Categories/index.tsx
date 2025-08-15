import React from "react";

const Categories = () => {
  return (
    <section className="categories">
      {/* Design Tokens */}
      <style>{`
        :root {
          /* Large Category - Title */
          --categories-large-title-font-family-home-1: Montserrat, sans-serif;
          --categories-large-title-font-size-home-1: 48px;
          --categories-large-title-font-weight-home-1: 700;
          --categories-large-title-color-home-1: #111111;
          --categories-large-title-text-align-home-1: left;

          /* Large Category - Paragraph */
          --categories-large-text-font-family-home-1: "Roboto", sans-serif;
          --categories-large-text-font-size-home-1: 16px;
          --categories-large-text-font-weight-home-1: 400;
          --categories-large-text-color-home-1: #444444;
          --categories-large-text-line-height-home-1: 1.5;
          --categories-large-text-text-align-home-1: left;

          /* Large Category - Link */
          --categories-large-link-font-family-home-1: Montserrat, sans-serif;
          --categories-large-link-font-size-home-1: 14px;
          --categories-large-link-font-weight-home-1: 600;
          --categories-large-link-color-home-1: #111111;
          --categories-large-link-text-decoration-home-1: none;

          /* Large Category - Padding */
          --categories-large-padding-left-home-1: 60px;
          --categories-large-padding-top-home-1: 40px;

          /* Small Category - Title */
          --categories-small-title-font-family-home-1: Montserrat, sans-serif;
          --categories-small-title-font-size-home-1: 20px;
          --categories-small-title-font-weight-home-1: 600;
          --categories-small-title-color-home-1: #111111;
          --categories-small-title-text-align-home-1: left;

          /* Small Category - Paragraph */
          --categories-small-text-font-family-home-1: "Roboto", sans-serif;
          --categories-small-text-font-size-home-1: 14px;
          --categories-small-text-font-weight-home-1: 400;
          --categories-small-text-color-home-1: #444444;
          --categories-small-text-text-align-home-1: left;

          /* Small Category - Link */
          --categories-small-link-font-family-home-1: Montserrat, sans-serif;
          --categories-small-link-font-size-home-1: 12px;
          --categories-small-link-font-weight-home-1: 600;
          --categories-small-link-color-home-1: #111111;
          --categories-small-link-text-decoration-home-1: none;
        }
      `}</style>

      <div className="container-fluid">
        <div className="row">
          {/* Large Category */}
          <div className="col-lg-6 p-0">
            <div
              className="categories__item categories__large__item set-bg"
              style={{
                backgroundImage:
                  "url('src/origin/base/web/img/categories/category-1.jpg')",
              }}
            >
              <div
                className="categories__text"
                style={{
                  paddingLeft: "var(--categories-large-padding-left-home-1)",
                  paddingTop: "var(--categories-large-padding-top-home-1)",
                }}
              >
                <h1
                  style={{
                    fontFamily: "var(--categories-large-title-font-family-home-1)",
                    fontSize: "var(--categories-large-title-font-size-home-1)",
                    fontWeight: "var(--categories-large-title-font-weight-home-1)",
                    color: "var(--categories-large-title-color-home-1)",
                    ["textAlign" as any]: "var(--categories-large-title-text-align-home-1)",
                  }}
                >
                  Women’s fashion
                </h1>
                <p
                  style={{
                    fontFamily: "var(--categories-large-text-font-family-home-1)",
                    fontSize: "var(--categories-large-text-font-size-home-1)",
                    fontWeight: "var(--categories-large-text-font-weight-home-1)",
                    color: "var(--categories-large-text-color-home-1)",
                    lineHeight: "var(--categories-large-text-line-height-home-1)",
                    ["textAlign" as any]: "var(--categories-large-text-text-align-home-1)",
                  }}
                >
                  Sitamet, consectetur adipiscing elit, sed do eiusmod tempor
                  incidid-unt labore edolore magna aliquapendisse ultrices
                  gravida.
                </p>
                <a
                  href="#"
                  style={{
                    fontFamily: "var(--categories-large-link-font-family-home-1)",
                    fontSize: "var(--categories-large-link-font-size-home-1)",
                    fontWeight: "var(--categories-large-link-font-weight-home-1)",
                    color: "var(--categories-large-link-color-home-1)",
                    textDecoration:
                      "var(--categories-large-link-text-decoration-home-1)",
                  }}
                >
                  Shop now
                </a>
              </div>
            </div>
          </div>

          {/* Small Categories */}
          <div className="col-lg-6">
            <div className="row">
              {[
                { title: "Men’s fashion", items: "358 items", img: "category-2.jpg" },
                { title: "Kid’s fashion", items: "273 items", img: "category-3.jpg" },
                { title: "Cosmetics", items: "159 items", img: "category-4.jpg" },
                { title: "Accessories", items: "792 items", img: "category-5.jpg" },
              ].map((cat, idx) => (
                <div
                  key={idx}
                  className="col-lg-6 col-md-6 col-sm-6 p-0"
                >
                  <div
                    className="categories__item set-bg"
                    style={{
                      backgroundImage: `url('src/origin/base/web/img/categories/${cat.img}')`,
                    }}
                  >
                    <div className="categories__text">
                      <h4
                        style={{
                          fontFamily: "var(--categories-small-title-font-family-home-1)",
                          fontSize: "var(--categories-small-title-font-size-home-1)",
                          fontWeight: "var(--categories-small-title-font-weight-home-1)",
                          color: "var(--categories-small-title-color-home-1)",
                          ["textAlign" as any]: "var(--categories-small-title-text-align-home-1)",
                        }}
                      >
                        {cat.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: "var(--categories-small-text-font-family-home-1)",
                          fontSize: "var(--categories-small-text-font-size-home-1)",
                          fontWeight: "var(--categories-small-text-font-weight-home-1)",
                          color: "var(--categories-small-text-color-home-1)",
                          ["textAlign" as any]: "var(--categories-small-text-text-align-home-1)",
                        }}
                      >
                        {cat.items}
                      </p>
                      <a
                        href="#"
                        style={{
                          fontFamily: "var(--categories-small-link-font-family-home-1)",
                          fontSize: "var(--categories-small-link-font-size-home-1)",
                          fontWeight: "var(--categories-small-link-font-weight-home-1)",
                          color: "var(--categories-small-link-color-home-1)",
                          textDecoration:
                            "var(--categories-small-link-text-decoration-home-1)",
                        }}
                      >
                        Shop now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
