import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId'); // Ensure user ID is removed correctly
    localStorage.removeItem('currentUser');
    alert('Logged out successfully!');
    navigate('/'); // Redirect to Home after logout
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <ul className="space-y-4">
          <li><Link to="/upload" className="hover:underline">Upload Book</Link></li>
          <li><Link to="/requested" className="hover:underline">Requested Books</Link></li> {/* Correct link */}
          <li><Link to="/notification" className="hover:underline">Notifications</Link></li>
          <li>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </li>
        </ul>
      </aside>

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to your Profile</h1>
        <p className="text-gray-600">Manage your books and requests from here.</p>
      </div>
    </div>
  );
};

export default Profile;
