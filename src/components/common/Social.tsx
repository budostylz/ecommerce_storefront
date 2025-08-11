import React from "react";

const Social: React.FC = () => {
  const images = [
    "/origin/base/web/Source/img/instagram/insta-1.jpg",
    "/origin/base/web/Source/img/instagram/insta-2.jpg",
    "/origin/base/web/Source/img/instagram/insta-3.jpg",
    "/origin/base/web/Source/img/instagram/insta-4.jpg",
    "/origin/base/web/Source/img/instagram/insta-5.jpg",
    "/origin/base/web/Source/img/instagram/insta-6.jpg",
  ];

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
                  <i className="fa fa-instagram"></i>
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
