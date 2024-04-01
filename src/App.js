import React, { useState, useEffect } from "react";
import "./styles.css";

function CountryCard({ country }) {
  return (
    <div className="countryCard">
      <img src={country.flags.png} alt={country.name.common} />
      <p>{country.name.common}</p>
    </div>
  );
}

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function handleSearch(event) {
    setSearchTerm(event.target.value.toLowerCase());
  }

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="container">
        {filteredCountries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
}

export default App;
