import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchField from "./SearchField";

const CountriesList = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
        setFilteredCountries(response.data);
      })
      .catch(() => {
        setError("Failed to fetch data");
      });
  }, []);

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(lowercasedQuery)
      )
    );
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Countries List</h1>
      <SearchField onSearch={handleSearch} />
      <ul className="list-group">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <li key={country.cca3} className="list-group-item">
              <Link to={`/country/${country.name.common}`}>
                {country.name.common}
              </Link>
            </li>
          ))
        ) : (
          <p>No countries found</p>
        )}
      </ul>
    </div>
  );
};

export default CountriesList;
