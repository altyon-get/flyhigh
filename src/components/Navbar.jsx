/* eslint-disable no-unused-vars */
// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
// import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/page1">Page 1</Link>
        </li>
        <li>
          <Link to="/page2">Page 2</Link>
        </li>
        <li>
          <Link to="/schedule-flight">Schedule Flight</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
