const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    movies: [{
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    }]
})

module.exports = mongoose.model('Category', categorySchema);