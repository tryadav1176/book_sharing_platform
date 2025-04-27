// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './components/Profile'; // Changed path to 'pages'
import Login from './components/Login';
import Signup from './components/Signup';
import UploadBooks from './pages/UploadBooks';
import BookDetails from './pages/BookDetails';
import RequestedBooks from './pages/RequestedBooks'; // Import RequestedBooks

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload" element={<UploadBooks />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/requested" element={<RequestedBooks />} /> {/* New route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
