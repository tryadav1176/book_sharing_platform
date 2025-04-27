// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    alert('Logged out successfully!');
    navigate('/');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <div className="flex space-x-6">
        <Link to="/" className="font-bold text-xl">Book Share Platform</Link>
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
        <Link to="/support" className="hover:underline">Support</Link>
      </div>

      <div className="flex space-x-4">
        {currentUser ? (
          <>
            <Link to="/profile" className="hover:underline">Profile</Link>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
