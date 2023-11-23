import React from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const listItemStyle = {
    display: "inline",
    margin: "0 40px",
  };

  return (
    <nav>
      <ul style={{ textAlign: "center" }}>
        <li style={listItemStyle}>
          <Link to='/'>Home</Link>
        </li>
          <Link style={listItemStyle} to='/rent'>Rent a Car by Local User</Link>
        <li style={listItemStyle}>
          <Link to='/register'>Register your Car</Link>
        </li>
        <li style={listItemStyle}>Service</li>
        <li style={listItemStyle}>About</li>
        <li style={listItemStyle}>Contact us</li>
      </ul>
    </nav>
  );
};

export default Navbar;
