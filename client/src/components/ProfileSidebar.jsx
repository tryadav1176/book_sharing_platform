import React from 'react';
import { Link } from 'react-router-dom';

const ProfileSidebar = ({ isOpen }) => (
  <div className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform`}>
    <ul className="p-4">
      <li className="mb-4"><Link to="/uploadbooks">Upload Books</Link></li>
      <li className="mb-4"><Link to="/requestedbooks">Requested Books</Link></li>
      <li><button onClick={() => { localStorage.clear(); window.location.href = '/' }}>Logout</button></li>
    </ul>
  </div>
);

export default ProfileSidebar;
