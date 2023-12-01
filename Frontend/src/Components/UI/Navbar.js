import React from "react";
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navStyle = {
    backgroundColor: "black",
    padding: "10px 0",
    borderBottom: "2px solid white",
  };

  const listItemStyle = {
    display: "inline",
    margin: "0 20px",
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    transition: "color 0.3s ease-in-out",
  };

  const selectedStyle = {
    fontWeight: "bold",
    color: "#ffd700", // Change color for the selected link
  };

  return (
    <nav style={navStyle}>
      <ul style={{ textAlign: "center", listStyle: "none", padding: 0 }}>
        <li style={{ ...listItemStyle, ...(location.pathname === '/' && selectedStyle) }}>
          <Link to='/' style={listItemStyle}>Home</Link>
        </li>
        <li style={{ ...listItemStyle, ...(location.pathname === '/rent' && selectedStyle) }}>
          <Link to='/rent' style={listItemStyle}>Rent a Car</Link>
        </li>
        <li style={{ ...listItemStyle, ...(location.pathname === '/register' && selectedStyle) }}>
          <Link to='/register' style={listItemStyle}>Register your Car</Link>
        </li>
        <li style={{ ...listItemStyle, ...(location.pathname === '/SignIn' && selectedStyle) }}>
          <Link to='/SignIn' style={listItemStyle}>Owner SignIn</Link>
        </li>
        <li style={listItemStyle}>Service</li>
        <li style={listItemStyle}>About</li>
        <li style={listItemStyle}>Contact us</li>
      </ul>
    </nav>
  );
};

export default Navbar;
