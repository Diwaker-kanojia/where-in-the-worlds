import React from "react";
import "../styles/CountryDetailsShimmer.css";

const CountryDetailsShimmer = () => {
  return (
    <div className="country-details-container-shimmer">
      {/* Back button */}
      <div className="shimmer-back"></div>

      {/* Country details */}
      <div className="country-details-shimmer">
        {/* Image placeholder */}
        <div className="shimmer-image"></div>

        {/* Text placeholders */}
        <div className="details-text-shimmer">
          <div className="shimmer-text-shimmer short"></div>
          <div className="shimmer-text-shimmer"></div>
          <div className="shimmer-text-shimmer short"></div>
          <div className="shimmer-text-shimmer"></div>
          <div className="shimmer-text-shimmer short"></div>
          <div className="shimmer-text-shimmer"></div>
          {/* Border countries */}
          <div className="border-countries-shimmer">
            <div className="shimmer-button"></div>
            <div className="shimmer-button"></div>
            <div className="shimmer-button"></div>
            <div className="shimmer-button"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetailsShimmer;
