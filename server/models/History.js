const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date }, // Can be null if the book is still with the user
});

module.exports = mongoose.model('History', historySchema);