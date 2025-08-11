// src/components/Breadcrumb.tsx
import React from "react";

interface BreadcrumbProps {
  current: string;
  homeUrl?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ current, homeUrl = "/" }) => {
  return (
    <div className="breadcrumb-option">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb__links">
              <a href={homeUrl}>
                <i className="fa fa-home"></i> Home
              </a>
              <span>{current}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
