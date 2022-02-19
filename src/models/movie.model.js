const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: false
    },
    duration: {
        type: String,
        required: true,
        unique: false
    },
    date: {
        type: Number,
        required: true,
        unique: false
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }]
});

module.exports = mongoose.model('Movie', movieSchema);