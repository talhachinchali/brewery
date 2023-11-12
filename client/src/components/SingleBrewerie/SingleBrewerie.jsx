// SingleBrewerie.jsx
import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./SingleBrewerie.css"; // Import the CSS file
import { Context } from "../../context/Context";
function SingleBrewerie() {
  const { id } = useParams();
  const [breweryDetails, setBreweryDetails] = useState(null);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const { user } = useContext(Context);
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

  const handleRatingChange = (event) => {
    // Assuming ratings are from 1 to 5
    setRating(parseInt(event.target.value, 10));
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSaveReview = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title:breweryDetails.name,
      desc:description,
      payment_details:rating,
      country:breweryDetails.country,
      link:breweryDetails.website_url,
      city:breweryDetails.city,
      state:breweryDetails.state,
      phone:breweryDetails.phone,
    };
   
    try {
      const res = await axios.post("http://localhost:5000/api/posts", newPost);
      alert("Thanks for your rating");
      
    } catch (err) {
        console.log(err);
    }
    // Implement logic to save the rating and description
    console.log(`Rating: ${rating}, Description: ${description}`);
    // You can send this data to your backend for storage
  };

  if (!breweryDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container2">
      <h1 className="titles">Brewery Details</h1>
      <div className="detailss">
        <h2>{breweryDetails.name}</h2>
        <p>Type: {breweryDetails.brewery_type}</p>
        <p>
          Address: {breweryDetails.address_1}, {breweryDetails.city},{" "}
          {breweryDetails.state_province} {breweryDetails.postal_code},{" "}
          {breweryDetails.country}
        </p>
        <a
          href={breweryDetails.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="links"
        >
          Visit Website
        </a>
        {user&&
       <div>
        <div className="rating-section">
          <label htmlFor="rating">Rating:</label>
          <select id="rating" value={rating} onChange={handleRatingChange}>
            <option value={0}>Select</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div className="description-section">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            rows={4}
          />
        </div>
        <button onClick={handleSaveReview}>Save Review</button>
        </div>
}
      </div>
        
    </div>
        
  );
}

export default SingleBrewerie;
