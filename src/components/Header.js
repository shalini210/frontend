import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Clear the authentication data
    navigate('/signin'); // Redirect to the login page
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="CRM Logo" />
        <Link to="/">CRM Dashboard</Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/contacts">Contacts</Link></li>
          <li><Link to="/tasks">Tasks</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>
      <div className="logout">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
