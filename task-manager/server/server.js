const express = require("express");
const app = express();

const dotenv = require('dotenv').config();
const connectDB = require('./Connection');

const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRoute = require('./routes/auth');

// Connection to the database
connectDB();

// Setting and listening to the port
const Port = process.env.Port || 8080;
app.listen(Port, () => console.log('Server started on Port ' + Port));

app.use(cors({origin: true, credentials: true}));

// Middlewares
app.use(express.json());

// Route Middlewares
app.use('/api/auth', AuthRoute);