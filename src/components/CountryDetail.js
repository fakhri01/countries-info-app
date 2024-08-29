import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CountryDetail = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/name/${name}`)
      .then(response => {
        setCountry(response.data[0]);
      })
      .catch(error => {
        setError('Failed to fetch country details');
      });
  }, [name]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!country) {
    return <p>Loading...</p>;
  }

  
  const {
    capital,
    flags,
    population,
    region,
    subregion,
    languages,
    currencies,
    area,
  } = country;

  
  const languageList = languages ? Object.values(languages).join(', ') : 'N/A';
  const currencyList = currencies
    ? Object.values(currencies)
        .map(currency => `${currency.name} (${currency.symbol})`)
        .join(', ')
    : 'N/A';

  return (
    <div className="container">
      <button className="btn btn-primary mb-3" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Go Back
      </button>
      <h1>{country.name.common}</h1>
      <img src={flags.png} alt={`Flag of ${country.name.common}`} style={{ width: '200px' }} className="mb-3" />
      <ul className="list-group">
        <li className="list-group-item"><strong>Capital:</strong> {capital ? capital[0] : 'N/A'}</li>
        <li className="list-group-item"><strong>Population:</strong> {population.toLocaleString()}</li>
        <li className="list-group-item"><strong>Region:</strong> {region}</li>
        <li className="list-group-item"><strong>Subregion:</strong> {subregion}</li>
        <li className="list-group-item"><strong>Languages:</strong> {languageList}</li>
        <li className="list-group-item"><strong>Currencies:</strong> {currencyList}</li>
        <li className="list-group-item"><strong>Area:</strong> {area.toLocaleString()} km²</li>
      </ul>
    </div>
  );
};

export default CountryDetail;
