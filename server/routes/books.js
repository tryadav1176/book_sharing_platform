const express = require('express');
const multer = require('multer');
const Book = require('../models/Book');
const router = express.Router();
const path = require('path');
const { default: mongoose } = require('mongoose');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/')); // Save files to 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage });
// Upload Book Route
router.post('/upload', upload.single('bookImage'), async (req, res) => {
  console.log('File: ', req.file); // Log uploaded file details
  console.log('Request Body: ', req.body); // Log form data for debugging


  try {
    const {
      bookName,
      authorName,
      publisherName,
      isbn,
      bookType,
      ownerName,
      currentHolder,
      ownerEmail,
      ownerMobile,
      city,
      pincode,
      description,
    } = req.body;

    const bookImage = req.file ? `/uploads/${req.file.filename}` : '';

    const newBook = new Book({
      bookName,
      authorName,
      publisherName,
      isbn,
      bookType,
      ownerName,
      currentHolder: currentHolder || ownerName,
      ownerEmail,
      ownerMobile,
      ownerAddress: { city, pincode },
      description,
      bookImage,
    });

    await newBook.save();
    res.status(201).json({ message: 'Book uploaded successfully!' });
  } catch (error) {
    console.error('Error while saving book:', error);
    res.status(500).json({ error: 'Failed to upload book' });
  }
});

// Route to fetch all books (added during showBook)
router.get('/', async (req, res) => {
  try {
    console.log('Fetching books from database...'); // Debugging log
    const books = await Book.find(); // Fetch books from MongoDB
    console.log('Books fetched successfully:', books); // Log the books
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error); // Log detailed error
    res.status(500).json({ message: 'Failed to fetch books' });
  }
});

// Route to fetch a single book by ID (added during bookdetails)
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book details:', error);
    res.status(500).json({ message: 'Failed to fetch book details' });
  }
});


module.exports = router;
