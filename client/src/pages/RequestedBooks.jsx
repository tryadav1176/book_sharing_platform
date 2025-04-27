import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RequestedBooks = () => {
  const [requests, setRequests] = useState([]);

  // Fetch the current user's email from localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        if (currentUser?.email) {
          const response = await axios.get(
            `http://localhost:5000/api/requests/owner-email/${currentUser.email}`
          );
          setRequests(response.data);
        } else {
          alert('No user is logged in.');
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
        alert('Failed to load requested books.');
      }
    };

    fetchRequests();
  }, [currentUser?.email]);

  const handleUpdateRequest = async (requestId, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/requests/update-status/${requestId}`,
        { status }
      );
      alert(response.data.message);
      setRequests(
        requests.map((req) =>
          req._id === requestId ? { ...req, status } : req
        )
      );
    } catch (error) {
      console.error('Error updating request status:', error);
      alert('Failed to update request status.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-20">
        <h1 className="text-2xl font-bold mb-4">Requested Books</h1>
        {requests.length > 0 ? (
          <ul>
            {requests.map((req) => (
              <li key={req._id} className="bg-white p-4 shadow-md rounded-md mb-4">
                <h3 className="font-bold">{req.book.bookName}</h3>
                <p className="text-gray-500">
                  Requested by: {req.requester.email}
                </p>
                <p className="text-sm text-gray-400">Status: {req.status}</p>

                {req.status === 'pending' && (
                  <div className="mt-4 flex gap-4">
                    <button
                      onClick={() => handleUpdateRequest(req._id, 'accepted')}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleUpdateRequest(req._id, 'rejected')}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No requests found.</p>
        )}
      </div>
    </div>
  );
};

export default RequestedBooks;
