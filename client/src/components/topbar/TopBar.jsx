import { useContext,useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const [searchContent,setsearchContent]=useState('');
  const PF = "http://localhost:5000.com/images/"
console.log(user);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          
          
      
          
          <li className="topListItem">
            <Link className="link" to="/govt">
             Breweries
            </Link>
          </li>

         

        

          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div style={{display:"flex",gap:10}}>
        <input style={{padding:"2px 10px",width:"200px"}} value={searchContent} onChange={(e)=>{setsearchContent(e.target.value)}} placeholder='Search title' ></input>
        <Link className="link" to={`/?search=${searchContent}`}>
  <i className="topSearchIcon fas fa-search" onClick={() => console.log(searchContent)}></i>
</Link>
</div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={PF+user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      
      </div>
    </div>
  );
}
