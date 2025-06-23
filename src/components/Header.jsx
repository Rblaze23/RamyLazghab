// src/components/Header.jsx
import React from "react";
import "./Header.scss";

const Header = () => {
  return (
    <header className="main-header">
      <nav className="nav-container">
        {/* Brand name that links to top */}
        <a href="#home" className="brand-name">
          Ramy Lazghab
        </a>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
