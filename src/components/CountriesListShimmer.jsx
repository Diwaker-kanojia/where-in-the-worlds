import React from "react";
import "../styles/CountriesListShimmer.css";
const CountriesListShimmer = () => {
  return (
    <div className="countries-container">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="country-card shimmer-card"></div>
      ))}
    </div>
  );
};

export default CountriesListShimmer;
