import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const BookDetails = () => {
  const location = useLocation();
  const { book } = location.state;
  const [requested, setRequested] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleRequest = async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    try {
      const response = await axios.post('http://localhost:5000/api/requests/create', {
        bookId: book._id,
        requesterId: currentUser.id,
        ownerEmail: book.ownerEmail,
      });
      alert(response.data.message);
      setRequested(true);
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Failed to send book request');
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/history/${book._id}`);
      setHistory(response.data);
      setShowHistory(true); // Show history table
    } catch (error) {
      console.error('Error fetching history:', error);
      alert('Failed to load book history.');
    }
  };

  return (
    <div className="container mx-auto p-8 flex flex-col md:flex-row gap-8">
      {/* Book Image and Details */}
      <div className="w-full md:w-1/3 flex justify-center">
        <img
          src={`http://localhost:5000${book.bookImage}`}
          alt={book.bookName}
          className="w-64 h-96 object-cover rounded-lg shadow-lg"
        />
      </div>

      <div className="w-full md:w-2/3">
        <h1 className="text-3xl font-bold mb-4">{book.bookName}</h1>
        <p className="text-lg text-gray-600 mb-2">
          <strong>Author:</strong> {book.authorName}
        </p>
        <p className="text-lg text-gray-500 mb-2">
          <strong>Publisher:</strong> {book.publisherName}
        </p>
        <p className="text-lg text-gray-500 mb-2">
          <strong>Type:</strong> {book.bookType}
        </p>

        {/* Request Button */}
        <div className="mt-6">
          {!requested ? (
            <button
              onClick={handleRequest}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Request Book
            </button>
          ) : (
            <p className="text-green-600">Request sent</p>
          )}

          {/* History Button */}
          <button
            onClick={fetchHistory}
            className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            View History
          </button>
        </div>

        {/* History Table */}
        {showHistory && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Book History</h2>
            <table className="table-auto w-full border-collapse border border-gray-400">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Owner</th>
                  <th className="border px-4 py-2">Start Date</th>
                  <th className="border px-4 py-2">End Date</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry) => (
                  <tr key={entry._id}>
                    <td className="border px-4 py-2">{entry.userId.email}</td> {/* Fixed */}
                    <td className="border px-4 py-2">
                      {new Date(entry.startDate).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">
                      {entry.endDate ? new Date(entry.endDate).toLocaleDateString() : 'Present'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
