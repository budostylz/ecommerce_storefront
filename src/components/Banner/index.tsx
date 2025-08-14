import React from "react";

const Banner = () => {
  return (
    <section
      className="banner set-bg"
      style={{ backgroundImage: "url('src/origin/base/web/img/banner/banner-1.jpg')" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-lg-8 m-auto">
            <div className="banner__slider owl-carousel">
              {[1, 2, 3].map((item, index) => (
                <div className="banner__item" key={index}>
                  <div className="banner__text">
                    <span>The Chloe Collection</span>
                    <h1>The Project Jacket</h1>
                    <a href="#">Shop now</a>
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

export default Banner;
