import React, { useState } from "react";
import Searchbar from "../components/Searchbar";
import SelectMenu from "../components/SelectMenu";
import CountriesList from "../components/CountriesList";

const Home = () => {
  const [query, setQuery] = useState("");

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };
  return (
    <>
      <main>
        <div className="search-filter-container">
          <Searchbar handleQuery={handleQuery} />
          <SelectMenu handleQuery={handleQuery}/>
        </div>
        <CountriesList query={query} />
      </main>
    </>
  );
};

export default Home;
