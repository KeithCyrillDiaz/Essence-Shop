const express = require('express');
const errorHandler = require('./utils/errorHandler');
require('dotenv').config();
const cors = require('cors');
const connectToDatabase = require('./config/connectToDatabase');
const logger = require('./utils/logger');
const configuration = require('./config/dotenv');

require("colors").enable();

connectToDatabase();

const app = express()

app.use(express.json());

app.get('/', (req, res) => res.json({message: "Essence Shop Backend"}));

app.use(errorHandler);
app.use(cors());

const port = configuration.port;
app.listen(port, function () {
logger.Ready(`Server is Running at port ${port}`)
});