// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        alert('Failed to load books');
      }
    };
    fetchBooks();
  }, []);

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const filteredBooks = books.filter((book) =>
    book.bookName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;
