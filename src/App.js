import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CountriesList from "./components/CountriesList";
import CountryDetail from "./components/CountryDetail";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<CountriesList />} />
          <Route path="/country/:name" element={<CountryDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
