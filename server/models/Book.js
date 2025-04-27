// models/Book.js

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName: { type: String, required: true },
    authorName: { type: String, required: true },
    publisherName: { type: String, required: true },
    isbn: { type: String, required: true },
    bookType: { type: String, required: true },
    bookImage: { type: String },  // Stores image path or URL
    ownerName: { type: String, required: true },
    currentHolder: { type: String, required: true, default: function() { return this.ownerName; } }, // Default to ownerName
    ownerEmail: { type: String, required: true },
    ownerMobile: { type: String, required: true },
    ownerAddress: { 
        city: { type: String, required: true },
        pincode: { type: String, required: true }
    },
    description:{type:String,required:true},
    uploadDate: { type: Date, default: Date.now }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
