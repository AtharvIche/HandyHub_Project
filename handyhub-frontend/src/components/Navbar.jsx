// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service'; // Corrected path
import './Navbar.css';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    navigate("/");
    window.location.reload(); // Hard reload to clear any residual state/auth
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Handy<span>Hub</span>
      </Link>
      <ul className="navbar-links">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Home
          </NavLink>
        </li>
        {currentUser && (
          <>
            <li>
              <NavLink
                to="/post-problem"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Post Problem
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-problems"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                My Problems
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-problems"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Browse Tasks
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to="/contact-us"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Contact Us
          </NavLink>
        </li>
      </ul>
      <div className="navbar-auth-links">
        {currentUser ? (
          <Link to="/" onClick={logOut}>
            <button className="btn btn-secondary">Logout</button>
          </Link>
        ) : (
          <>
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-secondary">Register</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;