import React from "react";
import { useNavigate } from "react-router-dom";  // ✅ import useNavigate
import "./components.css";
import logo1 from "../assets/images/images.png"; 

function Navbar() {
  const navigate = useNavigate();  // ✅ hook to enable navigation

  return (
    <header className="navbar">
      <div className="logo">
        <img src={logo1} alt="PrimeEstate Logo" width={150} />
      </div>

      <nav aria-label="Main Navigation">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/guidelines">Guidelines</a></li>
          {/* <li><a href="/resources">Resources</a></li> */}
          <li><a href="/contactus">Contact</a></li>
        </ul>
      </nav>

      <div className="nav-right">
        <button 
          className="btn-primary" 
          onClick={() => navigate("/custom_search")}  // ✅ navigate properly
        >
          Compliance Check
        </button>
      </div>
    </header>
  );
}

export default Navbar;
