import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";
import PaymentInterface from "../payment/PaymentInterface";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/"; 
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState(0); // Added state for rating
  const [updateMode, setUpdateMode] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const { dispatch, isFetching } = useContext(Context);
  const [description, setDescription] = useState("");
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    console.log(post);
    getPost();
  }, [path]);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  const handlePayNowClick = () => {
    setShowPayment(true);
  };

  const handleRatingChange = (event) => {
    // Assuming ratings are from 1 to 5
    setRating(parseInt(event.target.value, 10));
  };

  const handleSaveRating = async () => {
    // Implement logic to save the rating
    try {
      await axios.post("http://localhost:5000/api/posts", {
        username: user.username,
        title: post.title,
        desc: description, // Storing rating in the description
        payment_details: rating,
      });
      alert("Thanks for your rating");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <div className="singlePostInfo">
          <span className="singlePostDate"></span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
            <h1>{post.title}</h1>
            <p>Country : {post.country}</p>
            <a style={{fontWeight:"bold"}} href={post.link}>Visit</a>
            <h1>Overall Rating : {post.payment_details}</h1>
            <p className="singlePostDesc">Ratings and Descriptions </p>
            </div>
            
          </>
        )}


        <div className="ratingsWrapper">
  {post.ratings?.map((rating, index) => (
    <div key={index} className="ratingCard">
      <p className="username">Username: {rating.username}</p>
      <p className="rating">Rating: {rating.rating}</p>
      <p className="description">Description: {rating.description}</p>
    </div>
  ))}
</div>




{user&&
        <div className="ratingInput">
          <label htmlFor="rating">Rating:</label>
          <select id="rating" value={rating} onChange={handleRatingChange}>
            <option value={0}>Select</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <div className="description-section">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            rows={4}
          />
        </div>
          <button onClick={handleSaveRating}>Save Rating</button>
        </div>

}
       

      </div>
    </div>
  );
}
