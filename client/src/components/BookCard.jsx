// src/components/BookCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleCardClick = () => {
    navigate(`/book/${book._id}`, { state: { book } }); // Navigate to BookDetails with book data
  };

  return (
    <div 
      onClick={handleCardClick} 
      className="p-4 border rounded-lg shadow-md bg-white max-w-xs cursor-pointer transition-transform transform hover:scale-105"
    >
      {/* Image with 4:5 aspect ratio */}
      <div className="w-full relative" style={{ paddingBottom: '125%' }}>
        <img
          src={`http://localhost:5000${book.bookImage}`}
          alt={book.bookName}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Book Info */}
      <h2 className="text-xl font-bold mt-4">{book.bookName}</h2>
      <p className="text-gray-600">Author: {book.authorName}</p>
      <p className="text-gray-500">Publisher: {book.publisherName}</p>
      <p className="text-gray-500">Type: {book.bookType}</p>
    </div>
  );
};

export default BookCard;
