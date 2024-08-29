import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CountriesList = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        setError('Failed to fetch data');
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Countries List</h1>
      <ul className="list-group">
        {countries.map(country => (
          <li key={country.cca3} className="list-group-item">
            <Link to={`/country/${country.name.common}`}>{country.name.common}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountriesList;