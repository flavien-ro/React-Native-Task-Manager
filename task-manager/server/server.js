const express = require("express");
const app = express();

const dotenv = require('dotenv').config();
const connectDB = require('./Connection');

const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRoute = require('./routes/auth');
const userInfos = require('./routes/userInfos');
const TaskRoutes = require('./routes/task-route');

// Connection to the database
connectDB();

// Setting and listening to the port
const Port = process.env.PORT || 8080;
app.listen(Port, () => console.log('Server started on Port ' + Port));

app.use(cors({origin: true, credentials: true}));

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))

// Route Middlewares
app.use('/api/auth', AuthRoute);
app.use('/api/user', userInfos);
app.use('/api/task', TaskRoutes);