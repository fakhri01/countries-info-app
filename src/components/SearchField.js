import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchField = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex my-4">
      <input
        type="text"
        className="form-control mr-2"
        placeholder="Search for a country..."
        value={query}
        onChange={handleChange}
      />
      <button className="btn btn-primary" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchField;
