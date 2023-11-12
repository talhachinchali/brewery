import "./header.css";
import { useState, useEffect } from "react";
import "./header.css";

export default function Header() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 400) {
      setIsHeaderVisible(true);
    } else {
      setIsHeaderVisible(false);
    }
  };
<svg viewBox="0 0 1440 320" className="wave">
  <path
    fill="#fff"
    d="M0,96L60,85.3C120,75,240,53,360,53.3C480,53,600,75,720,101.3C840,128,960,160,1080,149.3C1200,139,1320,85,1380,58.7L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
  ></path>
</svg>

  return (
    <div className="header">
      <div className={`headerTitles ${isHeaderVisible ? "visible" : ""}`}>
        <span className="headerTitleSm">Breweries</span>
       
      </div>
      <img
        className={`headerImg ${isHeaderVisible ? "slide" : ""}`}
        src="https://images.unsplash.com/photo-1571990678217-9ea41a3a06e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
        alt=""
      />
    </div>
  );
}

