import { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import axios from "axios";
import CountriesListShimmer from "./CountriesListShimmer";

const CountriesList = ({ query }) => {
  const [countriesData, setCountriesData] = useState([]);

  const fetchCountriesData = () => {
    axios
      .get(
        "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population"
      )
      .then((res) => setCountriesData(res.data));
  };

  useEffect(() => {
    fetchCountriesData();

    // clean up function
    return () => {};
  }, []);

  if (countriesData.length === 0) {
    return <CountriesListShimmer />;
  }

  return (
    <>
      <div className="countries-container">
        {countriesData
          .filter(
            (country) =>
              country.name.common.toLowerCase().includes(query.toLowerCase()) ||
              country.region.toLowerCase().includes(query.toLowerCase())
          )
          .map((country) => (
            <CountryCard
              key={country.name.common}
              name={country.name.common}
              flag={country.flags.svg}
              population={country.population}
              region={country.region}
              capital={country.capital?.[0]}
            />
          ))}
      </div>
    </>
  );
};

export default CountriesList;
