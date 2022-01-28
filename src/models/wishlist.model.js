const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movies: [{
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    }]
});

module.exports = mongoose.model('Wishlist', wishlistSchema);