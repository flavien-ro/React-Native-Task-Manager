const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userShema = new Schema ({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model('User', userShema);
module.exports = User;