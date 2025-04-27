const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const Book = require('../models/Book');
const User = require('../models/User');
const History = require('../models/History'); // Import the History model
// Create a new request
router.post('/create', async (req, res) => {
    const { bookId, requesterId} = req.body;
  console.log('bookId:', bookId, 'requesterId:', requesterId); // Log the IDs
  
  if (!bookId || !requesterId) {
      return res.status(400).json({ message: 'All fields are required' });
  }

    try {
        // Check if the book exists
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        // Check if a request already exists
        const owner = await User.findOne({ email: book.ownerEmail });
    if (!owner) return res.status(404).json({ message: 'Book owner not found' });

    const existingRequest = await Request.findOne({ book: bookId, requester: requesterId });
    if (existingRequest) return res.status(400).json({ message: 'Request already exists' });

    const request = new Request({
      book: bookId,
      requester: requesterId,
      owner: owner._id,
      status: 'pending',
    });

        await request.save();
        res.status(201).json({ message: 'Request sent successfully!' });
    } catch (error) {
        console.error('Error creating request:', error);
        res.status(500).json({ message: 'Failed to create request' });
    }
});


// Update request status (Approve or Reject)
router.put('/update-status/:requestId', async (req, res) => {
  const { status } = req.body;

  if (!['accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    // Populate the book and requester details so we can access them later
    const request = await Request.findById(req.params.requestId)
                                 .populate('book')
                                 .populate('requester');
    if (!request) return res.status(404).json({ message: 'Request not found' });

    // Update the request status
    request.status = status;
    await request.save();

    if (status === 'accepted') {
      // Close the previous history entry (if any) by updating the `endDate`
      await History.findOneAndUpdate(
        { bookId: request.book._id, endDate: null },  // Use request.book._id
        { endDate: new Date() }
      );

      // Create a new history entry for the new owner (the requester)
      const newHistory = new History({
        bookId: request.book._id,       // Use request.book._id
        userId: request.requester._id,  // Use request.requester._id
        startDate: new Date(),
      });
      await newHistory.save();
    }

    res.status(200).json({ message: `Request ${status} successfully.` });
  } catch (error) {
    console.error('Error updating request:', error);
    res.status(500).json({ message: 'Failed to update request' });
  }
});


  
// Fetch requests sent to the current user's email
router.get('/owner-email/:email', async (req, res) => {
    try {
      const owner = await User.findOne({ email: req.params.email });
      if (!owner) return res.status(404).json({ message: 'Owner not found' });
  
      const requests = await Request.find({ owner: owner._id }).populate('book requester');
      res.status(200).json(requests);
    } catch (error) {
      console.error('Error fetching requests:', error);
      res.status(500).json({ message: 'Failed to fetch requests' });
    }
  });

// Get all requests for the owner
router.get('/owner/:ownerId', async (req, res) => {
    try {
        const requests = await Request.find({ owner: req.params.ownerId }).populate('book requester');
        res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching requests:', error);
        res.status(500).json({ message: 'Failed to fetch requests' });
    }
});

module.exports = router;
