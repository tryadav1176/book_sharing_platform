// src/pages/UploadBooks.jsx
import React, { useState } from 'react';
import axios from 'axios';

const UploadBooks = () => {
  const [formData, setFormData] = useState({
    bookName: '',
    authorName: '',
    publisherName: '',
    isbn: '',
    bookType: '',
    ownerName: '',
    currentHolder: '', // Added field
    ownerEmail: '',
    ownerMobile: '',
    city: '',
    pincode: '',
    description: '', // Added field
  });
  const [bookImage, setBookImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setBookImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (bookImage) data.append('bookImage', bookImage);

    try {
      const response = await axios.post('http://localhost:5000/api/books/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert('Failed to upload book');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6">Upload Book</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="bookName" placeholder="Book Name" onChange={handleChange} required />
          <input type="text" name="authorName" placeholder="Author Name" onChange={handleChange} required />
          <input type="text" name="publisherName" placeholder="Publisher Name" onChange={handleChange} required />
          <input type="text" name="isbn" placeholder="ISBN Number" onChange={handleChange} required />
          
          <select name="bookType" onChange={handleChange} required>
            <option value="">Select Book Type</option>
            <option value="Automation">Automation</option>
            <option value="Healthcare">Healthcare</option>
            <option value="IOT">IOT</option>
            <option value="ITOT">ITOT</option>
          </select>

          <input type="file" name="bookImage" onChange={handleImageChange} />

          <input type="text" name="ownerName" placeholder="Owner Name" onChange={handleChange} required />
          <input 
            type="text" 
            name="currentHolder" 
            placeholder="Current Holder" 
            onChange={handleChange} 
            value={formData.currentHolder || formData.ownerName} 
            required 
          />

          <input type="email" name="ownerEmail" placeholder="Owner Email" onChange={handleChange} required />
          <input type="text" name="ownerMobile" placeholder="Owner Mobile" onChange={handleChange} required />
          <input type="text" name="city" placeholder="City" onChange={handleChange} required />
          <input type="text" name="pincode" placeholder="Pincode" onChange={handleChange} required />

          <textarea
            name="description"
            placeholder="Book Description"
            rows="4"
            className="col-span-2"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Upload Book
        </button>
      </form>
    </div>
  );
};

export default UploadBooks;
