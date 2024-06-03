const mongoose = require('mongoose');
const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        // unique: true
    },
    status: {
        type: String,
        required: true,
        trim: true,
        // unique: true
    },
    movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    }] 
})

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
module.exports = Wishlist;