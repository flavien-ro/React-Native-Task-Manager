const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const URI = process.env.DB_CONNECT

const connectDB = async () => {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('DB is connected');
}

module.exports = connectDB;