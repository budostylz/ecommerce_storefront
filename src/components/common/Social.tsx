import React from "react";

import insta1 from "@/origin/base/web/img/instagram/insta-1.jpg";
import insta2 from "@/origin/base/web/img/instagram/insta-2.jpg";
import insta3 from "@/origin/base/web/img/instagram/insta-3.jpg";
import insta4 from "@/origin/base/web/img/instagram/insta-4.jpg";
import insta5 from "@/origin/base/web/img/instagram/insta-5.jpg";
import insta6 from "@/origin/base/web/img/instagram/insta-6.jpg";

const Social: React.FC = () => {
  const images = [insta1, insta2, insta3, insta4, insta5, insta6];

  return (
    <div className="instagram">
      <div className="container-fluid">
        <div className="row">
          {images.map((img, index) => (
            <div key={index} className="col-lg-2 col-md-4 col-sm-4 p-0">
              <div
                className="instagram__item set-bg"
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "250px",
                }}
              >
                <div className="instagram__text">
                  <i className="fa fa-instagram" />
                  <a
                    href="https://www.instagram.com/ashion_shop"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @ashion_shop
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Social;
