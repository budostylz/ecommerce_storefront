// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* About */}
          <div className="col-lg-4 col-md-6 col-sm-7">
            <div className="footer__about">
              <div className="footer__logo">
                <a href="/">
               <img
                src="https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/ecommerce/fashio/logo.png"
                alt="Logo"
                style={{
                    maxWidth: "150px",
                    height: "auto",
                    display: "block",
                    marginBottom: "15px"
                }}
                />

                </a>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt cilisis.
              </p>
              <div className="footer__payment">
                {[1, 2, 3, 4, 5].map((num) => (
                  <a href="#" key={num}>
                    <img src={`/origin/base/web/img/payment/payment-${num}.png`} alt={`Payment ${num}`} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-3 col-sm-5">
            <div className="footer__widget">
              <h6>Quick links</h6>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Blogs</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>
          </div>

          {/* Account */}
          <div className="col-lg-2 col-md-3 col-sm-4">
            <div className="footer__widget">
              <h6>Account</h6>
              <ul>
                <li><a href="#">My Account</a></li>
                <li><a href="#">Orders Tracking</a></li>
                <li><a href="#">Checkout</a></li>
                <li><a href="#">Wishlist</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4 col-md-8 col-sm-8">
            <div className="footer__newslatter">
              <h6>NEWSLETTER</h6>
              <form action="#">
                <input type="text" placeholder="Email" />
                <button type="submit" className="site-btn">Subscribe</button>
              </form>
              <div className="footer__social">
                <a href="#"><i className="fa fa-facebook"></i></a>
                <a href="#"><i className="fa fa-twitter"></i></a>
                <a href="#"><i className="fa fa-youtube-play"></i></a>
                <a href="#"><i className="fa fa-instagram"></i></a>
                <a href="#"><i className="fa fa-pinterest"></i></a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="row">
          <div className="col-lg-12">
         <div className="footer__copyright__text">
                <p>
                    © {currentYear} Crafted with passion <i className="fa fa-heart" aria-hidden="true"></i> on&nbsp;
                    <a href="https://budoboost.com" target="_blank" rel="noopener noreferrer">
                    BudoBoost
                    </a>
                    &nbsp;— Empowering creators to launch beautiful sites in minutes.
                </p>
        </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
