import React from "react";

const Product = () => {
  return (
    <section className="product spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-4">
            <div className="section-title">
              <h4>New product</h4>
            </div>
          </div>
          <div className="col-lg-8 col-md-8">
            <ul className="filter__controls">
              <li className="active" data-filter="*">All</li>
              <li data-filter=".women">Women’s</li>
              <li data-filter=".men">Men’s</li>
              <li data-filter=".kid">Kid’s</li>
              <li data-filter=".accessories">Accessories</li>
              <li data-filter=".cosmetic">Cosmetics</li>
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
              oldPrice: null
            },
            {
              img: "src/origin/base/web/img/product/product-2.jpg",
              label: null,
              title: "Flowy striped skirt",
              price: "$ 49.0",
              category: "men",
              oldPrice: null
            },
            {
              img: "src/origin/base/web/img/product/product-3.jpg",
              label: "out of stock",
              title: "Cotton T-Shirt",
              price: "$ 59.0",
              category: "accessories",
              oldPrice: null
            },
            {
              img: "src/origin/base/web/img/product/product-4.jpg",
              label: null,
              title: "Slim striped pocket shirt",
              price: "$ 59.0",
              category: "cosmetic",
              oldPrice: null
            },
            {
              img: "src/origin/base/web/img/product/product-5.jpg",
              label: null,
              title: "Fit micro corduroy shirt",
              price: "$ 59.0",
              category: "kid",
              oldPrice: null
            },
            {
              img: "src/origin/base/web/img/product/product-6.jpg",
              label: "Sale",
              title: "Tropical Kimono",
              price: "$ 49.0",
              category: "women men kid accessories cosmetic",
              oldPrice: "$ 59.0"
            },
            {
              img: "src/origin/base/web/img/product/product-7.jpg",
              label: null,
              title: "Contrasting sunglasses",
              price: "$ 59.0",
              category: "women men kid accessories cosmetic",
              oldPrice: null
            },
            {
              img: "src/origin/base/web/img/product/product-8.jpg",
              label: "Sale",
              title: "Water resistant backpack",
              price: "$ 49.0",
              category: "women men kid accessories cosmetic",
              oldPrice: "$ 59.0"
            }
          ].map((product, index) => (
            <div
              key={index}
              className={`col-lg-3 col-md-4 col-sm-6 mix ${product.category}`}
            >
              <div className={`product__item ${product.label === "Sale" ? "sale" : ""}`}>
                <div
                  className="product__item__pic set-bg"
                  style={{ backgroundImage: `url(${product.img})` }}
                >
                  {product.label && (
                    <div className={`label ${product.label === "Sale" ? "sale" : product.label === "New" ? "new" : "stockout"}`}>
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
                      <a href="#"><span className="icon_heart_alt"></span></a>
                    </li>
                    <li>
                      <a href="#"><span className="icon_bag_alt"></span></a>
                    </li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6>
                    <a href="#">{product.title}</a>
                  </h6>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa fa-star"></i>
                    ))}
                  </div>
                  <div className="product__price">
                    {product.price}
                    {product.oldPrice && <span>{product.oldPrice}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Product;
