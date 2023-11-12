import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function GovtDetails() {
  const { id } = useParams();
  const [breweryDetails, setBreweryDetails] = useState(null);
  
  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/govt/${id}`);
        setBreweryDetails(response.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    }

    fetchDetails();
  }, [id]);

  if (!breweryDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
        <h1> hello</h1>
      <h1>{breweryDetails.name}</h1>
      <p>Type: {breweryDetails.brewery_type}</p>
      <p>Address: {breweryDetails.address_1}, {breweryDetails.city}, {breweryDetails.state_province} {breweryDetails.postal_code}, {breweryDetails.country}</p>
      <a href={breweryDetails.website_url} target="_blank" rel="noopener noreferrer">
        Visit Website
      </a>
    </div>
  );
}

export default GovtDetails;
