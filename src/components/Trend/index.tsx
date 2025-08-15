import React from "react";

const Trend = () => {
  const ratingStyle = { display: "flex", gap: "6px", alignItems: "center" };

  return (
    <section className="trend spad">
      <div className="container">
        <div className="row">
          {/* Hot Trend */}
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="trend__content">
              <div className="section-title">
                <h4>Hot Trend</h4>
              </div>

              <div className="trend__item">
                <div className="trend__item__pic">
                  <img src="src/origin/base/web/img/trend/ht-1.jpg" alt="" />
                </div>
                <div className="trend__item__text">
                  <h6>Chain bucket bag</h6>
                  <div className="rating" style={ratingStyle}>
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa fa-star" />
                    ))}
                  </div>
                  <div className="product__price">$ 59.0</div>
                </div>
              </div>

              <div className="trend__item">
                <div className="trend__item__pic">
                  <img src="src/origin/base/web/img/trend/ht-2.jpg" alt="" />
                </div>
                <div className="trend__item__text">
                  <h6>Pendant earrings</h6>
                  <div className="rating" style={ratingStyle}>
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa fa-star" />
                    ))}
                  </div>
                  <div className="product__price">$ 59.0</div>
                </div>
              </div>

              <div className="trend__item">
                <div className="trend__item__pic">
                  <img src="src/origin/base/web/img/trend/ht-3.jpg" alt="" />
                </div>
                <div className="trend__item__text">
                  <h6>Cotton T-Shirt</h6>
                  <div className="rating" style={ratingStyle}>
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa fa-star" />
                    ))}
                  </div>
                  <div className="product__price">$ 59.0</div>
                </div>
              </div>
            </div>
          </div>

          {/* Best Seller */}
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="trend__content">
              <div className="section-title">
                <h4>Best seller</h4>
              </div>

              <div className="trend__item">
                <div className="trend__item__pic">
                  <img src="src/origin/base/web/img/trend/bs-1.jpg" alt="" />
                </div>
                <div className="trend__item__text">
                  <h6>Cotton T-Shirt</h6>
                  <div className="rating" style={ratingStyle}>
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa fa-star" />
                    ))}
                  </div>
                  <div className="product__price">$ 59.0</div>
                </div>
              </div>

              <div className="trend__item">
                <div className="trend__item__pic">
                  <img src="src/origin/base/web/img/trend/bs-2.jpg" alt="" />
                </div>
                <div className="trend__item__text">
                  <h6>
                    Zip-pockets pebbled tote <br /> briefcase
                  </h6>
                  <div className="rating" style={ratingStyle}>
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa fa-star" />
                    ))}
                  </div>
                  <div className="product__price">$ 59.0</div>
                </div>
              </div>

              <div className="trend__item">
                <div className="trend__item__pic">
                  <img src="src/origin/base/web/img/trend/bs-3.jpg" alt="" />
                </div>
                <div className="trend__item__text">
                  <h6>Round leather bag</h6>
                  <div className="rating" style={ratingStyle}>
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa fa-star" />
                    ))}
                  </div>
                  <div className="product__price">$ 59.0</div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature */}
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="trend__content">
              <div className="section-title">
                <h4>Feature</h4>
              </div>

              <div className="trend__item">
                <div className="trend__item__pic">
                  <img src="src/origin/base/web/img/trend/f-1.jpg" alt="" />
                </div>
                <div className="trend__item__text">
                  <h6>Bow wrap skirt</h6>
                  <div className="rating" style={ratingStyle}>
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa fa-star" />
                    ))}
                  </div>
                  <div className="product__price">$ 59.0</div>
                </div>
              </div>

              <div className="trend__item">
                <div className="trend__item__pic">
                  <img src="src/origin/base/web/img/trend/f-2.jpg" alt="" />
                </div>
                <div className="trend__item__text">
                  <h6>Metallic earrings</h6>
                  <div className="rating" style={ratingStyle}>
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa fa-star" />
                    ))}
                  </div>
                  <div className="product__price">$ 59.0</div>
                </div>
              </div>

              <div className="trend__item">
                <div className="trend__item__pic">
                  <img src="src/origin/base/web/img/trend/f-3.jpg" alt="" />
                </div>
                <div className="trend__item__text">
                  <h6>Flap cross-body bag</h6>
                  <div className="rating" style={ratingStyle}>
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa fa-star" />
                    ))}
                  </div>
                  <div className="product__price">$ 59.0</div>
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
