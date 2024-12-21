
const logger = require('../utils/logger');
const configuration = require('./dotenv')
const mongoose = require('mongoose');

const connectToDatabase = async () => {
    const URI = configuration.MongoDB_URL_Atlas;
    try {
      await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      if(URI === configuration.MongoDB_URL_Local) {
        logger.Ready("MongoDB is Running at Local Host");
      } else {
        logger.Ready("MongoDB is Running at ATLAS");
      }
    } catch (error) {
        logger.Error(error);
    }
  };


module.exports = connectToDatabase;