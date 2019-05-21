const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    exp: {
        type: Number,
        default: 0
    },
    exp_next: {
        type: Number,
        default: 350
    },
    level: {
        type: Number,
        default: 1
    },
    brands: {
        type: [String],
        default: []
    },
    categories: {
        type: [String],
        default: []
    },
    photo: {
        type: String,
        default: ''
    }
});

module.exports = User = mongoose.model('user', userSchema);
