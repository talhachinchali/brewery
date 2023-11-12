import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
     
      <div className="postInfo">
        
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        
      </div>
      <p className="postDate">country : {post.country}</p>
      <p className="postDate">city : {post.city}</p>
      <p className="postDate">state : {post.state}</p>
      <p className="postDate">phone : {post.phone}</p>
      <p className="postProfit">Rating : {post.payment_details}</p>
     
    </div>
  );
}
