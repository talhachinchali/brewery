import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Govt.css";

function Govt() {
  const [breweries, setBreweries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("city");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://api.openbrewerydb.org/v1/breweries", {
          params: {
            [`by_${searchType}`]: searchQuery,
            per_page: 20,
          },
        });
        setBreweries(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [searchQuery, searchType]);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="city">City</option>
          <option value="name">Name</option>
          <option value="type">Type</option>
        </select>
      </div>
      <div className="cardbody">
        {breweries.map((brewery) => (
          <div key={brewery.id} className="card">
            <h3>{brewery.name}</h3>
            <p>Type: {brewery.brewery_type}</p>
            <p>Address: {brewery.address_1}, {brewery.city}, {brewery.state_province} {brewery.postal_code}, {brewery.country}</p>
            <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
            <Link to={`/breweries/${brewery.id}`} className="details-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Govt;
