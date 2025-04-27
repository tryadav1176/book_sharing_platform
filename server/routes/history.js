const express = require('express');
const router = express.Router();
const History = require('../models/History');

// Get history of a book
router.get('/:bookId', async (req, res) => {
  const { bookId } = req.params;

  try {
    const history = await History.find({ bookId }).populate('userId', 'email');
    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ message: 'Failed to fetch history.' });
  }
});

module.exports = router;
