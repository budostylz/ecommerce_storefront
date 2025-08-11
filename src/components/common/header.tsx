import React from "react";

const Header = () => {
  return (
    <header className="header" style={{ backgroundColor: "#fff" }}>
      <div className="container-fluid">
        <div className="row align-items-center">
          {/* Logo */}
          <div className="col-xl-3 col-lg-2">
            <div
              className="header__logo"
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <a href="/" style={{ display: "inline-flex", alignItems: "center" }}>
                <img
                  src="https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/ecommerce/fashio/logo.png"
                  alt="Logo"
                  style={{
                    maxHeight: "70px", // bigger for better balance
                    width: "auto",
                    display: "block",
                  }}
                />
              </a>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="col-xl-6 col-lg-7">
            <nav className="header__menu">
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="#">Women’s</a></li>
                <li><a href="#">Men’s</a></li>
                <li className="active"><a href="./shop.html">Shop</a></li>
                <li>
                  <a href="#">Pages</a>
                  <ul className="dropdown">
                    <li><a href="./product-details.html">Product Details</a></li>
                    <li><a href="./shop-cart.html">Shop Cart</a></li>
                    <li><a href="./checkout.html">Checkout</a></li>
                    <li><a href="./blog-details.html">Blog Details</a></li>
                  </ul>
                </li>
                <li><a href="contact">Contact</a></li>
              </ul>
            </nav>
          </div>

          {/* Right Side */}
          <div className="col-lg-3">
            <div
              className="header__right"
              style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}
            >
              <div className="header__right__auth">
                <a href="#">Login</a>
                <a href="#">Register</a>
              </div>
              <ul className="header__right__widget">
                <li><span className="icon_search search-switch"></span></li>
                <li>
                  <a href="#">
                    <span className="icon_heart_alt"></span>
                    <div className="tip">2</div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon_bag_alt"></span>
                    <div className="tip">2</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="canvas__open">
          <i className="fa fa-bars"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
