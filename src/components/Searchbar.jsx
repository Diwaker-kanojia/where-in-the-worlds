import React from "react";

const Searchbar = ({ handleQuery }) => {
  return (
    <div className="search-container">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        onChange={handleQuery}
        type="text"
        placeholder="Search for a country..."
      />
    </div>
  );
};

export default Searchbar;
