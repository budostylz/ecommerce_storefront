import React from "react";

const Product = () => {
  const ratingStyle = {
    display: "flex",
    gap: "6px",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "4px",
    color: "var(--product-item-rating-color-home-1)", // tokens: star color
  };

  return (
    <section className="product spad">
      {/* Design Tokens */}
      <style>{`
        :root {
          /* Section title */
          --product-section-title-h4-font-family-home-1: Montserrat, sans-serif;
          --product-section-title-h4-font-size-home-1: 20px;
          --product-section-title-h4-color-home-1: #111111;
          --product-section-title-h4-font-weight-home-1: 600;
          --product-section-title-h4-text-align-home-1: left;

          /* Filter controls (list items) */
          --product-filter-li-font-family-home-1: Montserrat, sans-serif;
          --product-filter-li-font-size-home-1: 14px;
          --product-filter-li-color-home-1: #111111;
          --product-filter-li-font-weight-home-1: 500;

          /* Card text block alignment */
          --product-item-text-text-align-home-1: center;

          /* Product title link */
          --product-item-title-font-family-home-1: Montserrat, sans-serif;
          --product-item-title-font-size-home-1: 14px;
          --product-item-title-color-home-1: #111111;
          --product-item-title-font-weight-home-1: 600;

          /* Rating stars */
          --product-item-rating-color-home-1: #e3c01c;

          /* Price */
          --product-item-price-color-home-1: #111111;
          --product-item-price-font-weight-home-1: 600;

          /* Old price (strikethrough) */
          --product-item-oldprice-color-home-1: #b1b0b0;

          /* Labels */
          --product-label-new-background-color-home-1: #36a300;
          --product-label-sale-background-color-home-1: #ca1515;
          --product-label-stockout-background-color-home-1: #111111;
          --product-label-text-color-home-1: #ffffff;
          --product-label-font-weight-home-1: 500;
        }
      `}</style>

      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-4">
            <div className="section-title">
              <h4
                style={{
                  fontFamily:
                    "var(--product-section-title-h4-font-family-home-1)",
                  fontSize:
                    "var(--product-section-title-h4-font-size-home-1)",
                  color: "var(--product-section-title-h4-color-home-1)",
                  fontWeight:
                    "var(--product-section-title-h4-font-weight-home-1)",
                 ["textAlign" as any]:
                    "var(--product-section-title-h4-text-align-home-1)",
                }}
              >
                New product
              </h4>
            </div>
          </div>
          <div className="col-lg-8 col-md-8">
            <ul className="filter__controls">
              {[
                { label: "All", filter: "*", active: true },
                { label: "Women’s", filter: ".women" },
                { label: "Men’s", filter: ".men" },
                { label: "Kid’s", filter: ".kid" },
                { label: "Accessories", filter: ".accessories" },
                { label: "Cosmetics", filter: ".cosmetic" },
              ].map((f, i) => (
                <li
                  key={i}
                  className={f.active ? "active" : undefined}
                  data-filter={f.filter}
                  style={{
                    fontFamily:
                      "var(--product-filter-li-font-family-home-1)",
                    fontSize: "var(--product-filter-li-font-size-home-1)",
                    color: "var(--product-filter-li-color-home-1)",
                    fontWeight:
                      "var(--product-filter-li-font-weight-home-1)",
                  }}
                >
                  {f.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="row property__gallery">
          {[
            {
              img: "src/origin/base/web/img/product/product-1.jpg",
              label: "New",
              title: "Buttons tweed blazer",
              price: "$ 59.0",
              category: "women",
              oldPrice: null,
            },
            {
              img: "src/origin/base/web/img/product/product-2.jpg",
              label: null,
              title: "Flowy striped skirt",
              price: "$ 49.0",
              category: "men",
              oldPrice: null,
            },
            {
              img: "src/origin/base/web/img/product/product-3.jpg",
              label: "out of stock",
              title: "Cotton T-Shirt",
              price: "$ 59.0",
              category: "accessories",
              oldPrice: null,
            },
            {
              img: "src/origin/base/web/img/product/product-4.jpg",
              label: null,
              title: "Slim striped pocket shirt",
              price: "$ 59.0",
              category: "cosmetic",
              oldPrice: null,
            },
            {
              img: "src/origin/base/web/img/product/product-5.jpg",
              label: null,
              title: "Fit micro corduroy shirt",
              price: "$ 59.0",
              category: "kid",
              oldPrice: null,
            },
            {
              img: "src/origin/base/web/img/product/product-6.jpg",
              label: "Sale",
              title: "Tropical Kimono",
              price: "$ 49.0",
              category: "women men kid accessories cosmetic",
              oldPrice: "$ 59.0",
            },
            {
              img: "src/origin/base/web/img/product/product-7.jpg",
              label: null,
              title: "Contrasting sunglasses",
              price: "$ 59.0",
              category: "women men kid accessories cosmetic",
              oldPrice: null,
            },
            {
              img: "src/origin/base/web/img/product/product-8.jpg",
              label: "Sale",
              title: "Water resistant backpack",
              price: "$ 49.0",
              category: "women men kid accessories cosmetic",
              oldPrice: "$ 59.0",
            },
          ].map((product, index) => {
            const labelBg =
              product.label === "Sale"
                ? "var(--product-label-sale-background-color-home-1)"
                : product.label === "New"
                ? "var(--product-label-new-background-color-home-1)"
                : "var(--product-label-stockout-background-color-home-1)";

            return (
              <div
                key={index}
                className={`col-lg-3 col-md-4 col-sm-6 mix ${product.category}`}
              >
                <div
                  className={`product__item ${
                    product.label === "Sale" ? "sale" : ""
                  }`}
                >
                  <div
                    className="product__item__pic set-bg"
                    style={{ backgroundImage: `url(${product.img})` }}
                  >
                    {product.label && (
                      <div
                        className={`label ${
                          product.label === "Sale"
                            ? "sale"
                            : product.label === "New"
                            ? "new"
                            : "stockout"
                        }`}
                        style={{
                          backgroundColor: labelBg,
                          color: "var(--product-label-text-color-home-1)",
                          fontWeight:
                            "var(--product-label-font-weight-home-1)",
                        }}
                      >
                        {product.label}
                      </div>
                    )}
                    <ul className="product__hover">
                      <li>
                        <a href={product.img} className="image-popup">
                          <span className="arrow_expand"></span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="icon_heart_alt"></span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="icon_bag_alt"></span>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div
                    className="product__item__text"
                    style={{
                      ["textAlign" as any]:
                        "var(--product-item-text-text-align-home-1)",
                    }}
                  >
                    <h6>
                      <a
                        href="#"
                        style={{
                          fontFamily:
                            "var(--product-item-title-font-family-home-1)",
                          fontSize:
                            "var(--product-item-title-font-size-home-1)",
                          color:
                            "var(--product-item-title-color-home-1)",
                          fontWeight:
                            "var(--product-item-title-font-weight-home-1)",
                        }}
                      >
                        {product.title}
                      </a>
                    </h6>

                    <div className="rating" style={ratingStyle}>
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fa fa-star"></i>
                      ))}
                    </div>

                    <div
                      className="product__price"
                      style={{
                        color: "var(--product-item-price-color-home-1)",
                        fontWeight:
                          "var(--product-item-price-font-weight-home-1)",
                      }}
                    >
                      {product.price}
                      {product.oldPrice && (
                        <span
                          style={{
                            color:
                              "var(--product-item-oldprice-color-home-1)",
                          }}
                        >
                          {product.oldPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Product;
