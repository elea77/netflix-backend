const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    abonnement: {
        type: String,
        required: true
    },
    wishlist: {
        type: Schema.Types.ObjectId,
        ref: 'Wishlist'
    }
});

module.exports = mongoose.model('User', userSchema);