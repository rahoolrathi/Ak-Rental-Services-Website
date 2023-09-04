import React from "react";

const Navbar = () => {
  const listItemStyle = {
    display: "inline",
    margin: "0 20px",
  };

  return (
    <nav>
      <ul style={{ textAlign: "center" }}>
        <li style={listItemStyle}>Home</li>
        <li style={listItemStyle}>Rent a Car by Local User</li>
        <li style={listItemStyle}>Service</li>
        <li style={listItemStyle}>About</li>
        <li style={listItemStyle}>Register your Car</li>
        <li style={listItemStyle}>Contact us</li>
      </ul>
    </nav>
  );
};

export default Navbar;
