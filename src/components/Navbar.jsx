import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar" aria-label="Primary Navigation">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" aria-label="Enactus CKT-UTAS Home">
          Enactus CKT-UTAS
        </Link>
        <button
          className="navbar-toggle"
          aria-controls="primary-navigation"
          aria-expanded={isOpen}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger"></span>
        </button>
        <ul
          id="primary-navigation"
          className={`navbar-menu ${isOpen ? 'open' : ''}`}
          role="menu"
        >
          <li role="none">
            <NavLink to="/" className="nav-link" role="menuitem" onClick={() => setIsOpen(false)}>
              Home
            </NavLink>
          </li>
          <li role="none">
            <NavLink to="/about" className="nav-link" role="menuitem" onClick={() => setIsOpen(false)}>
              About
            </NavLink>
          </li>
          <li role="none">
            <NavLink to="/projects" className="nav-link" role="menuitem" onClick={() => setIsOpen(false)}>
              Projects
            </NavLink>
          </li>
          <li role="none">
            <NavLink to="/team" className="nav-link" role="menuitem" onClick={() => setIsOpen(false)}>
              Team
            </NavLink>
          </li>
          <li role="none">
            <NavLink to="/recruitment" className="nav-link" role="menuitem" onClick={() => setIsOpen(false)}>
              Recruitment
            </NavLink>
          </li>
          <li role="none">
            <NavLink to="/donate" className="nav-link" role="menuitem" onClick={() => setIsOpen(false)}>
              Donate
            </NavLink>
          </li>
          <li role="none">
            <NavLink to="/admin" className="nav-link" role="menuitem" onClick={() => setIsOpen(false)}>
              Admin
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
