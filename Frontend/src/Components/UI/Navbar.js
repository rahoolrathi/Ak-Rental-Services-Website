import React from "react";
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navStyle = {
    backgroundColor: "#333",
    padding: "10px 0",
    borderBottom: "2px solid white",
    textAlign: "center",
  };

  const listItemStyle = {
    display: "inline",
    margin: "0 20px",
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    transition: "color 0.3s ease-in-out",
    cursor: "pointer",
  };

  const selectedStyle = {
    fontWeight: "bold",
    color: "#ffd700",
  };

  const handleLinkClick = (event) => {
    if (event.target.innerText === "Service") {
      event.preventDefault();
      window.scrollBy(960, 960);
    }
  };

  return (
    <nav style={navStyle}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ ...listItemStyle, ...(location.pathname === '/' && selectedStyle) }}>
          <Link to='/' style={listItemStyle} onClick={handleLinkClick}>Home</Link>
        </li>
        <li style={{ ...listItemStyle, ...(location.pathname === '/rent' && selectedStyle) }}>
          <Link to='/rent' style={listItemStyle} onClick={handleLinkClick}>Rent a Car</Link>
        </li>
        <li style={{ ...listItemStyle, ...(location.pathname === '/register' && selectedStyle) }}>
          <Link to='/register' style={listItemStyle} onClick={handleLinkClick}>Register Car</Link>
        </li>
        <li style={{ ...listItemStyle, ...(location.pathname === '/SignIn' && selectedStyle) }}>
          <Link to='/SignIn' style={listItemStyle} onClick={handleLinkClick}>Owner SignIn</Link>
        </li>
        <li style={listItemStyle}>
          <Link to='/service' style={listItemStyle} onClick={handleLinkClick}>Service</Link>
        </li>
    
        <li style={listItemStyle}>Contact us</li>
      </ul>
    </nav>
  );
};

export default Navbar;
