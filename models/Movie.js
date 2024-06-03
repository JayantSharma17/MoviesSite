const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    wishlistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wishlist',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        // unique: true
    },
    year: {
        type: String,
        required: true,
        trim: true,
    },
    rating: {
        type: String,
        required: true,
        trim: true,
    },
    plot: {
        type: String,
        required: true,
        trim: true,
    },
    img: {
        type: String,
        required: true,
        trim: true,
    },
   
})

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;