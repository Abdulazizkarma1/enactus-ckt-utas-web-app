import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <Link to="/" className="logo">ENACTUS</Link> 

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" onClick={closeMenu}>Home</NavLink>
        <NavLink to="/projects" onClick={closeMenu}>Projects</NavLink>
        <NavLink to="/about" onClick={closeMenu}>About</NavLink>
        <NavLink to="/team" onClick={closeMenu}>Team</NavLink>
        <NavLink to="/recruitment" onClick={closeMenu}>Join</NavLink>
        <NavLink to="/donate" onClick={closeMenu}>Donate</NavLink>
      </nav>
 
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
};

export default Navbar; 