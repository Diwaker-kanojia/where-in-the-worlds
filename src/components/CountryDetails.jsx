import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import axios from "axios";
import CountryDetailsShimmer from "./CountryDetailsShimmer";
import CountriesListShimmer from "./CountriesListShimmer";

const CountryDetails = () => {
  const params = useParams();
  const countryName = params.country;

  const [countryData, setCountryData] = useState(null);
  const [countriesData, setCountriesData] = useState([]);

  const fetchCountriesData = () => {
    axios
      .get(
        "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population"
      )
      .then((res) => setCountriesData(res.data));
  };

  const fetchCountryData = () => {
    axios
      .get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then(({ data }) => {
        const country = data[0];
        setCountryData({
          name: country.name.common,
          nativeName: country.name.nativeName
            ? Object.values(country.name.nativeName)[0].common
            : "N/A",
          population: country.population,
          region: country.region,
          subregion: country.subregion,
          capital: country.capital,
          flag: country.flags.svg,
          tld: country.tld,
          languages: country.languages
            ? Object.values(country.languages).join(", ")
            : "N/A",
          currencies: country.currencies
            ? Object.values(country.currencies)
                .map((currency) => currency.name)
                .join(", ")
            : "N/A",
          borders: country.borders || [],
        });

        if (country.borders?.length) {
          Promise.all(
            country.borders.map((border) =>
              axios
                .get(`https://restcountries.com/v3.1/alpha/${border}`)
                .then(({ data }) => data[0].name.common)
            )
          ).then((borderNames) => {
            setCountryData((prev) => ({
              ...prev,
              borders: borderNames,
            }));
          });
        } else {
          setCountryData((prev) => ({
            ...prev,
            borders: [],
          }));
        }
      });
  };

  useEffect(() => {
    fetchCountryData();
    fetchCountriesData();
    document.title = params.country;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [countryName]);

  return countryData === null ? (
    <>
      <CountryDetailsShimmer />
      <CountriesListShimmer />
    </>
  ) : (
    <main>
      <div className="country-details-container">
        <Link to={"/"} className="back-button">
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </Link>
        <div className="country-details">
          <img src={countryData.flag} alt={`${countryData.name} flag`} />
          <div className="details-text-container">
            <h1>{countryData.name}</h1>
            <div className="details-text">
              <p>
                <b>Native Name: </b>
                <span className="native-name">{countryData.nativeName}</span>
              </p>
              <p>
                <b>Population: </b>
                <span className="population">
                  {countryData.population.toLocaleString("en-IN")}
                </span>
              </p>
              <p>
                <b>Region: </b>
                <span className="region">{countryData.region}</span>
              </p>
              <p>
                <b>Sub Region: </b>
                <span className="sub-region">{countryData.subregion}</span>
              </p>
              <p>
                <b>Capital: </b>
                <span className="capital">
                  {countryData.capital ? countryData.capital.join(", ") : "N/A"}
                </span>
              </p>
              <p>
                <b>Top Level Domain: </b>
                <span className="top-level-domain">{countryData.tld}</span>
              </p>
              <p>
                <b>Currencies: </b>
                <span className="currencies">{countryData.currencies}</span>
              </p>
              <p>
                <b>Languages: </b>
                <span className="languages">{countryData.languages}</span>
              </p>
            </div>
            {countryData.borders.length !== 0 && (
              <div className="border-countries">
                <b>Border Countries: </b>
                {countryData.borders.map((border) => (
                  <Link key={border} to={`/${border}`}>
                    {border}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="countries-container">
        <h1>Other countries in {countryData.region}</h1>
      </div>
      <div className="countries-container">
        {countriesData
          .filter(
            (country) =>
              country.region === countryData.region &&
              country.name.common !== countryData.name
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
    </main>
  );
};

export default CountryDetails;
