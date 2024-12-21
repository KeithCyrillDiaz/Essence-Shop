const express = require('express');
const errorHandler = require('./utils/errorHandler');
const cors = require('cors');
const connectToDatabase = require('./config/connectToDatabase');
const logger = require('./utils/logger');
const configuration = require('./config/dotenv');
const checkEnvVariables = require('./helpers/checkEnvVariables');
const router = require('./routes/index');

require('dotenv').config();
require("colors").enable();

//Connect the server to MongoDB Database
connectToDatabase();

//Check required environment Variables
checkEnvVariables();

const app = express();
app.use(express.json());// Parse JSON payloads
app.use(cors({
    credentials: true // for authorization headers
}));// Enable CORS

// Root route
app.get('/', (req, res) => res.json("Essence Shop Backend"));

// Use generated routes
app.use('/EssenceShop', router());
app.use(errorHandler);

//start the server
const port = configuration.port;
app.listen(port, function () {
logger.Ready(`Server is Running at port ${port}`);
});



//exports for vercel configuration since it looks for the API folder
module.exports = app;